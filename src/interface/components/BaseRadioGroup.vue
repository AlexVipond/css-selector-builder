<template>
  <RadioGroup
    class="flex flex-col gap-3"
    v-model="selectedOption"
  >
    <RadioGroupLabel class="input-label text-blue-gray-300">{{ label }}</RadioGroupLabel>
    <div class="flex gap-4">
      <RadioGroupOption
        v-for="option in options"
        :key="option.value"
        :value="option"
        v-slot="{ checked }"
        class="flex"
      >
        <div
          class="btn btn--lg mr-auto transition duration-150"
          :class="checked ? 'bg-violet-100 text-violet-900' : 'bg-blue-gray-100 text-blue-gray-800 hover:bg-violet-200 hover:text-violet-900'"
        >
          <span >{{ option.label }}</span>
        </div>
      </RadioGroupOption>
    </div>
  </RadioGroup>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
} from '@headlessui/vue'

export default defineComponent({
  components: {
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption
  },
  props: ['options', 'label', 'modelValue'],
  setup (props, { emit }) {
    const selectedOption = computed({
      get: () => props.modelValue,
      set: value => {
        emit('update:modelValue', value)
      }
    })

    return { selectedOption }
  }
})
</script>
