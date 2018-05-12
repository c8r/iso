<Box px={4} py={6} color='white' bg='#07c'>
  <Heading
    is='h1'
    fontSize={[ 6, 6, 7 ]}>
    Hello Iso
  </Heading>
</Box>

<Box px={4} py={5}>
  <Heading mb={3} fontSize={6}>
    Getting Started
  </Heading>
  <Text mb={3}>
    Compositor Iso is an isolated development environment for building pages, prototypes, and demos with React components and pure JSX.
    Instead of needing to open a terminal, install dependencies, and configure
    an application build setup,
    Iso is completely self-contained,
    letting you prototype with React components quickly with minimal overhead.
  </Text>
</Box>

<Box px={4} py={5}>
  <Heading>JSX</Heading>
  <Text>
    JSX is an XML-like syntax to describe what UI should look like.
    If you're familiar with HTML, JSX is similar but with a few key differences:

  </Text>
  <ul>
    <li>All tags must be closed, since JSX is based on XML</li>
    <li>Instead of attributes, JSX uses <b>props</b></li>
    <li>
      Some HTML attributes are different, to avoid JavaScript reserved words, e.g. use <code>className</code> instead of <code>class</code> and <code>htmlFor</code> instead of <code>for</code>
  </li>
    <li>Although JSX looks static, it's actually JavaScript under the hood</li>
  </ul>
</Box>

<Box px={4} py={5}>
  <Heading>Embedded JavaScript Expressions</Heading>
  <Text>
    With JSX, any
    {' '}
    <Link href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions'>
      JavaScript expression
    </Link>
    {' '}
    can be included by using curly braces.
  </Text>
  <pre>{`<h1>
  Hello {props.name}
</h1>`}</pre>

  <Text>
    Expressions can also be used to define props on an element.
  </Text>

  <pre>{`<h1 id={props.title}>
  {props.title}
</h1>`}
  </pre>
</Box>

<Box px={4} py={5}>
  <Heading>Components</Heading>
  <Text>
    The really powerful part of JSX is the ability to use components.
    JSX distinguishes between HTML elements and React components based on the capitalization of the tag name.
  </Text>
  <ul>
    <li>
      Lowercase tags are HTML elements, e.g. <code>{'<h1 />'}</code>
    </li>
    <li>
      Capitalized tags are components, e.g. <code>{'<Heading />'}</code>
    </li>
  </ul>
</Box>

<Box px={4} py={5}>
  <Heading>Create a New File</Heading>
  <Text>
    To start a new JSX document, choose <code>File > New...</code> from the application menu.
  </Text>
</Box>

<Box px={4} py={4} color='white' bg='black'>
  <Text>Compositor Iso</Text>
</Box>
