---
title: Compositor Iso
description: Build pages and prototypes with Lab UI components. No configuration or build setup required.
features:
  - heading: Prototype with JSX
  - heading: Zero configuration
  - heading: Use Lab components
  - heading: Sync with Lab
  - heading: Export to static HTML
  - heading: One-click publishing
---
<meta name='twitter:card' content='summary_large' />
<meta name='twitter:site' content='@getcompositor' />
<meta name='twitter:title' content='Compositor Iso' />
<meta name='twitter:description' content='Build pages and prototypes with Lab UI components. No configuration or build setup required.' />
<meta name='twitter:image' content='https://compositor.io/iso/docs/images/hero.jpg' />
<header>
  <Flex
      align="center"
      wrap
      px={3}
      py={3}
    >
    <NavLink href='https://compositor.io'>
      <Logo />
      Compositor
    </NavLink>
    <Box mx="auto" />
    <NavLink mx={3} href='https://compositor.io/iso/docs/'>
      Docs
    </NavLink>
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
    mx={-3}
    py={4}
    align="center">
    <Box
      px={3}
      py={4}
      width={[ 1, 384, 448 ]}
      style={{
        flex: 'none'
      }}
    >
      <Title mb={4}>
        Iso
        <Caps ml={2} color="muted">
          Beta
        </Caps>
      </Title>
      <Subhead>
        {props.description}
      </Subhead>
      <Flex
        wrap
        align="center"
        py={[ 4, 5 ]}>
        <BigButton href='https://compositor.io/lab/' mr={3} my={2}>
          Get Lab
        </BigButton>
        <Box>
          <Text fontSize={0}>
            <b>Free</b> with Lab subscription
          </Text>
          <Text fontSize={0}>
            Available for MacOS
          </Text>
        </Box>
      </Flex>
    </Box>
    <Box
      px={3}
      py={2}
      mr={[ 0, -6 ]}
      width={[ 1 ]}
    >
      <Image src="docs/images/hero.jpg" />
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
<Container py={5}>
  <Heading fontSize={3} mb={3}>
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
<script
dangerouslySetInnerHTML={{
  __html: `(function(i, s, o, g, r, a, m) {
i["GoogleAnalyticsObject"] = r;
i[r] = i[r] || function() {
    (i[r].q = i[r].q || []).push(arguments)
}, i[r].l = 1 * new Date();
a = s.createElement(o), m = s.getElementsByTagName(o)[0];
a.async = 1;
a.src = g;
m.parentNode.insertBefore(a, m)
})(window, document, "script", "//www.google-analytics.com/analytics.js", "ga");
ga("create", "UA-78113757-1", "auto");
ga("send", "pageview");
`
}}
/>
