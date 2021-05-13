<template>
  <section class="flex items-center">
    <label class="flex-1 font-6 text-4">{label}</label>
    <InterfaceOptionSelector            
      class="flex-1"
      enforcedSelector={enforcedSelector}
      {...{ selector, setSelector }}
    />
  </section>

</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  components: {},
  setup(props, { emit }) {
    const createEmit = () => {
            emit('create')
          },
          deleteEmit = ({ id }) => {
            emit('delete', { id })
          },
          updateEmit = ({ id, withUpdates }) => {
            emit('update', { id, withUpdates })
          },
          reorderEmit = ({ id, to }) => {
            emit('reorder', { id, to })
          }



  },
})
</script>
