<script setup lang="ts">
import { withBase } from 'vitepress'

const analyticsUrl = withBase('/admin/analytics')
</script>

<template>
  <footer class="sf-admin-footer" aria-label="Content admin">
    <a :href="analyticsUrl">Analytics</a>
    <span class="sf-admin-note">(only for content admin)</span>
  </footer>
</template>
