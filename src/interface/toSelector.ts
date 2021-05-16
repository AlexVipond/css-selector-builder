import * as pipes from '../pipes'
import type { Pipe } from '../pipes'
import { pipe } from '../pipes/util'

export type Condition = {
  id: string,
  pipe: keyof typeof pipes,
  args: any[],
}

export function toSelector (conditions: Condition[] = []) {
  const reduced: Pipe[] = conditions.reduce((reduced, { pipe, args: rawArgs }) => {
    const args = rawArgs.map(arg => Array.isArray(arg) ? toSelector(arg) : arg)
    
    return [
      ...reduced,
      // @ts-ignore
      pipes[pipe](...args),
    ]
  }, [])
  
  return pipe(...reduced)('')
}
