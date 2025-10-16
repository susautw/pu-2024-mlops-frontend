import { defineConfig } from 'unocss'
import presetWind3 from '@unocss/preset-wind3'
import { transformerVariantGroup } from 'unocss'

export default defineConfig({
  presets: [presetWind3()],
  transformers: [transformerVariantGroup()],
})
