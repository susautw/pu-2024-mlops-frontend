<template>
  <PageFrame no-nav>
    <template #actions>
      <IconButton icon="pi-arrow-left" @click="router.back()" />
    </template>
    <template #default>
      <div class="flex flex-col h-full p-4 gap-4">
        <div v-if="loading" class="grow flex items-center justify-center text-white/50">
          <span class="pi pi-spin pi-spinner !text-10 animate-fade-in animate-duration-1s" />
        </div>
        <div v-else-if="!workerSummary" class="grow flex items-center justify-center text-white/50">
          Worker not found.
        </div>
        <div v-else class="flex flex-col gap-4">
          <h2 class="text-2xl font-bold text-amber">Worker Detail</h2>
          <div class="flex flex-col gap-2">
            <div class="flex gap-2">
              <span class="font-bold w-38">Worker ID:</span>
              <span>{{ workerSummary.id }}</span>
            </div>
            <div class="flex gap-2">
              <span class="font-bold w-38">Worker Type:</span>
              <span>
                {{ workerSummary.task_type }} <sub>{{ workerSummary.version }}</sub>
              </span>
            </div>
            <div class="flex gap-2">
              <span class="font-bold w-38">Has Task:</span>
              <span>{{ workerSummary.has_task ? 'Yes' : 'No' }}</span>
            </div>
            <div class="flex gap-2">
              <span class="font-bold w-38">Healthy:</span>
              <span>{{ workerSummary.healthy ? 'Yes' : 'No' }}</span>
            </div>
            <div class="flex gap-2">
              <span class="font-bold w-38">Joined At:</span>
              <span>{{ workerSummary.joined_at?.toLocaleString() ?? 'N/A' }}</span>
            </div>
            <div class="flex gap-2">
              <span class="font-bold w-38">Last Reported At:</span>
              <span>{{ workerSummary.reported_at.toLocaleString() }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </PageFrame>
</template>
<script setup lang="ts">
import IconButton from '@/components/IconButton.vue'
import PageFrame from '@/components/PageFrame.vue'
import { getWorkerSummaryById } from '@/libs/apis/apis'
import type { WorkerSummary } from '@/libs/apis/models'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const workerSummary = ref<WorkerSummary>()
const loading = ref(true)

async function loadWorker() {
  loading.value = true
  workerSummary.value = await getWorkerSummaryById(route.params.id as string)
  loading.value = false
}

onMounted(async () => {
  await loadWorker()
})
</script>
