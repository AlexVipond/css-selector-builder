<template>
  <div class="w-full max-w-sm">
    <Popover v-slot="{ open }" class="relative">
      <PopoverButton
        :class="open ? '' : 'text-opacity-90'"
        class="btn--grows flex items-center text-base font-medium rounded-full group p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-opacity-75"
      >
        <span class="sr-only">What is this?</span>
        <QuestionMarkCircleIcon
          :class="open ? '' : 'text-opacity-70'"
          class="h-7 w-7 text-denim-300 hover:text-denim-100 focus:text-denim-200  transition duration-150 ease-in-out group-hover:text-opacity-80"
          aria-hidden="true"
        />
      </PopoverButton>

      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-1 opacity-0"
      >
        <PopoverPanel class="mt-3 absolute z-20 w-screen max-w-md -left-6 px-6">
          <div class="brand-gradient-to-r p-px rounded-md shadow-lg">
            <article class="flex flex-col gap-5 px-4 py-6 sm:p-6 sm:py-8 bg-denim-1100 text-denim-300 rounded-md">
              <h2 class="mr-auto font-bold text-2xl bg-gradient-to-r from-violet-600 to-violet-400 bg-clip-text text-transparent">What is this?</h2>
              
              <p>This is a user interface for building CSS selectors, and for learning what types of CSS selectors are available.</p>
            
              <p>Use the <strong class="bg-gradient-to-r from-violet-600 to-violet-400 bg-clip-text text-transparent">plus button</strong> to start adding conditions for your selector, and use the <strong class="bg-gradient-to-r from-violet-600 to-violet-400 bg-clip-text text-transparent">OR button</strong> to combine a separate selector with the others that you've built.</p>
            
              <p>As you build, you'll see the URL update with any new selector conditions you've created. You can <strong class="bg-gradient-to-r from-violet-600 to-violet-400 bg-clip-text text-transparent">share that URL</strong> with anyone to show them what you've built!</p>
            </article>
          </div>
        </PopoverPanel>
      </transition>
    </Popover>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { QuestionMarkCircleIcon } from '@heroicons/vue/outline'

export default {
  components: { Popover, PopoverButton, PopoverPanel, QuestionMarkCircleIcon },
  props: ['operated'],
  setup (props) {
    // const tweetIntent = ref(''),
    //       effect = () => tweetIntent.value = getTweetIntent()
    
    // onMounted(() => {
    //   effect()
    //   watch(() => props.operated, effect)
    // })
    
    // return {
    //   tweetIntent
    // }
  }

}

function getTweetIntent () {
  const url = window.location.toString(),
        text="I built a CSS selector!",
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
