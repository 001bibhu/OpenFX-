<script setup lang="ts">
import ApiSection from './ApiSection.vue'

defineProps<{
  method: string
  path: string
  sample?: string
  tryBody?: string
  showTry?: boolean
  showSamples?: boolean
}>()
</script>

<template>
  <ApiSection
    :method="method"
    :path="path"
    :sample="sample"
    :try-body="tryBody"
    :show-try="showTry"
    :show-samples="showSamples"
  >
    <slot />
  </ApiSection>
</template>
