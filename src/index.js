import url from 'url'
import querystring from 'querystring'
import path from 'path'
import React from 'react'
import { render } from 'react-dom'

import { store } from './Store'
import App from './App'

const [ lastfile ] = store.store.recents
const filename = lastfile && path.basename(lastfile)
const dirname = lastfile ? path.dirname(lastfile) : store.store.dirname
const props = Object.assign({}, {
  dirname,
  filename,
  store: store.store
})

render(React.createElement(App, props), app)
