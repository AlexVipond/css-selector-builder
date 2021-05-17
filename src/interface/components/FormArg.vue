<template>
  <!-- <InputCustomArgument
    v-model="args"
    v-if="inputType === "
    :label="label"
  /> -->
  <input
    v-if="inputType === 'string'"
    class="shadow-inner border-none bg-gray-1000 rounded appearance-textfield"
    type="text"
    :placeholder="label"
    v-model="arg"
    :required="required"
  />
  <div 
    v-if="inputType === 'selector'"
    class="px-4 py-6 bg-cyan-100 rounded shadow"
  >
    <FormConditions v-model="arg" />
  </div>
  <InputAttributeOperator
    v-if="inputType === 'attributeOperator'"
    :label="label"
    v-model="modelledOption"
  />
  <InputAttributeCaseSensitivity
    v-if="inputType === 'attributeCaseSensitivity'"
    :label="label"
    v-model="modelledOption"
  />
  <InputDirectionality
    v-if="inputType === 'directionality'"
    :label="label"
    v-model="modelledOption"
  />
  <InputNthPattern
    v-if="inputType === 'nthPattern'"
    :label="label"
    v-model="modelledOption"
  />
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import InputAttributeCaseSensitivity from './InputAttributeCaseSensitivity.vue'
import InputAttributeOperator from './InputAttributeOperator.vue'
import InputDirectionality from './InputDirectionality.vue'
import InputNthPattern, { toNLabel, toA, toB, toANPlusBLabel } from './InputNthPattern.vue'
import {
  attributeCaseSensitivities,
  attributeOperators,
  directionalities
} from '../options'

export default defineComponent({
  components: {
    InputAttributeOperator,
    InputAttributeCaseSensitivity,
    InputDirectionality,
    InputNthPattern,
  },
  props: ['modelValue', 'inputType', 'label', 'required'],
  setup (props, { emit }) {
    const arg = computed({
            get: () => props.modelValue,
            set: value => {
              emit('update:modelValue', value)
            }
          }),
          optionDefault = (() => {
            if (props.inputType === 'attributeOperator') {
              return attributeOperators.find(({ value }) => value === arg.value)
            }
            
            if (props.inputType === 'attributeCaseSensitivity') {
              return attributeCaseSensitivities.find(({ value }) => value === arg.value)
            }
            
            if (props.inputType === 'directionality') {
              return directionalities.find(({ value }) => value === arg.value)
            }

            if (props.inputType === 'nthPattern') {
              // Check if n
              if (typeof arg.value === 'number') {
                return { key: 'n', value: arg.value, label: toNLabel(arg.value) }
              }

              // Check if An+B
              if (/^\d/.test(arg.value)) {
                const a = toA(arg.value),
                      b = toB(arg.value)

                return { key: 'aNPlusB', value: arg.value, label: toANPlusBLabel(a, b) }
              }

              // It's either odd or even
              return { key: arg.value, value: arg.value, label: `Every ${arg.value}` }
            }
          })(),
          modelledOption = ref(optionDefault)


    watch(
      modelledOption,
      () => arg.value = modelledOption.value.value
    )

    return { 
      arg,
      modelledOption,
    }
  }
})
</script>
