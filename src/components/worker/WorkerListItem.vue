<script lang="ts">
/**
 * WorkerListItem - A component representing a single worker item in a list.
 * This component is intended to display information about a worker, such as its name,
 * status, and other relevant details. It can be used within a list to show multiple workers.
 */
export default {}
</script>
<template>
  <div
    class="flex py-2 px-4 gap-8 b-1 b-white/20 hover:bg-white/21 cursor-pointer active:bg-white/22 select-none"
  >
    <span class="font-bold w-80 overflow-clip text-ellipsis whitespace-nowrap">{{ item.id }}</span>
    <span class="w-50 overflow-clip text-ellipsis whitespace-nowrap">
      {{ item.task_type }}
      <sub>{{ item.version }}</sub>
    </span>
  </div>
</template>
<script lang="ts" setup>
import type { WorkerSummary } from '@/libs/apis/models'

defineProps<{
  item: WorkerSummary
}>()
</script>
