import React from 'react'
import chokidar from 'chokidar'

class Watcher extends React.Component {
  isRead = false
  watcher = null

  state = {
    focused: false
  }

  handleBlur = e => {
    const { dirname } = this.props
    this.setState({ focused: false })
    this.watcher = chokidar.watch(dirname, {
      depth: 1,
      ignoreInitial: true,
      ignored: /node_modules/
    })
    this.watcher.on('change', this.handleFileChange)
  }

  handleFocus = e => {
    this.setState({ focused: true })
    if (this.watcher) {
      this.watcher.close()
    }
  }

  handleFileChange = async next => {
    if (this.state.focused) return
    this.props.onChange(next)
  }

  componentDidMount () {
    window.addEventListener('blur', this.handleBlur)
    window.addEventListener('focus', this.handleFocus)
  }

  componentWillUnmount () {
    if (this.watcher) {
      this.watcher.close()
    }
  }

  render () {
    return false
  }
}

export default Watcher
