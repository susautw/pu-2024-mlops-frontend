<template>
  <div class="flex flex-col gap-2 px-4 py-2 min-w-50rem">
    <div class="flex gap-2">
      <nav class="flex items-center gap-2 b-1 b-white/40 self-start text-lg rounded-1 bg-dark-3">
        <RouterLink
          to="/tasks"
          class="px-2 py-1 rounded hover:bg-dark-light font-bold"
          :class="inView('/tasks') ? 'bg-dark-light text-yellow' : ''"
        >
          Tasks
        </RouterLink>
        <div class="self-stretch b-r-2 b-white/40 -mx-1"></div>
        <RouterLink
          to="/workers"
          class="px-2 py-1 rounded hover:bg-dark-light font-bold"
          :class="inView('/workers') ? 'bg-dark-light text-yellow' : ''"
        >
          Workers
        </RouterLink>
      </nav>
      <slot name="actions" />
    </div>
    <hr class="b-t-1 b-white/40" />
    <OverlayScrollbarsComponent class="grow bg-dark-3 rounded-1">
      <slot></slot>
    </OverlayScrollbarsComponent>
  </div>
</template>
<script lang="ts">
/**
 * ListContainer - A container component for displaying lists with navigation and scrollable content.
 * This component includes a navigation bar with links to "Tasks" and "Workers" views,
 * and a scrollable area for displaying the main content.
 *
 * Slots:
 * - Default slot: The main content to be displayed within the scrollable area.
 * - Named slot "actions": Additional action buttons or elements to be displayed next to the navigation
 */
export default {
  name: 'ListContainer',
}
</script>
<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'

const router = useRouter()

function inView(path: string) {
  return router.currentRoute.value.path === path
}
</script>
