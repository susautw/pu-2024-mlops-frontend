<template>
  <PageFrame>
    <template #actions>
      <div class="grow flex gap-2 items-center">
        <div class="grow" />
        <button
          class="pi pi-refresh p-2 bg-white/20 hover:bg-blue active:bg-blue/80 rounded-2 transition-colors-150"
        />
      </div>
    </template>
    <template #default>
      <WorkerListItem :item="testItem" />
    </template>
  </PageFrame>
</template>

<script setup lang="ts">
import PageFrame from '@/components/PageFrame.vue'
import WorkerListItem from '@/components/worker/WorkerListItem.vue'
import type { WorkerSummary } from '@/libs/apis/models'

const testItem: WorkerSummary = {
  id: 'worker-123',
  task_type: 'data-processing',
  version: '1.0.0',
  created_at: new Date(),
  has_task: false,
  healthy: true,
  reported_at: new Date(),
  joined_at: new Date(),
}
</script>
