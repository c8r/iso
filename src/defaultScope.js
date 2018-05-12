import React from 'react'
import styled from 'styled-components'
import {
  space,
  color,
  fontSize,
  fontWeight,
  textAlign,
  lineHeight,
} from 'styled-system'
import tag from 'clean-tag'
import { Flex, Box } from 'grid-styled'

export const Text = styled(tag)([],
  space,
  color,
  fontSize,
  fontWeight,
  textAlign,
  lineHeight
)

Text.displayName = 'Text'
Text.defaultProps = {}

export const Heading = styled(Text)([])
Heading.displayName = 'Heading'
Heading.defaultProps = {
  is: 'h2',
  m: 0,
  fontSize: 5,
  fontWeight: 'bold',
  lineHeight: 1.25
}

export const Link = styled.a([],
  space,
  color
)

export default {
  Flex,
  Box,
  Text,
  Heading,
  Link
}
