const React = require('react')
const { create: render } = require('react-test-renderer')
const Frame = require('../src/Frame').default

describe('Frame', () => {
  test('renders', () => {
    const json = render(
      React.createElement(Frame, {},
        React.createElement('h1', null, 'hello')
      )
    ).toJSON()
    expect(json).toMatchSnapshot()
  })

  test('renders with overlay', () => {
    const json = render(
      React.createElement(Frame, { overlay: true },
        React.createElement('h1', null, 'hello')
      )
    ).toJSON()
    expect(json).toMatchSnapshot()
  })

  test('renders without children', () => {
    const json = render(
      React.createElement(Frame, {})
    ).toJSON()
    expect(json).toMatchSnapshot()
  })
})
