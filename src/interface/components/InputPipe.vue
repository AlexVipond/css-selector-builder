<template>
  <BaseListbox
    v-model="selected"
    :options="options"
    label="My element..."
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import BaseListbox from './BaseListbox.vue'
import { pipeMetadata } from '../pipeMetadata'

export default defineComponent({
  components: {
    BaseListbox,
  },
  setup() {
    const options = pipeMetadata,
          selected = ref(options[0])

    return {
      options,
      selected,
    }
  },
})
</script>
