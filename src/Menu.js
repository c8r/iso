import path from 'path'
import { ipcRenderer } from 'electron'
import { remote } from 'electron'
import createMenu from 'functional-electron-menu'
import log from 'electron-log'
import open from 'opn'
import { get } from 'dot-prop'

import dialogs from './dialogs'
import {
  setStore,
  toggle,
  openFile,
  openDoc,
  appendComponent,
  toggleImport
} from './updaters'
import notifications from './notifications'

const { app } = remote

export const config = props => {
  const {
    update,
    dirname,
    filename,
    scope = {},
    pkg = {},
    data = {},
    store: {
      recents = [],
      uiColor,
      vimMode,
      styledComponents,
    } = {},
  } = props

  return [
    {
      label: app.getName(),
      submenu: [
        { role: 'about' },
        {
          label: 'Check for Updates...',
          click: e => {
            // todo: update for update-electron-app
            ipcRenderer.send('check-for-update')
            notifications.push('Checking for updates...')
            ipcRenderer.once('update-not-available', () => {
              notifications.push('Already up-to-date')
            })
            ipcRenderer.once('update-available', e => {
              notifications.push('Downloading update...')
            })
            ipcRenderer.once('update-downloaded', e => {
              notifications.push('Update available. Click to restart and install', {
                onClick: e => {
                  ipcRenderer.send('quit-and-install-update')
                }
              })
            })
          }
        },
        { type: 'separator' },
        { role: 'services', submenu: [] },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    },
    {
      label: 'File',
      submenu: [
        {
          label: 'New...',
          accelerator: 'Cmd+N',
          click: e => dialogs.newFile(props, (err, file) => {
            update(openFile(file))
          })
        },
        {
          label: 'Open...',
          accelerator: 'Cmd+O',
          click: e => dialogs.openFile(props, (err, file) => {
            update(openFile(file))
          })
        },
        {
          label: 'Open Recent',
          submenu: [
            ...recents.map(file => ({
              label: path.basename(file),
              click: e => {
                update(openFile(file))
              }
            })),
            { type: 'separator' },
            {
              label: 'Clear List',
              click: e => {
                update(setStore({ recents: [] }))
              }
            }
          ]
        },
        { type: 'separator' },
        {
          label: 'Open in Editor',
          enabled: !!filename,
          click: e => {
            const filepath = 'file://' + path.join(dirname, filename)
            open(filepath)
          }
        },
        {
          label: 'Export HTML',
          click: e => {
            dialogs.openDirectory(props, (err, dirname) => {
              if (err) {
                log.error(err)
              }
              if (!dirname) return
              ipcRenderer.send('export-html', {
                ...props,
                outDir: dirname
              })
              notifications.push('Exporting to HTML')
              ipcRenderer.once('html-exported', () => {
                notifications.push('File saved to: ' + dirname)
              })
              ipcRenderer.once('export-error', () => {
                notifications.push('Error exporting file')
              })
            })
          }
        },
        { type: 'separator' },
        { role: 'close' }
      ]
    },
    { role: 'editMenu' },
    {
      label: 'View',
      submenu: [
        {
          visible: false,
          label: 'View Folder',
          accelerator: 'Cmd+E',
          enabled: !!filename,
          click: e => update({ filename: null })
        },
        {
          label: 'Hide Panel',
          accelerator: 'Cmd+3',
          click: e => update(toggle('editorOpen'))
        },
        { type: 'separator' },
        {
          label: 'Dark Mode',
          type: 'checkbox',
          checked: uiColor === '#111',
          click: e => update(setStore({
            uiColor: '#111'
          }))
        },
        {
          label: 'Light Mode',
          type: 'checkbox',
          checked: uiColor === '#fff',
          click: e => update(setStore({
            uiColor: '#fff'
          }))
        },
        { type: 'separator' },
        {
          label: 'VIM Mode',
          type: 'checkbox',
          checked: vimMode,
          click: e => update(setStore({
            vimMode: !vimMode
          }))
        },
        {
          label: 'Enable Styled Components',
          type: 'checkbox',
          checked: styledComponents,
          click: e => update(setStore({
            styledComponents: !styledComponents
          }))
        },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ]
    },
    { role: 'windowMenu' },
    {
      role: 'help',
      submenu: [
        {
          label: 'Getting Started',
          click: e => {
            update(openDoc('hello.jsx'))
          }
        },
        {
          label: `${app.getName()} Help`,
          click: e => open('https://github.com/c8r/iso/tree/master/docs')
        },
        { type: 'separator' },
        { role: 'toggledevtools' },
        {
          role: 'reload',
          accelerator: 'Cmd+Shift+R'
        },
      ]
    }
  ]
}

const menu = createMenu(config)

export default props => {
  menu(props)
  return false
}
