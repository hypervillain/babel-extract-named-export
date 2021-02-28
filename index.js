const { transform } = require('@babel/core')

const jsx = require('@babel/plugin-transform-react-jsx')
const presetEnv = require('@babel/preset-env')
const plugin = require('./plugin')

async function extractNamedExports(code, { search, transformProps } = { search: [] }) {
  try {
    transform(code, {
      presets: [presetEnv],
      plugins: [jsx, [plugin, { search }]],
      ...transformProps
    })
    return plugin.data
  } catch(e) {
    throw e
  }
}

module.exports = extractNamedExports
