<template>
  <RouterLink to="/workers"> Workers </RouterLink>
  TasksView
  <!-- Progress bar-->
  <div class="flex flex-col">
    <ProgressBar class="w-30vh" :value="progress" />
    <ProgressBar class="w-40vh" :value="progress" />
    <ProgressBar class="w-50vh" :value="Math.min(1, progress * 2)" />
  </div>
</template>
<script lang="ts" setup>
import ProgressBar from '@/components/ProgressBar.vue'
import { onMounted, onUnmounted, ref } from 'vue'

const progress = ref(0)
let interval: number
onMounted(() => {
  interval = setInterval(() => {
    progress.value = Math.min(1, progress.value + 0.05)
  }, 500)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>
