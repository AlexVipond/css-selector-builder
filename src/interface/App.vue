<template>
  <main class="h-screen w-screen flex flex-col items-center gap-12 p-24 bg-blue-gray-900">
    <section class="w-full max-w-xl flex flex-col gap-4">
      <h2 class="uppercase font-bold text-blue-gray-400 opacity-60 tracking-[.2em] text-sm">Selector</h2>
      <pre class="rounded-md shadow-lg p-4 brand-gradient-to-r text-primary-300 overflow-x-scroll"><code>{{ selector || '*' }}</code></pre>
    </section>
    <section class="w-full max-w-xl flex flex-col gap-4">
      <h1 class="uppercase font-bold text-blue-gray-400 opacity-60 tracking-[.2em] text-sm">Selector Builder</h1>

      <section class="bg-blue-gray-800 p-6 rounded-md shadow-lg text-blue-gray-300">
        <InputDirectionality />
        <InputAttributeOperator />
        <InputAttributeCaseSensitivity />
        <InputPipe />
      </section>
    </section>

    <!-- <FormConditions
      class="w-full max-w-lg text-lg"
      @create="createCondition"
      @delete="deleteCondition"
      @update="updateCondition"
      @reorder="reorderCondition"
    /> -->
  </main>
</template>

<script lang="ts">
import InputAttributeCaseSensitivity from './InputAttributeCaseSensitivity.vue'
import InputAttributeOperator from './InputAttributeOperator.vue'
import InputDirectionality from './InputDirectionality.vue'
import InputPipe from './InputPipe.vue'
import { ref, computed, defineComponent } from 'vue'
import type { Ref } from 'vue'
import { nanoid } from 'nanoid'
import { createReorder } from '@baleada/logic'
// import FormConditions from './FormConditions.vue'
import { toSelector } from './toSelector'
import type { Condition } from './toSelector'

export default defineComponent({
  components: {
    InputAttributeCaseSensitivity,
    InputAttributeOperator,
    InputPipe,
    InputDirectionality
    // FormConditions,
  },
  setup () {
    const conditions = ref<Condition[]>([]),
          selector = computed(() => toSelector(conditions.value))
    
    function createCondition () {
      conditions.value = [
        ...conditions.value,
        {
          id: nanoid(),
          method: undefined,
          args: []
        }
      ]
    }
    
    function deleteCondition ({ id }: { id: string }) {
      const conditionIndex = findConditionIndex({ id, conditions }),
            before = conditionIndex === 0 ? [] : conditions.value.slice(0, conditionIndex),
            after = conditions.value.slice(conditionIndex + 1)
      
      conditions.value = [
        ...before,
        ...after,
      ]
    }

    function updateCondition ({ id, withUpdates }: { id: string, withUpdates: Condition }) {
      const index = findConditionIndex({ id, conditions }),
            item = conditions[index],
            before = index === 0 ? [] : conditions.value.slice(0, index),
            after = conditions.value.slice(index + 1)

      conditions.value = [
        ...before,
        { ...item, ...withUpdates },
        ...after,
      ]
    }

    function reorderCondition ({ id, to }: { id: string, to: number }) {
      const index = findConditionIndex({ id, conditions })
      conditions.value = createReorder<Condition>({ from: index, to })(conditions.value)
    }


    return {
      createCondition,
      deleteCondition,
      updateCondition,
      reorderCondition,
      selector,
    }
  }
})

function findConditionIndex ({ id, conditions }: { id: string, conditions: Ref<Condition[]>}) {
  return conditions.value.findIndex(({ id: i }) => i === id)
}
</script>
