
# Configuration

To use a custom component library or theme with Iso, create an `iso.config.js` file in your project directory.
This file should be compatible with with Node.js and browser environments and export `components` and `theme` objects.

In your project folder, ensure all npm dependencies are installed.

```
// example iso.config.js
const Rebass = require('rebass')

module.exports = {
  components: Rebass,
  theme: Rebass.theme
}
```

## Components

The `components` object should be a flat object of React components.
The key used in the object will be included in scope in Iso.

```js
// example iso.config.js
const { Box, Donut } = require('rebass')

module.exports = {
  components: {
    Box,
    Donut
  }
}
```

With the above configuration, you can use the `Box` and `Donut` components from [Rebass][rebass] in your JSX file.

```jsx
<Box p={3}>
  <Donut
    value={1/2}
    size={256}
    color='tomato'
  />
</Box>
```

## Theme

If you're using [styled-components][sc], you can include a theme by exporting a `theme` object from `iso.config.js`.

```js
// example iso.config.js
const theme = {
  colors: {
    text: '#222',
    blue: '#07c'
  }
}

module.exports = {
  theme
}
```

### Troubleshooting Configurations

- Ensure the module is Node.js compatible
- Ensure all dependencies are installed in your project folder
- Ensure the file does not use JSX or other Babel or webpack features

[rebass]: https://github.com/jxnblk/rebass
[sc]: https://github.com/styled-components/styled-components

