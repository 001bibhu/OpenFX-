<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getAnalyticsSummary, clearAnalytics } from '../utils/analytics'
import { getFeatureIdeas, resetFeatureIdeas } from '../utils/featureIdeas'

const summary = ref(getAnalyticsSummary())
const featureIdeas = ref(getFeatureIdeas())

function refresh() {
  summary.value = getAnalyticsSummary()
  featureIdeas.value = getFeatureIdeas()
}

onMounted(refresh)

const satisfaction = computed(() => {
  const { likes, dislikes } = summary.value
  const total = likes + dislikes
  if (!total) return 0
  return Math.round((likes / total) * 100)
})

function formatDate(ts: number) {
  return new Date(ts).toLocaleString()
}

function resetData() {
  if (confirm('Clear all locally stored analytics, feedback, tickets, and feature ideas?')) {
    clearAnalytics()
    resetFeatureIdeas()
    refresh()
  }
}
</script>

<template>
  <div class="sf-analytics">
    <div class="sf-analytics-header">
      <p>
        Live metrics from this browser session and stored feedback. In production, connect
        this dashboard to your analytics backend.
      </p>
      <button type="button" class="sf-btn-ghost" @click="refresh">Refresh</button>
    </div>

    <div class="sf-stat-grid">
      <div class="sf-stat-card">
        <span class="sf-stat-label">Total page views</span>
        <span class="sf-stat-value">{{ summary.totalViews.toLocaleString() }}</span>
      </div>
      <div class="sf-stat-card sf-stat-likes">
        <span class="sf-stat-label">👍 Likes</span>
        <span class="sf-stat-value">{{ summary.likes }}</span>
      </div>
      <div class="sf-stat-card sf-stat-dislikes">
        <span class="sf-stat-label">👎 Dislikes</span>
        <span class="sf-stat-value">{{ summary.dislikes }}</span>
      </div>
      <div class="sf-stat-card">
        <span class="sf-stat-label">Satisfaction</span>
        <span class="sf-stat-value">{{ satisfaction }}%</span>
      </div>
    </div>

    <section class="sf-analytics-section">
      <h2>Top pages</h2>
      <div v-if="summary.topPages.length" class="sf-bar-chart">
        <div v-for="[path, views] in summary.topPages" :key="path" class="sf-bar-row">
          <span class="sf-bar-label">{{ path }}</span>
          <div class="sf-bar-track">
            <div
              class="sf-bar-fill"
              :style="{ width: `${(views / summary.topPages[0][1]) * 100}%` }"
            />
          </div>
          <span class="sf-bar-count">{{ views }}</span>
        </div>
      </div>
      <p v-else class="sf-empty">No page views recorded yet.</p>
    </section>

    <section class="sf-analytics-section">
      <h2>Feedback</h2>
      <div v-if="summary.data.feedback.length" class="sf-feedback-list">
        <article v-for="f in summary.data.feedback" :key="f.id" class="sf-feedback-item">
          <div class="sf-feedback-meta">
            <span :class="['sf-vote', f.vote]">{{ f.vote === 'up' ? '👍' : '👎' }}</span>
            <span>{{ f.page }}</span>
            <time>{{ formatDate(f.timestamp) }}</time>
          </div>
          <p v-if="f.comment">{{ f.comment }}</p>
        </article>
      </div>
      <p v-else class="sf-empty">No feedback yet. Use the floating widget on any doc page.</p>
    </section>

    <section class="sf-analytics-section">
      <h2>Support tickets</h2>
      <div v-if="summary.data.tickets.length" class="sf-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Category</th>
              <th>From</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="t in summary.data.tickets" :key="t.id">
              <td>{{ t.subject }}</td>
              <td>{{ t.category }}</td>
              <td>{{ t.email }}</td>
              <td>{{ formatDate(t.timestamp) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else class="sf-empty">No tickets submitted from this browser.</p>
    </section>

    <section class="sf-analytics-section">
      <h2>Community feature ideas</h2>
      <div v-if="featureIdeas.length" class="sf-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Company</th>
              <th>Votes</th>
              <th>Email</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in featureIdeas" :key="r.id">
              <td>{{ r.title }}</td>
              <td>{{ r.company }}</td>
              <td>{{ r.votes }}</td>
              <td>{{ r.email }}</td>
              <td>{{ formatDate(r.timestamp) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else class="sf-empty">No feature ideas stored in this browser.</p>
    </section>

    <button type="button" class="sf-btn-danger" @click="resetData">Reset local analytics</button>
  </div>
</template>
