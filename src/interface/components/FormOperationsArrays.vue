<template>
  <section class="flex flex-col gap-8">
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
        v-for="(operations, index) in operationsArrays"
        :key="index"
        class="flex flex-col gap-14"
      > 
        <div
          class="relative rounded-md transition duration-75"
          :class="statuses[index] === 'ready to delete' ? 'ring ring-[#AD4040] ring-offset-4 ring-offset-denim-1000' : ''"
        >
          <FormOperations
            :modelValue="operations"
            @update:modelValue="newOperations => operationsArrayUpdate(index, newOperations)"
            :isTopLevel="true"
          />
          <div class="btn--raised btn--grows absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rounded-full">
            <button
              type="button"
              name="Delete condition"
              class="p-2 text-base rounded-full bg-[#AD4040] text-[#FED7D7] flex-shrink-0 text-denim-100"
              @click="() => operationsArrayDelete(index)"
              @mouseenter="() => readyToDelete(index)"
              @focus="() => readyToDelete(index)"
              @mouseleave="() => notReadyToDelete(index)"
              @blur="() => notReadyToDelete(index)"
            >
              <TrashIcon class="h-5 w-5" />
            </button>
          </div>
        </div>
        <div
          v-if="index !== operationsArrays.length - 1"
          class="flex items-center justify-center gap-3 font-mono"
        >
          <div class="h-px w-16 bg-denim-500" />
          <h3 class="uppercase text-xl tracking-[0.2em] flex-shrink-0 text-denim-500" >
            or
          </h3>
          <div class="h-px w-16 bg-denim-500" />
        </div>
      </div>
    </transition-group>
    <button
      name="Add conditions for another selector"
      class="mx-auto p-3 text-lg btn--raised btn--grows rounded-full bg-gradient-to-r from-denim-700 to-denim-600 flex-shrink-0 text-denim-100"
      @click="operationsArrayCreate"
      type="button"
    >
      OR
    </button>
  </section>
</template>

<script lang="ts">
import { computed, ref, shallowRef, provide, inject } from 'vue'
import { TrashIcon } from '@heroicons/vue/outline'
import { createReplace, createDelete } from '@baleada/logic'
import FormOperations from './FormOperations.vue'
import { OPERATIONS_ARRAYS_NESTED_STATUS_SYMBOL, OPERATIONS_ARRAYS_NESTING_LEVEL_SYMBOL } from '../state'
import type { Operation } from '../toOperated'

import { defineComponent } from 'vue'
export default defineComponent({
  components: {
    FormOperations,
    TrashIcon,
  },
  props: ['modelValue', 'isTopLevel'],
  setup (props, { emit }) {
    const operationsArrays = computed<Operation[][]>({
            get: () => props.modelValue,
            set: newOperationsArrays => {
              emit('update:modelValue', newOperationsArrays)
            }
          }),
          statuses = ref(operationsArrays.value.map(() => 'not ready to delete')),
          readyToDelete = (index: number) => {
            statuses.value = createReplace({ index, item: 'ready to delete' })(operationsArrays.value.map(() => 'not ready to delete'))
          },
          notReadyToDelete = (index: number) => {
            statuses.value = createReplace({ index, item: 'not ready to delete' })(statuses.value)
          },
          operationsArrayCreate = () => {
            operationsArrays.value = [
              ...operationsArrays.value,
              []
            ]
          },
          operationsArrayDelete = (index: number) => {
            operationsArrays.value = createDelete<Operation[]>({ index })(operationsArrays.value)
          },
          operationsArrayUpdate = (index: number, operations: Operation[]) => {
            operationsArrays.value = createReplace<Operation[]>({ index, item: operations })(operationsArrays.value)
          },
          nestingLevel = shallowRef(props.isTopLevel ? 0 : inject<number>(OPERATIONS_ARRAYS_NESTING_LEVEL_SYMBOL) + 1),
          isNestedVariant = shallowRef(nestingLevel.value % 2 !== 0)
    
    provide(OPERATIONS_ARRAYS_NESTING_LEVEL_SYMBOL, nestingLevel.value)
    provide(OPERATIONS_ARRAYS_NESTED_STATUS_SYMBOL, isNestedVariant.value)

    return {
      operationsArrays,
      operationsArrayCreate,
      operationsArrayDelete,
      operationsArrayUpdate,
      nestingLevel,
      isNestedVariant,
      statuses,
      readyToDelete,
      notReadyToDelete,
    }
  }
})
</script>
