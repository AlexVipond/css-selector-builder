<template>
  <section class="flex flex-col gap-1">
    <!-- <label class="ml-1 input-label">{{ label }}:</label> -->
    <Listbox v-model="selectedOption" v-slot="{ open }">
      <div class="relative mt-1" :class="open ? 'z-10' : ''">
        <ListboxButton
          class="relative w-full py-2 pl-3 pr-10 text-left border rounded-lg cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-violet-300 focus-visible:ring-offset-2 focus-visible:border-violet-500"
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
            class="absolute w-full py-1 mt-1 overflow-auto bg-denim-700 rounded-md shadow-lg max-h-72 ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              :key="options[0].key"
              :value="options[0]"
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
                    options[0].key === selectedOption.key ? 'font-medium' : 'font-normal',
                    'block',
                  ]"
                >
                  Every {{ options[0].value }}
                </span>
                <span
                  v-if="options[0].key === selectedOption.key"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-violet-400"
                >
                  <CheckIcon class="w-5 h-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
            <ListboxOption
              v-slot="{ active, selected }"
              :key="options[1].key"
              :value="options[1]"
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
                    options[1].key === selectedOption.key ? 'font-medium' : 'font-normal',
                    'block',
                  ]"
                >
                  Every {{ options[1].value }}
                </span>
                <span
                  v-if="options[1].key === selectedOption.key"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-violet-400"
                >
                  <CheckIcon class="w-5 h-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
            <ListboxOption
              v-slot="{ active, selected }"
              :key="options[2].key"
              :value="options[2]"
              as="template"
            >
              <li
                :class="[
                  active ? 'bg-denim-500 text-denim-100' : '',
                  'cursor-default select-none relative py-3 pl-10 pr-4 transition duration-75',
                ]"
              >
                <div
                  :class="[
                    options[2].key === selectedOption.key ? 'font-medium' : 'font-normal',
                    'flex items-center',
                  ]"
                >
                  <span>Every </span>
                  <input
                    @click="stopPropagation"
                    @keydown="stopPropagation"
                    @keydown.enter="() => enterHandle(2)"
                    class="ml-2 appearance-textfield w-14 font-mono text-right bg-denim-1000 border-none rounded"
                    type="number"
                    :value="n"
                    @input="({ target: { value } }) => n = isNaN(Number(value)) ? 0 : Number(value)"
                  />
                  <span>{{ toSuffix(n) }}</span>
                </div>
                <span
                  v-if="options[2].key === selectedOption.key"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-violet-400"
                >
                  <CheckIcon class="w-5 h-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
            <ListboxOption
              v-slot="{ active, selected }"
              :key="options[3].key"
              :value="options[3]"
              as="template"
            >
              <li
                :class="[
                  active ? 'bg-denim-500 text-denim-100' : '',
                  'cursor-default select-none relative py-3 pl-10 pr-4 transition duration-75',
                ]"
              >
                <div
                  :class="[
                    options[3].key === selectedOption.key ? 'font-medium' : 'font-normal',
                    'flex items-center',
                  ]"
                >
                  <span>Every </span>
                  <input
                    @click="stopPropagation"
                    @keydown="stopPropagation"
                    @keydown.enter="() => enterHandle(3)"
                    class="ml-2 appearance-textfield w-14 font-mono text-right bg-denim-1000 border-none rounded"
                    type="number"
                    :value="a"
                    @input="({ target: { value } }) => a = isNaN(Number(value)) ? 0 : Number(value)"
                  />
                  <span>{{ toSuffix(a) }} , starting from the </span>
                  <input
                    @click="stopPropagation"
                    @keydown="stopPropagation"
                    @keydown.enter="() => enterHandle(3)"
                    class="ml-2 appearance-textfield w-14 font-mono text-right bg-denim-1000 border-none rounded"
                    type="number"
                    :value="b"
                    @input="({ target: { value } }) => b = isNaN(Number(value)) ? 0 : Number(value)"
                  />
                  <span>{{ toSuffix(b) }}</span>
                </div>
                <span
                  v-if="options[3].key === selectedOption.key"
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
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed, inject } from 'vue'
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
  props: ['modelValue', 'label'],
  setup (props, { emit }) {
    const selectedOption = computed<{ key: string, value: string | number, label: string }>({
            get: () => props.modelValue,
            set: newOption => {
              // Option for n and An+B was coming out stale, so I'm
              // rereading it from the array.
              emit('update:modelValue', options.value.find(({ key }) => key === option.key))
            }
          }),
          n = ref(toN(selectedOption.value.value)),
          a = ref(toA(selectedOption.value.value)),
          b = ref(toB(selectedOption.value.value)),
          options = computed(() => [
            { key: 'odd', value: 'odd', label: 'odd' },
            { key: 'even', value: 'even', label: 'even' },
            { key: 'n', value: n.value, label: toNLabel(n.value) },
            { key: 'aNPlusB', value: toANPlusBValue(a.value, b.value), label: toANPlusBLabel(a.value, b.value) },
          ]),
          stopPropagation = (event: KeyboardEvent | MouseEvent) => event.stopPropagation(),
          enterHandle = (index: number) => selectedOption.value = options.value[index],
          isNestedVariant = inject<boolean>(NESTED_STATUS_SYMBOL)

    return {
      options,
      selectedOption,
      n,
      a,
      b,
      toSuffix,
      stopPropagation,
      enterHandle,
      isNestedVariant
    }
  }
})

export function toNLabel (n: number) {
  return `Every ${n}${toSuffix(n)}`
}

export function toANPlusBValue (a: number, b: number) {
  return `${a}n+${b}`
}

export function toANPlusBLabel (a: number, b: number) {
  return `Every ${a}${toSuffix(a)}, starting from the ${b}${toSuffix(b)}`
}

export function toN (value: string | number) {
  return typeof value === 'number' ? value : 0
}

const aRE = /^(\d+)/
export function toA (value: string | number) {
  if (typeof value === 'number') {
    return 0
  }

  const number = Number(value.match(aRE)?.[0])
  return isNaN(number) ? 0 : number
}

const bRE = /^\d+n\+(\d+)$/
export function toB (value: string | number) {
  if (typeof value === 'number') {
    return 0
  }

  const number = Number(value.match(bRE)?.[1])
  return isNaN(number) ? 0 : number
}

export function toSuffix (number: number): 'st' | 'nd' | 'rd' | 'th' {
  const string = number.toString(),
        lastDigit = Number(string[string.length - 1])

  if (lastDigit === 1 && !string.endsWith('11')) {
    return 'st'
  }

  if (lastDigit === 2 && !string.endsWith('12')) {
    return 'nd'
  }
  
  if (lastDigit === 3 && !string.endsWith('13')) {
    return 'rd'
  }

  return 'th'
}
</script>
