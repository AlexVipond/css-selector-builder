<template>
  <section class="flex flex-col gap-3">
    <label class="input-label text-blue-gray-300">{{ label }}</label>
    <div class="flex gap-3">
      <InputPipe
        class="w-full"
        :modelValue="pipeOption"
        @update:modelValue="option => condition = ({ ...condition, pipe: option.value })"
        :label="label"
      />
      <button
        type="button"
        name="Delete condition"
        class="my-auto p-1 btn--raised btn--grows bg-gradient-to-r from-blue-700 to-blue-500 text-blue-100 rounded-full"
        @click="emitDelete"
      >
        <TrashIcon class="h-5 w-5" />
      </button>
    </div>
    <FormArg
      v-for="(arg, index) in pipe.args"
      :key="arg.name"
      :label="arg.label"
      :inputType="arg.inputType"
      :required="arg.required"
      :modelValue="condition.args[index]"
      @update:modelValue="arg => condition = ({ ...condition, args: createReplace({ index, item: arg })(condition.args) })"
    />
  <!-- Arg repetition should be handled here -->
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { createReplace } from '@baleada/logic'
import { TrashIcon } from '@heroicons/vue/outline'
import type { Condition } from '../toSelector'
import InputPipe from './InputPipe.vue'
import FormArg from './FormArg.vue'
import { pipeMetadata } from '../pipeMetadata'

export default defineComponent({
  components: {
    InputPipe,
    FormArg,
    TrashIcon,
  },
  props: ['modelValue', 'label'],
  setup (props, { emit }) {
    const condition = computed<Condition>({
            get: () => props.modelValue,
            set: value => {
              emit('update:modelValue', value)
            }
          }),
          pipe = computed(() => pipeMetadata.find(({ name }) => name === condition.value.pipe)),
          pipeOption = computed(() => ({
            value: pipe.value.name,
            label: pipe.value.label,
          })),
          emitDelete = () => {
            emit('delete', condition.value.id)
          }
    
    return {
      condition,
      pipe,
      pipeOption,
      createReplace,
      emitDelete,
    }
  }
})
</script>
