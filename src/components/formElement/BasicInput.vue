
import { useAttrs } from 'vue';
<script setup lang="ts">
import { watch, useAttrs } from 'vue'

const props = defineProps(['modelValue', 'ruleValidator'])
const emits = defineEmits(['update:modelValue', 'error'])
const { type = 'text' } = useAttrs()

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
    :type="type"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>