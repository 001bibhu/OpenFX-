<script setup lang="ts">
import { withBase } from 'vitepress'
import { TALK_TO_US_URL } from '../utils/links'
import AiSearch from './AiSearch.vue'
import SupportTicketForm from './SupportTicketForm.vue'

const guideLinks = [
  { title: 'OpenFX Overview', desc: 'What it is, who uses it, and key concepts', path: '/core/overview' },
  { title: 'Getting started', desc: 'Onboarding for engineering and treasury teams', path: '/core/getting-started' },
  { title: 'FAQ', desc: 'Quick answers to common questions', path: '/core/faq' },
  { title: 'Admin guide', desc: 'Organization settings, roles, and compliance', path: '/core/admin-guide' },
  { title: 'Troubleshooting', desc: 'Resolve trade, settlement, and API issues', path: '/core/troubleshooting' },
]

const apiLinks = [
  { title: 'API overview', desc: 'REST concepts, webhooks, and quick start', path: '/platform/api-overview' },
  { title: 'Authentication', desc: 'OAuth, API keys, and scopes', path: '/platform/authentication' },
  { title: 'API reference', desc: 'Quotes, trades, deposits, and withdrawals', path: '/platform/api-reference' },
]

const integrationLinks = [
  { title: 'Solutions overview', desc: 'Integration patterns and data flow', path: '/integrations/overview' },
  { title: 'Remittance companies', desc: 'Same-day settlement, eliminate pre-funding', path: '/integrations/remittance-companies' },
  { title: 'Payment service providers', desc: '24/7 payments, treasury simplification', path: '/integrations/payment-service-providers' },
  { title: 'On and off ramps', desc: 'Instant funding and withdrawal across currencies', path: '/integrations/on-and-off-ramps' },
]

function href(path: string) {
  return withBase(path)
}
</script>

<template>
  <div class="sf-home">
    <!-- Hero -->
    <header class="sf-hero">
      <div class="sf-hero-glow" />
      <div class="sf-hero-inner">
        <p class="sf-hero-eyebrow">Documentation</p>
        <h1>
          Move money faster
          <span>across borders in minutes, not days</span>
        </h1>
        <p class="sf-hero-sub">
          Guides, API references, and solutions for remittance companies, payment service
          providers, and fintechs building on OpenFX.
        </p>
        <AiSearch />
        <div class="sf-hero-actions">
          <a :href="href('/core/getting-started')" class="sf-btn-primary">Get started</a>
          <a :href="TALK_TO_US_URL" class="sf-btn-secondary" target="_blank" rel="noopener noreferrer">
            Get a demo
          </a>
          <a :href="href('/core/overview')" class="sf-btn-ghost">Read overview</a>
        </div>
      </div>
    </header>

    <!-- Developer community CTA -->
    <section class="sf-whats-new sf-community-cta">
      <div class="sf-whats-new-inner">
        <div class="sf-whats-new-copy">
          <span class="sf-whats-new-badge">Community</span>
          <h2>Developer Community</h2>
          <p>
            Share integration patterns, ask API questions, and learn from developers
            building on OpenFX. Post, like, and discuss, moderated for quality.
          </p>
        </div>
        <a :href="href('/developer-community/')" class="sf-btn-primary">Join the community</a>
      </div>
    </section>

    <!-- What's new -->
    <section class="sf-whats-new">
      <div class="sf-whats-new-inner">
        <div class="sf-whats-new-copy">
          <span class="sf-whats-new-badge">Latest</span>
          <h2>What's new</h2>
          <p>
            Release notes, product updates, and documentation changes, stay current
            with OpenFX platform improvements, new corridors, and API enhancements.
          </p>
        </div>
        <a :href="href('/whats-new/')" class="sf-btn-primary">View release notes</a>
      </div>
    </section>

    <!-- Doc sections -->
    <section class="sf-sections">
      <div class="sf-sections-inner">
        <div class="sf-section-col">
          <div class="sf-section-head">
            <span class="sf-section-icon guides">📘</span>
            <div>
              <h2>Guides</h2>
              <p>Product concepts, onboarding, and day-to-day operations</p>
            </div>
          </div>
          <ul class="sf-link-cards">
            <li v-for="link in guideLinks" :key="link.path">
              <a :href="href(link.path)">
                <strong>{{ link.title }}</strong>
                <span>{{ link.desc }}</span>
              </a>
            </li>
          </ul>
        </div>

        <div class="sf-section-col">
          <div class="sf-section-head">
            <span class="sf-section-icon api">⚡</span>
            <div>
              <h2>API reference</h2>
              <p>Build integrations with our Trading API and webhooks</p>
            </div>
          </div>
          <ul class="sf-link-cards">
            <li v-for="link in apiLinks" :key="link.path">
              <a :href="href(link.path)">
                <strong>{{ link.title }}</strong>
                <span>{{ link.desc }}</span>
              </a>
            </li>
          </ul>
        </div>

        <div class="sf-section-col">
          <div class="sf-section-head">
            <span class="sf-section-icon integrations">🔗</span>
            <div>
              <h2>Solutions</h2>
              <p>Remittance, PSP, and on/off ramp integration guides</p>
            </div>
          </div>
          <ul class="sf-link-cards">
            <li v-for="link in integrationLinks" :key="link.path">
              <a :href="href(link.path)">
                <strong>{{ link.title }}</strong>
                <span>{{ link.desc }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Support -->
    <section class="sf-support">
      <div class="sf-support-inner">
        <div class="sf-support-copy">
          <h2>Need help?</h2>
          <p>
            Submit a support ticket and our team will respond promptly.
            OpenFX support is available 24/7/365. Every documentation page also
            includes a floating feedback widget, your 👍 👎 ratings help us improve content.
          </p>
          <div class="sf-support-links">
            <a :href="TALK_TO_US_URL" class="sf-btn-primary" target="_blank" rel="noopener noreferrer">
              Get a demo
            </a>
          </div>
        </div>
        <div class="sf-support-form">
          <h3>Create a support ticket</h3>
          <SupportTicketForm compact />
        </div>
      </div>
    </section>

    <!-- Footer note -->
    <section class="sf-analytics-banner">
      <div class="sf-analytics-banner-inner">
        <div>
          <h3>Have an idea?</h3>
          <p>
            Submit feature suggestions and vote on ideas from other institutions on the
            <a :href="href('/feature-ideas/')">community ideas page</a>.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
