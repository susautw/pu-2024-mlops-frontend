<template>
  <PageFrame>
    <template #actions>
      <div class="grow flex gap-2 items-center">
        <IconButton variant="primary" icon="pi-plus" />
        <IconButton icon="pi-refresh" @click="loadTasks" />
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
          <span class="font-bold w-60">Task Name</span>
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
            @reload="loadTasks()"
          />
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
import { type TrainingTask } from '@/libs/apis/models'
import { useRouter } from 'vue-router'
import { delay } from '@/libs/utils'

const router = useRouter()
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

function handleTaskItemClick(worker: TrainingTask) {
  // Navigate to task detail view
  router.push({ name: 'task-detail', params: { id: worker.task_id } })
}

onMounted(async () => {
  await loadTasks()
})

// TODO: Implement search functionality
const search = ref('')
</script>
