<script setup lang="ts">
import { ref, computed, type Component } from 'vue'
import { FormElement, type FormStep } from '@/types/MultiStepForm.type'
// Form elements
import DateInput from './formElement/DateInput.vue'
import EmailInput from './formElement/EmailInput.vue'
import PasswordInput from './formElement/PasswordInput.vue'
import TextInput from './formElement/TextInput.vue'

const props = defineProps<{
  steps: FormStep[]
}>()

const currentStep = ref(0)
const isFinalStep = computed<boolean>(() => currentStep.value === props.steps.length)

const getFormElement = (type: FormElement): Component => {
  switch (type) {
    case FormElement.Date: {
      return DateInput
    }
    case FormElement.Email: {
      return EmailInput
    }
    case FormElement.Password: {
      return PasswordInput
    }
    case FormElement.Text:
    default: {
      return TextInput
    }
  }
}

</script>

<template>
  <form>
    <div v-for="step in steps" :key="step.key">
      <component :is="getFormElement(step.type)" />
    </div>
  </form>
  <button v-if="isFinalStep" />
</template>