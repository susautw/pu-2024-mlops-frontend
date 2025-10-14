<template>
  <PageFrame>
    <template #actions>
      <div class="grow flex gap-2 items-center">
        <div class="grow" />
        <IconButton class="pi-refresh" @click="loadWorkers" />
      </div>
    </template>
    <template #default>
      <div class="flex flex-col h-full">
        <div class="table-header flex py-2 px-4 gap-8 gap-2 font-bold text-dark bg-amber/90">
          <span class="font-bold w-80">Worker ID</span>
          <span class="w-50">Worker Type</span>
        </div>
        <div v-if="loading" class="grow flex items-center justify-center text-white/50">
          <span class="pi pi-spin pi-spinner !text-10 animate-fade-in animate-duration-1s" />
        </div>
        <div
          v-if="!loading && workers.length === 0"
          class="grow flex items-center justify-center text-white/50"
        >
          No workers found.
        </div>
        <template v-if="!loading && workers.length > 0">
          <WorkerListItem v-for="worker in workers" :key="worker.id" :item="worker" />
        </template>
      </div>
    </template>
  </PageFrame>
</template>

<script setup lang="ts">
import IconButton from '@/components/IconButton.vue'
import PageFrame from '@/components/PageFrame.vue'
import WorkerListItem from '@/components/worker/WorkerListItem.vue'
import { getWorkersSummary } from '@/libs/apis/apis'
import type { WorkerSummary } from '@/libs/apis/models'
import { delay } from '@/libs/utils'
import { onMounted, ref } from 'vue'

const loading = ref(true)
const workers = ref<WorkerSummary[]>([])

async function loadWorkers() {
  loading.value = true
  delay(500)
  const remoteWorkers = await getWorkersSummary()
  loading.value = false
  delay(500)
  workers.value = remoteWorkers
}

onMounted(async () => {
  await loadWorkers()
  loading.value = false
})
</script>
