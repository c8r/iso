import React from 'react'
import log from 'electron-log'

const RedBox = props =>
  <div {...props}
    style={{
      fontFamily: '"Roboto Mono", monospace',
      fontSize: 12,
      padding: 8,
      color: 'white',
      backgroundColor: 'red'
    }}
  />

class Catch extends React.Component {
  state = {
    err: null
  }

  componentDidCatch (err, info) {
    this.setState({ err })
    log.error(err, info)
  }

  componentWillReceiveProps (next) {
    if (this.state.err) {
      this.setState({ err: null })
    }
  }

  render () {
    const { err } = this.state

    if (err) return <RedBox children={err.toString()} />

    return this.props.children
  }
}

export default Catch
