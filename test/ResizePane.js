const React = require('react')
const { create: render } = require('react-test-renderer')
const {
  Simulate,
  renderIntoDocument
} = require('react-dom/test-utils')
const ResizePane = require('../src/ResizePane').default

describe('ResizePane', () => {
  test('renders', () => {
    const json = render(
      React.createElement(ResizePane, {})
    ).toJSON()
    expect(json).toMatchSnapshot()
  })

  test('has initial state', () => {
    const instance = render(
      React.createElement(ResizePane, {
        width: 448
      })
    ).getInstance()
    expect(instance.state.active).toBe(false)
    expect(instance.state.mouse).toBe(null)
    expect(instance.state.width).toBe(448)
  })

  test('handles mousedown event', () => {
    const pane = renderIntoDocument(
      React.createElement(ResizePane, {})
    )
    Simulate.mouseDown(pane.root, {
      clientX: 4,
      clientY: 4,
    })
    expect(pane.state.mouse).toEqual({
      x: 4,
      y: 4
    })
  })

  test.skip('handles mousemove event', () => {})
  test.skip('handles mouseup event', () => {})
  test.skip('handles click event', () => {})
})
