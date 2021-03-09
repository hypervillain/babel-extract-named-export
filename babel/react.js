const reactPreset = require('@babel/preset-react')

const defaultReactConfiguration = {
  presets: [reactPreset],
  plugins: []
}

module.exports = {
  config: defaultReactConfiguration,
}