<template>
  <BaseRadioGroup
    v-model="selected"
    label="Text directionality"
    :options="options"
  />
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import BaseRadioGroup from './BaseRadioGroup.vue'

export default defineComponent({
  components: {
    BaseRadioGroup,
  },
  setup() {
    const options = [
            { label: 'left to right', value: 'ltr' },
            { label: 'right to left', value: 'ltr' }
          ],
          selected = ref(options[0])

    return {
      selected,
      options,
    }
  },
})
</script>
