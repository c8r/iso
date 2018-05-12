const React = require('react')
const { renderToString } = require('react-dom/server')
const { ServerStyleSheet } = require('styled-components')
const pkg = require('../package.json')
const Splash = require('../renderer/Splash').default

const sheet = new ServerStyleSheet()

const html = renderToString(
  sheet.collectStyles(
    React.createElement(Splash, { pkg })
  )
)

const css = sheet.getStyleTags()

const datauri = `data:text/html;charset=utf-8,${encodeURIComponent(css + html)}`

module.exports = datauri
