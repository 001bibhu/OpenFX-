<script setup lang="ts">
import { computed } from 'vue'
import { withBase, useRoute } from 'vitepress'

const route = useRoute()
const communityUrl = withBase('/developer-community/')

const showBanner = computed(() => !route.path.includes('developer-community'))
</script>

<template>
  <div v-if="showBanner" class="sf-community-top-banner">
    <div class="sf-community-top-banner-inner">
      <span class="sf-community-top-banner-label">New</span>
      <span class="sf-community-top-banner-text">
        Join the <strong>OpenFX Developer Community</strong> — share integrations, ask questions, learn from peers.
      </span>
      <a :href="communityUrl" class="sf-community-top-banner-link">
        Visit community →
      </a>
    </div>
  </div>
</template>
