<template>
  <RadioGroup
    class="flex flex-col gap-3"
    v-model="selectedOption"
  >
    <RadioGroupLabel class="input-label text-blue-gray-400">{{ label }}</RadioGroupLabel>
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
          :class="checked ? 'bg-primary-800 text-primary-100' : 'bg-blue-gray-700 text-blue-gray-200 hover:bg-blue-gray-600 hover:text-blue-gray-100'"
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
