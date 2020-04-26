# extract-mdx-export

Extract named exports from MDX files using Babel.

----

code example:

```javascript
const fs = require('fs')
const extract = require('extract-mdx-export')
const sample = fs.readFileSync('/path/to/file.mdx')

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

#### When would you use this?

Storing stuctured data along with MDX files, and accessing this data at runtime, is a fairly common case. Think of configuration objects you would pass to `react-helmet` for example.

Now imagine that you want to create a small API / display info out of a bunch of MDX files. You would have to actually import each of these files in order to acces their metadata. No thanks 🙅‍♀️: use this package instead!

See a (WIP) example here: https://github.com/trycereals/next, where a Netlify plugin uses `extract-mdx-export` to create a JSON index file. It then can be directly accessed by a Netlify function ✌️