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
    <div class="grow flex gap-2 items-center">
      <ProgressBar class="grow" :value="status?.progress ?? 0" />
      <div class="h-full b-r-1" />
      <IconButton :icon="icon" :disabled="iconDisabled" @click.stop="handleIconClick" />
      <IconButton
        variant="danger"
        :icon="'pi-trash'"
        :disabled="!(allowedOperation & AllowedOperation.DELETE)"
        @click.stop="handleDeleteClick"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import vTooltip from 'primevue/tooltip'
import { ReservedTaskPhases, type TrainingStatus, type TrainingTask } from '@/libs/apis/models'
import { computed } from 'vue'
import ProgressBar from '../ProgressBar.vue'
import {
  deleteTrainingTaskById,
  startTrainingTaskById,
  stopTrainingTaskById,
} from '@/libs/apis/apis'
import IconButton from '../IconButton.vue'
import { useTaskData } from '@/composables/taskData'

const props = defineProps<{
  item: TrainingTask
}>()

const emit = defineEmits<{
  reload: []
}>()

const taskData = useTaskData(props.item.task_id)

const status = computed<TrainingStatus | undefined>(() => {
  return taskData.getTaskStatus()
})

enum AllowedOperation {
  NONE = 0,
  STOP = 1 << 0,
  START = 1 << 1,
  DELETE = 1 << 2,
}

const allowedOperation = computed(() => {
  if (status.value?.phase == null) {
    return AllowedOperation.NONE
  }
  switch (status.value.phase) {
    case ReservedTaskPhases.PAUSED:
    case ReservedTaskPhases.CREATED:
      return AllowedOperation.START | AllowedOperation.DELETE
    case ReservedTaskPhases.COMPLETED || ReservedTaskPhases.FAILED:
      return AllowedOperation.DELETE
    default:
      return AllowedOperation.STOP | AllowedOperation.DELETE
  }
})

const icon = computed(() => {
  if (status.value?.phase == null) {
    return 'pi-spin pi-spinner'
  }
  if (allowedOperation.value & AllowedOperation.STOP) {
    return 'pi-stop'
  }
  return 'pi-play'
})

const iconDisabled = computed(() => {
  // Disable if no start/stop operation is allowed
  return (allowedOperation.value & (AllowedOperation.STOP | AllowedOperation.START)) === 0
})

async function handleIconClick() {
  if (status.value?.phase == null || iconDisabled.value) return
  if (allowedOperation.value & AllowedOperation.STOP) {
    // Stop the task
    await stopTrainingTaskById(props.item.task_id)
  } else if (allowedOperation.value & AllowedOperation.START) {
    // Start the task
    await startTrainingTaskById(props.item.task_id)
  }
}

async function handleDeleteClick() {
  if (!(allowedOperation.value & AllowedOperation.DELETE)) return
  // TODO: Add a confirmation dialog
  await deleteTrainingTaskById(props.item.task_id)
  emit('reload')
}
</script>
