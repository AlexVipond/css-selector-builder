type SelectorFunction = (selector?: string) => string

export function createIs (...selectors: string[]): SelectorFunction {
  return (selector: string = '') => `${selector}:is(${selectors.join(', ') || '*'})`
}

export function createWhere (...selectors: string[]): SelectorFunction {
  return (selector: string = '') => `${selector}:where(${selectors.join(', ') || '*'})`
}

export function createUniversal (): SelectorFunction {
  return (selector: string = '') => createIs('*')(selector)
}

export function createType (type: string): SelectorFunction {
  return (selector: string = '') => createIs(type)(selector)
}

export function createClass (name: string): SelectorFunction {
  return (selector: string = '') => createIs(`.${name}`)(selector)
}

export function createId (id: string): SelectorFunction {
  return (selector: string = '') => createIs(`#${id}`)(selector)
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
    return (selector: string = '') => createIs(`["${name}"${operator}"${value}"]`)(selector)
  }

  return (selector: string = '') => createIs(`["${name}"]`)(selector)
}

export function createDescendant (ancestor: string): SelectorFunction {
  return (selector: string = '') => `${ancestor} ${createIs()(selector)}`
}

export function createDirectChild (parent: string): SelectorFunction {
  return (selector: string = '') => `${parent} > ${createIs()(selector)}`
}

export function createGeneralSibling (generalSibling: string): SelectorFunction {
  return (selector: string = '') => `${generalSibling} ~ ${createIs()(selector)}`
}

export function createAdjacentSibling (adjacentSibling: string): SelectorFunction {
  return (selector: string = '') => `${adjacentSibling} + ${createIs()(selector)}`
}

