<template>
  <main class="min-h-screen w-screen flex flex-col items-center gap-12 py-24 px-10 bg-gray-1000">
    <section class="w-full max-w-xl flex flex-col gap-4">
      <pre class="rounded-md shadow-lg p-4 bg-gradient-to-r from-emerald-900 to-emerald-700 text-emerald-100 overflow-x-scroll text-xl"><code>{{ selector || '*' }}</code></pre>
    </section>
    <section class="w-full max-w-xl flex flex-col gap-4">
      <section class="px-6 py-8 rounded-md shadow-lg bg-gray-900 text-gray-200">
        <FormConditions :isTopLevel="true" v-model="conditions" />
      </section>
    </section>
  </main>
  <footer class="bg-gray-1100 h-20">
  
  </footer>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from 'vue'
import FormConditions from './components/FormConditions.vue'
import { toSelector } from './toSelector'
import type { Condition } from './toSelector'

export default defineComponent({
  components: {
    FormConditions,
  },
  setup () {
    const conditions = ref<Condition[]>([
            { id: '123', pipe: 'has an ID, which I\'ll specify', args: ['haha'] },
            { id: 'ABC', pipe: 'has a class, which I\'ll specify', args: ['business'] },
            { id: '456', pipe: 'is the nth child inside a parent', args: ['4n+5'] },
          ]),
          selector = computed(() => toSelector(conditions.value))



    return {
      conditions,
      selector,
    }
  }
})
</script>
