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
    :class="[
      iconButtonStyles({ variant: props.variant, size: props.size }),
      { 'cursor-not-allowed opacity-50': props.disabled },
    ]"
    :disabled="props.disabled"
  >
    <div class="pi" :class="icon"><slot /></div>
  </button>
</template>
<script lang="ts" setup>
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

const iconButtonStyles = cva('p-2 rounded-2 transition-colors-150 flex', {
  variants: {
    variant: {
      primary: 'bg-blue enabled:(hover:bg-blue/80 active:!bg-blue/60) text-white',
      secondary: 'bg-white/20 enabled:(hover:bg-blue active:!bg-blue/80) text-white',
      danger: 'bg-red enabled:(hover:bg-red/80 active:!bg-red/60) text-white',
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
  icon: string
  variant?: IconButtonProps['variant']
  size?: IconButtonProps['size']
  disabled?: boolean
}>()
</script>
