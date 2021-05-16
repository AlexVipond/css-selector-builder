<template>
  <main class="min-h-screen w-screen flex flex-col items-center gap-12 p-24 bg-blue-gray-200">
    <section class="w-full max-w-xl flex flex-col gap-4">
      <h2 class="uppercase font-bold text-violet-900 opacity-60 tracking-[.2em] text-sm">Selector</h2>
      <pre class="rounded-md shadow-lg p-4 bg-gradient-to-r from-violet-600 to-violet-500 text-violet-100 overflow-x-scroll text-xl"><code>{{ selector || '*' }}</code></pre>
    </section>
    <section class="w-full max-w-xl flex flex-col gap-4">
      <h1 class="uppercase font-bold text-violet-900 opacity-60 tracking-[.2em] text-sm">Selector Builder</h1>

      <section class="bg-white p-6 rounded-md shadow-lg text-blue-gray-900">
        <h2 class="font-bold tracking-wide">I'm looking for an element...</h2>
        <FormConditions v-model="conditions" />
      </section>
    </section>
  </main>
  <!-- <footer class="bg-gray-900 h-20">
  
  </footer> -->
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
            { id: '456', pipe: 'is the nth child inside a parent', args: ['even'] },
          ]),
          selector = computed(() => toSelector(conditions.value))



    return {
      conditions,
      selector,
    }
  }
})
</script>
