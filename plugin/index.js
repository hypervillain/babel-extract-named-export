const toJs = require('ast-to-literal')

function set(key, val) {
  plugin.data[key] = val
}

function reset() {
  plugin.data = {}
}

function plugin(_, { search = [], fallback = false, useToJs = true } = {}) {
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
            if (useToJs) {
              const jsValue = toJs(declaration.init)
              if (jsValue !== undefined || !fallback) {
                return set(name, jsValue)
              }
              return set(name, declaration.init)
            }
            return set(name, declaration.init)
          }
        })
      }
    }
  }
}

module.exports = plugin