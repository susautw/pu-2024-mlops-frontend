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
  <button :class="iconButtonStyles({ variant: props.variant, size: props.size })">
    <slot />
  </button>
</template>
<script lang="ts" setup>
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

const iconButtonStyles = cva('pi p-2 rounded-2 transition-colors-150', {
  variants: {
    variant: {
      primary: 'bg-blue hover:bg-blue/90 active:bg-blue/80 text-white',
      secondary: 'bg-white/20 hover:bg-blue active:bg-blue/80 text-white',
      danger: 'bg-red hover:bg-red active:bg-red/80 text-white',
    },
    size: {
      sm: '!text-4',
      md: '!text-5',
      lg: '!text-6',
    },
  },
  defaultVariants: {
    variant: 'secondary',
    size: 'md',
  },
})

type IconButtonProps = VariantProps<typeof iconButtonStyles>

const props = defineProps<{
  variant?: IconButtonProps['variant']
  size?: IconButtonProps['size']
}>()
</script>
