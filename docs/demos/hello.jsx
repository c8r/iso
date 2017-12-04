---
title: Compositor Iso Demo
---
<Hero>
  <Heading
    fontSize={7}>
    Hello
  </Heading>
  <Text fontSize={3} mb={4}>
    Welcome to Iso, a prototyping environment for Lab UI components.
  </Text>
  <Button>
    Click Me 
  </Button>
</Hero>
<Container>
  <Flex wrap mx={-3}>
    <Box px={3} mb={4} width={[ 1, 1/2 ]}>
      <Subhead>
        Lab Sync
      </Subhead>
      <Text>
        Iso syncs with Lab to show real-time updates to components and themes.
      </Text>
    </Box>
    <Box px={3} mb={4} width={[ 1, 1/2 ]}>
      <Subhead>
        Zero Setup
      </Subhead>
      <Text>
        Prototype and build pages without the need to open up terminal or spend any time setting up development servers.
      </Text>
    </Box>
    <Box px={3} mb={4} width={[ 1, 1/2 ]}>
      <Subhead>
        Export HTML
      </Subhead>
      <Text>
        Use Iso to quickly build prototypes or static HTML pages using components built with Lab.
      </Text>
    </Box>
    <Box px={3} mb={4} width={[ 1, 1/2 ]}>
      <Subhead>
        One-Click Publishing
      </Subhead>
      <Text>
        Quickly share ideas with your team using the built-in publishing service.
      </Text>
    </Box>
  </Flex>
</Container>