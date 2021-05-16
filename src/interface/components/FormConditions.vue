<template>
  <section class="flex flex-col gap-10">
    <div
      v-for="(condition, index) in conditions"
      :key="condition.id"
      class="flex flex-col gap-6"
    >
      <div class="flex items-center gap-3">
        <div class="h-px bg-blue-gray-300 w-full"/>
        <h3
          v-if="index === 0"
          class="uppercase text-sm tracking-widest flex-shrink-0 text-blue-gray-500"
        >
          that
        </h3>
        <h3
          v-else
          class="uppercase text-sm tracking-widest flex-shrink-0 text-blue-gray-500"
        >
          and that
        </h3>
        <div class="h-px bg-blue-gray-300 w-full"/>
      </div>
      <FormCondition
        :modelValue="condition"
        @update:modelValue="conditionUpdate"
        @delete="conditionDelete"
      />
    </div>
    <button
      class="mr-auto btn btn--lg btn--raised btn--grows bg-gradient-to-r from-violet-600 to-violet-500 text-violet-100 flex-shrink-0"
      @click="conditionCreate"
      type="button"
    >
      <PlusIcon class="icon"></PlusIcon>
      <span>Add condition</span>
    </button>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import type { Ref } from 'vue'
import { nanoid } from 'nanoid'
import { createReorder } from '@baleada/logic'
import { PlusIcon } from '@heroicons/vue/solid'
import type { Condition } from '../toSelector'
import FormCondition from './FormCondition.vue'
import { pipeMetadata } from '../pipeMetadata'

export default defineComponent({
  name: 'FormConditions',
  components: {
    FormCondition,
    PlusIcon
  },
  props: ['modelValue'],
  setup (props, { emit }) {
    const conditions = computed<Condition[]>({
            get: () => props.modelValue,
            set: conditions => {
              emit('update:modelValue', conditions)
            }
          }),
          conditionCreate = () => {
            conditions.value = [
              ...conditions.value,
              {
                id: nanoid(),
                pipe: pipeMetadata[0].label,
                args: []
              }
            ]
          },
          conditionDelete = (id: string) => {
            const conditionIndex = findConditionIndex({ id, conditions }),
                  before = conditionIndex === 0 ? [] : conditions.value.slice(0, conditionIndex),
                  after = conditions.value.slice(conditionIndex + 1)
            
            conditions.value = [
              ...before,
              ...after,
            ]
          },
          conditionUpdate = (condition: Condition) => {
            const index = findConditionIndex({ id: condition.id, conditions }),
                  before = index === 0 ? [] : conditions.value.slice(0, index),
                  after = conditions.value.slice(index + 1)

            conditions.value = [
              ...before,
              condition,
              ...after,
            ]
          },
          conditionReorder = (id: string, to: number) => {
            const index = findConditionIndex({ id, conditions })
            conditions.value = createReorder<Condition>({ from: index, to })(conditions.value)
          }


    return {
      conditions,
      conditionCreate,
      conditionDelete,
      conditionUpdate,
      conditionReorder,
    }
  },
})

function findConditionIndex ({ id, conditions }: { id: string, conditions: Ref<Condition[]> }) {
  return conditions.value.findIndex(({ id: i }) => i === id)
}
</script>
