<script setup lang="ts">
import { ref } from 'vue'
import { API_BASES, mockApiResponse } from '../utils/apiSamples'

const props = withDefaults(
  defineProps<{
    method?: string
    path?: string
    defaultBody?: string
  }>(),
  {
    method: 'GET',
    path: '/clients',
    defaultBody: '',
  },
)

const environment = ref<'sandbox' | 'production'>('sandbox')
const httpMethod = ref(props.method)
const urlPath = ref(props.path)
const bearerToken = ref('YOUR_ACCESS_TOKEN')
const requestBody = ref(props.defaultBody)
const loading = ref(false)
const result = ref<{
  status: number
  statusText: string
  durationMs: number
  body: string
  simulated: boolean
  note?: string
} | null>(null)
const error = ref('')

function fullUrl(): string {
  const base = API_BASES[environment.value]
  const path = urlPath.value.startsWith('/') ? urlPath.value : `/${urlPath.value}`
  return `${base}${path}`
}

async function sendRequest() {
  loading.value = true
  error.value = ''
  result.value = null
  const start = performance.now()
  const url = fullUrl()
  const headers: Record<string, string> = {
    Accept: 'application/json',
  }
  if (bearerToken.value.trim()) {
    headers.Authorization = `Bearer ${bearerToken.value.trim()}`
  }
  const method = httpMethod.value.toUpperCase()
  let body: string | undefined
  if (['POST', 'PUT', 'PATCH'].includes(method) && requestBody.value.trim()) {
    headers['Content-Type'] = 'application/json'
    body = requestBody.value.trim()
  }

  try {
    const response = await fetch(url, { method, headers, body })
    const text = await response.text()
    result.value = {
      status: response.status,
      statusText: response.statusText,
      durationMs: Math.round(performance.now() - start),
      body: formatBody(text),
      simulated: false,
    }
  } catch {
    const mock = mockApiResponse(method, urlPath.value, body)
    result.value = {
      status: mock.status,
      statusText: mock.status === 200 || mock.status === 201 ? 'OK' : 'Error',
      durationMs: Math.round(performance.now() - start),
      body: JSON.stringify(mock.body, null, 2),
      simulated: true,
      note: 'Simulated sandbox response. Live calls require server-side requests or enabled CORS.',
    }
  } finally {
    loading.value = false
  }
}

function formatBody(text: string): string {
  try {
    return JSON.stringify(JSON.parse(text), null, 2)
  } catch {
    return text
  }
}

const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
const copiedResponse = ref(false)

async function copyResponse() {
  if (!result.value?.body) return
  await navigator.clipboard.writeText(result.value.body)
  copiedResponse.value = true
  setTimeout(() => {
    copiedResponse.value = false
  }, 2000)
}
</script>

<template>
  <div class="sf-api-tryit">
    <div class="sf-api-tryit-head">
      <strong>Try it</strong>
      <span>Send a request and inspect the response</span>
    </div>

    <div class="sf-api-tryit-form">
      <div class="sf-api-tryit-row">
        <label>
          Environment
          <select v-model="environment">
            <option value="sandbox">Sandbox</option>
            <option value="production">Production</option>
          </select>
        </label>
        <label>
          Method
          <select v-model="httpMethod">
            <option v-for="m in methods" :key="m" :value="m">{{ m }}</option>
          </select>
        </label>
      </div>

      <label class="sf-api-tryit-full">
        URL path
        <div class="sf-api-url-input">
          <span class="sf-api-url-base">{{ API_BASES[environment] }}</span>
          <input v-model="urlPath" type="text" placeholder="/clients" />
        </div>
      </label>

      <label class="sf-api-tryit-full">
        Authorization (Bearer token)
        <input v-model="bearerToken" type="text" placeholder="YOUR_ACCESS_TOKEN" />
      </label>

      <label
        v-if="['POST', 'PUT', 'PATCH'].includes(httpMethod.toUpperCase())"
        class="sf-api-tryit-full"
      >
        Request body (JSON)
        <textarea v-model="requestBody" rows="5" placeholder='{"key": "value"}' />
      </label>

      <button type="button" class="sf-btn-primary sf-api-send" :disabled="loading" @click="sendRequest">
        {{ loading ? 'Sending…' : 'Send request' }}
      </button>
    </div>

    <div v-if="result" class="sf-api-response">
      <div class="sf-api-response-meta">
        <span :class="['sf-api-status', result.status < 400 ? 'ok' : 'err']">
          {{ result.status }} {{ result.statusText }}
        </span>
        <span>{{ result.durationMs }} ms</span>
        <span v-if="result.simulated" class="sf-api-simulated">Simulated</span>
        <button type="button" class="sf-api-copy sf-api-copy-inline" @click="copyResponse">
          {{ copiedResponse ? 'Copied' : 'Copy response' }}
        </button>
      </div>
      <p v-if="result.note" class="sf-api-sim-note">{{ result.note }}</p>
      <pre class="sf-api-response-body"><code>{{ result.body }}</code></pre>
    </div>
    <p v-if="error" class="sf-form-error">{{ error }}</p>
  </div>
</template>
