const React = require('react')
const { create: render } = require('react-test-renderer')
const SCProvider = require('../src/SCProvider').default

describe('SCProvider', () => {
  test('renders', () => {
    const json = render(
      React.createElement(SCProvider, {},
        React.createElement('h1', null, 'hello')
      )
    ).toJSON()
    expect(json).toMatchSnapshot()
  })
})
