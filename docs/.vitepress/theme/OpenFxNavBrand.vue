<script setup lang="ts">
import { withBase } from 'vitepress'

const home = withBase('/')
const logoLight =
  'https://framerusercontent.com/images/rUqezLCk1mKlOhK3WmLn4GailO0.svg'
const logoDark = withBase('/openfx-logo-dark.svg')
</script>

<template>
  <a class="openfx-nav-brand" :href="home" aria-label="OpenFX Docs home">
    <img class="openfx-nav-logo openfx-nav-logo-light" :src="logoLight" alt="OpenFX" width="120" height="26" />
    <img class="openfx-nav-logo openfx-nav-logo-dark" :src="logoDark" alt="OpenFX" width="120" height="26" />
    <span class="openfx-nav-docs">Docs</span>
  </a>
</template>
