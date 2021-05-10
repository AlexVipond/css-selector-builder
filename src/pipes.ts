type SelectorFunction = (selector?: string) => string

export function createIs (...selectors: string[]): SelectorFunction {
  return (selector: string = '') => `${selector}:is(${selectors.join(', ') || '*'})`
}

export function createWhere (...selectors: string[]): SelectorFunction {
  return (selector: string = '') => `${selector}:where(${selectors.join(', ') || '*'})`
}

export function createUniversal (): SelectorFunction {
  return (selector: string = '') => createIs(selector)('*')
}

export function createType (type: string): SelectorFunction {
  return (selector: string = '') => createIs(selector)(type)
}

export function createClass (name: string): SelectorFunction {
  return (selector: string = '') => createIs(selector)(name)
}

export function createId (id: string): SelectorFunction {
  return (selector: string = '') => createIs(selector)(id)
}

export type AttributeOperator = '='
  | '~='
  | '|='
  | '^='
  | '$='
  | '*='
export function createAttribute (name: string): SelectorFunction
export function createAttribute (name: string, operator: AttributeOperator, value: string): SelectorFunction
export function createAttribute (name: string, operator?: AttributeOperator, value?: string): SelectorFunction {
  if (operator) {
    return (selector: string = '') => `${selector}["${name}"${operator}"${value}"]`
  }

  return (selector: string = '') => `${selector}["${name}"]`
}

export function createDescendantOf (ancestor: string): SelectorFunction {
  return (selector: string = '') => `${ancestor} ${selector}`
}

export function createDirectChildOf (parent: string): SelectorFunction {
  return (selector: string = '') => `${parent} > ${selector}`
}

export function createGeneralSiblingOf (generalSibling: string): SelectorFunction {
  return (selector: string = '') => `${generalSibling} ~ ${selector}`
}

export function createAdjacentSiblingOf (adjacentSibling: string): SelectorFunction {
  return (selector: string = '') => `${adjacentSibling} + ${selector}`
}

