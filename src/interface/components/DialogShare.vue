<template>
  <TransitionRoot appear :show="status === 'open'" as="template">
    <Dialog 
      as="div"
      :open="status === 'open'"
      @close="$emit('close')"
      class="fixed inset-0 h-screen w-screen flex items-center justify-center"
    >
      <TransitionChild
        as="template"
        enter="duration-100 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <DialogOverlay class="fixed bg-black opacity-40 h-full w-full" />
      </TransitionChild>

      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0 scale-95"
        enter-to="opacity-100 scale-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100 scale-100"
        leave-to="opacity-0 scale-95"
      >
        <section class="relative h-64 w-full max-w-md flex flex-col items-center justify-center p-6 gap-8 bg-denim-800 text-denim-200 shadow-lg rounded-lg">
          <button
            @click="$emit('close')"
            class="
              absolute top-2 right-2
              p-1
              btn--grows rounded-full
              focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-opacity-75
            "
          >
            <span class="sr-only">Close share dialog</span>
            <XCircleIcon class="h-7 w-7 stroke-current text-denim-300 hover:text-denim-100 focus:text-denim-200 transition" />
          </button>

          <transition
            enter-active-class="transition duration-100 ease-in"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
            mode="out-in"
          >
            <button
              v-if="activeCallToAction === 'fetch animation'"
              key="fetch animation"
              class="relative mx-auto btn btn--xl bg-denim-600 disabled:opacity-100"
              disabled
            >
              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div class="relative">
                  <svg
                    viewBox="0 0 24 24"
                    class="h-7 w-7 stroke-current text-denim-400"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="10" stroke-width="4" />
                  </svg>
                  <svg
                    viewBox="0 0 24 24"
                    class="absolute inset-0 h-7 w-7 stroke-current text-denim-200 opacity-100 animate-spin"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 12 A10 10 0 0 1 12 2" stroke-width="4" />
                  </svg>
                </div>
              </div>
              <SimpleTwitter aria-hidden="true" class="icon select-none opacity-0" />
              <span aria-hidden="true" class="select-none opacity-0">Tweet your selector!</span>
            </button>
            <a
              v-else-if="activeCallToAction === 'tweet intent'"
              key="tweet intent"
              :href="tweetIntent"
              class="mx-auto btn btn--xl btn--raised btn--grows bg-denim-600"
            >
              <SimpleTwitter class="icon fill-current text-denim-300 hover:text-denim-100 focus:text-denim-200 transition" />
              <span>Tweet your selector!</span>
            </a>
          </transition>
          <section><span>Or click to copy short link:</span></section>
          <button
            type="button"
            name="copy selector"
            class="relative btn--grows rounded-md text-violet-100 text-xl"
            @click="() => copyable.copy()"
          >
            <pre class="w-full p-4 brand-gradient-to-r overflow-x-scroll rounded-md shadow-lg text-left"><code>{{ displayedShortLink }}</code></pre>
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
      </TransitionChild>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue"
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
  DialogTitle,
  DialogDescription,
} from "@headlessui/vue"
import { CheckIcon, ClipboardCopyIcon } from '@heroicons/vue/solid'
import { XCircleIcon } from '@heroicons/vue/outline'
import { SimpleTwitter } from '@baleada/vue-simple-icons'
import { useFetchable, useCopyable } from '@baleada/vue-composition'
import { useWithMinimumDelay } from '../composition/useWithMinimumDelay'
import { clipboard } from '../state'

export default defineComponent({
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogOverlay,
    DialogTitle,
    DialogDescription,
    ClipboardCopyIcon,
    CheckIcon,
    XCircleIcon,
    SimpleTwitter,
  },
  props: ['status', 'operationsArrays'],
  setup (props) {
    const fetchable = useFetchable(window.location.origin + '/api/create-short-link'),
          shortLink = ref('...'),
          displayedShortLink = ref(shortLink.value),
          tweetIntent = computed(() => toTweetIntent(shortLink.value)),
          activeCallToAction = ref<'fetch animation' | 'tweet intent'>('fetch animation')

    watch(
      () => props.status,
      async () => {
        if (props.status === 'open') {
          await useWithMinimumDelay(
            async () => (shortLink.value = await getShortLink()),
            () => {
              activeCallToAction.value = 'tweet intent'
              displayedShortLink.value = shortLink.value
            },
            500
          )
        }
      }
    )

    watch(
      () => props.operationsArrays,
      () => {
        shortLink.value = '...'
        activeCallToAction.value = 'fetch animation'
      }
    )

    async function getShortLink () {
      // @ts-ignore
      await fetchable.value.post(({ withJson }) => withJson({ url: 'https://css-selector-builder.netlify.app/' + window.location.search }))
      const bitlyResponse = (await fetchable.value.json).response

      // @ts-ignore
      if (fetchable.value.response.status === 200) {
        return bitlyResponse.data.link
      }
      
      return 'https://css-selector-builder.netlify.app/'
    }

    const copyable = useCopyable(shortLink.value, { clipboard })
    watch(shortLink, () => copyable.value.string = shortLink.value)

    return {
      displayedShortLink,
      tweetIntent,
      activeCallToAction,
      copyable,
    }
  }
})

function toTweetIntent (url) {
  const text="I built a CSS selector!",
        via="AlexVipond",
        encodedText = encodeURIComponent(text),
        params = [
          `text=${encodedText}&`,
          `url=${url}&`,
          `via=${via}`
        ],
        encodedParams = params.join('&')

  return 'https://twitter.com/intent/tweet?' + encodedParams
}
</script>
