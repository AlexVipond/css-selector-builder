<template>
  <BrandListbox
    v-model="selected"
    :options="options"
    label="Operator"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import BrandListbox from './BrandListbox.vue'

export default defineComponent({
  components: {
    BrandListbox,
  },
  setup() {
    const options = [
            { 
              label: 'is',
              value: '=',
            },
            { 
              label: 'includes (as an exact value in a whitespace-separated list)',
              value: '~=',
            },
            { 
              label: 'contains (as an exact match anywhere)',
              value: '*=',
            },
            { 
              label: 'starts with',
              value: '^=',
            },
            { 
              label: 'ends with',
              value: '$=',
            },
            { 
              label: 'is kebab-cased, with the first segment being',
              value: '|=',
            },
          ],
          selected = ref(options[0])

    return {
      options,
      selected,
    }
  },
})
</script>
