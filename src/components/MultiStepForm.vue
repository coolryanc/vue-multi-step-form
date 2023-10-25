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
  currentStep.value += 1
}

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
          v-model="formValues[step.key]"
        />
      </div>
    </div>
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
</style>