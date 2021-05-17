<template>
  <main class="min-h-screen w-screen flex flex-col items-center gap-12 py-24 px-6 bg-denim-1000">
    <section class="w-full max-w-xl flex flex-col gap-4">
      <pre class="rounded-md shadow-lg p-4 brand-gradient-to-r text-violet-100 overflow-x-scroll text-xl"><code>{{ selector || '*' }}</code></pre>
    </section>
    <section class="w-full max-w-xl flex flex-col gap-4">
      <section class="px-6 py-8 rounded-md shadow-lg bg-denim-800 text-denim-200">
        <FormConditions :isTopLevel="true" v-model="conditions" />
      </section>
    </section>
  </main>
  <footer class="bg-denim-1200 h-20">
  
  </footer>
</template>

<script lang="ts">
import { ref, computed, defineComponent, onMounted, watch } from 'vue'
import FormConditions from './components/FormConditions.vue'
import { toSelector } from './toSelector'
import type { Condition } from './toSelector'

export default defineComponent({
  components: {
    FormConditions,
  },
  setup () {
    const conditions = ref<Condition[]>([]),
          selector = computed(() => toSelector(conditions.value))

    onMounted(() => {
      const urlConditions = new URL(window.location.toString()).searchParams.get('conditions')
      if (urlConditions) {
        conditions.value = JSON.parse(urlConditions)
      }
    })

    watch(
      conditions,
      () => {
        const url = new URL(window.origin)
        url.searchParams.set('conditions', JSON.stringify(conditions.value))
        history.pushState({}, document.title, url.toString())
      }
    )


    return {
      conditions,
      selector,
    }
  }
})
</script>
