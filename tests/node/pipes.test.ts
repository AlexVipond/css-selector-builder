import { suite as createSuite } from 'uvu'
import * as assert from 'uvu/assert'
import * as pipes from '../../src/pipes'

const suite = createSuite('pipes (node)')

suite(`is`, () => {
  const createIs = pipes.createIs

  assert.is(
    createIs()(),
    ':is(*)'
  )

  assert.is(
    createIs()('*'),
    '*:is(*)'
  )
  
  assert.is(
    createIs('.one', '.two', '.red', '.blue')(),
    ':is(.one, .two, .red, .blue)'
  )
})

suite(`universal`, () => {
  const createUniversal = pipes.createUniversal

  assert.is(
    createUniversal()(),
    ':is(*)'
  )
})

suite(`type`, () => {
  const createType = pipes.createType

  assert.is(
    createType('h1')(),
    ':is(h1)'
  )
})

suite(`class`, () => {
  const createClass = pipes.createClass

  assert.is(
    createClass('poop')(),
    ':is(.poop)'
  )
})

suite(`id`, () => {
  const createId = pipes.createId

  assert.is(
    createId('poop')(),
    ':is(#poop)'
  )
})

suite(`attribute`, () => {
  const createAttribute = pipes.createAttribute

  assert.is(
    createAttribute('poop')(),
    ':is(["poop"])'
  )
  
  assert.is(
    createAttribute('haha', '$=', 'business')(),
    ':is(["haha"$="business"])'
  )
})

suite(`descendant`, () => {
  const createDescendant = pipes.createDescendant

  assert.is(
    createDescendant('poop')(),
    'poop :is(*)'
  )
})

suite(`direct child`, () => {
  const createDirectChild = pipes.createDirectChild

  assert.is(
    createDirectChild('poop')(),
    'poop > :is(*)'
  )
})

suite(`general sibling`, () => {
  const createGeneralSibling = pipes.createGeneralSibling

  assert.is(
    createGeneralSibling('poop')(),
    'poop ~ :is(*)'
  )
})

suite(`adjacent sibling`, () => {
  const createAdjacentSibling = pipes.createAdjacentSibling

  assert.is(
    createAdjacentSibling('poop')(),
    'poop + :is(*)'
  )
})


suite.run()
