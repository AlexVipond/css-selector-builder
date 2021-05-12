import { suite as createSuite } from 'uvu'
import * as assert from 'uvu/assert'
import * as pipes from '../../src/pipes'

const suite = createSuite('relate pipes (node)')

suite(`relate`, () => {
  // Relates to selected
  assert.is(
    pipes.relate(' ', '.haha')('.business'),
    '.haha .business'
  )

  // Selected defaults to universal
  assert.is(
    pipes.relate(' ', '.haha')(),
    '.haha *'
  )
})

// Everything else is an API for relate

suite(`descendant`, () => {
  assert.is(
    pipes.descendant('.haha')(),
    '.haha *'
  )
})

suite(`directChild`, () => {
  assert.is(
    pipes.directChild('.haha')(),
    '.haha > *'
  )
})

suite(`generalSibling`, () => {
  assert.is(
    pipes.generalSibling('.haha')(),
    '.haha ~ *'
  )
})

suite(`adjacentSibling`, () => {
  assert.is(
    pipes.adjacentSibling('.haha')(),
    '.haha + *'
  )
})

suite.run()
