const fs = require('fs')
const path = require('path')
const equal = require('deep-equal')

const extract = require('..')

const { meta, meta2 } = require('./sample')
const sample = fs.readFileSync(path.join(__dirname, 'sample', 'file.js'), 'utf8')

test('extracts all named exports', async () => {
  const result = await extract(sample)
  expect(equal({ meta, meta2 }, result)).toEqual(true)
})

test('extracts specific named exports', async () => {
  const result = await extract(sample, { search: ['meta2'] })
  expect(equal({ meta2 }, result)).toEqual(true)
})

test('empty _is_ empty', async () => {
  const result = await extract('')
  expect(equal({}, result)).toEqual(true)
})

test('handles custom plugins', async () => {
  const result = await extract('export const myFunc = {}', { useToJs: false })
  expect(result.myFunc.type).toBe('ObjectExpression')
})

test('handles !useToJs', async () => {
  const result = await extract('export const myFunc = {}', { useToJs: false })
  expect(result.myFunc.type).toBe('ObjectExpression')
})

test('handles fallback', async () => {
  const result = await extract('export const myFunc = () => {}', { fallback: true })
  expect(result.myFunc.type).toBe('FunctionExpression')
})
