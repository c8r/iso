const React = require('react')
const { create: render } = require('react-test-renderer')

jest.mock('electron', () => ({
  app: {
    getName: () => 'Test',
    getPath: () => ''
  },
  remote: {
    app: {
      getName: () => 'Test',
      getPath: () => ''
    }
  }
}))

global.Notification = {}

const App = require('../src/App').default

describe('App', () => {
  test('renders', () => {
    const json = render(
      React.createElement(App)
    ).toJSON()
    expect(json).toMatchSnapshot()
  })
})
