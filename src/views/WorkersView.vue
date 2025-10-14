<template>
  <PageFrame>
    <template #actions>
      <div class="grow flex gap-2 items-center">
        <div class="grow" />
        <IconButton class="pi-refresh" />
      </div>
    </template>
    <template #default>
      <div>
        <WorkerListItem :item="testItem" />
      </div>
    </template>
  </PageFrame>
</template>

<script setup lang="ts">
import IconButton from '@/components/IconButton.vue'
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
