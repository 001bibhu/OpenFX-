<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  getFeatureIdeas,
  submitFeatureIdea,
  voteForIdea,
  hasVoted,
  type FeatureIdea,
} from '../utils/featureIdeas'

const ideas = ref<FeatureIdea[]>([])
const email = ref('')
const company = ref('')
const title = ref('')
const description = ref('')
const submitted = ref(false)
const submitError = ref('')

function refresh() {
  ideas.value = getFeatureIdeas()
}

onMounted(refresh)

function submit() {
  submitError.value = ''
  if (!email.value.trim() || !company.value.trim() || !title.value.trim() || !description.value.trim()) {
    submitError.value = 'Please fill in all fields.'
    return
  }
  submitFeatureIdea({
    email: email.value,
    company: company.value,
    title: title.value,
    description: description.value,
  })
  email.value = ''
  company.value = ''
  title.value = ''
  description.value = ''
  submitted.value = true
  refresh()
  setTimeout(() => {
    submitted.value = false
  }, 4000)
}

function vote(id: string) {
  const result = voteForIdea(id)
  ideas.value = result.ideas
}

function isVoted(id: string) {
  return hasVoted(id)
}

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
</script>

<template>
  <div class="sf-feature-ideas">
    <header class="sf-ideas-hero">
      <h1>Suggest a feature</h1>
      <p>
        Help shape SyntheticFi. Vote on ideas from other advisors and partners, then
        submit your own, popular requests rise to the top.
      </p>
    </header>

    <!-- Ideas + voting first so it's visible without scrolling past the form -->
    <section class="sf-ideas-list-section" aria-labelledby="community-ideas-heading">
      <div class="sf-ideas-list-head">
        <h2 id="community-ideas-heading">Vote on community ideas</h2>
        <p>Click <strong>Vote</strong> to show support. Each person can vote once per idea.</p>
      </div>

      <ul v-if="ideas.length" class="sf-ideas-list">
        <li v-for="idea in ideas" :key="idea.id" class="sf-idea-card">
          <button
            type="button"
            class="sf-vote-btn"
            :class="{ voted: isVoted(idea.id) }"
            :disabled="isVoted(idea.id)"
            :aria-label="isVoted(idea.id) ? 'You voted for this idea' : `Vote for ${idea.title}`"
            @click="vote(idea.id)"
          >
            <span class="sf-vote-arrow" aria-hidden="true">▲</span>
            <span class="sf-vote-count">{{ idea.votes }}</span>
            <span class="sf-vote-label">{{ isVoted(idea.id) ? 'Voted' : 'Vote' }}</span>
          </button>
          <div class="sf-idea-body">
            <h3>{{ idea.title }}</h3>
            <p>{{ idea.description }}</p>
            <div class="sf-idea-meta">
              <span>{{ idea.company }}</span>
              <span>{{ formatDate(idea.timestamp) }}</span>
            </div>
          </div>
        </li>
      </ul>
      <p v-else class="sf-empty">Loading ideas…</p>
    </section>

    <div class="sf-ideas-divider" role="separator" />

    <!-- Submit form below -->
    <section class="sf-ideas-form-section" aria-labelledby="submit-idea-heading">
      <h2 id="submit-idea-heading">Submit your idea</h2>
      <p class="sf-ideas-form-lead">Tell us what you'd like to see built next.</p>

      <div v-if="submitted" class="sf-form-success">
        <strong>Thank you, your idea was submitted.</strong>
        It appears at the top of the list above. Ask colleagues to vote for it.
      </div>

      <form v-else class="sf-ideas-form" @submit.prevent="submit">
        <div class="sf-form-grid">
          <label class="sf-field">
            <span class="sf-field-label">Email</span>
            <input v-model="email" type="email" required placeholder="you@firm.com" />
          </label>
          <label class="sf-field">
            <span class="sf-field-label">Company name</span>
            <input v-model="company" type="text" required placeholder="Your firm or organization" />
          </label>
          <label class="sf-field sf-field-full">
            <span class="sf-field-label">Idea name</span>
            <input
              v-model="title"
              type="text"
              required
              maxlength="120"
              placeholder="e.g. Mobile margin alert notifications"
            />
          </label>
          <label class="sf-field sf-field-full sf-field-textarea">
            <span class="sf-field-label">Details</span>
            <span class="sf-field-hint">What should we build, and who benefits?</span>
            <textarea
              v-model="description"
              required
              rows="5"
              placeholder="Example: Push alerts when a client nears a margin call so advisors can act before market close."
            />
          </label>
        </div>
        <p v-if="submitError" class="sf-form-error">{{ submitError }}</p>
        <div class="sf-form-actions">
          <button type="submit" class="sf-btn-primary">Submit idea</button>
        </div>
      </form>
    </section>
  </div>
</template>
