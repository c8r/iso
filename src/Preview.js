import path from 'path'
import React from 'react'
import log from 'electron-log'
import webfont from '@compositor/webfont'
import { get } from 'dot-prop'
import matter from 'gray-matter'
import Catch from './Catch'
import SCProvider from './SCProvider'
import { toElement } from './jsx'

const getElement = ({ code, scope }) => {
  try {
    const { content, data } = matter(code)
    const element = toElement(content, {
      ...scope,
      props: data
    })
    return {
      element,
      invalid: null
    }
  } catch (err) {
    return {
      element: null,
      invalid: err
    }
  }
}

const ErrBox = props =>
  <pre
    {...props}
    style={{
      fontFamily: 'Menlo, monospace',
      fontSize: 14,
      whiteSpace: 'pre-wrap',
      margin: 0,
      padding: 8,
      color: 'white',
      backgroundColor: 'red',
    }}
  />

const getWebfontLink = theme => {
  const font = get(theme, 'fonts.0') || get(theme, 'font')
  if (!font) return false
  const url = webfont.getURL(font)
  return <link rel='stylesheet' href={url} />
}

const DefaultProvider = ({ children }) =>
  <div children={children} />

class Preview extends React.Component {
  static getDerivedStateFromProps (props, state) {
    const { element, invalid } = getElement(props)

    if (invalid) return { invalid }

    return {
      ...props,
      element,
      invalid
    }
  }

  state = {
    ...this.props,
    ...getElement(this.props)
  }

  render () {
    const {
      filename,
      theme = {},
      scope,
      store: {
        styledComponents
      }
    } = this.props
    const { element, invalid } = this.state

    if (!filename || !element) return false

    const link = getWebfontLink(theme)
    const Provider = styledComponents
      ? SCProvider
      : DefaultProvider

    return (
      <Catch>
        {link}
        <Provider {...this.props}>
          {element}
        </Provider>
      </Catch>
    )
  }
}

export default Preview
