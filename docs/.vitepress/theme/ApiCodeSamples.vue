<script setup lang="ts">
import { ref, computed } from 'vue'
import { getApiSample, API_LANGUAGES, type ApiLanguage } from '../utils/apiSamples'

const props = defineProps<{
  sample: string
}>()

const active = ref<ApiLanguage>('curl')
const sampleSet = computed(() => getApiSample(props.sample))

const code = computed(() => sampleSet.value?.samples[active.value] ?? '// Sample not found')

const copied = ref(false)

async function copyCode() {
  await navigator.clipboard.writeText(code.value)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

<template>
  <div v-if="sampleSet" class="sf-api-code">
    <div class="sf-api-code-toolbar">
      <div class="sf-api-lang-tabs" role="tablist" aria-label="Code language">
        <button
          v-for="lang in API_LANGUAGES"
          :key="lang.id"
          type="button"
          role="tab"
          class="sf-api-lang-tab"
          :class="{ active: active === lang.id }"
          :aria-selected="active === lang.id"
          @click="active = lang.id"
        >
          {{ lang.label }}
        </button>
      </div>
      <button type="button" class="sf-api-copy" @click="copyCode">
        {{ copied ? 'Copied' : 'Copy' }}
      </button>
    </div>
    <pre class="sf-api-code-block"><code>{{ code }}</code></pre>
  </div>
  <p v-else class="sf-api-missing">Code sample "{{ sample }}" not found.</p>
</template>

<style scoped>
.sf-api-code-toolbar {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.5rem;
  padding: 0.65rem 0.75rem;
  background: #0d1117;
  border-bottom: 1px solid #21262d;
}

.sf-api-lang-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.sf-api-lang-tab {
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.65rem;
  border: 1px solid #30363d;
  border-radius: 6px;
  background: #161b22;
  color: #c9d1d9;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.2;
  cursor: pointer;
  white-space: nowrap;
}

.sf-api-lang-tab:hover {
  border-color: #8b949e;
  color: #f0f6fc;
}

.sf-api-lang-tab.active {
  border-color: #0392f1;
  background: #0392f122;
  color: #58a6ff;
}

.sf-api-copy {
  align-self: flex-end;
  padding: 0.35rem 0.75rem;
  border: 1px solid #30363d;
  border-radius: 6px;
  background: #21262d;
  color: #c9d1d9;
  font-size: 0.75rem;
  cursor: pointer;
}

.sf-api-copy:hover {
  border-color: #8b949e;
  color: #f0f6fc;
}

.sf-api-code-block {
  margin: 0;
  padding: 1rem 1.15rem;
  background: #0d1117;
  color: #e6edf3;
  font-size: 0.8125rem;
  line-height: 1.55;
  overflow-x: auto;
  max-height: 280px;
  overflow-y: auto;
}

.sf-api-code-block code {
  background: transparent;
  color: inherit;
  font-family: var(--vp-font-family-mono);
}

.sf-api-missing {
  padding: 1rem;
  color: var(--vp-c-text-3);
  font-style: italic;
}
</style>
