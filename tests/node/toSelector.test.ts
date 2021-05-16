import { suite as createSuite } from 'uvu'
import * as assert from 'uvu/assert'
import { toSelector } from '../../src/interface/toSelector'

const suite = createSuite('toSelector (node)')

suite(`toSelector`, () => {
  assert.is(
    toSelector([
      { id: '123', pipe: 'id', args: ['haha'] },
      { id: 'ABC', pipe: 'className', args: ['business'] },
    ]),
    '#haha.business'
  )
  
  // Recurses
  assert.is(
    toSelector([
      { 
        id: '123',
        pipe: 'not', 
        args: [
          [
            { id: 'ABC', pipe: 'id', args: ['haha'] },
            { id: '420', pipe: 'className', args: ['business'] },
          ],
          [
            {
              pipe: 'is',
              args: [
                [
                  { id: 'POOP', pipe: 'attribute', args: ['poop'] }
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
