<template>
  <PageFrame>
    <template #actions>
      <div class="grow flex gap-2 items-center">
        <IconButton class="pi-plus" />
        <div class="grow" />
        <SearchBar
          class="shrink-0 w-32rem flex self-stretch"
          v-model="search"
          @search="console.log('search clicked', search)"
        />
      </div>
    </template>
    <template #default>
      <div class="flex flex-col h-full">
        <div class="table-header flex py-2 px-4 gap-8 gap-2 font-bold text-dark bg-amber/90">
          <span class="font-bold w-80">Task ID</span>
          <span class="w-50">Task Type</span>
        </div>
        <div v-if="loading" class="grow flex items-center justify-center text-white/50">
          <span class="pi pi-spin pi-spinner !text-10 animate-fade-in animate-duration-1s" />
        </div>
        <div
          v-if="!loading && tasks.length === 0"
          class="grow flex items-center justify-center text-white/50"
        >
          No tasks found.
        </div>
        <template v-if="!loading && tasks.length > 0">
          <TaskListitem
            v-for="task in tasks"
            :key="task.task_id"
            :item="task"
            @click="handleTaskItemClick(task)"
          />
          <ProgressBar v-for="task_status in task_status" :value="task_status.progress" />
        </template>
      </div>
    </template>
  </PageFrame>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import PageFrame from '@/components/PageFrame.vue'
import SearchBar from '@/components/SearchBar.vue'
import IconButton from '@/components/IconButton.vue'
import TaskListitem from '@/components/task/TaskListitem.vue'
import { getTrainingTasks } from '@/libs/apis/apis'
import { type TrainingStatus, type TrainingTask } from '@/libs/apis/models'
import { useRouter } from 'vue-router'
import { delay } from '@/libs/utils'

const router = useRouter()
const task_status = ref<TrainingStatus[]>([])
const tasks = ref<TrainingTask[]>([])
const loading = ref(true)

async function loadTasks() {
  loading.value = true
  delay(500)
  const remoteTasks = await getTrainingTasks()
  loading.value = false
  delay(500)
  tasks.value = remoteTasks
}
async function loadtaskstatus() {
  loading.value = true
  //need help
  loading.value = false
}

function handleTaskItemClick(worker: TrainingTask) {
  // Navigate to worker detail view
  router.push({ name: 'worker-detail', params: { id: worker.task_id } })
}

onMounted(async () => {
  await loadTasks()
  await loadtaskstatus
  loading.value = false
})

const search = ref('')
</script>
