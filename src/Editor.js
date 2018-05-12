import React from 'react'
import PropTypes from 'prop-types'
import brace from 'brace'
import Ace from 'react-ace'
import styled from 'styled-components'

import 'brace/mode/jsx'
import 'brace/mode/javascript'
import 'brace/mode/yaml'
import 'brace/keybinding/vim'

const theme = 'zero'

const Root = styled('div')([], props => ({
  position: 'relative',
  zIndex: 0,
  '& .ace_editor .ace_gutter': {
    color: 'inherit',
    backgroundColor: 'rgba(0,0,0,.125)'
  }
}))

const noop = () => {}

class Editor extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    mode: PropTypes.string,
    vim: PropTypes.bool,
    innerRef: PropTypes.func.isRequired,
  }

  static defaultProps = {
    value: '',
    width: '100%',
    height: 'calc(100vh - 40px)',
    onFocus: noop,
    innerRef: noop,
    lang: 'jsx',
  }

  render () {
    const { lang, vim, innerRef } = this.props

    return (
      <Root>
        <Ace
          {...this.props}
          onLoad={innerRef}
          showPrintMargin={false}
          showGutter={true}
          mode={lang}
          theme={theme}
          keyboardHandler={vim ? 'vim' : null}
          highlightActiveLine={false}
          editorProps={{
            useWorker: false,
            $blockScrolling: Infinity,
          }}
          setOptions={{
            tabSize: 2,
            wrap: true
          }}
          style={{
            fontFamily: '"Roboto Mono", monospace',
            fontSize: 13,
            width: '100%',
            color: 'inherit',
            backgroundColor: 'transparent'
          }}
        />
      </Root>
    )
  }
}

export default Editor

// theme
ace.define('ace/theme/zero',
  ['require','exports','module','ace/lib/dom'],
  function(acequire, exports, module) {

  exports.isDark = true // false
  exports.cssClass = 'ace-zero'

  exports.cssText = `.ace-zero {
    color: inherit;
    background-color: transparent;
  }
  .ace-zero .ace_gutter {
    opacity: 0.5;
    background-color: rgba(255, 255, 255, .625);
  }

  .ace-zero .ace_gutter-active-line {
    background-color: rgba(0, 0, 0, .125);
  }

  .ace-zero .ace_selection {
    background-color: rgba(0, 255, 255, .25);
  }
  .ace-zero .ace_cursor {
    border-color: #f0f;
    background-color: transparent;
  }
  .normal-mode .ace_cursor {
    background-color: #f0f !important;
  }
  `

  var dom = acequire('../lib/dom')
  dom.importCssString(exports.cssText, exports.cssClass)
})
