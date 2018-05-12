import React from 'react'
import { Flex, Box } from 'grid-styled'

const Root = props =>
  <Flex
    {...props}
    style={{
      fontSize: '12px',
      height: '40px',
      WebkitUserSelect: 'none',
      WebkitAppRegion: 'drag'
    }}
  />

const ErrBadge = props =>
  <div
    {...props}
    style={{
      fontWeight: 'bold',
      marginLeft: 'auto',
      paddingLeft: 4,
      paddingRight: 4,
      backgroundColor: 'red',
      borderRadius: 2
    }}
  />

const TitleBar = props => (
  <Root px={2} align='center'>
    <Box width={128} />
    <Box mx='auto' />
    <Box title={props.dirname}>
      {props.filename}
    </Box>
    <Box mx='auto' />
    <Flex width={128}>
      {props.invalid && (
        <ErrBadge>
          Invalid JSX
        </ErrBadge>
      )}
    </Flex>
  </Root>
)

export default TitleBar
