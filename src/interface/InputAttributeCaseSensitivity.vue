<template>
  <BrandRadioGroup
    v-model="selected"
    label="Case sensitivity"
    :options="options"
  />
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import BrandRadioGroup from './BrandRadioGroup.vue'

export default defineComponent({
  components: {
    BrandRadioGroup,
  },
  setup() {
    const options = [
            { label: 'sensitive', value: true },
            { label: 'insensitive', value: false },
            { label: 'unspecified', value: 'unspecified' },
          ],
          selected = ref(options[0])

    return {
      selected,
      options,
    }
  },
})
</script>
