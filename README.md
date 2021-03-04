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

If you need to override some properties of Babel `transform` function,
you can pass a `transformProps` object like this:

````javascript
  const { meta } = await extract(sample, { transformProps: { plugins: [/* ... */] } })
````

See `@babel/standalone` documentation here: https://babeljs.io/docs/en/standalone

#### When would you use this?

In my case, I wanted to build a small API out of some metadata stored
along with MDX files. Some common cases include: stripping a named export
at build time (think `prop-types`) or run a function server-side (think `getStaticProps`).