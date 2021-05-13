<template>
  <BrandListbox
    v-model="selected"
    :options="options"
    label="My element..."
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import BrandListbox from './BrandListbox.vue'
import { pipeMetadata } from './pipeMetadata'

export default defineComponent({
  components: {
    BrandListbox,
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
