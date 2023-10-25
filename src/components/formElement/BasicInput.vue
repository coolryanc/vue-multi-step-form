<script setup lang="ts">
import { watch } from 'vue'

const props = defineProps(['modelValue', 'ruleValidator'])
const emits = defineEmits(['update:modelValue', 'error'])

watch(() => props.modelValue, (value) => {
  const errorHint = props?.ruleValidator?.(value)
  if (errorHint) {
    emits('error', errorHint)
  }
})
</script>


<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>