const toJs = require('ast-to-literal')

function set(key, val) {
  plugin.data[key] = val
}

function reset() {
  plugin.data = {}
}

function plugin(_, { search = [] } = {}) {
  reset()
  const mode = search.length ? 'IN' : 'ALL'
  return {
    name: 'babel-plugin-extract-named-exports',
    visitor: {
      ExportNamedDeclaration: (path) => {
        const { declaration: { declarations } } = path.node
        declarations.forEach((declaration) => {
          const { name } = declaration.id
          if (mode === 'ALL' || search.includes(name)) {
            set(name, toJs(declaration.init));
          }
        })
      }
    }
  }
}

module.exports = plugin