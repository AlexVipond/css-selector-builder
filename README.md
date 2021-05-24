# CSS Selector Builder

This project is a TypeScript library for building CSS selectors programmatically, and also a user interface around that library.


## Motivation

- Create a nice interface that people can use to build CSS selectors and explore different types of CSS selectors
- Practice type definitions, test-driven development, functional programming, pipelines, dark mode design, controlled components, and recursive components in Vue 3
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

As you build your selector, the URL updates with any new conditions you've created. Click the share button to create a tweet intent with a custom short link for your selector.

To play with the selector builder's recursive abilities:
1. Add a new condition
2. Open the dropdown, and type `matches`
3. Pick one of the options that starts with "matches" to render a nested selector builder. Fun stuff!

The relevant source code for the user interface is in [in the `src/interface` directory](https://github.com/AlexVipond/css-selector-builder/tree/main/src/interface).

?conditions=%5B%5B%7B%22id%22%3A%22d7j4UMsM%22%2C%22pipe%22%3A%22has+a+class%2C+which+I%27ll+specify%22%2C%22args%22%3A%5B%22this%22%5D%7D%2C%7B%22id%22%3A%226xIfbS_i%22%2C%22pipe%22%3A%22matches+any+of+one+or+more+selectors%2C+which+I%27ll+specify%2C+and+retains+the+specificity+of+the+most+specific+matching+selector%22%2C%22args%22%3A%5B%5B%7B%22id%22%3A%22HmAfTmVh%22%2C%22pipe%22%3A%22has+an+attribute+whose+value+meets+certain+conditions%22%2C%22args%22%3A%5B%22super%22%2C%22%5E%3D%22%2C%22cool%22%2Cnull%5D%7D%5D%2C%5B%7B%22id%22%3A%22pGcH5x9k%22%2C%22pipe%22%3A%22has+an+ID%2C+which+I%27ll+specify%22%2C%22args%22%3A%5B%22and%22%5D%7D%5D%5D%7D%5D%2C%5B%7B%22id%22%3A%22z_vlIhxT%22%2C%22pipe%22%3A%22is+user-editable%22%2C%22args%22%3A%5B%5D%7D%2C%7B%22id%22%3A%226CuaUTWJ%22%2C%22pipe%22%3A%22is+the+adjacent+sibling+of+an+element%2C+which+I%27ll+specify%22%2C%22args%22%3A%5B%5B%7B%22id%22%3A%229mvLCYee%22%2C%22pipe%22%3A%22has+valid+contents%22%2C%22args%22%3A%5B%5D%7D%5D%5D%7D%5D%5D


### Library

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

Each function is a **higher order function**, returning a function that accepts a CSS selector (String) as its only parameter, and returns the transformed selector.

```js
import { tag, className } from '@alexvipond/css-selector-pipes'

const tagFunction = tag('h1')
const classNameFunction = className('poop')

tagFunction(classNameFunction()) // h1.poop
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

Or, if your dev environment supports it, you can use the upcoming pipeline operator:

```js
import { tag, className, attribute, focus } from '@alexvipond/css-selector-pipes'

|> tag('h1'),
|> className('poop'),
|> attribute('name', '$=', 'lol'),
|> focus()

// h1.poop["name"$="lol"]:focus
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


### Development

Set up the project locally:

```shell
git clone https://github.com/AlexVipond/css-selector-builder && cd css-selector-builder && npm install
```

Run tests:

```shell
npm run test
```

Run tests for a specific file:

```shell
npm run test:only [filename, excluding the .test.ts extension]

npm tun test:only toSelector
npm tun test:only append
```

Run the interface in development mode on `localhost:3000`:

```shell
npm run dev
```

Build the interface for production:

```shell
npm run build
```

Build the library for production:

```shell
npm run build:lib
```
