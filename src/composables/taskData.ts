import { getTrainingStatusById, getTrainingTasks } from '@/libs/apis/apis'
import type { TrainingStatus, TrainingTask } from '@/libs/apis/models'
import { inject, onMounted, onUnmounted, provide, ref, type InjectionKey } from 'vue'

const dataInjectKey = Symbol('TaskDataProvider') as InjectionKey<{
  addViewingTaskId(taskId: string): void
  removeViewingTaskId(taskId: string): void
  getTask(taskId: string): TrainingTask | undefined
  getTaskStatus(taskId: string): TrainingStatus | undefined
}>

const fullInjectionKey = Symbol('FullTaskDataProvider') as InjectionKey<
  ReturnType<typeof useTaskDataProvider>
>

/**
 * Singleton provider for task data.
 */
export function useTaskDataProvider() {
  const tasks = ref<TrainingTask[]>([])

  const statuses = ref<Map<string, TrainingStatus>>()
  const viewingTaskIds = ref<Map<string, number>>(new Map())

  async function loadTasks() {
    tasks.value = await getTrainingTasks()
  }

  async function loadStatuses() {
    const viewingTasks = tasks.value.filter((task) => viewingTaskIds.value.has(task.task_id))
    const statusesTmp = await Promise.all(
      viewingTasks.map((task) => getTrainingStatusById(task.task_id)),
    )
    const statusMap = new Map<string, TrainingStatus>()
    statusesTmp.forEach((status) => {
      statusMap.set(status.task_id, status)
    })
    statuses.value = statusMap
  }

  function addViewingTaskId(taskId: string) {
    viewingTaskIds.value.set(
      taskId,
      viewingTaskIds.value.has(taskId) ? viewingTaskIds.value.get(taskId)! + 1 : 1,
    )
  }

  function removeViewingTaskId(taskId: string) {
    if (viewingTaskIds.value.has(taskId)) {
      const count = viewingTaskIds.value.get(taskId)! - 1
      if (count <= 0) {
        viewingTaskIds.value.delete(taskId)
      } else {
        viewingTaskIds.value.set(taskId, count)
      }
    }
  }

  function getTask(taskId: string) {
    return tasks.value.find((task) => task.task_id === taskId)
  }

  function getTaskStatus(taskId: string) {
    return statuses.value?.get(taskId)
  }

  let intervalId: number | null = null
  onMounted(async () => {
    await loadTasks()
    await loadStatuses()

    intervalId = setInterval(async () => {
      await loadStatuses()
    }, 2000)
  })

  onUnmounted(() => {
    if (intervalId) {
      clearInterval(intervalId)
    }
  })

  provide(dataInjectKey, {
    addViewingTaskId,
    removeViewingTaskId,
    getTask,
    getTaskStatus,
  })

  provide(fullInjectionKey, {
    tasks,
    loadTasks,
    loadStatuses,
    addViewingTaskId,
    removeViewingTaskId,
    getTask,
    getTaskStatus,
  })

  return {
    tasks,
    loadTasks,
    loadStatuses,
    addViewingTaskId,
    removeViewingTaskId,
    getTask,
    getTaskStatus,
  }
}

export function useTaskData(taskId: string) {
  const taskData = inject(dataInjectKey)
  if (!taskData) {
    throw new Error('useTaskData must be used within a TaskDataProvider')
  }
  onMounted(() => {
    taskData.addViewingTaskId(taskId)
  })
  onUnmounted(() => {
    taskData.removeViewingTaskId(taskId)
  })
  return {
    getTask: () => taskData.getTask(taskId),
    getTaskStatus: () => taskData.getTaskStatus(taskId),
  }
}

export function useTasks() {
  const fullTaskData = inject(fullInjectionKey)
  if (!fullTaskData) {
    throw new Error('useTasks must be used within a TaskDataProvider')
  }
  return fullTaskData
}
