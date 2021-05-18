<template>
  <section
    class="flex flex-col gap-10 rounded-md shadow-lg"
    :class="[
      isNestedVariant ? 'bg-denim-600 text-denim-100' : 'bg-denim-800 text-denim-200',
      nestingLevel === 0 ? 'px-6 py-8' : 'px-4 py-6'
    ]"
  >
    <h2
      class="text-3xl font-mono uppercase tracking-[.2em] text-center"
      :class="isNestedVariant ? '' : ''"
    >
      I'm looking for an element...
    </h2>
    <transition-group
      enter-active-class="transition duration-100 ease-in"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
      moveClass="transition duration-100"
    >
      <div 
        v-for="(operation, index) in operations"
        :key="operation.id"
        class="flex flex-col gap-6"
      >
        <div class="flex items-center justify-center gap-3 font-mono">
          <div
            class="h-px w-16"
            :class="isNestedVariant ? 'bg-denim-400' : 'bg-denim-600'"
          />
          <h3
            v-if="index === 0"
            class="uppercase text-lg tracking-[0.2em] flex-shrink-0"
            :class="isNestedVariant ? 'text-denim-200' : 'text-denim-300'"
          >
            that
          </h3>
          <h3
            v-else
            class="uppercase text-lg tracking-[0.2em] flex-shrink-0"
            :class="isNestedVariant ? 'text-denim-200' : 'text-denim-300'"
          >
            and that
          </h3>
          <div
            class="h-px w-16"
            :class="isNestedVariant ? 'bg-denim-400' : 'bg-denim-600'"
          />
        </div>
        <FormOperation
          :modelValue="operation"
          @update:modelValue="operationUpdate"
          @delete="operationDelete"
          @moveUp="() => { if (index !== 0) operationReorder(operation.id, index - 1) }"
          @moveDown="() => { if (index !== operations.length - 1) operationReorder(operation.id, index + 1) }"
        />
      </div>
    </transition-group>
    <button
      name="Add condition"
      class="mx-auto p-3 text-2xl btn--raised btn--grows rounded-full p-3 brand-gradient-to-r flex-shrink-0"
      @click="operationCreate"
      type="button"
    >
      <PlusIcon class="h-[1em] w-[1em]"></PlusIcon>
    </button>
  </section>
  <button
    name="Add conditions"
    class="mx-auto p-3 text-2xl btn--raised btn--grows rounded-full p-3 brand-gradient-to-r flex-shrink-0"
    @click="operationCreate"
    type="button"
  >
    <PlusIcon class="h-[1em] w-[1em]"></PlusIcon>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent, provide, inject, shallowRef } from 'vue'
import type { Ref } from 'vue'
import { nanoid } from 'nanoid'
import { createReorder } from '@baleada/logic'
import { PlusIcon } from '@heroicons/vue/solid'
import type { Operation } from '../toSelector'
import FormOperation from './FormOperation.vue'
import { pipeMetadata } from '../pipeMetadata'
import { NESTING_LEVEL_SYMBOL, NESTED_STATUS_SYMBOL } from '../state'

export default defineComponent({
  name: 'FormOperations',
  components: {
    FormOperation,
    PlusIcon
  },
  props: ['modelValue', 'isTopLevel'],
  setup (props, { emit }) {
    const operations = computed<Operation[]>({
            get: () => props.modelValue,
            set: operations => {
              emit('update:modelValue', operations)
            }
          }),
          operationCreate = () => {
            operations.value = [
              ...operations.value,
              {
                id: nanoid(8),
                pipe: pipeMetadata[0].label,
                args: []
              }
            ]
          },
          operationDelete = (id: string) => {
            const operationIndex = findOperationIndex({ id, operations }),
                  before = operationIndex === 0 ? [] : operations.value.slice(0, operationIndex),
                  after = operations.value.slice(operationIndex + 1)
            
            operations.value = [
              ...before,
              ...after,
            ]
          },
          operationUpdate = (operation: Operation) => {
            const index = findOperationIndex({ id: operation.id, operations }),
                  before = index === 0 ? [] : operations.value.slice(0, index),
                  after = operations.value.slice(index + 1)

            operations.value = [
              ...before,
              operation,
              ...after,
            ]
          },
          operationReorder = (id: string, to: number) => {
            const index = findOperationIndex({ id, operations })
            operations.value = createReorder<Operation>({ from: index, to })(operations.value)
          },
          nestingLevel = shallowRef(props.isTopLevel ? 0 : inject<number>(NESTING_LEVEL_SYMBOL) + 1),
          isNestedVariant = shallowRef(nestingLevel.value % 2 !== 0)
    
    provide(NESTING_LEVEL_SYMBOL, nestingLevel.value)
    provide(NESTED_STATUS_SYMBOL, isNestedVariant.value)

    return {
      operations,
      operationCreate,
      operationDelete,
      operationUpdate,
      operationReorder,
      nestingLevel,
      isNestedVariant,
    }
  },
})

function findOperationIndex ({ id, operations }: { id: string, operations: Ref<Operation[]> }) {
  return operations.value.findIndex(({ id: i }) => i === id)
}
</script>
