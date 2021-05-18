import { suite as createSuite } from 'uvu'
import * as assert from 'uvu/assert'
import { toOperated } from '../../src/interface/toOperated'

const suite = createSuite('toOperated (node)')

suite(`toOperated`, () => {
  assert.is(
    toOperated([
      { id: '123', pipe: 'has an ID, which I\'ll specify', args: ['haha'] },
      { id: 'ABC', pipe: 'has a class, which I\'ll specify', args: ['business'] },
    ]),
    '#haha.business'
  )
  
  // Recurses
  assert.is(
    toOperated([
      { 
        id: '123',
        pipe: 'matches none of one or more selectors, which I\'ll specify', 
        args: [
          [
            { id: 'ABC', pipe: 'has an ID, which I\'ll specify', args: ['haha'] },
            { id: '420', pipe: 'has a class, which I\'ll specify', args: ['business'] },
          ],
          [
            {
              pipe: 'matches any of one or more selectors, which I\'ll specify, and retains the specificity of the most specific matching selector',
              args: [
                [
                  { id: 'POOP', pipe: 'has an attribute', args: ['poop'] }
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
