<template>
  <section
    class="flex flex-col gap-3 rounded-md ring-offset-4"
    :class="[
      status === 'ready to delete' ? 'ring-2 ring-cranberry-700' : '',
      status === 'ready to move' ? 'ring-2 ring-denim-500' : '',
      isNestedVariant ? 'ring-offset-denim-600' : 'ring-offset-denim-800'
    ]"
  >
    <label class="input-label text-violet-denim-300">{{ label }}</label>
    <div class="flex items-center gap-3">
      <div class="flex w-full min-w-0">
        <InputPipe
          class="w-full"
          :modelValue="pipeOption"
          @update:modelValue="newOption => operation = ({ ...operation, args: toDefaultValues(newOption.value), pipe: newOption.value })"
        />
      </div>
      <button
        type="button"
        name="Delete condition"
        class="my-auto flex-shrink-0 p-1 btn--raised btn--grows bg-cranberry-700 text-cranberry-300  rounded-full"
        @click="emitDelete"
        @mouseenter="() => readyToDelete()"
        @focus="() => readyToDelete()"
        @mouseleave="() => notReady()"
        @blur="() => notReady()"
      >
        <TrashIcon class="h-5 w-5" />
      </button>
      <div class="flex flex-col gap-1">
        <button
          type="button"
          name="Move condition up"
          class="my-auto flex-shrink-0 p-1 btn--raised btn--grows rounded-full"
          :class="isNestedVariant ? 'bg-denim-500 text-denim-100' : 'bg-denim-600 text-denim-200'"
          @click="emitMoveUp"
          @mouseenter="() => readyToMove()"
          @focus="() => readyToMove()"
          @mouseleave="() => notReady()"
          @blur="() => notReady()"
        >
          <ChevronUpIcon class="h-3 w-3" />
        </button>
        <button
          type="button"
          name="Move condition down"
          class="my-auto flex-shrink-0 p-1 btn--raised btn--grows rounded-full"
          :class="isNestedVariant ? 'bg-denim-500 text-denim-100' : 'bg-denim-600 text-denim-200'"
          @click="emitMoveDown"
          @mouseenter="() => readyToMove()"
          @focus="() => readyToMove()"
          @mouseleave="() => notReady()"
          @blur="() => notReady()"
        >
          <ChevronDownIcon class="h-3 w-3" />
        </button>
      </div>
    </div>
    <template v-if="shouldUseFormOperationsArrays">
      <FormOperationsArrays
        :modelValue="operation.args"
        @update:modelValue="newOperationsArrays => operation = ({ ...operation, args: newOperationsArrays })"
        :isTopLevel="false"
      />
    </template>
    <template v-else>
      <FormArg
        v-for="(arg, index) in pipe.args"
        :key="arg.name"
        :label="arg.label"
        :inputType="arg.inputType"
        :required="arg.required"
        :modelValue="operation.args[index]"
        @update:modelValue="newArg => operation = ({ ...operation, args: createReplace({ index, item: newArg })(operation.args) })"
      />
    </template>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed, inject } from 'vue'
import { createReplace } from '@baleada/logic'
import {
  TrashIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from '@heroicons/vue/outline'
import type { Operation } from '../toOperated'
import InputPipe from './InputPipe.vue'
import FormArg from './FormArg.vue'
import { pipeMetadata } from '../pipeMetadata'
import { NESTED_STATUS_SYMBOL } from '../state'

export default defineComponent({
  components: {
    InputPipe,
    FormArg,
    TrashIcon,
    ChevronUpIcon,
    ChevronDownIcon,
  },
  props: ['modelValue', 'label'],
  setup (props, { emit }) {
    const operation = computed<Operation>({
            get: () => props.modelValue,
            set: newValue => {
              emit('update:modelValue', newValue)
            }
          }),
          pipe = computed(() => pipeMetadata.find(({ label }) => label === operation.value.pipe)),
          shouldUseFormOperationsArrays = computed(() => 
            pipe.value.args.length === 1
            && pipe.value.args[0].inputType === 'selector'
            && pipe.value.args[0].repeatable === true
          ),
          pipeOption = computed(() => ({
            value: pipe.value.name,
            label: pipe.value.label,
          })),
          emitDelete = () => {
            emit('delete', operation.value)
          },
          emitMoveUp = () => {
            emit('moveUp', operation.value)
          },
          emitMoveDown = () => {
            emit('moveDown', operation.value)
          },
          isNestedVariant = inject<boolean>(NESTED_STATUS_SYMBOL),
          status = ref('not ready'),
          readyToDelete = () => {
            status.value = 'ready to delete'
          },
          readyToMove = () => {
            status.value = 'ready to move'
          },
          notReady = () => {
            status.value = 'not ready'
          }
    
    return {
      operation,
      pipe,
      shouldUseFormOperationsArrays,
      pipeOption,
      createReplace,
      emitDelete,
      emitMoveUp,
      emitMoveDown,
      toDefaultValues,
      isNestedVariant,
      status,
      readyToDelete,
      readyToMove,
      notReady,
    }
  }
})

function toDefaultValues (label) {
  return pipeMetadata.find(({ label: l }) => l === label).args.map(({ defaultValue }) => defaultValue)
}
</script>
