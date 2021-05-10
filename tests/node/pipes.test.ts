import { suite as createSuite } from 'uvu'
import * as assert from 'uvu/assert'
import * as pipes from '../../src/pipes'

const suite = createSuite('pipes (node)')

suite(`is`, context => {
  const value = pipes.createIs()()

  assert.is(value, ':is(*)')
})


suite.run()
