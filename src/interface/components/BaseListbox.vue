<template>
  <Listbox v-model="selectedOption" v-slot="{ open }">
    <div class="relative mt-1">
      <ListboxButton
        class="relative w-full py-2 pl-3 pr-10 text-left border rounded-lg cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-denim-200 focus-visible:ring-offset-violet-300 focus-visible:ring-offset-2 focus-visible:border-violet-500"
        :class="isNestedVariant ? 'border-denim-400' : 'border-denim-500'"
      >
        <span class="block truncate">{{ selectedOption.label }}</span>
        <span
          class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
        >
          <SelectorIcon class="w-5 h-5" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="z-10 absolute w-full py-1 mt-1 overflow-auto bg-denim-700 rounded-md shadow-lg max-h-72 ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <ListboxOption
            v-slot="{ active }"
            v-for="option in options"
            :key="option.value"
            :value="option"
            as="template"
          >
            <li
              :class="[
                active ? 'bg-denim-500 text-denim-100' : '',
                'cursor-default select-none relative py-3 pl-10 pr-4 transition duration-75',
              ]"
            >
              <span
                :class="[
                  option.label === selectedOption.label ? 'font-medium' : 'font-normal',
                  'block',
                ]"
              >
                {{ option.label }}
              </span>
              <span
                v-if="option.label === selectedOption.label"
                class="absolute inset-y-0 left-0 flex items-center pl-3 text-violet-400"
              >
                <CheckIcon class="w-5 h-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script lang="ts">
import { defineComponent, computed, inject } from 'vue'
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'
import { NESTED_STATUS_SYMBOL } from '../state'

export default defineComponent({
  components: {
    Listbox,
    ListboxLabel,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    CheckIcon,
    SelectorIcon,
  },
  props: ['options', 'modelValue'],
  setup (props, { emit }) {
    const selectedOption = computed({
            get: () => props.modelValue,
            set: newValue => {
              emit('update:modelValue', newValue)
            }
          }),
          isNestedVariant = inject<boolean>(NESTED_STATUS_SYMBOL)

    return { selectedOption, isNestedVariant }
  }
})
</script>
