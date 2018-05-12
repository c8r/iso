import React from 'react'

class ResizePane extends React.Component {
  state = {
    active: false,
    mouse: null,
    width: this.props.width
  }

  handleMouseDown = e => {
    const isEdge = this.isEdge(e)
    if (!isEdge) return

    e.stopPropagation()
    e.preventDefault()

    const mouse = {
      x: e.clientX,
      y: e.clientY
    }

    this.setState({
      active: true,
      mouse,
    })
    this.props.onResizeStart(e)

    document.addEventListener('mousemove', this.handleMouseMove)
    document.addEventListener('mouseup', this.handleMouseUp)
  }

  handleMouseUp = e => {
    document.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('mouseup', this.handleMouseUp)

    const { width } = this.state

    if (this.state.active) {
      e.stopPropagation()
      this.ignoreClick = true
      this.props.onResize(width)
    }
    this.setState({
      active: false,
      mouse: null
    })
  }

  handleClick = e => {
    if (this.ignoreClick) {
      e.stopPropagation()
      this.ignoreClick = false
    }
  }

  handleMouseMove = e => {
    if (!this.state.active) return
    const width = this.getWidth(e)

    this.setState({
      width,
      mouse: {
        x: e.clientX,
        y: e.clientY
      }
    })
  }

  isEdge = e => {
    const { edge } = this.props
    const rect = this.getRect(this.root)
    return (e.clientX < rect.left + edge && e.clientX > rect.left)
  }

  getWidth = e => {
    const { mouse, width } = this.state
    const { minWidth } = this.props

    const x = e.clientX - mouse.x
    const nextWidth = width - x
    return Math.max(nextWidth, minWidth)
  }

  getRect = (el) => {
    if (!el) return {}
    const { left, right, top, bottom } = el.getBoundingClientRect()
    return { left, right, top, bottom }
  }

  render () {
    const { children } = this.props
    const {
      width
    } = this.state

    const style = Object.assign({}, this.props.style, {
      width,
      cursor: 'ew-resize',
      userSelect: 'none'
    })

    return (
      <div
        ref={r => this.root = r}
        onClick={this.handleClick}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        style={style}
        children={children}
      />
    )
  }
}

const noop = () => {}

ResizePane.defaultProps = {
  edge: 8,
  minWidth: 64,
  onResize: noop,
  onResizeStart: noop,
}

export default ResizePane
