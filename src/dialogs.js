import fs from 'fs'
import { remote } from 'electron'

const { app, dialog } = remote
const homedir = app.getPath('home')

export const newFile = (props, cb) => {
  dialog.showSaveDialog({
    title: 'New File',
    properties: [
      'createDirectory'
    ],
    defaultPath: props.readonly ? homedir : props.dirname,
    filters: [
      { name: '*', extensions: [ 'jsx' ] }
    ],
    buttonLabel: 'Create File'
  }, file => {
    if (!file) return
    if (!fs.existsSync(file)) {
      fs.writeFileSync(file, '')
    }
    cb(null, file)
  })
}

export const openFile = (props, cb) => {
  dialog.showOpenDialog({
    filters: [
      { name: '*', extensions: [ 'jsx' ] }
    ],
    defaultPath: props.readonly ? homedir : props.dirname,
    properties: [
      'openFile',
      'createDirectory'
    ]
  }, ([ file ]) => {
    if (!file) return
    cb(null, file)
  })
}

export const openDirectory = (props, cb) => {
  dialog.showOpenDialog({
    defaultPath: props.readonly ? homedir : props.dirname,
    properties: [
      'openDirectory',
      'createDirectory'
    ]
  }, ([ dirname ]) => {
    if (!dirname) return
    cb(null, dirname)
  })
}

export default {
  newFile,
  openFile,
  openDirectory
}
