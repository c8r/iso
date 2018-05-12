// App ThemeProvider
import React from 'react'
import { createColors } from './theme'

const createCSSCustomProperties = colors =>
  Object.keys(colors).reduce((a, key) => {
    a[`--${key}`] = colors[key]
    return a
  }, {})

const Root = ({ children, ...colors }) =>
  <div
    children={children}
    style={{
      color: colors.text,
      backgroundColor: colors.bg,
      ...createCSSCustomProperties(colors)
    }}
  />

export const ThemeProvider = class extends React.Component {
  static getDerivedStateFromProps (props, state) {
    if (props.color === state.bg) return null
    const colors = createColors(props.color)
    return colors
  }

  state = createColors(this.props.color)

  render () {
    const { children } = this.props

    return (
      <Root {...this.state}>
        {children}
      </Root>
    )
  }
}

export default ThemeProvider
