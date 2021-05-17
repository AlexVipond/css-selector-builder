<template>
  <RadioGroup
    class="flex flex-col gap-1"
    v-model="selectedOption"
  >
    <RadioGroupLabel class="ml-1 input-label">{{ label }}:</RadioGroupLabel>
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
          :class="[
            isNestedVariant
              ? (checked ? 'bg-violet-700 text-violet-100' : 'bg-denim-500 text-denim-50 hover:bg-denim-400')
              : (checked ? 'bg-violet-900 text-violet-100' : 'bg-denim-600 text-denim-50 hover:bg-denim-500')
          ]"
        >
          <span >{{ option.label }}</span>
        </div>
      </RadioGroupOption>
    </div>
  </RadioGroup>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue'
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
} from '@headlessui/vue'
import { NESTED_STATUS_SYMBOL } from '../state'

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
          }),
          isNestedVariant = inject<boolean>(NESTED_STATUS_SYMBOL)

    return { selectedOption, isNestedVariant }
  }
})
</script>
