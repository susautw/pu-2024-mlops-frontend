<script lang="ts">
/**
 * IconButton - A reusable button component that displays an icon.
 * This component can be used throughout the application to provide a consistent
 * look and feel for icon-based buttons. It accepts props for customizing
 * the icon, size, and click behavior.
 */
export default {}
</script>
<template>
  <button
    class="pi p-2 bg-white/20 hover:bg-blue active:bg-blue/80 rounded-2 transition-colors-150"
  >
    <slot />
  </button>
</template>
