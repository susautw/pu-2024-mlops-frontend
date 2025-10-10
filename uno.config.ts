import { defineConfig } from 'unocss'
import presetWind3 from '@unocss/preset-wind3'
import transformerVariantGroup from '@unocss/transformer-variant-group'

export default defineConfig({
  presets: [presetWind3()],
  transformers: [transformerVariantGroup()],
})
