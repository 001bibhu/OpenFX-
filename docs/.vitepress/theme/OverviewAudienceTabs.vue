<script setup lang="ts">
import RoleTabs from './RoleTabs.vue'

const audienceTabs = [
  { id: 'remittance', label: 'Remittance companies' },
  { id: 'psp', label: 'Payment service providers' },
  { id: 'ramps', label: 'On and off ramps' },
]
</script>

<template>
  <RoleTabs :items="audienceTabs" aria-label="Who uses OpenFX">
    <template #remittance>
      <slot name="remittance" />
    </template>
    <template #psp>
      <slot name="psp" />
    </template>
    <template #ramps>
      <slot name="ramps" />
    </template>
  </RoleTabs>
</template>
