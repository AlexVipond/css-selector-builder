<template>
  <BaseRadioGroup
    v-model="selected"
    label="Case sensitivity"
    :options="options"
  />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import BaseRadioGroup from './BaseRadioGroup.vue'
import { attributeCaseSensitivities as options } from '../options'

export default defineComponent({
  components: {
    BaseRadioGroup,
  },
  props: ['modelValue', 'label'],
  setup(props, { emit }) {
    const selected = computed<{ value: string, label: string }>({
            get: () => props.modelValue,
            set: newOption => {
              emit('update:modelValue', newOption)
            }
          })

    return {
      selected,
      options,
    }
  },
})
</script>
