import path from 'path'
import { remote } from 'electron'
import dot from 'dot-prop'
import camelCase from 'lodash.camelcase'

const { app } = remote

export const toggle = key => state => ({ [key]: !state[key] })

export const setStore = obj => state => ({
  store: Object.assign({}, state.store, obj)
})

export const addRecent = recent => state => {
  const filename = path.join(state.dirname, recent)
  return setStore({
    recents: [
      filename,
      ...state.store.recents.filter(f => f !== filename)
    ]
    .filter(file => !!file)
    .slice(0, 16)
  })(state)
}

export const directoryUp = state => ({
  dirname: path.dirname(state.dirname),
  filename: null,
  code: null
})

export const openFile = file => state => {
  const dirname = path.dirname(file)
  const filename = path.basename(file)
  return {
    dirname,
    filename,
    ...addRecent(filename)({ ...state, dirname }),
  }
}

export const openDoc = filename => state => {
  const dir = app.getAppPath()
  const dirname = path.join(dir, './docs')
  return {
    readonly: true,
    dirname,
    filename
  }
}

export const appendComponent = name => state => {
  const Comp = state.scope[name]
  if (!Comp) return null
  const [ example ] = dot.get(Comp, 'examples', [])
  const jsx = example || `<${name} />`
  const code = [ state.code, jsx ].join('\n')
  return { code }
}

export default {
  toggle,
  setStore,
  addRecent,
  directoryUp,
  openFile,
  openDoc,
  appendComponent,
}
