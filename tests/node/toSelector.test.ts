import { suite as createSuite } from 'uvu'
import * as assert from 'uvu/assert'
import { toSelector } from '../../src/interface/toSelector'

const suite = createSuite('toSelector (node)')

suite(`toSelector`, () => {
  assert.is(
    toSelector([
      { method: 'id', args: ['haha'] },
      { method: 'className', args: ['business'] },
    ]),
    '#haha.business'
  )
  
  // Recurses
  assert.is(
    toSelector([
      { 
        method: 'not', 
        args: [
          [
            { method: 'id', args: ['haha'] },
            { method: 'className', args: ['business'] },
          ],
          [
            {
              method: 'is',
              args: [
                [
                  { method: 'attribute', args: ['poop'] }
                ]
              ]
            },
          ],
        ]
      },
    ]),
    ':not(#haha.business, :is(["poop"]))'
  )
})



suite.run()
