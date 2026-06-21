<script setup lang="ts">
import { ref, computed } from 'vue'
import { withBase } from 'vitepress'
import { aiAnswer } from '../utils/docSearch'

const query = ref('')
const loading = ref(false)
const result = ref<{ answer: string; sources: { title: string; path: string; section: string }[] } | null>(null)

const suggestions = [
  'How fast are trades settled on OpenFX?',
  'Does OpenFX support USDC and USDT?',
  'What is OpenFX pricing compared to banks?',
  'How do I get started and access the sandbox?',
]

async function search() {
  if (!query.value.trim()) return
  loading.value = true
  result.value = null
  await new Promise((r) => setTimeout(r, 650))
  result.value = aiAnswer(query.value)
  loading.value = false
}

function go(path: string) {
  window.location.href = withBase(path)
}

const hasResult = computed(() => result.value !== null)
</script>

<template>
  <div class="sf-ai-search">
    <form class="sf-ai-search-bar" @submit.prevent="search">
      <span class="sf-ai-badge">AI</span>
      <input
        v-model="query"
        type="text"
        placeholder="Ask anything about OpenFX…"
        aria-label="AI documentation search"
      />
      <button type="submit" :disabled="loading || !query.trim()">
        {{ loading ? 'Searching…' : 'Search' }}
      </button>
    </form>

    <div v-if="!hasResult" class="sf-ai-suggestions">
      <span>Try:</span>
      <button
        v-for="s in suggestions"
        :key="s"
        type="button"
        @click="query = s; search()"
      >
        {{ s }}
      </button>
    </div>

    <div v-if="loading" class="sf-ai-result sf-ai-loading">
      <div class="sf-ai-pulse" />
      <p>Finding the best answer across guides, API docs, and solutions…</p>
    </div>

    <div v-if="result && !loading" class="sf-ai-result">
      <p class="sf-ai-answer">{{ result.answer }}</p>
      <ul v-if="result.sources.length" class="sf-ai-sources">
        <li v-for="src in result.sources" :key="src.path">
          <button type="button" @click="go(src.path)">
            <span class="sf-ai-src-section">{{ src.section }}</span>
            {{ src.title }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
