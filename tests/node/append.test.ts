import { suite as createSuite } from 'uvu'
import * as assert from 'uvu/assert'
import * as pipes from '../../src/pipes'

const suite = createSuite('append pipes (node)')

suite(`append`, () => {
  // Appends selector
  assert.is(
    pipes.append(`:focus`)('h1'),
    'h1:focus'
  )

  // Appends target, not relative
  assert.is(
    pipes.append(`:focus`)('.haha .business'),
    '.haha .business:focus'
  )
  
  // Removes redundant universal
  assert.is(
    pipes.append(`:focus`)('.haha *.business'),
    '.haha .business:focus'
  )
})

suite(`className`, () => {
  assert.is(
    pipes.className('poop')(),
    '.poop'
  )
})

suite(`id`, () => {
  assert.is(
    pipes.id('poop')(),
    '#poop'
  )
})

suite(`attribute`, () => {
  // Lone attributes
  assert.is(
    pipes.attribute('poop')(),
    '["poop"]'
  )
  
  // Attributes with specified operator and value
  assert.is(
    pipes.attribute('data-haha', '=', 'business')(),
    '["data-haha"="business"]'
  )
  
  // Attributes with specified operator, value, and case sensitivity
  assert.is(
    pipes.attribute('data-haha', '=', 'business', true)(),
    '["data-haha"="business" s]'
  )
})

suite.run()
