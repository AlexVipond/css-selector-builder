import {
  pipe,
  toFamily,
  toPrependable,
  toWithoutRedundantUniversal,
} from './util'

export { pipe }

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

export function universal () {
  return prepend('*')
}

export function tag (tag: keyof HTMLElementTagNameMap) {
  return prepend(tag)
}

// APPEND
export function append<AppendedType> (appended: AppendedType): Pipe {
  return (selector = '') => {
    const { relative, selected } = toFamily(selector)
    return relative + pipe(
      selector => `${selector}${appended}`,
      toWithoutRedundantUniversal(),
    )(selected)
  }
}

export function className (name: string) {
  return append(`.${name}`)
}

export function id (id: string) {
  return append(`#${id}`)
}

export type AttributeOperator = '='
  | '~='
  | '|='
  | '^='
  | '$='
  | '*='
export function attribute (name: string): Pipe
export function attribute (name: string, operator: AttributeOperator, value: string): Pipe
export function attribute (name: string, operator?: AttributeOperator, value?: string) {
  if (operator !== undefined) {
    return append(`["${name}"${operator}"${value}"]`)
  }

  return append(`["${name}"]`)
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

export function pseudoState (state: PseudoState) {
  return append(`:${state}`)
}

export function active () {
  return pseudoState('active')
}

export function anyLink () {
  return pseudoState('any-link')
}

export function autofill () {
  return pseudoState('autofill')
}

export function blank () {
  return pseudoState('blank')
}

export function checked () {
  return pseudoState('checked')
}

export function current () {
  return pseudoState('current')
}

export function defaultState () {
  return pseudoState('default')
}

export function defined () {
  return pseudoState('defined')
}

export function disabled () {
  return pseudoState('disabled')
}

export function empty () {
  return pseudoState('empty')
}

export function enabled () {
  return pseudoState('enabled')
}

export function first () {
  return pseudoState('first')
}

export function firstChild () {
  return pseudoState('first-child')
}

export function firstOfType () {
  return pseudoState('first-of-type')
}

export function fullscreen () {
  return pseudoState('fullscreen')
}

export function future () {
  return pseudoState('future')
}

export function focus () {
  return pseudoState('focus')
}

export function focusVisible () {
  return pseudoState('focus-visible')
}

export function focusWithin () {
  return pseudoState('focus-within')
}

export function host () {
  return pseudoState('host')
}

export function hover () {
  return pseudoState('hover')
}

export function indeterminate () {
  return pseudoState('indeterminate')
}

export function inRange () {
  return pseudoState('in-range')
}

export function invalid () {
  return pseudoState('invalid')
}

export function lastChild () {
  return pseudoState('last-child')
}

export function lastOfType () {
  return pseudoState('last-of-type')
}

export function left () {
  return pseudoState('left')
}

export function link () {
  return pseudoState('link')
}

export function localLink () {
  return pseudoState('local-link')
}

export function onlyChild () {
  return pseudoState('only-child')
}

export function onlyOfType () {
  return pseudoState('only-of-type')
}

export function optional () {
  return pseudoState('optional')
}

export function outOfRange () {
  return pseudoState('out-of-range')
}

export function past () {
  return pseudoState('past')
}

export function pictureInPicture () {
  return pseudoState('picture-in-picture')
}

export function placeholderShown () {
  return pseudoState('placeholder-shown')
}

export function paused () {
  return pseudoState('paused')
}

export function playing () {
  return pseudoState('playing')
}

export function readOnly () {
  return pseudoState('read-only')
}

export function readWrite () {
  return pseudoState('read-write')
}

export function required () {
  return pseudoState('required')
}

export function right () {
  return pseudoState('right')
}

export function root () {
  return pseudoState('root')
}

export function scope () {
  return pseudoState('scope')
}

export function target () {
  return pseudoState('target')
}

export function targetWithin () {
  return pseudoState('target-within')
}

export function userInvalid () {
  return pseudoState('user-invalid')
}

export function valid () {
  return pseudoState('valid')
}

export function visited () {
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

export function pseudoFn<ArgumentType> (fn: PseudoFn, ...args: ArgumentType[]) {
  return append(`:${fn}(${args.join(', ')})`)
}

export function dir (directionality: 'rtl' | 'ltr') {
  return pseudoFn('dir', directionality)
}

export function has (selector: string) {
  return pseudoFn('has', selector)
}

export function hostFn (selector: string) {
  return pseudoFn('host', selector)
}

export function hostContext (selector: string) {
  return pseudoFn('host-context', selector)
}

export function is (...selectors: string[]) {
  return pseudoFn('is', ...selectors)
}

export function lang (languageCode: string) {
  return pseudoFn('lang', languageCode)
}

export function not (...selectors: string[]) {
  return pseudoFn('not', ...selectors)
}

type NthPattern = number | 'odd' | 'even' | `${number}n` | `${number}n+${number}`

export function nthChild (pattern: NthPattern) {
  return pseudoFn('nth-child', pattern)
}

export function nthCol (pattern: NthPattern) {
  return pseudoFn('nth-col', pattern)
}

export function nthLastChild (pattern: NthPattern) {
  return pseudoFn('nth-last-child', pattern)
}

export function nthLastCol (pattern: NthPattern) {
  return pseudoFn('nth-last-col', pattern)
}

export function nthLastOfType (pattern: NthPattern) {
  return pseudoFn('nth-last-of-type', tag)
}

export function nthOfType (pattern: NthPattern) {
  return pseudoFn('nth-of-type', tag)
}

export function state (state: string) {
  return pseudoFn('state', state)
}

export function where (...selectors: string[]) {
  return pseudoFn('where', ...selectors)
}


type PseudoElement = 'after'
  | 'backdrop'
  | 'before'
  | 'cue'
  | 'cue-region'
  | 'first-letter'
  | 'first-line'
  | 'file-selector-button'
  | 'grammar-error'
  | 'marker'
  | 'placeholder'
  | 'selection'
  | 'spelling-error'
  | 'target-text'

export function pseudoElement (element: PseudoElement) {
  return append(`::${element}`)
}

export function after () {
  return pseudoElement('after')
}

export function backdrop () {
  return pseudoElement('backdrop')
}

export function before () {
  return pseudoElement('before')
}

export function cue () {
  return pseudoElement('cue')
}

export function cueRegion () {
  return pseudoElement('cue-region')
}

export function firstLetter () {
  return pseudoElement('first-letter')
}

export function firstLine () {
  return pseudoElement('first-line')
}

export function fileSelectorButton () {
  return pseudoElement('file-selector-button')
}

export function grammarError () {
  return pseudoElement('grammar-error')
}

export function marker () {
  return pseudoElement('marker')
}

export function placeholder () {
  return pseudoElement('placeholder')
}

export function selection () {
  return pseudoElement('selection')
}

export function spellingError () {
  return pseudoElement('spelling-error')
}

export function targetText () {
  return pseudoElement('target-text')
}

type PseudoElementFn = 'part' | 'slotted'

export function pseudoElementFn (elementFn: PseudoElementFn, arg: string) {
  return append(`::${elementFn}(${arg})`)
}

export function part (part: string) {
  return pseudoElementFn('part', part)
}

export function slotted (selector: string) {
  return pseudoElementFn('slotted', selector)
}


// RELATE
export function relate (combinator: ' ' | ' > ' | ' ~ ' | ' + ', relative: string): Pipe {
  return (selector = universal()()) => {
    const { relative: existingRelative, selected } = toFamily(selector)
    return `${relative}${combinator}${existingRelative}${selected}`
  }
}

export function descendant (ancestor: string | string) {
  return relate(' ', ancestor)
}

export function directChild (parent: string | string) {
  return relate(' > ', parent)
}

export function generalSibling (sibling: string | string) {
  return relate(' ~ ', sibling)
}

export function adjacentSibling (sibling: string | string) {
  return relate(' + ', sibling)
}
