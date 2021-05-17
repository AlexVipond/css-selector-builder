<template>
  <section class="flex flex-col gap-10">
    <h2
      class="text-lg font-mono uppercase tracking-[.2em] text-center"
      :class="nestingLevel % 2 === 0 ? '' : ''"
    >
      I'm looking for an element...
    </h2>
    <div
      v-for="(condition, index) in conditions"
      :key="condition.id"
      class="flex flex-col gap-6"
    >
      <div class="flex items-center justify-center gap-3 font-mono">
        <div class="h-px bg-gray-600 w-16"/>
        <h3
          v-if="index === 0"
          class="uppercase text-lg tracking-[0.2em] flex-shrink-0 text-gray-300"
        >
          that
        </h3>
        <h3
          v-else
          class="uppercase text-lg tracking-[0.2em] flex-shrink-0 text-gray-300"
        >
          and that
        </h3>
        <div class="h-px bg-gray-600 w-16"/>
      </div>
      <FormCondition
        :modelValue="condition"
        @update:modelValue="conditionUpdate"
        @delete="conditionDelete"
        @moveUp="() => { if (index !== 0) conditionReorder(condition.id, index - 1) }"
        @moveDown="() => { if (index !== conditions.length - 1) conditionReorder(condition.id, index + 1) }"
      />
    </div>
    <button
      class="mx-auto p-3 text-2xl btn--raised btn--grows rounded-full p-3 bg-gradient-to-r from-cyan-700 to-cyan-700 text-cyan-100 flex-shrink-0"
      @click="conditionCreate"
      type="button"
    >
      <PlusIcon class="h-[1em] w-[1em]"></PlusIcon>
    </button>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, provide, inject, shallowRef } from 'vue'
import type { Ref } from 'vue'
import { nanoid } from 'nanoid'
import { createReorder } from '@baleada/logic'
import { PlusIcon } from '@heroicons/vue/solid'
import type { Condition } from '../toSelector'
import FormCondition from './FormCondition.vue'
import { pipeMetadata } from '../pipeMetadata'
import { NESTING_LEVEL_SYMBOL } from '../state'

export default defineComponent({
  name: 'FormConditions',
  components: {
    FormCondition,
    PlusIcon
  },
  props: ['modelValue', 'isTopLevel'],
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
          },
          nestingLevel = shallowRef(props.isTopLevel ? 0 : inject<number>(NESTING_LEVEL_SYMBOL) + 1)
    
    provide(NESTING_LEVEL_SYMBOL, nestingLevel)

    return {
      conditions,
      conditionCreate,
      conditionDelete,
      conditionUpdate,
      conditionReorder,
      nestingLevel,
    }
  },
})

function findConditionIndex ({ id, conditions }: { id: string, conditions: Ref<Condition[]> }) {
  return conditions.value.findIndex(({ id: i }) => i === id)
}
</script>
