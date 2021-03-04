const { transform } = require('@babel/standalone')

const jsx = require('@babel/plugin-transform-react-jsx')
const presetEnv = require('@babel/preset-env')
const plugin = require('./plugin')

async function extractNamedExports(code, { search, fallback, transformProps } = { search: [], fallback: false }) {
  try {
    transform(code, {
      presets: [presetEnv],
      plugins: [jsx, [plugin, { search, fallback }]],
      ...transformProps
    })
    return plugin.data
  } catch(e) {
    throw e
  }
}

module.exports = extractNamedExports
