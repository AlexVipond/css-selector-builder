<template>
  <RadioGroup
    class="flex flex-col gap-3"
    v-model="selected"
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
          <span >{{ option.name }}</span>
        </div>
      </RadioGroupOption>
    </div>
  </RadioGroup>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
} from '@headlessui/vue'
import { CheckIcon } from '@heroicons/vue/solid'

export default defineComponent({
  components: {
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption
  },
  props: {
    label: {
      type: String,
    }
  },
  setup() {
    const options = [
            { name: 'left to right', value: 'ltr' },
            { name: 'right to left', value: 'ltr' }
          ],
          selected = ref(options[0])

    return {
      selected,
      options,
    }
  },
})
</script>
