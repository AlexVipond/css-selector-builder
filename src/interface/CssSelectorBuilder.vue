<template>
  <header class="bg-denim-1000 px-6 pt-8 flex">
    <nav class="mr-auto flex items-center gap-4">
      <PopoverHelp :selector="selector" />
      <a
        href="https://github.com/AlexVipond/css-selector-builder"
        class="btn--grows rounded-full p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-opacity-75"
      >
        <span class="sr-only">View source code</span>
        <SimpleGitHub class="h-7 w-7 fill-current text-denim-300 hover:text-denim-100 focus:text-denim-200 transition" />
      </a>
      <a
        href="https://www.npmjs.com/package/@alexvipond/css-selector-pipes"
        class="btn--grows rounded-full p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-opacity-75"
      >
        <span class="sr-only">View on NPM</span>
        <SimpleNPM class="h-7 w-7 fill-current text-denim-300 hover:text-denim-100 focus:text-denim-200 transition" />
      </a>
      <a
        href="https://twitter.com/AlPalVipond"
        class="btn--grows rounded-full p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-opacity-75"
      >
        <span class="sr-only">Follow me on Twitter</span>
        <SimpleTwitter class="h-7 w-7 fill-current text-denim-300 hover:text-denim-100 focus:text-denim-200 transition" />
      </a>
    </nav>
  </header>
  <main class="min-h-screen w-screen flex flex-col items-center gap-12 py-14 px-6 bg-denim-1000">
    <section class="flex items-center gap-4 w-full max-w-xl">
      <button
        type="button"
        name="copy selector"
        class="relative w-full max-w-xl btn--grows rounded-md text-violet-100 text-xl"
        @click="() => copyable.copy()"
      >
        <pre class="w-full p-4 brand-gradient-to-r overflow-x-scroll rounded-md shadow-lg"><code>{{ selector || '*' }}</code></pre>
        <transition
          enter-active-class="transition duration-100 delay-125 ease-in"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            class="group absolute top-0 right-0 bottom-0 left-0 pointer-events-none"
            v-if="!copyable.isClipboardText"
          >
            <div class="absolute top-0 right-0 pb-1 text-sm text-denim-300 transform -translate-y-full flex items-center opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition">
              <ClipboardCopyIcon class="h-[1em] w-[1em]" />
              <span>Copy selector</span>
            </div>
          </div>
        </transition>
        <transition
          enter-active-class="transition duration-100 delay-125 ease-in"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            class="group absolute top-0 right-0 bottom-0 left-0"
            v-if="copyable.isClipboardText"
          >
            <div class="absolute top-0 right-0 pb-1 text-sm text-denim-300 transform -translate-y-full flex items-center opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition">
              <CheckIcon class="h-[1em] w-[1em]" />
              <span>Copied!</span>
            </div>
          </div>
        </transition>
      </button>
    </section>
    <section class="w-full max-w-xl flex flex-col gap-8">
      <transition-group
        enter-active-class="transition duration-100 ease-in"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
        moveClass="transition duration-100"
      >
        <div
          v-for="(operations, index) in operationsArrays"
          :key="index"
          class="flex flex-col gap-8"
        >
          <FormOperations
            :modelValue="operations"
            @update:modelValue="newOperations => operationsArrays = createReplace({ index, item: newOperations })(operationsArrays)"
            :isTopLevel="true"
          />
          <div
            v-if="index !== operationsArrays.length - 1"
            class="flex items-center justify-center gap-3 font-mono"
          >
            <div class="h-px w-16 bg-denim-500" />
            <h3 class="uppercase text-xl tracking-[0.2em] flex-shrink-0 text-denim-500" >
              or
            </h3>
            <div class="h-px w-16 bg-denim-500" />
          </div>
        </div>
      </transition-group>
      <button
        name="Add conditions for another selector"
        class="mx-auto p-3 text-lg btn--raised btn--grows rounded-full p-3 brand-gradient-to-r flex-shrink-0 text-violet-100"
        @click="operationsArrays = [...operationsArrays, []]"
        type="button"
      >
        OR
      </button>
    </section>
  </main>
  <footer class="flex flex-col gap-6 bg-denim-1200 px-6 py-8 text-denim-300">
    <h2 class="mx-auto"> 🌱  Created by <a class="underline hover:text-denim-100 focus:text-denim-200 transition" href="https://alexvipond.dev">Alex Vipond</a></h2>
    <nav class="mx-auto flex items-center gap-4">
      <a class="btn--grows" href="https://github.com/AlexVipond/css-selector-builder">
        <span class="sr-only">View source code</span>
        <SimpleGitHub class="h-7 w-7 fill-current hover:text-denim-100 focus:text-denim-200 transition" />
      </a>
      <a class="btn--grows" href="https://www.npmjs.com/package/@alexvipond/css-selector-pipes">
        <span class="sr-only">View on NPM</span>
        <SimpleNPM class="h-7 w-7 fill-current hover:text-denim-100 focus:text-denim-200 transition" />
      </a>
      <a class="btn--grows" href="https://twitter.com/AlPalVipond">
        <span class="sr-only">Follow me on Twitter</span>
        <SimpleTwitter class="h-7 w-7 fill-current hover:text-denim-100 focus:text-denim-200 transition" />
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
import { createReplace } from '@baleada/logic'
import { CheckIcon, ClipboardCopyIcon } from '@heroicons/vue/solid'
import { toOperated } from './toOperated'
import type { Operation } from './toOperated'
import FormOperations from './components/FormOperations.vue'
import PopoverHelp from './components/PopoverHelp.vue'

export default defineComponent({
  components: {
    FormOperations,
    SimpleTwitter,
    SimpleGitHub,
    SimpleNPM,
    PopoverHelp,
    CheckIcon,
    ClipboardCopyIcon,
  },
  setup () {
    const operationsArrays = ref<Operation[][]>([[]]),
          selector = computed(() => operationsArrays.value.map(toOperated).join(', ')),
          clipboard = { text: '' },
          copyable = useCopyable(selector.value, { clipboard })

    watch(selector, async () => copyable.value.string = selector.value)

    onMounted(() => {
      const urlOperationsArrays = new URL(window.location.toString()).searchParams.get('conditions')
      if (urlOperationsArrays) {
        operationsArrays.value = withoutNull(JSON.parse(urlOperationsArrays))
      }
    })

    watch(
      operationsArrays,
      () => {
        const url = new URL(window.origin)
        url.searchParams.set('conditions', JSON.stringify(operationsArrays.value))
        history.pushState({}, document.title, url.toString())
      }
    )


    return {
      operationsArrays,
      selector,
      copyable,
      createReplace,
    }
  }
})

function withoutNull (parsedOperationsArrays: Record<any, any>[][]): Operation[][] {
  return parsedOperationsArrays.map(operations => {
    return operations.map(operation => {
      const args = operation.args.map(arg => {
        if (arg === null) {
          return undefined
        }

        if (Array.isArray(arg)) {
          return withoutNull([arg])[0]
        }

        return arg
      })
      
      return {
        ...operation,
        args
      } as Operation
    })
  }
    
  )
}
</script>
