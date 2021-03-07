const { transform } = require('@babel/core')
const presetEnv = require('@babel/preset-env')
const plugin = require('./plugin')

async function extractNamedExports(code, {
  search,
  filename,
  useToJs = true,
  fallback = false,
  presets = [],
  plugins = [],
  transformProps = {},
} = {}) {
  try {
    transform(code, {
      filename,
      presets: [presetEnv, ...presets],
      plugins: [
        ...plugins,
        [plugin, { search, fallback, useToJs }]
      ],
      ...transformProps
    })
    return plugin.data
  } catch(e) {
    throw e
  }
}

module.exports = extractNamedExports
