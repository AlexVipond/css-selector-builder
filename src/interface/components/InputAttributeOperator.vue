<template>
  <BaseListbox
    v-model="selected"
    :options="options"
    label="Operator"
  />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import BaseListbox from './BaseListbox.vue'
import { attributeOperators as options } from '../options'

export default defineComponent({
  components: {
    BaseListbox,
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
      options,
      selected,
    }
  },
})
</script>
