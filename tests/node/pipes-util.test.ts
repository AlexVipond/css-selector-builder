import { suite as createSuite } from 'uvu'
import * as assert from 'uvu/assert'
import { toFamily } from '../../src/pipes/util'

const suite = createSuite('pipes (node)')

suite(`toFamily doesn't remove non-redundant universal`, () => {
  assert.equal(
    toFamily('*'),
    { relative: '', selected: '*' }
  )
})

suite(`toFamily parses simple targets`, () => {
  assert.equal(
    toFamily('.haha.business'),
    { relative: '', selected: '.haha.business' }
  )
})
  
suite(`toFamily parses simple targets with simple relatives`, () => {
  assert.equal(
    toFamily('.haha .business'),
    { relative: '.haha ', selected: '.business' }
  )
})
  
suite(`toFamily removes redundant universal from relatives and targets`, () => {
  assert.equal(
    toFamily('*.haha *.business'),
    { relative: '.haha ', selected: '.business' }
  )
})
  
suite(`toFamily parses simple targets with multiple relatives`, () => {
  assert.equal(
    toFamily('.haha .poop > .business'),
    { relative: '.haha .poop > ', selected: '.business' }
  )
})
  
suite(`toFamily parses complex targets that include spaces inside attribute values`, () => {
  assert.equal(
    toFamily('.haha ~ ["name"="with multiple spaces"].business'),
    { relative: '.haha ~ ', selected: '["name"="with multiple spaces"].business' }
  )
})

suite(`toFamily parses complex targets that include spaces between joined selectors`, () => {
  assert.equal(
    toFamily('.haha ~ :not(.business, .poop)'),
    { relative: '.haha ~ ', selected: ':not(.business, .poop)' }
  )
})
  
suite(`toFamily parses complex targets with complex relatives`, () => {
  assert.equal(
    toFamily('["name"="with multiple spaces"].haha ~ ["name"="with multiple spaces"].business'),
    { relative: '["name"="with multiple spaces"].haha ~ ', selected: '["name"="with multiple spaces"].business' }
  )
})

suite(`toFamily doesn't support attribute values that include spaces after closed square brackets`, () => {
  assert.equal(
    toFamily('.haha ~ ["name"="] "]'),
    { relative: '.haha ~ [\"name\"=\"] ', selected: '"]' } // Neither half is a valid selector
  )
})

suite(`toFamily doesn't support attribute values that include spaces after closed square brackets`, () => {
  assert.equal(
    toFamily('.haha ~ ["name"="] "]'),
    { relative: '.haha ~ [\"name\"=\"] ', selected: '"]' } // Neither half is a valid selector
  )
})

suite.run()
