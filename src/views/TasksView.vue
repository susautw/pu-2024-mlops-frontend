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
    <template #default> Tasks </template>
  </PageFrame>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import PageFrame from '@/components/PageFrame.vue'
import SearchBar from '@/components/SearchBar.vue'
import IconButton from '@/components/IconButton.vue'

const search = ref('')
</script>
