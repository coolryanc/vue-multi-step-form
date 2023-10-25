<script setup lang="ts">
import BasicInput from './BasicInput.vue';
</script>

<template>
  <BasicInput v-bind="{...$props, ...$attrs}" type="password" />
</template>