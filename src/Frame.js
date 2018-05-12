import React from 'react'
import { render } from 'react-dom'
import isURL from 'is-url'
import open from 'opn'

const Root = props =>
  <div
    {...props}
    style={{
      position: 'relative',
    }}
  />

const Overlay = props =>
  <div
    style={{
      position: 'absolute',
      zIndex: 2,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    }}
  />

class Frame extends React.Component {
  doc = null
  win = null
  div = null

  getSrc = () => {
    const { css = '' } = this.props
    return `<style> *{box-sizing:border-box} body{margin:0} body{min-height:100vh} ${css}</style>
<div id='app'></div>`
  }

  onLoad = e => {
    this.doc = this.root.contentDocument
    this.win = this.root.contentWindow
    this.update(this.props)
    this.doc.addEventListener('click', this.handleClick)
  }

  update = ({ children }) => {
    if (!this.doc) return
    const div = this.doc.getElementById('app')
    const child = React.Children.only(children)
    const clone = React.cloneElement(child, {
      document: this.doc
    })
    render(clone, div)
  }

  handleClick = e => {
    e.preventDefault()
    const src = e.target
    const href = src.getAttribute('href')
    if (src.tagName !== 'A' || !href) return
    if (isURL(href)) {
      open(href)
    } else {
      const route = this.getRoute(href)
      if (!route) return
      this.props.update({
        filename: route.filename
      })
    }
  }

  getRoute = href => {
    const { files } = this.props
    const path = href === '/'
      ? 'index.jsx'
      : href.replace(/^\//, '') + '.jsx'
    const file = files.find(file => file.filename === path)
    return file
  }

  componentWillReceiveProps (next) {
    if (next.children !== this.props.children) {
      this.update(next)
    }
  }

  render () {
    const {
      children,
      overlay,
    } = this.props

    return (
      <Root>
        <iframe
          ref={ref => this.root = ref}
          style={{
            display: 'block',
            width: '100%',
            height: 'calc(100vh - 40px)',
            margin: 0,
            overflow: 'scroll',
            backgroundColor: '#fff',
            opacity: !!children ? 1 : 0.25,
            border: 0
          }}
          srcDoc={this.getSrc()}
          scrolling='yes'
          onLoad={this.onLoad}
        />
        {overlay && <Overlay />}
      </Root>
    )
  }
}

Frame.defaultProps = {
  css: 'body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;line-height:1.5}'
}

export default Frame
