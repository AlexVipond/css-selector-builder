import * as pipes from '../pipes'
import type { Pipe } from '../pipes'
import { pipe } from '../pipes/util'
import { pipeMetadata } from './pipeMetadata'

export type Condition = {
  id: string,
  pipe: string,
  args: any[],
}

export function toSelector (conditions: Condition[] = []) {
  const reduced: Pipe[] = conditions.reduce((reduced, { pipe, args: rawArgs }) => {
    const pipeName = pipeMetadata.find(({ label }) => label === pipe).name
    const args = rawArgs.map(arg => Array.isArray(arg) ? toSelector(arg) : arg)
    
    return [
      ...reduced,
      // @ts-ignore
      pipes[pipeName](...args),
    ]
  }, [])
  
  return pipe(...reduced)('')
}
