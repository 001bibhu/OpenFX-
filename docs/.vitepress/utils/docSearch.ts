export interface DocResult {
  title: string
  path: string
  excerpt: string
  section: string
}

const DOC_INDEX: DocResult[] = [
  {
    title: 'SyntheticFi Overview',
    path: '/core/overview',
    section: 'Guides',
    excerpt: 'What SyntheticFi is, who uses it, and how portfolio-backed liquidity works.',
  },
  {
    title: 'Getting started with SyntheticFi',
    path: '/core/getting-started',
    section: 'Guides',
    excerpt: 'Onboarding steps for financial advisors and individual investors.',
  },
  {
    title: 'How it works',
    path: '/core/how-it-works',
    section: 'Guides',
    excerpt: 'Collateral, locking, financing lifecycle, and margin calls explained simply.',
  },
  {
    title: 'FAQ',
    path: '/core/faq',
    section: 'Guides',
    excerpt: 'Quick answers about eligibility, margin, repayment, and integrations.',
  },
  {
    title: 'Admin guide',
    path: '/core/admin-guide',
    section: 'Guides',
    excerpt: 'Firm settings, roles, compliance controls, and advisor management.',
  },
  {
    title: "What's new",
    path: '/whats-new/',
    section: 'Updates',
    excerpt: 'Release notes, product updates, and documentation changes.',
  },
  {
    title: 'Suggest a feature',
    path: '/feature-ideas/',
    section: 'Community',
    excerpt: 'Submit product ideas and vote on requests from other advisors and partners.',
  },
  {
    title: 'Troubleshooting',
    path: '/core/troubleshooting',
    section: 'Guides',
    excerpt: 'Fix account linking, eligibility, margin alerts, and dashboard issues.',
  },
  {
    title: 'API overview',
    path: '/platform/api-overview',
    section: 'API',
    excerpt: 'REST API concepts, environments, webhooks, and quick start.',
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
    excerpt: 'Endpoints for clients, eligibility, term sheets, and financings.',
  },
  {
    title: 'Integrations overview',
    path: '/integrations/overview',
    section: 'Integrations',
    excerpt: 'How brokerages and custodians connect and how data flows.',
  },
  {
    title: 'Brokerages',
    path: '/integrations/brokerages',
    section: 'Integrations',
    excerpt: 'Interactive Brokers, Schwab, Fidelity, and linking workflows.',
  },
  {
    title: 'Custodians',
    path: '/integrations/custodians',
    section: 'Integrations',
    excerpt: 'Institutional custodian setup, rep codes, and collateral holds.',
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

  if (q.includes('margin') || q.includes('drop') || q.includes('market')) {
    return {
      answer:
        'If your portfolio drops in value, SyntheticFi monitors collateral coverage. You may receive a warning or margin call with options to add collateral, repay partially, or restructure. See the margin section in How it works for step-by-step guidance.',
      sources: sources.length ? sources : [DOC_INDEX[2], DOC_INDEX[6]],
    }
  }

  if (q.includes('advisor') || q.includes('onboard')) {
    return {
      answer:
        'Advisors register their firm, connect custodian integrations, complete certification, then onboard clients via secure links. Eligibility review is typically same-day for connected accounts.',
      sources: sources.length ? sources : [DOC_INDEX[1], DOC_INDEX[4]],
    }
  }

  if (q.includes('api') || q.includes('integrat')) {
    return {
      answer:
        'SyntheticFi offers a REST API with OAuth authentication, webhooks for margin and funding events, and sandbox testing. Start with the API overview, then review authentication and the endpoint reference.',
      sources: sources.length ? sources : [DOC_INDEX[7], DOC_INDEX[9]],
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
      'I could not find an exact match. Try searching for "margin", "getting started", "API", or "integrations", or browse the guide sections below.',
    sources: [],
  }
}
