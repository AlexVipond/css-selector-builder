import { universal } from './'
import type { Pipe } from './'

export function pipe (...fns: Pipe[]) {
  return (initialState: string = universal()()) => fns.reduce<string>(
    (selector, fn) => fn(selector),
    initialState
  ) 
}

export function toFamily (selector: string): {
  relative: string,
  selected: string,
} {
  const withoutAttributeSpaces = toWithoutAttributeSpaces()(selector),
        indexOfLastSpace = (() => {
          let indexOfLastSpace: number,
              index = withoutAttributeSpaces.length - 1
          
          while (indexOfLastSpace === undefined && index !== -1) {
            if (withoutAttributeSpaces[index] === ' ') {
              indexOfLastSpace = index
            }
            index--
          }
          
          return indexOfLastSpace || -1
        })(),
        selected = withoutAttributeSpaces.slice(indexOfLastSpace + 1),
        relative = withoutAttributeSpaces.slice(0, indexOfLastSpace + 1)
  
  return {
    relative: pipe(
      toWithoutRedundantUniversal(),
      toWithAttributeSpaces(),
    )(relative),
    selected: pipe(
      toWithoutRedundantUniversal(),
      toWithAttributeSpaces()
    )(selected),
  }
}

// The goal here is to separate the target from its relative and relation
// by searching for the last space in the selector string.
//
// Since attribute values can contain spaces, the first step
// is to replace those spaces with a unique symbol. Then, the last space can be identified,
// without risk of accidentally identifying a space in an attribute value.
// 
// Finally, once the relative and relation are separated, the unique symbol in both halves
// of the original selector can be globally replaced with a space again.
//
// Notably, this implementation doesn't support attribute values that include
// spaces after closed square brackets, even though it's valid CSS.
const attributeSpaceRE = /(\[[^\]]*?)(\s)(.*?\])/,
      joinedSelectorSpaceRE = /(,\s)/
// const attributeSpaceAfterClosedSquareBracketRE = /(\[[^\]]*?)(\s)(.*?\])/
const ATTRIBUTE_SPACE_REPLACEMENT = 'Qx3qlPtYnH-YhkuNvdNez' // nanoid
export function toWithoutAttributeSpaces (): Pipe {
  return selector => {
    while(joinedSelectorSpaceRE.test(selector)) {
      selector = selector.replace(joinedSelectorSpaceRE, `,${ATTRIBUTE_SPACE_REPLACEMENT}`)
    }

    while(attributeSpaceRE.test(selector)) {
      selector = selector.replace(attributeSpaceRE, (match, before, space, after) => `${before}${ATTRIBUTE_SPACE_REPLACEMENT}${after}`)
    }
  
    return selector
  }
}

export function toWithAttributeSpaces (): Pipe {
  return selector => selector.replace(new RegExp(ATTRIBUTE_SPACE_REPLACEMENT, 'g'), ' ')
}

export function toWithoutRedundantUniversal (): Pipe {
  return selector => selector === '*' ? selector : selector.replace(/^\*/, '')
}

export function toPrependable (): Pipe {
  return (selector = '') => selector.replace(/^[\*A-Za-z0-9]+/, '')
}
