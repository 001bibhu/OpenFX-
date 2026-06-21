<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  getCommunityPosts,
  submitCommunityPost,
  likePost,
  hasLiked,
  moderatePost,
  isCommunityAdmin,
  loginCommunityAdmin,
  logoutCommunityAdmin,
  CATEGORY_LABELS,
  type PostCategory,
  type CommunityPost,
} from '../utils/developerCommunity'

const posts = ref<CommunityPost[]>([])
const filter = ref<PostCategory | 'all'>('all')
const adminMode = ref(false)
const adminPassword = ref('')
const adminError = ref('')

const author = ref('')
const email = ref('')
const company = ref('')
const title = ref('')
const body = ref('')
const category = ref<PostCategory>('general')
const submitted = ref(false)
const submitError = ref('')
const showForm = ref(false)

const categories = Object.entries(CATEGORY_LABELS) as [PostCategory, string][]

const visiblePosts = computed(() =>
  getCommunityPosts({ category: filter.value, adminView: adminMode.value }),
)

const pendingCount = computed(() =>
  getCommunityPosts({ adminView: true }).filter((p) => p.status === 'pending').length,
)

function refresh() {
  adminMode.value = isCommunityAdmin()
  posts.value = visiblePosts.value
}

onMounted(refresh)

function applyFilter(cat: PostCategory | 'all') {
  filter.value = cat
  posts.value = getCommunityPosts({ category: cat, adminView: adminMode.value })
}

function tryAdminLogin() {
  adminError.value = ''
  if (loginCommunityAdmin(adminPassword.value)) {
    adminMode.value = true
    adminPassword.value = ''
    refresh()
  } else {
    adminError.value = 'Incorrect password.'
  }
}

function adminLogout() {
  logoutCommunityAdmin()
  adminMode.value = false
  refresh()
}

function submit() {
  submitError.value = ''
  if (!author.value.trim() || !email.value.trim() || !company.value.trim() || !title.value.trim() || !body.value.trim()) {
    submitError.value = 'Please fill in all fields.'
    return
  }
  submitCommunityPost({
    author: author.value,
    email: email.value,
    company: company.value,
    title: title.value,
    body: body.value,
    category: category.value,
  })
  author.value = ''
  email.value = ''
  company.value = ''
  title.value = ''
  body.value = ''
  category.value = 'general'
  submitted.value = true
  showForm.value = false
  refresh()
  setTimeout(() => {
    submitted.value = false
  }, 5000)
}

function like(id: string) {
  const result = likePost(id)
  if (result.ok) {
    posts.value = getCommunityPosts({ category: filter.value, adminView: adminMode.value })
  }
}

function mod(id: string, action: 'approve' | 'reject' | 'delete' | 'pin' | 'unpin') {
  moderatePost(id, action)
  refresh()
}

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function statusLabel(status: string) {
  if (status === 'pending') return 'Pending review'
  if (status === 'rejected') return 'Rejected'
  return ''
}
</script>

