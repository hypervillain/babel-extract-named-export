const reactPreset = require('@babel/preset-react')
const vuePreset = require('@vue/babel-preset-app')

const defaultReactConfiguration = {
  presets: [reactPreset],
  plugins: []
}

const defaultVueConfiguration = {
  presets: [vuePreset],
  plugins: []
}

module.exports = {
  react: defaultReactConfiguration,
  vue: defaultVueConfiguration
}