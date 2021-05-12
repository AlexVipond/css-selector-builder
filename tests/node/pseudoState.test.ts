import { suite as createSuite } from 'uvu'
import * as assert from 'uvu/assert'
import * as pipes from '../../src/pipes'

const suite = createSuite('pseudoState pipes (node)')

suite(`pseudoState`, () => { // API for append
  assert.is(
    pipes.pseudoState('active')(),
    ':active'
  )
})

// Everything else is an API for pseudoState

suite(`active`, () => {
  assert.is(
    pipes.active()(),
    ':active'
  )
})

suite(`anyLink`, () => {
  assert.is(
    pipes.anyLink()(),
    ':any-link'
  )
})

suite(`autofill`, () => {
  assert.is(
    pipes.autofill()(),
    ':autofill'
  )
})

suite(`blank`, () => {
  assert.is(
    pipes.blank()(),
    ':blank'
  )
})

suite(`checked`, () => {
  assert.is(
    pipes.checked()(),
    ':checked'
  )
})

suite(`current`, () => {
  assert.is(
    pipes.current()(),
    ':current'
  )
})

suite(`defaultState`, () => {
  assert.is(
    pipes.defaultState()(),
    ':default'
  )
})

suite(`defined`, () => {
  assert.is(
    pipes.defined()(),
    ':defined'
  )
})

suite(`disabled`, () => {
  assert.is(
    pipes.disabled()(),
    ':disabled'
  )
})

suite(`empty`, () => {
  assert.is(
    pipes.empty()(),
    ':empty'
  )
})

suite(`enabled`, () => {
  assert.is(
    pipes.enabled()(),
    ':enabled'
  )
})

suite(`first`, () => {
  assert.is(
    pipes.first()(),
    ':first'
  )
})

suite(`firstChild`, () => {
  assert.is(
    pipes.firstChild()(),
    ':first-child'
  )
})

suite(`firstOfType`, () => {
  assert.is(
    pipes.firstOfType()(),
    ':first-of-type'
  )
})

suite(`fullscreen`, () => {
  assert.is(
    pipes.fullscreen()(),
    ':fullscreen'
  )
})

suite(`future`, () => {
  assert.is(
    pipes.future()(),
    ':future'
  )
})

suite(`focus`, () => {
  assert.is(
    pipes.focus()(),
    ':focus'
  )
})

suite(`focusVisible`, () => {
  assert.is(
    pipes.focusVisible()(),
    ':focus-visible'
  )
})

suite(`focusWithin`, () => {
  assert.is(
    pipes.focusWithin()(),
    ':focus-within'
  )
})

suite(`host`, () => {
  assert.is(
    pipes.host()(),
    ':host'
  )
})

suite(`hover`, () => {
  assert.is(
    pipes.hover()(),
    ':hover'
  )
})

suite(`indeterminate`, () => {
  assert.is(
    pipes.indeterminate()(),
    ':indeterminate'
  )
})

suite(`inRange`, () => {
  assert.is(
    pipes.inRange()(),
    ':in-range'
  )
})

suite(`invalid`, () => {
  assert.is(
    pipes.invalid()(),
    ':invalid'
  )
})

suite(`lastChild`, () => {
  assert.is(
    pipes.lastChild()(),
    ':last-child'
  )
})

suite(`lastOfType`, () => {
  assert.is(
    pipes.lastOfType()(),
    ':last-of-type'
  )
})

suite(`left`, () => {
  assert.is(
    pipes.left()(),
    ':left'
  )
})

suite(`link`, () => {
  assert.is(
    pipes.link()(),
    ':link'
  )
})

suite(`localLink`, () => {
  assert.is(
    pipes.localLink()(),
    ':local-link'
  )
})

suite(`onlyChild`, () => {
  assert.is(
    pipes.onlyChild()(),
    ':only-child'
  )
})

suite(`onlyOfType`, () => {
  assert.is(
    pipes.onlyOfType()(),
    ':only-of-type'
  )
})

suite(`optional`, () => {
  assert.is(
    pipes.optional()(),
    ':optional'
  )
})

suite(`outOfRange`, () => {
  assert.is(
    pipes.outOfRange()(),
    ':out-of-range'
  )
})

suite(`past`, () => {
  assert.is(
    pipes.past()(),
    ':past'
  )
})

suite(`pictureInPicture`, () => {
  assert.is(
    pipes.pictureInPicture()(),
    ':picture-in-picture'
  )
})

suite(`placeholderShown`, () => {
  assert.is(
    pipes.placeholderShown()(),
    ':placeholder-shown'
  )
})

suite(`paused`, () => {
  assert.is(
    pipes.paused()(),
    ':paused'
  )
})

suite(`playing`, () => {
  assert.is(
    pipes.playing()(),
    ':playing'
  )
})

suite(`readOnly`, () => {
  assert.is(
    pipes.readOnly()(),
    ':read-only'
  )
})

suite(`readWrite`, () => {
  assert.is(
    pipes.readWrite()(),
    ':read-write'
  )
})

suite(`required`, () => {
  assert.is(
    pipes.required()(),
    ':required'
  )
})

suite(`right`, () => {
  assert.is(
    pipes.right()(),
    ':right'
  )
})

suite(`root`, () => {
  assert.is(
    pipes.root()(),
    ':root'
  )
})

suite(`scope`, () => {
  assert.is(
    pipes.scope()(),
    ':scope'
  )
})

suite(`target`, () => {
  assert.is(
    pipes.target()(),
    ':target'
  )
})

suite(`targetWithin`, () => {
  assert.is(
    pipes.targetWithin()(),
    ':target-within'
  )
})

suite(`userInvalid`, () => {
  assert.is(
    pipes.userInvalid()(),
    ':user-invalid'
  )
})

suite(`valid`, () => {
  assert.is(
    pipes.valid()(),
    ':valid'
  )
})

suite(`visited`, () => {
  assert.is(
    pipes.visited()(),
    ':visited'
  )
})

suite.run()
