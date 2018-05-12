import fs from 'fs'
import path from 'path'
import { ipcRenderer } from 'electron'
import React from 'react'
import log from 'electron-log'
import { store } from './Store'
import debounce from 'lodash.debounce'
import matter from 'gray-matter'

import {
  getFiles,
  getFile,
  getConfig
} from './filesystem'
import Watcher from './Watcher'
import defaultScope from './defaultScope'
import { openDoc } from './updaters'

class Files extends React.Component {
  isRead = false
  isWrite = false

  getFiles = async props => {
    const files = await getFiles(props)
    props.update({ files })
  }

  readFile = async props => {
    const code = await getFile(props)
    const { data } = matter(code)
    const readonly = !!data.READONLY
    this.isRead = true
    props.update({ code, readonly })
  }

  getConfig = async props => {
    try {
      const {
        components,
        theme,
        configPath
      } = await getConfig(props)
      props.update({
        scope: components,
        theme,
        configPath,
      })
    } catch (e) {
      log.error('error reading config file')
      log.error(e)
      props.update({
        scope: defaultScope,
        configPath: null
      })
    }
  }

  write = debounce(({ filename, content }) => {
    ipcRenderer.send('write-file', {
      filename,
      content
    })
  }, 200)

  handleFileChange = nextfile => {
    const { dirname, filename } = this.props
    const filepath = path.join(dirname, filename)
    if (path.basename(nextfile) === 'iso.config.js') {
      this.getConfig(this.props)
      return
    }
    if (nextfile !== filepath) return
    this.readFile(this.props)
  }

  setBaseTag = dirname => {
    const base = document.getElementById('base')
    if (!base) return
    base.href = 'file://' + dirname + '/'
  }

  componentDidMount () {
    requestAnimationFrame(() => {
      const { dirname, filename, store, update } = this.props
      if (!filename && !store.recents.length) {
        // FTE
        update(openDoc('hello.jsx'))
        return
      }

      this.getFiles(this.props)
      this.getConfig(this.props)

      if (this.props.filename) {
        this.readFile(this.props)
      }

      this.setBaseTag(this.props.dirname)
    })

  }

  componentWillReceiveProps (next) {
    if (next.dirname !== this.props.dirname) {
      this.getFiles(next)
      this.getConfig(next)
      store.set({ dirname: next.dirname })
      this.setBaseTag(next.dirname)
      if (this.watcher) {
        this.watcher.unwatch(this.props.dirname)
        this.watcher.add(next.dirname)
      }
    }

    if (next.filename && next.filename !== this.props.filename) {
      this.readFile(next)
      this.getFiles(next)
    }

    if (
      !next.invalid &&
      !next.readonly &&
      next.filename && !this.isRead &&
      (next.code !== this.props.code || next.data !== this.props.data)
    ) {
      const content = next.code
      const filename = path.join(next.dirname, next.filename)
      this.write({ filename, content })
    } else {
      this.isRead = false
    }
  }

  render () {
    return (
      <Watcher
        {...this.props}
        onChange={this.handleFileChange}
      />
    )
  }
}

export default Files
