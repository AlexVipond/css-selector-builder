import {
  pipe,
  toFamily,
  toPrependable,
  toWithoutRedundantUniversal,
} from './util'

export type Pipe = (selector?: string) => string

// PREPEND
export function prepend<PrependedType extends '*' | keyof HTMLElementTagNameMap> (prepended: PrependedType): Pipe {
  return (selector = '') => {
    const { relative, selected } = toFamily(selector)
    return relative + pipe(
      toPrependable(),
      selector => `${prepended}${selector}`
    )(selected)
  }
}

export function universal (): Pipe {
  return prepend('*')
}

export function type (type: keyof HTMLElementTagNameMap): Pipe {
  return prepend(type)
}

// APPEND
export function append<AppendedType> (beforeAppended: '' | '#' | '.' | ':' | '::', appended: AppendedType) {
  return (selector = '') => {
    const { relative, selected } = toFamily(selector)
    return relative + pipe(
      selector => `${selector}${beforeAppended}${appended}`,
      toWithoutRedundantUniversal(),
    )(selected)
  }
}

export function className (name: string): Pipe {
  return append('.', name)
}

export function id (id: string): Pipe {
  return append('#', id)
}

type AttributeOperator = '='
  | '~='
  | '|='
  | '^='
  | '$='
  | '*='
export function attribute (name: string): Pipe
export function attribute (name: string, operator: AttributeOperator, value: string): Pipe
export function attribute (name: string, operator?: AttributeOperator, value?: string): Pipe {
  if (operator !== undefined) {
    return append('', `["${name}"${operator}"${value}"]`)
  }

  return append('', `["${name}"]`)
}

type PseudoState = 'active'
  | 'any-link'
  | 'autofill'
  | 'blank'
  | 'checked'
  | 'current'
  | 'default'
  | 'defined'
  | 'disabled'
  | 'empty'
  | 'enabled'
  | 'first'
  | 'first-child'
  | 'first-of-type'
  | 'fullscreen'
  | 'future'
  | 'focus'
  | 'focus-visible'
  | 'focus-within'
  | 'host'
  | 'hover'
  | 'indeterminate'
  | 'in-range'
  | 'invalid'
  | 'last-child'
  | 'last-of-type'
  | 'left'
  | 'link'
  | 'local-link'
  | 'only-child'
  | 'only-of-type'
  | 'optional'
  | 'out-of-range'
  | 'past'
  | 'picture-in-picture'
  | 'placeholder-shown'
  | 'paused'
  | 'playing'
  | 'read-only'
  | 'read-write'
  | 'required'
  | 'right'
  | 'root'
  | 'scope'
  | 'target'
  | 'target-within'
  | 'user-invalid'
  | 'valid'
  | 'visited'

export function pseudoState (state: PseudoState): Pipe {
  return append(':', state)
}

export function active (): Pipe {
  return pseudoState('active')
}

export function anyLink (): Pipe {
  return pseudoState('any-link')
}

export function autofill (): Pipe {
  return pseudoState('autofill')
}

export function blank (): Pipe {
  return pseudoState('blank')
}

export function checked (): Pipe {
  return pseudoState('checked')
}

export function current (): Pipe {
  return pseudoState('current')
}

export function defaultState (): Pipe {
  return pseudoState('default')
}

export function defined (): Pipe {
  return pseudoState('defined')
}

export function disabled (): Pipe {
  return pseudoState('disabled')
}

export function empty (): Pipe {
  return pseudoState('empty')
}

export function enabled (): Pipe {
  return pseudoState('enabled')
}

export function first (): Pipe {
  return pseudoState('first')
}

export function firstChild (): Pipe {
  return pseudoState('first-child')
}

export function firstOfType (): Pipe {
  return pseudoState('first-of-type')
}

export function fullscreen (): Pipe {
  return pseudoState('fullscreen')
}

export function future (): Pipe {
  return pseudoState('future')
}

export function focus (): Pipe {
  return pseudoState('focus')
}

export function focusVisible (): Pipe {
  return pseudoState('focus-visible')
}

export function focusWithin (): Pipe {
  return pseudoState('focus-within')
}

export function host (): Pipe {
  return pseudoState('host')
}

export function hover (): Pipe {
  return pseudoState('hover')
}

export function indeterminate (): Pipe {
  return pseudoState('indeterminate')
}

export function inRange (): Pipe {
  return pseudoState('in-range')
}

export function invalid (): Pipe {
  return pseudoState('invalid')
}

export function lastChild (): Pipe {
  return pseudoState('last-child')
}

