<template>
  <div class="shrink-0 w-32rem flex self-stretch">
    <InputText
      class="grow bg-dark px-2 rounded-l-1 caret-white/80"
      type="text"
      v-model="search"
      unstyled
    />
    <button
      @click="emit('search')"
      class="pi pi-search px-3 rounded-r-1 bg-white/15 hover:bg-white/40 active:bg-white/20 transition-colors-150"
    ></button>
  </div>
</template>
<script lang="ts" setup>
import InputText from 'primevue/inputtext'

const search = defineModel<string>({ default: '' })
const emit = defineEmits<{
  search: []
}>()
</script>
