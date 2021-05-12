import * as pipes from './pipes'
import type { Pipe } from './pipes'
import { pipe } from './pipes/util'

type Condition = {
  method: keyof typeof pipes,
  args: any[],
}

export function toSelector (conditions: Condition[] = []) {
  const reduced: Pipe[] = conditions.reduce((reduced, { method, args: rawArgs }) => {
    const args = rawArgs.map(arg => Array.isArray(arg) ? toSelector(arg) : arg)
    
    return [
      ...reduced,
      // @ts-ignore
      pipes[method](...args),
    ]
  }, [])
  
  return pipe(...reduced)('')
}
