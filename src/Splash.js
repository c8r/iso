import React from 'react'
import { Box, Flex } from 'grid-styled'

const CSS = props =>
  <style
    dangerouslySetInnerHTML={{
      __html: `
        * { box-sizing: border-box; }
        body {
          font-family: system-ui, sans-serif;
          margin: 0;
          color: white;
          background-color: transparent;
        }
      `
    }}
  />

const Compositor = props =>
  <div {...props}
    children='Compositor'
    style={{
      fontSize: 12,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: '0.2em'
    }}
  />

const Logo = props =>
  <div {...props}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      fontSize: 32,
      textTransform: 'uppercase',
      letterSpacing: '0.5em',
      width: 192,
      height: 96,
      // mixBlendMode: 'screen',
      color: 'black',
      backgroundColor: 'white'
    }}
  />

const Splash = ({
  pkg = {}
}) => (
  <React.Fragment>
    <CSS />
    <Flex
      style={{ height: '100vh' }}
      alignItems='center'
      p={4}>
      <Box>
        <Compositor />
        <Box width={256} my={3}>
          <Logo>Iso</Logo>
        </Box>
        <Box fontSize={0} mb={2}>
          v{pkg.version}
        </Box>
        <Box fontSize={0}>
          © 2018 Compositor, Inc. All rights reserved
        </Box>
      </Box>
    </Flex>
  </React.Fragment>
)

export default Splash
