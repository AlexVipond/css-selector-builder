import * as pipes from '../pipes'
import type { Pipe } from '../pipes'
import { pipe } from '../pipes/util'
import { pipeMetadata } from './pipeMetadata'

export type Operation = {
  id: string,
  pipe: string,
  args: any[],
}

export function toSelector (operations: Operation[] = []) {
  const reduced: Pipe[] = operations.reduce((reduced, { pipe, args: rawArgs }) => {
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
