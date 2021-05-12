import { suite as createSuite } from 'uvu'
import * as assert from 'uvu/assert'
import * as pipes from '../../src/pipes'

const suite = createSuite('prepend pipes (node)')

suite(`prepend`, () => {
  // Prepends selector
  assert.is(
    pipes.prepend('*')('.poop'),
    '*.poop'
  )
  
  // Overwrites non-prependable selectors
  assert.is(
    pipes.prepend('h1')('h2.poop'),
    'h1.poop'
  )

  // Prepends target, not relative
  assert.is(
    pipes.prepend('*')('.haha .business'),
    '.haha *.business'
  )
})

suite(`universal`, () => {
  assert.is(
    pipes.universal()('.poop'),
    '*.poop'
  )
})

suite(`type`, () => {
  assert.is(
    pipes.type('h1')('.poop'),
    'h1.poop'
  )
})

suite.run()
