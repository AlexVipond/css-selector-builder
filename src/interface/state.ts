import { reactive } from 'vue'

export const NESTING_LEVEL_SYMBOL = Symbol('nesting level')
export const NESTED_STATUS_SYMBOL = Symbol('operations nested status')

export const clipboard = reactive({ text: '' })
