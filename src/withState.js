import { remote } from 'electron'
import React from 'react'
import matter from 'gray-matter'
import defaultScope from './defaultScope'
import { validate } from './jsx'

const { app } = remote

const mapProps = props => {
  const { content } = matter(props.code)
  const invalid = validate(content, props.scope)
  return {
    ...props,
    invalid
  }
}

const withState = Component => {
  class AppState extends React.Component {
    state = this.props

    update = (...args) => this.setState(...args)

    render () {
      return <Component {...mapProps(this.state)} update={this.update} />
    }
  }

  AppState.defaultProps = {
    files: [],
    dirname: app.getPath('home'),
    filename: null,
    scope: defaultScope,
    theme: {},
    code: '',
    err: null,
    editorOpen: true,
    resizing: false,
    store: {
      recents: [],
      editorWidth: 448,
      styledComponents: true
    }
  }

  return AppState
}

export default withState
