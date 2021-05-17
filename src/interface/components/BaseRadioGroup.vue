<template>
  <RadioGroup
    class="flex flex-col gap-3"
    v-model="selectedOption"
  >
    <RadioGroupLabel class="ml-3 input-label text-emerald-gray-900">{{ label }}</RadioGroupLabel>
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
          :class="checked ? 'bg-emerald-100 text-emerald-900' : 'bg-emerald-gray-100 text-emerald-gray-800 hover:bg-emerald-200 hover:text-emerald-900'"
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
