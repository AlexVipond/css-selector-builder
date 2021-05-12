import { suite as createSuite } from 'uvu'
import * as assert from 'uvu/assert'
import * as pipes from '../../src/pipes'

const suite = createSuite('pseudoElement pipes (node)')

suite(`pseudoElement`, () => { // API for append
  assert.is(
    pipes.pseudoElement('after')(),
    '::after'
  )
})

suite(`after`, () => {
  assert.is(
    pipes.after()(),
    '::after'
  )
})

suite(`backdrop`, () => {
  assert.is(
    pipes.backdrop()(),
    '::backdrop'
  )
})

suite(`before`, () => {
  assert.is(
    pipes.before()(),
    '::before'
  )
})

suite(`cue`, () => {
  assert.is(
    pipes.cue()(),
    '::cue'
  )
})

suite(`cueRegion`, () => {
  assert.is(
    pipes.cueRegion()(),
    '::cue-region'
  )
})

suite(`firstLetter`, () => {
  assert.is(
    pipes.firstLetter()(),
    '::first-letter'
  )
})

suite(`firstLine`, () => {
  assert.is(
    pipes.firstLine()(),
    '::first-line'
  )
})

suite(`fileSelectorButton`, () => {
  assert.is(
    pipes.fileSelectorButton()(),
    '::file-selector-button'
  )
})

suite(`grammarError`, () => {
  assert.is(
    pipes.grammarError()(),
    '::grammar-error'
  )
})

suite(`marker`, () => {
  assert.is(
    pipes.marker()(),
    '::marker'
  )
})

suite(`placeholder`, () => {
  assert.is(
    pipes.placeholder()(),
    '::placeholder'
  )
})

suite(`selection`, () => {
  assert.is(
    pipes.selection()(),
    '::selection'
  )
})

suite(`spellingError`, () => {
  assert.is(
    pipes.spellingError()(),
    '::spelling-error'
  )
})

suite(`targetText`, () => {
  assert.is(
    pipes.targetText()(),
    '::target-text'
  )
})

suite.run()
