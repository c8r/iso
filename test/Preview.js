const React = require('react')
const { create: render } = require('react-test-renderer')
const Preview = require('../src/Preview').default

const fm = `---
title: hello
---
<h1>beep</h1>
`

describe('Preview', () => {
  test('renders', () => {
    const json = render(
      React.createElement(Preview, {
        filename: 'hello.jsx',
        code: '<h1>hello</h1>',
        scope: {},
        store: {}
      })
    ).toJSON()
    expect(json).toMatchSnapshot()
  })

  test('handles invalid jsx', () => {
    const json = render(
      React.createElement(Preview, {
        filename: 'hello.jsx',
        code: 'h1>invalid</h1>',
        scope: {},
        store: {}
      })
    ).toJSON()
    expect(json).toBe(null)
  })

  test('renders with SCProvider', () => {
    const json = render(
      React.createElement(Preview, {
        filename: 'hello.jsx',
        code: '<h1>hello</h1>',
        scope: {},
        theme: {},
        store: {
          styledComponents: true
        }
      })
    ).toJSON()
    expect(json).toMatchSnapshot()
  })

  test('renders with webfont link', () => {
    const json = render(
      React.createElement(Preview, {
        filename: 'hello.jsx',
        code: '<h1>hello</h1>',
        scope: {},
        theme: {
          font: '"Roboto", sans-serif'
        },
        store: {}
      })
    ).toJSON()
    expect(json).toMatchSnapshot()
  })

  test('renders with front matter', () => {
    const json = render(
      React.createElement(Preview, {
        filename: 'hello.jsx',
        code: fm,
        scope: {},
        theme: {},
        store: {}
      })
    ).toJSON()
    expect(json).toMatchSnapshot()
  })
})
