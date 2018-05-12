const React = require('react')
const { create: render } = require('react-test-renderer')
const Editor = require('../src/Editor').default

describe('Editor', () => {
  test('renders', () => {
    const json = render(
      React.createElement(Editor, { value: 'hello', onChange: () => {} })
    ).toJSON()
    expect(json).toMatchSnapshot()
  })
})
