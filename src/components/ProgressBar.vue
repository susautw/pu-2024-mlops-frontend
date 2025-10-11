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
