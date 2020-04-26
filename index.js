const { transform } = require('@babel/core')
const mdx = require('@mdx-js/mdx')

const jsx = require('@babel/plugin-transform-react-jsx')
const presetEnv = require('@babel/preset-env')
const plugin = require('./plugin')

async function extractNamedExports(content, { search } = { search: [] }) {
  try {
    const code = await mdx(content)
    transform(code, {
      presets: [presetEnv],
      plugins: [jsx, [plugin, { search }]],
    })
    return plugin.data
  } catch(e) {
    throw e
  }
}

module.exports = extractNamedExports
