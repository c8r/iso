
# Getting Started

Iso is an isolated prototyping environment and page builder for Lab UI components.
Preview edits to Lab components in real time using a simplified [JSX][jsx] code editor.
Build, design, and publish pages without needing to setup a development environment.

When opening Iso for the first time, you'll see the `getting-started.jsx`
example file.
This example file is a Compositor JSX file that includes front matter for defining props and JSX code for describing pages.
Each Iso file acts like a component and can be exported as static HTML.


## User Interface

<img src='https://c8r-x0.s3.amazonaws.com/code.jpg' />
The main area on the left of Iso's window is a live preview of the current file.
To the right is the editor pane, which shows the JSX source code by default.

<img src='https://c8r-x0.s3.amazonaws.com/props.jpg' />
Clicking on the props button in the upper right
shows the YAML-based props editor,
where page-level props can be defined.

<img src='https://c8r-x0.s3.amazonaws.com/folder.jpg' />
Clicking on the folder icon shows the current folder and allows you to open Iso-compatible files.

The Lab button opens the Compositor Lab app when the current folder includes a Lab project.

<img src='https://c8r-x0.s3.amazonaws.com/http.jpg' />
The HTTP button starts a local Preview server on port 8000 and opens the current page in the default browser 
The title bar includes the path and file name for the currently opened file. Clicking on any part of the path will navigate to that folder.


## JSX

Iso uses [JSX][jsx] syntax to define a documents component tree structure.
JSX is an XML syntax for JavaScript that is similar to HTML but with a few key differences.

- In JSX, capitalized tag names represent components. These can be component that are built in to Iso or components from a Lab project.
- XML does not allow self-closing tags.
- HTML attributes in JSX are camel cased.
- Some HTML attributes are renamed to avoid clashing with reserved words in JavaScript – notably: `className` and `htmlFor` instead of `class` and `for`.
- In addition to HTML attributes, components can accept *props* to pass arbitrary data to the component.
- JavaScript expressions can be embedded in JSX by wrapping them in curly braces.

[Learn more about JSX][jsx]


## Props

Page-level [props][props] can be defined in Iso by switching to the props editor.
The props editor uses [YAML][yaml] syntax, which is the same format used for front-matter in static site generators like [Jekyll][jekyll].


## Components

All components built with Lab include [styled-system][styled-system] props for setting margin, padding, font size, and color.

### Padding

Padding can be set on any Lab component by using one of the following props:

- `p` - sets padding in all directions
- `pt` - sets padding-top
- `pb` - sets padding-bottom
- `pl` - sets padding-left
- `pr` - sets padding-right
- `px` - sets padding on the x-axis (left and right)
- `py` - sets padding on the y-axis (top and bottom)

Padding and margin props accept numbers from `0` to `7` to map to values in a Lab theme's spacing scale. String values can be used to apply other arbitrary CSS values.

### Margin

Margin can be set on any Lab component by using one of the following props:

- `m` - sets margin in all directions
- `mt` - sets margin-top
- `mb` - sets margin-bottom
- `ml` - sets margin-left
- `mr` - sets margin-right
- `mx` - sets margin on the x-axis (left and right)
- `my` - sets margin on the y-axis (top and bottom)


### Iso Components

Iso includes several built-in components to help get started with layout and typography.

- Box
- Flex
- Grid
- Text
- Heading
- Link
- Image


### Lab components

In addition to the built-in primitives, Iso files can use components defined in a Lab project within the same folder.

If a Lab project exists in the folder, its components will be synced with the Iso app.
Changes made in the Lab app will automatically be applied to an open Iso file.

Lab components with the same name as an Iso primitive will override the defaults.
This is useful for custom Heading and Link styles.

### Previewing on External Devices

To preview this page from an external device, first navigate to System Preferences > Network to find your IP address. 

<img src='https://c8r-x0.s3.amazonaws.com/network.png' />

On an external device enter in the IP address followed by :8000 
```
http://169.254.163.132:8000
```
The external device must be on the same wifi network as your computer.


[jsx]: https://reactjs.org/docs/introducing-jsx.html
[yaml]: http://yaml.org
[jekyll]: https://jekyllrb.com
[props]: https://reactjs.org/docs/components-and-props.html
[styled-system]: https://github.com/jxnblk/styled-system


