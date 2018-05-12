
# Components

Iso includes a small set of default UI components to get started quickly.
If you've used styled-system, Rebass, or Grid Styled, these components should look familiar.

To use your own component library with Iso, see the [configuration docs](configuration.md).

[sys]: https://github.com/jxnblk/styled-system
[rebass]: https://github.com/jxnblk/rebass
[grid-styled]: https://github.com/jxnblk/grid-styled

- [Common Props](#common-props)
- [Responsive Props](#responsive-props)
- [Box](#box)
- [Flex](#flex)
- [Text](#text)
- [Heading](#heading)
- [Link](#link)

## Common Props

All default Iso components include the following props:

- margin
  - `m`: margin
  - `mt`: margin-top
  - `mr`: margin-right
  - `mb`: margin-bottom
  - `ml`: margin-left
  - `mx`: margin-left and margin-right
  - `my`: margin-top and margin-bottom
- padding
  - `p`: padding
  - `pt`: padding-top
  - `pr`: padding-right
  - `pb`: padding-bottom
  - `pl`: padding-left
  - `px`: padding-left and padding-right
  - `py`: padding-top and padding-bottom
- `color`: text color
- `bg`: background-color

## Responsive Props

Many style props accept array values for responsive styles.

```jsx
<Box m={[ 1, 2, 4 ]} />
// margin 1 at the smallest breakpoint, then 2 and 4 at the next breakpoints
```

Read more about responsive props in the [Styled System docs](https://github.com/jxnblk/styled-system#responsive-styles)

## Box

The `Box` component is a general purpose box-model layout component that handles margin, padding, width, and color.

```jsx
<Box px={3} py={4} color='white' bg='blue'>
  Hello
</Box>
```

**Props**

- `width` sets percentage-based widths with fractional numbers or pixel-based widths with integer numbers
- `flex` CSS flex shorthand property
- `alignSelf` CSS align-self
- `order` CSS order

Read more about the `Box` component in the [Grid Styled][grid-styled] docs.

## Flex

The `Flex` component is an extension of the `Box` component with flexbox style props

```jsx
<Flex alignItems='center' flexWrap='wrap'>
  <Box width={1/2}>Half width Box</Box>
  <Box width={1/2}>Half width Box</Box>
</Flex>
```

**Props**

The `Flex` component includes all the `Box` props in addition to the following:

- `alignItems` CSS align-items
- `justifyContent` CSS justify-content
- `flexDirection` CSS flex-direction
- `flexWrap` CSS flex-wrap

Read more about the `Flex` component in the [Grid Styled][grid-styled] docs.

## Text

The `Text` component is a general purpose typographic component that handles font-size, weight, line-height, and more.

```jsx
<Text fontSize={4} fontWeight='bold'>
  Hello
</Text>
```

**Props**

- `fontSize` CSS font-size
- `fontWeight` CSS font-weight
- `textAlign` CSS text-align
- `lineHeight` CSS line-height

## Heading

The `Heading` component is an extension of the `Text` component meant for headings.

```jsx
<Heading>
  Hello
</Heading>
```

**Props**

The `Heading` component includes the same props as the `Text` component

## Link

The `Link` component is an interactive component for linking documents, i.e. the HTML `<a>` tag.

```jsx
<Link href='/hello' color='red'>
  Hello
</Link>
```