<template>
  <div class="sf-dev-community">
    <header class="sf-community-hero">
      <span class="sf-community-badge">Developer Community</span>
      <h1>Build together on OpenFX</h1>
      <p>
        Share integration patterns, ask questions, and learn from other developers
        building cross-border payment flows. Posts are reviewed by moderators before
        going live.
      </p>
    </header>

    <!-- Admin panel -->
    <section v-if="!adminMode" class="sf-community-admin-login">
      <details>
        <summary>Moderator login</summary>
        <p class="sf-admin-login-hint">Content admins can approve, reject, pin, or remove posts.</p>
        <form class="sf-admin-login-form" @submit.prevent="tryAdminLogin">
          <input
            v-model="adminPassword"
            type="password"
            placeholder="Admin password"
            autocomplete="current-password"
          />
          <button type="submit" class="sf-btn-secondary sf-btn-sm">Sign in</button>
        </form>
        <p v-if="adminError" class="sf-form-error">{{ adminError }}</p>
      </details>
    </section>

    <section v-else class="sf-community-admin-bar">
      <strong>Moderator mode</strong>
      <span v-if="pendingCount" class="sf-pending-badge">{{ pendingCount }} pending</span>
      <button type="button" class="sf-btn-ghost sf-btn-sm" @click="adminLogout">Sign out</button>
    </section>

    <!-- Filters -->
    <div class="sf-community-filters" role="tablist" aria-label="Filter posts">
      <button
        type="button"
        role="tab"
        :class="{ active: filter === 'all' }"
        @click="applyFilter('all')"
      >
        All
      </button>
      <button
        v-for="[id, label] in categories"
        :key="id"
        type="button"
        role="tab"
        :class="{ active: filter === id }"
        @click="applyFilter(id)"
      >
        {{ label }}
      </button>
    </div>

    <!-- Success after submit -->
    <div v-if="submitted" class="sf-form-success sf-community-submit-success">
      <strong>Post submitted for review.</strong>
      A moderator will approve it before it appears publicly. Check back soon!
    </div>

    <!-- Posts -->
    <ul v-if="posts.length" class="sf-community-list">
      <li
        v-for="post in posts"
        :key="post.id"
        class="sf-community-card"
        :class="{ pinned: post.pinned, pending: post.status === 'pending', rejected: post.status === 'rejected' }"
      >
        <div class="sf-community-card-head">
          <span v-if="post.pinned" class="sf-pin-tag">Pinned</span>
          <span v-if="adminMode && post.status !== 'approved'" class="sf-status-tag" :class="post.status">
            {{ statusLabel(post.status) }}
          </span>
          <span class="sf-category-tag">{{ CATEGORY_LABELS[post.category] }}</span>
        </div>

        <div class="sf-community-card-body">
          <h2>{{ post.title }}</h2>
          <div class="sf-post-content">{{ post.body }}</div>
          <div class="sf-community-meta">
            <span>{{ post.author }} · {{ post.company }}</span>
            <span>{{ formatDate(post.timestamp) }}</span>
          </div>
        </div>

        <div class="sf-community-card-actions">
          <button
            v-if="post.status === 'approved'"
            type="button"
            class="sf-like-btn"
            :class="{ liked: hasLiked(post.id) }"
            :disabled="hasLiked(post.id)"
            @click="like(post.id)"
          >
            <span aria-hidden="true">♥</span>
            {{ post.likes }}
          </button>

          <div v-if="adminMode" class="sf-mod-actions">
            <button
              v-if="post.status === 'pending'"
              type="button"
              class="sf-mod-btn approve"
              @click="mod(post.id, 'approve')"
            >
              Approve
            </button>
            <button
              v-if="post.status === 'pending'"
              type="button"
              class="sf-mod-btn reject"
              @click="mod(post.id, 'reject')"
            >
              Reject
            </button>
            <button
              v-if="!post.pinned"
              type="button"
              class="sf-mod-btn"
              @click="mod(post.id, 'pin')"
            >
              Pin
            </button>
            <button
              v-else
              type="button"
              class="sf-mod-btn"
              @click="mod(post.id, 'unpin')"
            >
              Unpin
            </button>
            <button type="button" class="sf-mod-btn delete" @click="mod(post.id, 'delete')">
              Delete
            </button>
          </div>
        </div>
      </li>
    </ul>
    <p v-else class="sf-empty">No posts in this category yet. Be the first to share!</p>

    <!-- New post -->
    <section class="sf-community-new-post">
      <button
        v-if="!showForm"
        type="button"
        class="sf-btn-primary"
        @click="showForm = true"
      >
        Write a post
      </button>

      <div v-else class="sf-community-form-wrap">
        <h2>Share with the community</h2>
        <p class="sf-ideas-form-lead">
          Integration tips, API questions, corridor updates, all welcome. Posts appear
          after moderator approval.
        </p>
        <form class="sf-ideas-form" @submit.prevent="submit">
          <div class="sf-form-grid">
            <label class="sf-field">
              <span class="sf-field-label">Your name</span>
              <input v-model="author" type="text" required placeholder="Alex Chen" />
            </label>
            <label class="sf-field">
              <span class="sf-field-label">Email</span>
              <input v-model="email" type="email" required placeholder="you@company.com" />
            </label>
            <label class="sf-field">
              <span class="sf-field-label">Company</span>
              <input v-model="company" type="text" required placeholder="Your organization" />
            </label>
            <label class="sf-field">
              <span class="sf-field-label">Category</span>
              <select v-model="category">
                <option v-for="[id, label] in categories" :key="id" :value="id">{{ label }}</option>
              </select>
            </label>
            <label class="sf-field sf-field-full">
              <span class="sf-field-label">Title</span>
              <input v-model="title" type="text" required maxlength="140" placeholder="What's this about?" />
            </label>
            <label class="sf-field sf-field-full sf-field-textarea">
              <span class="sf-field-label">Post</span>
              <textarea
                v-model="body"
                required
                rows="8"
                placeholder="Share code snippets, integration patterns, or questions. Markdown-style formatting is preserved as plain text."
              />
            </label>
          </div>
          <p v-if="submitError" class="sf-form-error">{{ submitError }}</p>
          <div class="sf-form-actions">
            <button type="button" class="sf-btn-ghost" @click="showForm = false">Cancel</button>
            <button type="submit" class="sf-btn-primary">Submit for review</button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<style scoped>
.sf-field select {
  width: 100%;
  box-sizing: border-box;
  padding: 0.65rem 0.85rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.9375rem;
  font-family: inherit;
}

.sf-post-content {
  white-space: pre-wrap;
  line-height: 1.65;
  color: var(--vp-c-text-1);
  font-size: 0.9375rem;
  margin: 0 0 1rem;
}
</style>
