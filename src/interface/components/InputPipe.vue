<template>
  <BaseListbox
    v-model="selected"
    :options="options"
  />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import BaseListbox from './BaseListbox.vue'
import { pipeMetadata } from '../pipeMetadata'

export default defineComponent({
  components: {
    BaseListbox,
  },
  props: ['modelValue'],
  setup(props, { emit }) {
    const selected = computed<{ value: string, label: string }>({
            get: () => props.modelValue,
            set: newValue => {
              emit('update:modelValue', newValue)
            }
          }),
          options = pipeMetadata.map(({ label }) => ({ value: label, label }))

    return {
      options,
      selected,
    }
  },
})
</script>
