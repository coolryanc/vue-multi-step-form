<script setup lang="ts">
import { FormElement, type FormSteps } from '@/types/MultiStepForm.type'
import MultiStepForm from '@/components/MultiStepForm.vue'

const formSteps: FormSteps = [
  {
    key: 'name',
    label: 'Name',
    type: FormElement.Text,
    ruleValidator: (value: any) => {
      if (value && value.length > 5) {
        return 'No more than 5 characters'
      }
    },
  },
  {
    key: 'email',
    label: 'Email',
    type: FormElement.Email
  },
  {
    key: 'birthday',
    label: 'Birthday',
    type: FormElement.Date
  },
  {
    key: 'password',
    label: 'Password',
    type: FormElement.Password
  },
]
</script>

<template>
  <main>
    <MultiStepForm :steps="formSteps" />
  </main>
</template>

<style scoped>
</style>
