<script setup lang="ts">
defineProps<{ template: string }>()
</script>

<template>
  <div v-html="template"></div>
</template>
