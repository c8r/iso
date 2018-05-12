import React from 'react'
import { get } from 'dot-prop'
import { Box, Flex } from 'grid-styled'

import withState from './withState'
import ThemeProvider from './ThemeProvider'
import Text from './Text'
import Menu from './Menu'
import Files from './Files'
import Store from './Store'

import TitleBar from './TitleBar'
import Frame from './Frame'
import Preview from './Preview'
import ResizePane from './ResizePane'
import Editor from './Editor'

import { setStore } from './updaters'

const View = props =>
  <Flex {...props}
    style={{
      height: 'calc(100vh - 40px)'
    }}
  />

const Main = props =>
  <Box {...props}
    style={{
      flex: '1 1 auto',
      minWidth: '256px',
      height: 'calc(100vh - 40px)',
    }}
  />

const Panel = props =>
  <Box {...props}
    style={{
      flex: '1 1 auto',
      height: 'calc(100vh - 40px)',
      overflow: 'auto'
    }}
  />

const Handle = props =>
  <div {...props}
    style={{
      position: 'relative',
      zIndex: 2,
      width: '16px',
      flex: 'none',
      height: '100%',
      marginRight: '-16px'
    }}
  />

const App = withState(props => {
  const {
    update,
    scope,
    dirname,
    filename,
    code,
    editorOpen,
    resizing,
    store = {},
  } = props
  const color = get(store, 'uiColor', '#111')

  return (
    <ThemeProvider color={color}>
      <Menu {...props} />
      <Files {...props} />
      <Store {...props} />
      <TitleBar {...props} />
      <View>
        <Main>
          {code && (
            <Frame {...props}
              overlay={resizing}>
              <Preview {...props} />
            </Frame>
          )}
        </Main>
        {editorOpen && (
          <ResizePane
            width={store.editorWidth}
            minWidth={256}
            edge={16}
            style={{
              display: 'flex',
              height: '(100vh - 40px)',
              flex: 'none',
            }}
            onResizeStart={e => update({ resizing: true })}
            onResize={width => {
              update(setStore({
                editorWidth: width
              }))
              update({ resizing: false })
            }}>
            <Handle />
            <Panel bg='gray9'>
              {filename && (
                <Editor
                  width={store.editorWidth + 'px'}
                  value={code || ''}
                  vim={store.vimMode}
                  onChange={code => update({ code })}
                />
              )}
            </Panel>
          </ResizePane>
        )}
      </View>
    </ThemeProvider>
  )
})

export default App
