<template>
  <section class="flex flex-col gap-3">
    <label class="input-label text-violet-denim-300">{{ label }}</label>
    <div class="flex items-center gap-3">
      <div class="flex w-full min-w-0">
        <InputPipe
          class="w-full"
          :modelValue="pipeOption"
          @update:modelValue="option => operation = ({ ...operation, args: toDefaultValues(option.value), pipe: option.value })"
        />
      </div>
      <button
        type="button"
        name="Delete condition"
        class="my-auto flex-shrink-0 p-1 btn--raised btn--grows bg-[#AD4040] text-[#FED7D7]  rounded-full"
        @click="emitDelete"
      >
        <TrashIcon class="h-5 w-5" />
      </button>
      <div class="flex flex-col gap-1">
        <button
          type="button"
          name="Delete condition"
          class="my-auto flex-shrink-0 p-1 btn--raised btn--grows bg-[#324066] text-denim-200  rounded-full"
          @click="emitMoveUp"
        >
          <ChevronUpIcon class="h-3 w-3" />
        </button>
        <button
          type="button"
          name="Delete condition"
          class="my-auto flex-shrink-0 p-1 btn--raised btn--grows bg-[#324066] text-denim-200  rounded-full"
          @click="emitMoveDown"
        >
          <ChevronDownIcon class="h-3 w-3" />
        </button>
      </div>
    </div>
    <FormArg
      v-for="(arg, index) in pipe.args"
      :key="arg.name"
      :label="arg.label"
      :inputType="arg.inputType"
      :required="arg.required"
      :modelValue="operation.args[index]"
      @update:modelValue="arg => operation = ({ ...operation, args: createReplace({ index, item: arg })(operation.args) })"
    />
  <!-- Arg repetition should be handled here -->
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { createReplace } from '@baleada/logic'
import {
  TrashIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from '@heroicons/vue/outline'
import type { Operation } from '../toSelector'
import InputPipe from './InputPipe.vue'
import FormArg from './FormArg.vue'
import { pipeMetadata } from '../pipeMetadata'

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
            set: value => {
              emit('update:modelValue', value)
            }
          }),
          pipe = computed(() => pipeMetadata.find(({ label }) => label === operation.value.pipe)),
          pipeOption = computed(() => ({
            value: pipe.value.name,
            label: pipe.value.label,
          })),
          emitDelete = () => {
            emit('delete', operation.value.id)
          },
          emitMoveUp = () => {
            emit('moveUp')
          },
          emitMoveDown = () => {
            emit('moveDown')
          }
    
    return {
      operation,
      pipe,
      pipeOption,
      createReplace,
      emitDelete,
      emitMoveUp,
      emitMoveDown,
      toDefaultValues,
    }
  }
})

function toDefaultValues (label) {
  return pipeMetadata.find(({ label: l }) => l === label).args.map(({ defaultValue }) => defaultValue)
}
</script>
