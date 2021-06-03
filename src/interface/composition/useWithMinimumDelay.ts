import { useDelayable } from '@baleada/vue-composition'

export async function useWithMinimumDelay (
  promise: () => Promise<any>,
  then: () => any,
  minimumDelay: number
) {
  const timeStart = performance.now()
  await promise()
  const timeEnd = performance.now()

  useDelayable(
    then,
    { delay: Math.max(0, minimumDelay - (timeEnd - timeStart)) }
  ).value.delay()
}
