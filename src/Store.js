import React from 'react'
import { addRecent } from './updaters'
import Store from 'electron-store'

export const store = new Store({
  name: 'iso',
  defaults: {
    recents: [],
    editorWidth: 448,
    styledComponents: true,
  }
})

class StoreEffect extends React.Component {
  componentDidUpdate (prev) {
    if (prev.store !== this.props.store) {
      store.set(this.props.store)
    }
    if (this.props.readonly) return
    if (this.props.filename && this.props.filename !== prev.filename) {
      this.props.update(addRecent(this.props.filename))
    }
  }

  render () {
    return false
  }
}

export default StoreEffect
