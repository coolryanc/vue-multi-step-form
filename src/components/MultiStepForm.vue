<script setup lang="ts">
import { ref, reactive, computed, watch, type Component } from 'vue'
import { FormElement, type FormSteps, type ErrorHint } from '@/types/MultiStepForm.type'
// Form elements
import BasicInput from './formElement/BasicInput.vue'
import DateInput from './formElement/DateInput.vue'
import EmailInput from './formElement/EmailInput.vue'
import PasswordInput from './formElement/PasswordInput.vue'

const props = defineProps<{
  steps: FormSteps
}>()
const emits = defineEmits(['submit'])

const currentStep = ref(0)
const formErrorHint = ref<ErrorHint>('')
const formValues = reactive<Record<string, any>>({})
const currentStepValue = computed(() => formValues[props.steps[currentStep.value].key])
const isFinalStep = computed<boolean>(() => currentStep.value === props.steps.length - 1)
const showBackButton = computed<boolean>(() => currentStep.value !== 0)

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
const handleNext = (): boolean => {
  const { required = true } = props.steps[currentStep.value]

  if (formErrorHint.value) return false

  if (required && !currentStepValue.value) {
    formErrorHint.value = 'Required'
    return false
  }

  if (currentStep.value + 1 < props.steps.length) {
    currentStep.value += 1
  }
  return true
}

const handleError = (error: ErrorHint): void => {
  formErrorHint.value = error
}

const handleSubmit = (): void => {
  const isAbleToSubmit = handleNext()
  if (isAbleToSubmit) emits('submit', { ...formValues })
}

watch(currentStepValue, () => {
  if (formErrorHint.value) {
    formErrorHint.value = ''
  }
})
</script>

<template>
  <button v-if="showBackButton" @click="currentStep -= 1" aria-label="Back">
    Back
  </button>
  <form @submit.prevent>
    <div v-for="(step, idx) in steps" :key="step.key">
      <div v-if="idx === currentStep" class="step">
        <label>{{ step.label }}</label>
        <component
          :is="getFormElement(step.type)"
          :class="{ 'error': formErrorHint }"
          :ruleValidator="step.ruleValidator"
          :aria-required="step.required ?? true"
          v-model="formValues[step.key]"
          @error="handleError"
        />
      </div>
    </div>
    <div class="error-hint" v-if="formErrorHint">{{ formErrorHint }}</div>
  </form>
  <button v-if="!isFinalStep" @click="handleNext" aria-label="Next">
    Next
  </button>
  <button v-if="isFinalStep" @click="handleSubmit" aria-label="Submit">
    Submit
  </button>
</template>

<style>
form {
  margin: 12px 0;
}
.step {
  display: flex;
  flex-direction: column;
}
.error {
  border: 1px solid red;
}
.error-hint {
  color: red
}
</style>