export function lastOfType (): Pipe {
  return pseudoState('last-of-type')
}

export function left (): Pipe {
  return pseudoState('left')
}

export function link (): Pipe {
  return pseudoState('link')
}

export function localLink (): Pipe {
  return pseudoState('local-link')
}

export function onlyChild (): Pipe {
  return pseudoState('only-child')
}

export function onlyOfType (): Pipe {
  return pseudoState('only-of-type')
}

export function optional (): Pipe {
  return pseudoState('optional')
}

export function outOfRange (): Pipe {
  return pseudoState('out-of-range')
}

export function past (): Pipe {
  return pseudoState('past')
}

export function pictureInPicture (): Pipe {
  return pseudoState('picture-in-picture')
}

export function placeholderShown (): Pipe {
  return pseudoState('placeholder-shown')
}

export function paused (): Pipe {
  return pseudoState('paused')
}

export function playing (): Pipe {
  return pseudoState('playing')
}

export function readOnly (): Pipe {
  return pseudoState('read-only')
}

export function readWrite (): Pipe {
  return pseudoState('read-write')
}

export function required (): Pipe {
  return pseudoState('required')
}

export function right (): Pipe {
  return pseudoState('right')
}

export function root (): Pipe {
  return pseudoState('root')
}

export function scope (): Pipe {
  return pseudoState('scope')
}

export function target (): Pipe {
  return pseudoState('target')
}

export function targetWithin (): Pipe {
  return pseudoState('target-within')
}

export function userInvalid (): Pipe {
  return pseudoState('user-invalid')
}

export function valid (): Pipe {
  return pseudoState('valid')
}

export function visited (): Pipe {
  return pseudoState('visited')
}


type PseudoFn = 'dir'
  | 'has'
  | 'host'
  | 'host-context'
  | 'is'
  | 'lang'
  | 'not'
  | 'nth-child'
  | 'nth-col'
  | 'nth-last-child'
  | 'nth-last-col'
  | 'nth-last-of-type'
  | 'nth-of-type'
  | 'state'
  | 'where'

export function pseudoFn<ArgumentType> (fn: PseudoFn, ...args: ArgumentType[]): Pipe {
  return append(':', `${fn}(${args.join(', ')})`)
}

export function dir (directionality: 'rtl' | 'ltr'): Pipe {
  return pseudoFn('dir', directionality)
}

export function has (selector: string): Pipe {
  return pseudoFn('has', selector)
}

export function hostFn (selector: string): Pipe {
  return pseudoFn('host', selector)
}

export function hostContext (selector: string): Pipe {
  return pseudoFn('host-context', selector)
}

export function is (...selectors: string[]): Pipe {
  return pseudoFn('is', ...selectors)
}

export function lang (lang: string): Pipe {
  return pseudoFn('lang', lang)
}

export function not (...selectors: string[]): Pipe {
  return pseudoFn('not', ...selectors)
}

type NthPattern = number | 'odd' | 'even' | `${number}n` | `${number}n+${number}`

export function nthChild (pattern: NthPattern): Pipe {
  return pseudoFn('nth-child', pattern)
}

export function nthCol (pattern: NthPattern): Pipe {
  return pseudoFn('nth-col', pattern)
}

export function nthLastChild (pattern: NthPattern): Pipe {
  return pseudoFn('nth-last-child', pattern)
}

export function nthLastCol (pattern: NthPattern): Pipe {
  return pseudoFn('nth-last-col', pattern)
}

export function nthLastOfType (type: keyof HTMLElementTagNameMap): Pipe {
  return pseudoFn('nth-last-of-type', type)
}

export function nthOfType (type: keyof HTMLElementTagNameMap): Pipe {
  return pseudoFn('nth-of-type', type)
}

export function state (state: string): Pipe {
  return pseudoFn('state', state)
}

export function where (...selectors: string[]): Pipe {
  return pseudoFn('where', ...selectors)
}

// RELATE
export function relate (relationship: ' ' | ' > ' | ' ~ ' | ' + ', relative: string): Pipe {
  return (selector = universal()()) => {
    const { relative: existingRelative, selected } = toFamily(selector)
    return `${relative}${relationship}${existingRelative}${selected}`
  }
}

export function descendant (ancestor: string | string): Pipe {
  return relate(' ', ancestor)
}

export function directChild (parent: string | string): Pipe {
  return relate(' > ', parent)
}

export function generalSibling (sibling: string | string): Pipe {
  return relate(' ~ ', sibling)
}

export function adjacentSibling (sibling: string | string): Pipe {
  return relate(' + ', sibling)
}
