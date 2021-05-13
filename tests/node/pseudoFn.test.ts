import { suite as createSuite } from 'uvu'
import * as assert from 'uvu/assert'
import * as pipes from '../../src/pipes'

const suite = createSuite('pseudoFn pipes (node)')

suite(`pseudoFn`, () => { // API for append
  // Single argument
  assert.is(
    pipes.pseudoFn('not', '.poop')(),
    ':not(.poop)'
  )
  
  // Multiple arguments
  assert.is(
    pipes.pseudoFn('not', '.haha', '.poop')(),
    ':not(.haha, .poop)'
  )
  
  // Numbers
  assert.is(
    pipes.pseudoFn('nth-child', 4)(),
    ':nth-child(4)'
  )
})

// Everything else is an API for pseudoFn

suite(`dir`, () => {
  assert.is(
    pipes.dir('rtl')(),
    ':dir(rtl)',
  )
})

suite(`has`, () => {
  assert.is(
    pipes.has('.poop')(),
    ':has(.poop)',
  )
})

suite(`hostFn`, () => {
  assert.is(
    pipes.hostFn('.poop')(),
    ':host(.poop)',
  )
})

suite(`hostContext`, () => {
  assert.is(
    pipes.hostContext('.poop')(),
    ':host-context(.poop)',
  )
})

suite(`is`, () => {
  assert.is(
    pipes.is('.poop')(),
    ':is(.poop)',
  )
  
  assert.is(
    pipes.is('.haha', '.business')(),
    ':is(.haha, .business)',
  )
})

suite(`lang`, () => {
  assert.is(
    pipes.lang('es-HN')(),
    ':lang(es-HN)',
  )
})

suite(`not`, () => {
  assert.is(
    pipes.not('.poop')(),
    ':not(.poop)',
  )
  
  assert.is(
    pipes.not('.haha', '.business')(),
    ':not(.haha, .business)',
  )
})

suite(`nthChild`, () => {
  assert.is(
    pipes.nthChild('even')(),
    ':nth-child(even)',
  )
})

suite(`nthCol`, () => {
  assert.is(
    pipes.nthCol('even')(),
    ':nth-col(even)',
  )
})

suite(`nthLastChild`, () => {
  assert.is(
    pipes.nthLastChild('even')(),
    ':nth-last-child(even)',
  )
})

suite(`nthLastCol`, () => {
  assert.is(
    pipes.nthLastCol('even')(),
    ':nth-last-col(even)',
  )
})

suite(`nthLastOfType`, () => {
  assert.is(
    pipes.nthLastOfType('even')(),
    ':nth-last-of-type(even)',
  )
})

suite(`nthOfType`, () => {
  assert.is(
    pipes.nthOfType('even')(),
    ':nth-of-type(even)',
  )
})

suite(`state`, () => {
  assert.is(
    pipes.state('poop')(),
    ':state(poop)',
  )
})

suite(`where`, () => {
  assert.is(
    pipes.where('.poop')(),
    ':where(.poop)',
  )
  
  assert.is(
    pipes.where('.haha', '.business')(),
    ':where(.haha, .business)',
  )
})

suite.run()
