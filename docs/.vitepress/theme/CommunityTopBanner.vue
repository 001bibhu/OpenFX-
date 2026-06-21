<script setup lang="ts">
import { withBase } from 'vitepress'

const communityUrl = withBase('/developer-community/')
const analyticsUrl = withBase('/admin/analytics')
</script>

<template>
  <div class="sf-community-top-banner">
    <div class="sf-community-top-banner-inner">
      <div class="sf-community-top-banner-main">
        <span class="sf-community-top-banner-label">New</span>
        <span class="sf-community-top-banner-text">
          Join the <strong>OpenFX Developer Community</strong>, share integrations, ask questions, learn from peers.
        </span>
        <a :href="communityUrl" class="sf-community-top-banner-link">
          Visit community →
        </a>
      </div>
      <a :href="analyticsUrl" class="sf-top-banner-admin-link">Admin analytics</a>
    </div>
  </div>
</template>
