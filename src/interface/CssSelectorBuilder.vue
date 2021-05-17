<template>
  <header class="bg-denim-1000 px-6 pt-8 flex">
    <nav class="mx-auto sm:ml-auto flex items-center gap-8">
      <a class="btn--grows" href="https://github.com/AlexVipond/css-selector-builder">
        <span class="sr-only">View source code</span>
        <SimpleGitHub class="h-7 w-7 fill-current text-denim-400 hover:text-denim-200 focus:text-denim-200 transition" />
      </a>
      <a class="btn--grows" href="https://www.npmjs.com/package/@alexvipond/css-selector-pipes">
        <span class="sr-only">View on NPM</span>
        <SimpleNPM class="h-7 w-7 fill-current text-denim-400 hover:text-denim-200 focus:text-denim-200 transition" />
      </a>
      <a class="btn--grows" href="https://twitter.com/AlPalVipond">
        <span class="sr-only">Follow me on Twitter</span>
        <SimpleTwitter class="h-7 w-7 fill-current text-denim-400 hover:text-denim-200 focus:text-denim-200 transition" />
      </a>
    </nav>
  </header>
  <main class="min-h-screen w-screen flex flex-col items-center gap-12 py-20 px-6 bg-denim-1000">
    <section class="flex items-center gap-4 w-full max-w-xl">
      <button
        name="copy selector"
        type="button"
        class="btn--grows p-3 rounded-full text-2xl brand-gradient-to-r text-violet-100"
        @click="() => copyable.copy()"
      >
        <ClipboardCopyIcon class="h-[1em] w-1[em]" />
      </button>
      <pre class="w-full rounded-md shadow-lg p-4 brand-gradient-to-r text-violet-100 overflow-x-scroll text-xl"><code>{{ selector || '*' }}</code></pre>
    </section>
    <section class="w-full max-w-xl flex flex-col gap-4">
      <section class="px-6 py-8 rounded-md shadow-lg bg-denim-800 text-denim-200">
        <FormConditions :isTopLevel="true" v-model="conditions" />
      </section>
    </section>
  </main>
  <footer class="flex flex-col gap-6 bg-denim-1200 px-6 py-8 text-denim-400">
    <h2 class="mx-auto"> 🌱  Created by <a class="underline hover:text-denim-200 focus:text-denim-200 transition" href="https://alexvipond.dev">Alex Vipond</a></h2>
    <nav class="mx-auto flex items-center gap-8">
        <a class="btn--grows" href="https://github.com/AlexVipond/css-selector-builder">
          <span class="sr-only">View source code</span>
          <SimpleGitHub class="h-7 w-7 fill-current hover:text-denim-200 focus:text-denim-200 transition" />
        </a>
        <a class="btn--grows" href="https://www.npmjs.com/package/@alexvipond/css-selector-pipes">
          <span class="sr-only">View on NPM</span>
          <SimpleNPM class="h-7 w-7 fill-current hover:text-denim-200 focus:text-denim-200 transition" />
        </a>
        <a class="btn--grows" href="https://twitter.com/AlPalVipond">
          <span class="sr-only">Follow me on Twitter</span>
          <SimpleTwitter class="h-7 w-7 fill-current hover:text-denim-200 focus:text-denim-200 transition" />
        </a>
      </nav>
  </footer>
</template>

<script lang="ts">
import { ref, computed, defineComponent, onMounted, watch } from 'vue'
import {
  SimpleTwitter,
  SimpleGitHub,
  SimpleNPM,
} from '@baleada/vue-simple-icons'
import { useCopyable } from '@baleada/vue-composition'
import { ClipboardCopyIcon } from '@heroicons/vue/solid'
import FormConditions from './components/FormConditions.vue'
import { toSelector } from './toSelector'
import type { Condition } from './toSelector'

export default defineComponent({
  components: {
    FormConditions,
    SimpleTwitter,
    SimpleGitHub,
    SimpleNPM,
    ClipboardCopyIcon,
  },
  setup () {
    const conditions = ref<Condition[]>([]),
          selector = computed(() => toSelector(conditions.value)),
          copyable = useCopyable(selector.value)

    watch(selector, () => copyable.value.string = selector.value)

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
      copyable,
    }
  }
})
</script>
