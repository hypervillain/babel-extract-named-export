# babel-extract-named-export

Extract named exports from ES6 files using Babel.

----

code example:

```javascript
const fs = require('fs')
const extract = require('babel-extract-named-export')
const sample = fs.readFileSync('/path/to/file.js')

main()
async function main() {
  const res = await extract(sample)
  console.log(res) // { [...]: { ... } }
}
```

Optionally, pass a `search` array option to select keys you want to extract:

````javascript
  const { meta } = await extract(sample, { search: ['meta'] })
````

By default, the Babel parser is configured to use `@babel/preset-env`. Depending on your needs, this might not be enough. Most common needs include parsing jsx and Vue files. Fortunately, the package ships with default configurations for both React and Vue:

````javascript
  const {
    vue,
    react: defaultReactConfiguration,
  } = require('babel-extract-named-export/babel')

  const { meta } = await extract(sample, defaultReactConfiguration)
````

This is equivalent to this:

````javascript
  const reactPreset = require('@babel/preset-react')

  const { meta } = await extract(sample, { presets: [reactPreset], plugin: [] })
````


This is usually enough, but if you ever need to override more properties or not include `@babel/preset-env` at all, you can pass a `transformProps` object like this:

````javascript
  // see https://babeljs.io/docs/en/babel-core
  const { meta } = await extract(sample, { transformProps: { /* ... */ } })
````
⚠️ Note that if you use a `plugins` key in `transformProps`, you would also prevent the plugin to actually do its thing!


Under the hood, the plugin use `ast-to-literal` to transform extracted keys to Javascript values. Some complex fields, like functions are not supported and will return `undefined`. If you want the plugin to fallback to the Babel AST node, pass `fallback` to the plugin:

````javascript
  const { myFunc } = await extract(sample, { fallback: true })
  // returns { type: "FunctionExpression", ... }
````

If you never want the AST nodes to be transformed to JS value, you can disable the use of `ast-to-literal`:
````javascript
  const { myFunc } = await extract(sample, { useToJs: false })
  // returns { type: "FunctionExpression", ... }
````


#### When would you use this?

In my case, I wanted to build a small API out of some metadata stored
along with MDX files. Common cases include: create documentation at build time (think `prop-types`) or run a function server-side (think `getStaticProps`).

It's also at the core of [`pris-types`](https://github.com/hypervillain/pris-types)!