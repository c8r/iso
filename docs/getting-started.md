
# Getting Started

Compositor Iso is an isolated development environment for building pages, prototypes, and demos with React components and pure JSX.
Instead of needing to open a terminal, install dependencies, and configure
an application build setup,
Iso is completely self-contained,
letting you prototype with React components quickly with minimal overhead.

## JSX

JSX is an XML-like syntax to describe what UI should look like.
If you're familiar with HTML, JSX is similar but with a few key differences:

- All tags must be closed, since JSX is based on XML
- Instead of attributes, JSX uses *props*
- Some HTML attributes are different, to avoid JavaScript reserved words, e.g. use `className` instead of `class`, and `htmlFor` instead of `for`.
- Although JSX looks static, it's actually JavaScript under the hood

```jsx
// bad
<input>

// good
<input />
```

```jsx
// bad
<div class='blue' />

// good
<div className='blue' />
```

## Embedded JavaScript Expressions

With JSX, any [JavaScript expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions) can be included by using curly braces.

```jsx
<h1>
  Hello {props.name}
</h1>
```

Expressions can also be used to define props on an element.

```jsx
<h1 id={props.title}>
  {props.title}
</h1>
```

### More About JSX

- [React: Introducing JSX](https://reactjs.org/docs/introducing-jsx.html)
- [React: JSX In Depth](https://reactjs.org/docs/jsx-in-depth.html)
- [JSX Specification](https://facebook.github.io/jsx/)


## Components

The really powerful part of JSX is the ability to use components.
JSX distinguishes between HTML elements and React components based on the capitalization of the tag name.

- Lowercase tags are HTML elements, e.g. `<h1 />`
- Capitalized tags are components, e.g. `<Heading />`

Iso comes with a small set of default components to get started with.

- `<Box />` general-purpose box-model layout component
- `<Flex />` flexbox layout component
- `<Text />` general-purpose typographic component
- `<Heading />` typographic component for headings
- `<Link />` general-purpose link (`<a />`)

Each of these components has its own props API for controlling styling,
based on [styled-system](https://github.com/jxnblk/styled-system).

Read more about Iso [components](components.md).


## Configuration

To use a custom component library or theme with Iso, create an `iso.config.js` file in your project directory. This file should be compatible with with Node.js and browser environments and export `components` and `theme` objects.

In your project folder, ensure all npm dependencies are installed.

```
// example iso.config.js
const Rebass = require('rebass')

module.exports = {
  components: Rebass,
  theme: Rebass.theme
}
```

### Troubleshooting Configurations

- Ensure the module is Node.js compatible
- Ensure all dependencies are installed in your project folder
- Ensure the file does not use JSX or other Babel or webpack features

React more about [configuration](configuration.md)

