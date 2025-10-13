<script lang="ts">
/**
 * ProgressBar - A simple progress bar component that visually represents a progress value.
 * The progress bar displays a filled portion based on the provided value (between 0 and 1)
 * and shows the percentage as text next to it.
 *
 * Props:
 * - value (number): A number between 0 and 1 representing the progress to be displayed.
 */
export default {
  name: 'ProgressBar',
}
</script>
<template>
  <div class="progress flex gap-1 items-center">
    <div class="progress-bar grow bg-white h-1 rounded-8 overflow-clip min-w-5rem">
      <div class="progress-value bg-green h-full" :style="{ width: value * 100 + '%' }"></div>
    </div>
    <span :class="value < 1 ? 'text-white' : 'text-green'">{{
      (value * 100).toFixed(2) + '%'
    }}</span>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  value: number
}>()
</script>
