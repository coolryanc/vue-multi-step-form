<script setup lang="ts">
import BasicInput from './BasicInput.vue';
import { type ErrorHint } from '@/types/MultiStepForm.type'

const props = defineProps(['ruleValidator'])

const handleEmailValidate = (value: string): ErrorHint => {
  const mailFormat = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
  if (value && !mailFormat.test(value)) {
    return 'Email format is not correct'
  }
  return props?.ruleValidator?.(value)
}
</script>

<template>
  <BasicInput v-bind="{...$props, ...$attrs}" :ruleValidator="handleEmailValidate" />
</template>