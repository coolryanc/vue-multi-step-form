<script setup lang="ts">
import { FormElement, type FormStep } from '@/types/MultiStepForm.type'
import MultiStepForm from '@/components/MultiStepForm.vue'

const formSteps: FormStep[] = [
  {
    key: 'name',
    label: 'Name',
    type: FormElement.Text
  },
  {
    key: 'Email',
    label: 'email',
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
