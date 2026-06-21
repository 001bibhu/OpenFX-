export interface DocResult {
  title: string
  path: string
  excerpt: string
  section: string
}

const DOC_INDEX: DocResult[] = [
  {
    title: 'OpenFX Overview',
    path: '/core/overview',
    section: 'Guides',
    excerpt: 'What OpenFX is, who uses it, and how cross-border FX liquidity works.',
  },
  {
    title: 'Getting started with OpenFX',
    path: '/core/getting-started',
    section: 'Guides',
    excerpt: 'Onboarding steps for engineering and treasury teams.',
  },
  {
    title: 'How it works',
    path: '/core/how-it-works',
    section: 'Guides',
    excerpt: 'Quote, trade, settlement, and withdrawal lifecycle explained.',
  },
  {
    title: 'FAQ',
    path: '/core/faq',
    section: 'Guides',
    excerpt: 'Quick answers about pricing, settlement, stablecoins, and compliance.',
  },
  {
    title: 'Admin guide',
    path: '/core/admin-guide',
    section: 'Guides',
    excerpt: 'Organization settings, roles, treasury configuration, and compliance.',
  },
  {
    title: "What's new",
    path: '/whats-new/',
    section: 'Updates',
    excerpt: 'Release notes, product updates, and documentation changes.',
  },
  {
    title: 'Developer Community',
    path: '/developer-community/',
    section: 'Community',
    excerpt: 'Share integration tips, ask API questions, and learn from other OpenFX developers.',
  },
  {
    title: 'Suggest a feature',
    path: '/feature-ideas/',
    section: 'Community',
    excerpt: 'Submit product ideas and vote on requests from other institutions.',
  },
  {
    title: 'Troubleshooting',
    path: '/core/troubleshooting',
    section: 'Guides',
    excerpt: 'Fix trade, settlement, deposit, withdrawal, and API issues.',
  },
  {
    title: 'API overview',
    path: '/platform/api-overview',
    section: 'API',
    excerpt: 'Trading API concepts, environments, webhooks, and quick start.',
  },
  {
    title: 'Authentication',
    path: '/platform/authentication',
    section: 'API',
    excerpt: 'OAuth, API keys, scopes, and webhook signature verification.',
  },
  {
    title: 'API reference',
    path: '/platform/api-reference',
    section: 'API',
    excerpt: 'Endpoints for quotes, trades, deposits, withdrawals, and balances.',
  },
  {
    title: 'Integrations overview',
    path: '/integrations/overview',
    section: 'Solutions',
    excerpt: 'How to integrate OpenFX via API and webhooks.',
  },
  {
    title: 'Remittance companies',
    path: '/integrations/remittance-companies',
    section: 'Solutions',
    excerpt: 'Same-day settlement, eliminate pre-funding, expand corridors.',
  },
  {
    title: 'Payment service providers',
    path: '/integrations/payment-service-providers',
    section: 'Solutions',
    excerpt: '24/7 instant settlement and treasury simplification for PSPs.',
  },
  {
    title: 'On and off ramps',
    path: '/integrations/on-and-off-ramps',
    section: 'Solutions',
    excerpt: 'Instant funding and withdrawal across fiat and stablecoin rails.',
  },
]

export function searchDocs(query: string): DocResult[] {
  const q = query.trim().toLowerCase()
  if (!q) return []

  return DOC_INDEX.filter(
    (doc) =>
      doc.title.toLowerCase().includes(q) ||
      doc.excerpt.toLowerCase().includes(q) ||
      doc.section.toLowerCase().includes(q),
  ).slice(0, 6)
}

export function aiAnswer(query: string): { answer: string; sources: DocResult[] } {
  const sources = searchDocs(query)
  const q = query.toLowerCase()

  if (q.includes('settle') || q.includes('speed') || q.includes('fast')) {
    return {
      answer:
        'OpenFX settles 90% of trades in under 60 minutes, with 30% in under 10 minutes. This is significantly faster than the 2–7 day timelines of traditional FX providers. See How it works for the full trade lifecycle.',
      sources: sources.length ? sources : [DOC_INDEX[2], DOC_INDEX[3]],
    }
  }

  if (q.includes('onboard') || q.includes('start') || q.includes('sandbox')) {
    return {
      answer:
        'Getting started takes less than 72 hours. Schedule a demo, complete KYC, access the sandbox, and integrate the Trading API or use the web GUI. Engineering and treasury teams have separate onboarding paths.',
      sources: sources.length ? sources : [DOC_INDEX[1], DOC_INDEX[4]],
    }
  }

  if (q.includes('community') || q.includes('forum') || q.includes('post')) {
    return {
      answer:
        'The OpenFX Developer Community is where developers share integration patterns, API tips, and corridor updates. Posts are moderated before going live. Visit the Developer Community page to read or submit a post.',
      sources: sources.length ? sources : [DOC_INDEX.find((d) => d.path.includes('developer-community'))!].filter(Boolean),
    }
  }

  if (q.includes('api') || q.includes('integrat') || q.includes('quote') || q.includes('trade')) {
    return {
      answer:
        'OpenFX offers a REST Trading API with OAuth authentication, webhooks for settlement events, and sandbox testing. Start with the API overview, then review authentication and the endpoint reference for quotes, trades, and withdrawals.',
      sources: sources.length ? sources : [DOC_INDEX[8], DOC_INDEX[10]],
    }
  }

  if (q.includes('price') || q.includes('fee') || q.includes('cost') || q.includes('spread')) {
    return {
      answer:
        'OpenFX pricing is mid-market rate plus spread: 3–5 bps for G20 currencies, 10–12 bps for emerging markets. No hidden fees or markups. Volume-based tiers provide better rates at scale.',
      sources: sources.length ? sources : [DOC_INDEX[3]],
    }
  }

  if (sources.length) {
    return {
      answer: `Based on your question, these guides are the best starting points. ${sources[0].excerpt}`,
      sources,
    }
  }

  return {
    answer:
      'I could not find an exact match. Try searching for "settlement", "getting started", "API", or "pricing", or browse the guide sections below.',
    sources: [],
  }
}
