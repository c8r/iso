
# Migration Guide

Follow the instructions below to migrate projects created in previous versions of Iso to the v0.1 format.

## 1. Install Lab CLI

```sh
npm install -g @compositor/lab
```

## 2. Export Lab components to React

In your project folder, export your Lab components to React with the following:

```sh
lab --pkg --out-dir components
```

## 3. Ensure local dependencies are installed

If you *do not* have a `package.json` file in your project folder, create one by running:

```sh
npm init -y
```

Install the following dependencies:

```sh
npm install react styled-components styled-system
```

## 4. Create a configuration file

Create an `iso.config.js` configuration file in the root of your project,
and import your components.

```jsx
// iso.config.js
const components = require('./components')
const theme = require('./theme.json')

module.exports = {
  components,
  theme
}
```

