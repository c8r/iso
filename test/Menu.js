const React = require('react')
const { create: render } = require('react-test-renderer')

jest.mock('electron', () => ({
  app: {},
  remote: {
    app: {
      getName: () => 'Test',
      getPath: () => ''
    },
    dialog: {
      showSaveDialog: jest.fn(),
      showOpenDialog: jest.fn()
    }
  }
}))

global.Notification = {}

const dialogs = require('../src/dialogs')
jest.mock('../src/dialogs', () => ({
  newFile: jest.fn(),
  openFile: jest.fn()
}))

jest.mock('../src//updaters', () => ({
  openFile: () => {}
}))

const { default: Menu, config } = require('../src/Menu')

describe('Menu', () => {
  test('renders null', () => {
    const json = render(
      React.createElement(Menu, {})
    ).toJSON()
    expect(json).toBe(null)
  })

  test('config returns an array', () => {
    const menu = config({})
    expect(Array.isArray(menu)).toBe(true)
  })

  test('config snapshot', () => {
    const menu = config({})
    expect(menu).toMatchSnapshot()
  })

  describe('click handlers', () => {
    let menu, app, file, view

    beforeAll(() => {
      menu = config({})
      app = menu[0]
      file = menu[1]
      view = menu[3]
    })

    test('File > New opens dialog', () => {
      const [ newFile ] = file.submenu
      newFile.click()
      expect(dialogs.newFile).toHaveBeenCalled()
    })

    test('File > Open opens dialog', () => {
      const [ , openFile ] = file.submenu
      openFile.click()
      expect(dialogs.openFile).toHaveBeenCalled()
    })

    test.skip('File > Open Recent opens dialog')
    test.skip('File > Open Recent > Clear List updates recents')
    test.skip('File > Open Recent > Clear List updates recents')

    test.skip('View > Hide Panel updates editorOpen')
    test.skip('View > Dark Mode updates store.uiColor')
    test.skip('View > Light Mode updates store.uiColor')
    test.skip('View > VIM Mode updates store.vimMode')
    test.skip('View > Enable Styled Components updates store.styledComponents')

    test.skip('Help > Getting Started updates filename')
  })
})
