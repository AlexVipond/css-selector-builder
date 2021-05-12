import { suite as createSuite } from 'uvu'
import * as assert from 'uvu/assert'
import * as pipes from '../../src/pipes'

const suite = createSuite('pseudoElementFn pipes (node)')

suite(`pseudoElementFn`, () => { // API for append
  assert.is(
    pipes.pseudoElementFn('part', 'poop')(),
    '::part(poop)'
  )
})

suite(`part`, () => {
  assert.is(
    pipes.part('poop')(),
    '::part(poop)'
  )
})

suite(`slotted`, () => {
  assert.is(
    pipes.slotted('.poop')(),
    '::slotted(.poop)'
  )
})


suite.run()
