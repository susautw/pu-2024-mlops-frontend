<script lang="ts">
export default {}
</script>
<template>
  <div
    class="flex items-center py-2 px-4 gap-8 b-1 b-white/20 hover:bg-white/21 cursor-pointer active:bg-white/22 select-none"
  >
    <span
      class="font-bold w-60 overflow-clip text-ellipsis whitespace-nowrap"
      v-tooltip.top="{
        value: item.task_id,
        showDelay: 700,
        hideDelay: 0,
      }"
    >
      {{ item.name }}
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
    <TaskStatusProgress :status="status" />
  </div>
</template>
<script lang="ts" setup>
import vTooltip from 'primevue/tooltip'
import { type TrainingStatus, type TrainingTask } from '@/libs/apis/models'
import { computed } from 'vue'
import { useTaskData } from '@/composables/taskData'
import TaskStatusProgress from './TaskStatusProgress.vue'

const props = defineProps<{
  item: TrainingTask
}>()

const taskData = useTaskData(props.item.task_id)

const status = computed<TrainingStatus | undefined>(() => {
  return taskData.getTaskStatus()
})
</script>
