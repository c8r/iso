import React from 'react'
import { render, hydrate } from 'react-dom'
import styled, { ThemeProvider } from 'styled-components'
import dot from 'dot-prop'

const { theme } = require(CONFIG)
const Component = require(FILENAME).default

const Font = styled.div([], props => ({
  fontFamily: dot.get(props.theme, 'fonts.0')
    || dot.get(props.theme, 'font', 'system-ui, sans-serif'),
  lineHeight: dot.get(props.theme, 'lineHeight', 1.5),
  color: dot.get(props.theme, 'colors.text', '#000')
}))

class App extends React.Component {
  render () {
    return (
      <ThemeProvider theme={theme}>
        <Font>
          <Component />
        </Font>
      </ThemeProvider>
    )
  }
}

export default App

if (typeof document !== 'undefined') {
  render(<App />, root)
}

