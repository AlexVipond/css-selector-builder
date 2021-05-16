<template>
  <!-- <InputCustomArgument
    v-model="args"
    v-if="inputType === "
    :label="label"
  /> -->
  <input
    v-if="inputType === 'string'"
    class="border-blue-gray-300 rounded appearance-textfield"
    type="text"
    :placeholder="label"
    v-model="arg"
  />
  <!-- <FormSelector
    v-model="args"
    v-if="inputType === 'selector'"
    :label="label"
  /> -->
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
import InputNthPattern from './InputNthPattern.vue'
import { pipeMetadata } from '../pipeMetadata'
import { attributeCaseSensitivityDefault, attributeOperatorDefault, nthPatternDefault, directionalityDefault } from '../options'

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
              return attributeOperatorDefault
            }
            
            if (props.inputType === 'attributeCaseSensitivity') {
              return attributeCaseSensitivityDefault
            }
            
            if (props.inputType === 'directionality') {
              return directionalityDefault
            }

            if (props.inputType === 'nthPattern') {
              return nthPatternDefault
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
