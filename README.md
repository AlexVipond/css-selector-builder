# CSS Selector Builder

This project is a TypeScript library for building CSS selectors programmatically, and also a user interface around that library.


## Motivation

- Create a nice interface that people can use to build CSS selectors and explore different types of CSS selectors
- Practice type definitions, test-driven development, functional programming, pipelines, and recursive components in Vue 3
- Have fun with my favorite tools
  - TypeScript
  - Vue 3 Composition API
  - Tailwind
  - Vite, both for building the website and bundling the library
  - uvu (test runner)
- Try out [Headless UI](https://headlessui.dev/)


## Usage

### Interface

To use the CSS selector builder interface, go to [the website](https://css-selector-builder.netlify.app).

The relevant source code for the user interface is in [in the `src/interface` directory](https://github.com/AlexVipond/css-selector-builder/tree/main/src/interface).

Components follow a naming convention:
| Name | Description |
| --- | --- |
| `Brand...` | Custom-designed implementations of Headless UI components. |
| `Input...` | Each component captures a particular type of data. They rely on `Brand...` form controls. |
| `Form...` | Custom layouts for combinations of `Input...` components. `Form...` components are controlled, i.e. they receive data from their parent, and emit changes. |


## Library

To run tests:

```shell
git clone https://github.com/AlexVipond/css-selector-builder && cd css-selector-builder && npm install && npm run test
```

To use the library:

```shell
npm i @alexvipond/css-selector-pipes
```

From the library, you can import functions for building CSS selectors:

```ts
import { tag, className, not } from '@alexvipond/css-selector-pipes'

tag('h1')()          // 'h1'
className('poop')()  // .poop
not(tag('h1')())()   // ':not(h1)'
```

Each function is a **higher order function**, returning a function that accepts a CSS selector as it's only parameter, and returns the transformed selector.

```js
import { tag, className } from '@alexvipond/css-selector-pipes'

const tagTransform = tag('h1')
const classNameTransform = className('poop')

tagTransform(classNameTransform()) // h1.poop
```

You can also import a `pipe` utility that makes it easier to compose multiple functions into a selector pipeline.

```js
import { pipe, tag, className, attribute, focus } from '@alexvipond/css-selector-pipes'

pipe(
  tag('h1'),
  className('poop'),
  attribute('name', '$=', 'lol'),
  focus()
)() // h1.poop["name"$="lol"]:focus
```

All functions are fully typed, and you can check out these test files for further documentation and a list of available functions:

- [`append`](https://github.com/AlexVipond/css-selector-builder/blob/main/tests/node/append.test.ts)
- [`prepend`](https://github.com/AlexVipond/css-selector-builder/blob/main/tests/node/prepend.test.ts)
- [`pseudoFn`](https://github.com/AlexVipond/css-selector-builder/blob/main/tests/node/pseudoFn.test.ts)
- [`pseudoState`](https://github.com/AlexVipond/css-selector-builder/blob/main/tests/node/pseudoState.test.ts)
- [`pseudoElement`](https://github.com/AlexVipond/css-selector-builder/blob/main/tests/node/pseudoElement.test.ts)
- [`pseudoElementFn`](https://github.com/AlexVipond/css-selector-builder/blob/main/tests/node/pseudoElementFn.test.ts)
- [`relate`](https://github.com/AlexVipond/css-selector-builder/blob/main/tests/node/relate.test.ts)

The relevant source code is in [the `src/pipes` directory](https://github.com/AlexVipond/css-selector-builder/tree/main/src/pipes).
