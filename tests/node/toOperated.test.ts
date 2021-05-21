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

suite(`asdfasdf`, context => {
  assert.is(
    toOperated([
      {
        "id": "B6tx0Teu",
        "pipe": "contains any element that matches a selector, which I'll specify",
        "args": [
          [
            {
              "id": "cmAQvcva",
              "pipe": "contains any element that matches a selector, which I'll specify",
              "args": [
                [
                  {
                    "id": "vpGIBkQj",
                    "pipe": "has a tag, which I'll specify",
                    "args": ["poop"]
                  },
                  {
                    "id": "biVhxLpU",
                    "pipe": "has a class, which I'll specify",
                    "args": ["stinky"]
                  }
                ],
                [
                  {
                    "id": "eEU5_DkV",
                    "pipe": "has an ID, which I'll specify",
                    "args": ["fart"]
                  }
                ]
              ]
            },
            {
              "id": "1v7zPR5F",
              "pipe": "has a tag, which I'll specify",
              "args": ["butt"]
            }
          ]
        ]
      },
      {
        "id": "0lEZLWhl",
        "pipe": "has a class, which I'll specify",
        "args": ["lol"]
      },
      {
        "id": "sdpEaF5l",
        "pipe": "has a tag, which I'll specify",
        "args": ["poopy"]
      }
    ]),
    'poopy:has(butt:has(poop.stinky, #fart)).lol'
  )
  
})

suite.run()
