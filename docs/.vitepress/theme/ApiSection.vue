<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import ApiCodeSamples from './ApiCodeSamples.vue'
import ApiTryIt from './ApiTryIt.vue'

const props = withDefaults(
  defineProps<{
    method: string
    path: string
    sample?: string
    tryBody?: string
    showTry?: boolean
    showSamples?: boolean
  }>(),
  {
    showTry: true,
    showSamples: true,
  },
)

const methodClass = props.method.toLowerCase()
const hasSamples = computed(() => props.showSamples && !!props.sample)
const panelTab = ref<'examples' | 'tryit'>(hasSamples.value ? 'examples' : 'tryit')

watch(hasSamples, (value) => {
  panelTab.value = value ? 'examples' : 'tryit'
})
</script>

<template>
  <div class="sf-api-section">
    <div class="sf-api-section-body">
      <slot />
    </div>
    <aside class="sf-api-panel">
      <div class="sf-api-panel-inner">
        <div class="sf-api-endpoint-head">
          <span :class="['sf-api-method', methodClass]">{{ method.toUpperCase() }}</span>
          <code class="sf-api-path">{{ path }}</code>
        </div>

        <div v-if="hasSamples && showTry" class="sf-api-panel-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            class="sf-api-panel-tab"
            :class="{ active: panelTab === 'examples' }"
            :aria-selected="panelTab === 'examples'"
            @click="panelTab = 'examples'"
          >
            Code examples
          </button>
          <button
            type="button"
            role="tab"
            class="sf-api-panel-tab"
            :class="{ active: panelTab === 'tryit' }"
            :aria-selected="panelTab === 'tryit'"
            @click="panelTab = 'tryit'"
          >
            Try it
          </button>
        </div>

        <div class="sf-api-panel-content">
          <ApiCodeSamples
            v-if="hasSamples && (panelTab === 'examples' || !showTry)"
            :sample="sample!"
          />
          <ApiTryIt
            v-if="showTry && (panelTab === 'tryit' || !hasSamples)"
            :method="method"
            :path="path"
            :default-body="tryBody ?? ''"
          />
        </div>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.sf-api-panel-tabs {
  display: flex;
  gap: 0;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.sf-api-panel-tab {
  flex: 1;
  padding: 0.65rem 0.75rem;
  border: none;
  border-bottom: 2px solid transparent;
  background: transparent;
  color: var(--vp-c-text-2);
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
}

.sf-api-panel-tab:hover {
  color: var(--vp-c-text-1);
}

.sf-api-panel-tab.active {
  color: var(--sf-brand, #0392f1);
  border-bottom-color: var(--sf-brand, #0392f1);
  background: var(--vp-c-bg);
}

.sf-api-panel-content {
  min-height: 200px;
}
</style>
