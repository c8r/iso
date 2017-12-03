---
features:
  - heading: Prototype with JSX
  - heading: Zero configuration
  - heading: Use Lab components
  - heading: Sync with Lab
  - heading: Export to static HTML
  - heading: One-click publishing
---
<header>
  <Flex
      align="center"
      px={3}
      py={3}
    >
    <NavLink href='https://compositor.io'>
      <Logo />
      Compositor
    </NavLink>
    <Box mx="auto" />
    <NavLink href='https://iso.c8r.io/'>
      Download
    </NavLink>
  </Flex>
</header>
<Container>
  <Flex
    style={{
      minHeight: '90vh'
    }}
    flexDirection={[ 'column', 'row' ]}
    py={4} align="center">
    <Box
      px={3}
      py={4}
      width={[ 1, 384, 448 ]}
      style={{
        flex: 'none'
      }}
    >
      <Title mb={2}>
        Iso
        <Caps ml={2} color="muted">
          Beta
        </Caps>
      </Title>
      <Subhead>
        Build pages and prototypes with Lab UI components. No configuration or build setup required.
      </Subhead>
      <Flex
        wrap
        align="center"
        py={4}>
        <BigButton href='https://compositor.io/lab/' mr={3} my={2}>
          Get Lab
        </BigButton>
        <Box>
          <Text fontSize={0}>
            Available for MacOS
          </Text>
          <Text fontSize={0}>
            Free with Lab subscription
          </Text>
        </Box>
      </Flex>
    </Box>
    <Box
      px={3}
      py={4}
      ml={[ 0, -0 ]}
      mr={[ 0, -6 ]}
      width={[ 1 ]}
    >
      <Image src="docs/images/hero.png" />
    </Box>
  </Flex>
</Container>
<Container py={4}>
  <Flex wrap mx={-3}>
    {props.features.map(feat => (
      <Box width={[ 1, 1/2, 1/3 ]} p={3}>
        <Heading fontSize={3}>
          {feat.heading}
        </Heading>
      </Box>
    ))}
  </Flex>
</Container>
<Container py={4}>
  <Heading fontSize={3}>
    Already a Lab subcriber?
  </Heading>
  <Link href='https://iso.c8r.io/'>
    Download Iso Now
  </Link>
</Container>
<footer>
  <Box py={4} color='white' bg='black'>
    <Container>
      <Flex my={3}>
        <NavLink mr={3} href='https://compositor.io/'>
          Compositor
        </NavLink>
        <NavLink mr={3} href='https://compositor.io/lab/'>
          Lab
        </NavLink>
        <Box mx='auto' />
        <NavLink mr={3} href='https://twitter.com/getcompositor/'>
          <Image src='https://icon.now.sh/twitter/fff' />
        </NavLink>
        <NavLink href='https://github.com/c8r/'>
          <Image src='https://icon.now.sh/github/fff' />
        </NavLink>
      </Flex>
      <Box my={3}>
        <Text f={0}>© 2017 Compositor, Inc.</Text>
      </Box>
    </Container>
  </Box>
</footer>
