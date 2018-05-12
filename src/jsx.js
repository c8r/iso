import React from 'react'
import { create as render } from 'react-test-renderer'
import { transform } from 'babel-standalone'

const parse = raw => transform(wrap(raw.trim()), {
  plugins: [
    require('babel-plugin-transform-react-jsx')
  ]
}).code

const wrap = str => `<React.Fragment>${str}</React.Fragment>`

export const toElement = (jsx, scope = {}) => {
  const code = parse(jsx)
  const keys = Object.keys(scope)
  const values = keys.map(k => scope[k])
  const fn = new Function('React', ...keys, `return ${code}`)
  const el = fn(React, ...values)
  render(el).toJSON()
  return el
}

export const createComponent = (jsx, scope = {}) => {
  const el = parse(jsx)
  const keys = Object.keys(scope)
  const scopeValues = keys.map(key => scope[key])

  const create = new Function('React', ...keys,
    `return (props, context) => ${el}`)

  const Component = create(React, ...scopeValues)

  // throw errors for invalid JSX
  render(React.createElement(Component, scope.props)).toJSON()

  return Component
}

export const validate = (code = '', scope = {}) => {
  try {
    transform(wrap(code.trim()), {
      plugins: [
        require('babel-plugin-transform-react-jsx')
      ]
    })
    return null
  } catch (e) {
    return e
  }
}

export default {
  toElement,
  createComponent,
  validate,
}
