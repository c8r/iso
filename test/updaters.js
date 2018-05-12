jest.mock('electron', () => ({
  app: {},
  remote: {
    app: {
      getAppPath: () => '/appPath'
    }
  }
}))

const {
  toggle,
  setStore,
  addRecent,
  directoryUp,
  openFile,
  openDoc,
  appendComponent,
} = require('../src/updaters')

describe('updaters', () => {
  test('toggle toggles boolean value', () => {
    const next = toggle('beep')({
      beep: false
    })
    expect(next.beep).toBe(true)
  })

  test('setStore updates state.store', () => {
    const next = setStore({ beep: 'boop' })({
      store: {}
    })
    expect(next.store.beep).toBe('boop')
  })

  test('addRecent pushes filename to store.recents', () => {
    const next = addRecent('hello.jsx')({
      dirname: '/home',
      store: {
        recents: [
          '/home/beep.jsx'
        ]
      }
    })
    expect(next.store.recents).toEqual([
      '/home/hello.jsx',
      '/home/beep.jsx'
    ])
  })

  test('openFile sets state and updates recents', () => {
    const next = openFile('/home/hello.jsx')({
      store: {
        recents: []
      }
    })
    expect(next.dirname).toBe('/home')
    expect(next.filename).toBe('hello.jsx')
    expect(next.store.recents).toEqual([ '/home/hello.jsx' ])
  })

  test('openDoc sets state for application doc', () => {
    const next = openDoc('beep.jsx')({})
    expect(next).toEqual({
      dirname: '/appPath/docs',
      filename: 'beep.jsx',
      readonly: true
    })
  })

  test('appendComponent adds jsx', () => {
    const next = appendComponent('Beep')({
      scope: {
        Beep: () => false
      },
      code: '<h1>Hello</h1>'
    })
    expect(next.code).toBe('<h1>Hello</h1>\n<Beep />')
  })
})
