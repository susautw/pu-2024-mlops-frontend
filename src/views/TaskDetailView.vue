<template>
  <PageFrame no-nav>
    <template #actions>
      <div class="grow flex items-center gap-2 bg-dark/60 p-1 -m-1 rounded-1">
        <IconButton icon="pi-arrow-left" @click="router.back()" />
        <div class="grow" />
        <TaskStatusProgress class="max-w-200" :status="status" />
      </div>
    </template>
    <template #default>
      <div class="flex flex-col h-full p-4 gap-4">
        <div v-if="false" class="grow flex items-center justify-center text-white/50">
          <!-- Loading but currently not reachable -->
          <span class="pi pi-spin pi-spinner !text-10 animate-fade-in animate-duration-1s" />
        </div>
        <div v-else-if="task == null" class="grow flex items-center justify-center text-white/50">
          Task not found.
        </div>
        <div v-else class="flex flex-col gap-4">
          <h2 class="text-2xl font-bold text-amber">Task Detail</h2>
          <div class="flex flex-col gap-2">
            <div class="flex gap-2">
              <span class="font-bold w-38">Task Name:</span>
              <span>{{ task.name }}</span>
            </div>
            <div class="flex gap-2">
              <span class="font-bold w-38">Task Type:</span>
              <span>
                {{ task.task_type }} <sub>{{ task.version }}</sub>
              </span>
            </div>
            <div class="flex gap-2">
              <span class="font-bold w-38">Last Reported At:</span>
              <span>{{ task.created_at.toLocaleString() }}</span>
            </div>
            <template v-if="status != null">
              <div class="flex gap-2">
                <span class="font-bold w-38">Status Phase:</span>
                <span>{{ phase }}</span>
              </div>
              <div class="flex gap-2">
                <span class="font-bold w-38">Description:</span>
                <span>{{ status.description }}</span>
              </div>
            </template>
          </div>
        </div>
      </div>
    </template>
  </PageFrame>
</template>
<script setup lang="ts">
import IconButton from '@/components/IconButton.vue'
import PageFrame from '@/components/PageFrame.vue'
import TaskStatusProgress from '@/components/task/TaskStatusProgress.vue'
import { useTaskData } from '@/composables/taskData'
import { getPhaseName } from '@/libs/apis/models'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const taskData = useTaskData(route.params.id as string)
const task = computed(() => {
  return taskData.getTask()
})
const status = computed(() => {
  return taskData.getTaskStatus()
})

const phase = computed(() => getPhaseName(status.value?.phase))
</script>
