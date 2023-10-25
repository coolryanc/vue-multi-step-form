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
const handleNext = (): void => {
  const { required = true } = props.steps[currentStep.value]

  if (formErrorHint.value) return

  if (required && !currentStepValue.value) {
    formErrorHint.value = 'Required'
    return
  }

  currentStep.value += 1
}

const handleError = (error: ErrorHint): void => {
  formErrorHint.value = error
}

watch(currentStepValue, () => {
  if (formErrorHint.value) {
    formErrorHint.value = ''
  }
})
</script>

<template>
  <button v-if="showBackButton" @click="currentStep -= 1">
    Back
  </button>
  <form>
    <div v-for="(step, idx) in steps" :key="step.key">
      <div v-if="idx === currentStep" class="step">
        <label>{{ step.label }}</label>
        <component
          :is="getFormElement(step.type)"
          :class="{ 'error': formErrorHint }"
          :ruleValidator="step.ruleValidator"
          v-model="formValues[step.key]"
          @error="handleError"
        />
      </div>
    </div>
    <div class="error-hint" v-if="formErrorHint">{{ formErrorHint }}</div>
  </form>
  <button v-if="!isFinalStep" @click="handleNext">
    Next
  </button>
  <button v-if="isFinalStep" @click="$emit('submit', formValues)">
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