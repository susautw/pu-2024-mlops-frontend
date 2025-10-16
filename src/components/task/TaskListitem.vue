<script lang="ts">
export default {}
</script>
<template>
  <div
    class="flex py-2 px-4 gap-8 b-1 b-white/20 hover:bg-white/21 cursor-pointer active:bg-white/22 select-none"
  >
    <span
      class="font-bold w-80 overflow-clip text-ellipsis whitespace-nowrap"
      v-tooltip.top="{
        value: item.task_id,
        showDelay: 700,
        hideDelay: 0,
      }"
    >
      {{ item.task_id }}
    </span>
    <span
      class="w-50 overflow-clip text-ellipsis whitespace-nowrap"
      v-tooltip.top="{
        value: item.task_type + ' ' + item.version,
        showDelay: 500,
        hideDelay: 0,
      }"
    >
      {{ item.task_type }}
      <sub>{{ item.version }}</sub>
    </span>
  </div>
</template>
<script lang="ts" setup>
import type { TrainingTask } from '@/libs/apis/models'

defineProps<{
  item: TrainingTask
}>()
</script>
