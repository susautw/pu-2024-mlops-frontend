<script lang="ts">
/**
 * SearchBar - A search bar component that allows users to input a search query and trigger a search action.
 * The component includes a text input field and a search button. The input value is bound to a model,
 * and clicking the search button emits a "search" event.
 *
 * Props:
 * - modelValue (string): The current value of the search input, bound using v-model.
 *
 * Emits:
 * - search: Emitted when the search button is clicked. The current search input value is passed as an argument.
 */
export default {
  name: 'SearchBar',
}
</script>
<template>
  <div class="shrink-0 w-32rem flex self-stretch">
    <InputText
      class="grow bg-dark px-2 rounded-l-1 caret-white/80"
      type="text"
      v-model="search"
      unstyled
    />
    <button
      @click="emit('search', search)"
      class="pi pi-search px-3 rounded-r-1 bg-white/15 hover:bg-white/40 active:bg-white/20 transition-colors-150"
    ></button>
  </div>
</template>
<script lang="ts" setup>
import InputText from 'primevue/inputtext'

const search = defineModel<string>({ default: '' })
const emit = defineEmits<{
  search: [string]
}>()
</script>
