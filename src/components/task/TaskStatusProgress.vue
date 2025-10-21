<template>
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
</template>
<script lang="ts" setup>
import {
  deleteTrainingTaskById,
  startTrainingTaskById,
  stopTrainingTaskById,
} from '@/libs/apis/apis'
import { ReservedTaskPhases, type TrainingStatus } from '@/libs/apis/models'
import { computed } from 'vue'
import IconButton from '../IconButton.vue'
import { useTasks } from '@/composables/taskData'
import ProgressBar from '../ProgressBar.vue'

const props = defineProps<{
  status: TrainingStatus | undefined
}>()

const emit = defineEmits<{
  delete: []
}>()

const { loadTasks } = useTasks()

enum AllowedOperation {
  NONE = 0,
  STOP = 1 << 0,
  START = 1 << 1,
  DELETE = 1 << 2,
}

const allowedOperation = computed(() => {
  if (props.status?.phase == null) {
    return AllowedOperation.NONE
  }
  switch (props.status.phase) {
    case ReservedTaskPhases.PAUSED:
    case ReservedTaskPhases.CREATED:
      return AllowedOperation.START | AllowedOperation.DELETE
    case ReservedTaskPhases.COMPLETED:
    case ReservedTaskPhases.FAILED:
      return AllowedOperation.DELETE
    default:
      return AllowedOperation.STOP | AllowedOperation.DELETE
  }
})

const icon = computed(() => {
  if (props.status?.phase == null) {
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
  if (props.status?.phase == null || iconDisabled.value) return
  if (allowedOperation.value & AllowedOperation.STOP) {
    // Stop the task
    await stopTrainingTaskById(props.status.task_id)
  } else if (allowedOperation.value & AllowedOperation.START) {
    // Start the task
    await startTrainingTaskById(props.status.task_id)
  }
}

async function handleDeleteClick() {
  if (!(allowedOperation.value & AllowedOperation.DELETE)) return
  // TODO: Add a confirmation dialog
  if (props.status == null) return
  await deleteTrainingTaskById(props.status.task_id)
  await loadTasks()
  emit('delete')
}
</script>
