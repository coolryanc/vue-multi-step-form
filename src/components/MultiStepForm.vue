<script setup lang="ts">
import { ref, reactive, computed, type Component } from 'vue'
import { FormElement, type FormSteps } from '@/types/MultiStepForm.type'
// Form elements
import BasicInput from './formElement/BasicInput.vue'
import DateInput from './formElement/DateInput.vue'
import EmailInput from './formElement/EmailInput.vue'
import PasswordInput from './formElement/PasswordInput.vue'

const props = defineProps<{
  steps: FormSteps
}>()

const currentStep = ref(0)
const formValues = reactive<Record<string, any>>({})
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
      return BasicInput
    }
  }
}

</script>

<template>
  <form>
    <div v-for="step in steps" :key="step.key">
      <component :is="getFormElement(step.type)" v-model="formValues[step.key]" />
    </div>
  </form>
  <button v-if="isFinalStep" @click="$emit('submit', formValues)" />
</template>