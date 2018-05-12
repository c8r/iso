import React from 'react'
import styled, { ThemeProvider, StyleSheetManager } from 'styled-components'
import { color } from 'styled-system'
import { get } from 'dot-prop'

const Font = styled('div')([], props => ({
  fontFamily: props.font,
  lineHeight: props.lineHeight,
}), color)

class SCProvider extends React.Component {
  static defaultProps = {
    theme: {},
    document: document
  }

  render () {
    const { theme, children } = this.props
    return (
      <StyleSheetManager target={this.props.document.head}>
        <ThemeProvider theme={theme}>
          <Font
            font={get(theme, 'fonts.0', 'system-ui, sans-serif')}
            lineHeight={get(theme, 'lineHeight', 1.5)}
            color={get(theme, 'colors.text', '#000')}>
            {children}
          </Font>
        </ThemeProvider>
      </StyleSheetManager>
    )
  }
}

export default SCProvider
