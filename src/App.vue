<script setup lang="ts">
import { useTaskDataProvider } from './composables/taskData'

useTaskDataProvider()
</script>

<template>
  <RouterView class="max-w-256 w-80vw h-80vh bg-dark-1 rounded-2" />
</template>
