import { suite as createSuite } from 'uvu'
import * as assert from 'uvu/assert'
import { toFamily } from '../../src/pipes/util'

const suite = createSuite('pipes (node)')

suite(`toFamily`, () => {
  // Doesn't remove non-redundant universal
  assert.equal(
    toFamily('*'),
    { relative: '', selected: '*' }
  )

  // Parses simple targets
  assert.equal(
    toFamily('.haha.business'),
    { relative: '', selected: '.haha.business' }
  )
  
  // Parses simple targets with simple relatives
  assert.equal(
    toFamily('.haha .business'),
    { relative: '.haha ', selected: '.business' }
  )
  
  // Removes redundant universal from relatives and targets
  assert.equal(
    toFamily('*.haha *.business'),
    { relative: '.haha ', selected: '.business' }
  )
  
  // Parses simple targets with multiple relatives
  assert.equal(
    toFamily('.haha .poop > .business'),
    { relative: '.haha .poop > ', selected: '.business' }
  )
  
  // Parses complex targets
  assert.equal(
    toFamily('.haha ~ ["name"="with multiple spaces"].business'),
    { relative: '.haha ~ ', selected: '["name"="with multiple spaces"].business' }
  )
  
  // Parses complex targets with complex relatives
  assert.equal(
    toFamily('["name"="with multiple spaces"].haha ~ ["name"="with multiple spaces"].business'),
    { relative: '["name"="with multiple spaces"].haha ~ ', selected: '["name"="with multiple spaces"].business' }
  )
})

suite.run()
