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
    excerpt: 'Product updates, new corridors, and platform improvements.',
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

const FAQ = DOC_INDEX[3]
const GETTING_STARTED = DOC_INDEX[1]
const HOW_IT_WORKS = DOC_INDEX[2]
const API_OVERVIEW = DOC_INDEX[9]
const AUTH = DOC_INDEX[10]
const API_REF = DOC_INDEX[11]
const COMMUNITY = DOC_INDEX[6]
const WHATS_NEW = DOC_INDEX[5]

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

  if (q.includes('settle') || q.includes('speed') || q.includes('fast') || q.includes('how long')) {
    return {
      answer:
        'OpenFX settles 90% of trades in under 60 minutes, with 30% in under 10 minutes — significantly faster than the 2–7 day timelines typical of traditional FX providers. Many transactions qualify for T+0 (same-day) settlement. The platform operates 24/7/365, including weekends and holidays.',
      sources: sources.length ? sources : [HOW_IT_WORKS, FAQ],
    }
  }

  if (q.includes('stablecoin') || q.includes('usdc') || q.includes('usdt') || q.includes('crypto')) {
    return {
      answer:
        'Yes. OpenFX supports USDC and USDT for on-ramping, off-ramping, and cross-border transfers. Crypto deposits settle in near real-time, subject to blockchain speed and congestion. Fiat and stablecoin rails are available on the same platform.',
      sources: sources.length ? sources : [FAQ, DOC_INDEX[15]],
    }
  }

  if (q.includes('price') || q.includes('fee') || q.includes('cost') || q.includes('spread') || q.includes('pricing')) {
    return {
      answer:
        'OpenFX pricing is based on the mid-market rate plus a small spread: 3–5 bps for G20 currencies and 10–12 bps for emerging markets. There are no hidden fees or markups. Traditional banks often charge 20–50+ bps for expedited settlement. Volume-based tiers reward scale — clients doing $30–500M monthly typically see spreads in the 3–5 bps range.',
      sources: sources.length ? sources : [FAQ],
    }
  }

  if (q.includes('onboard') || q.includes('start') || q.includes('sandbox') || q.includes('get started')) {
    return {
      answer:
        'Getting started takes less than 72 hours — compared to six months or more with traditional FX providers. Schedule a demo at openfx.com, complete KYC, and access a personalized sandbox to test quotes, trades, and withdrawals. Integrate via the web GUI or Trading API. See Getting started for engineering and treasury onboarding paths.',
      sources: sources.length ? sources : [GETTING_STARTED, FAQ],
    }
  }

  if (q.includes('pre-fund') || q.includes('prefund') || q.includes('nostro') || q.includes('working capital')) {
    return {
      answer:
        'A key benefit of OpenFX is eliminating pre-funding requirements. Instead of holding idle balances in nostro accounts across corridors, clients access deep liquidity on demand through OpenFX\'s network — freeing working capital and simplifying treasury.',
      sources: sources.length ? sources : [FAQ, DOC_INDEX[13]],
    }
  }

  if (q.includes('sepa') || q.includes('fps') || q.includes('npp') || q.includes('rail') || q.includes('payment rail')) {
    return {
      answer:
        'OpenFX supports 40+ currency pairs and 25+ local payment rails. This includes SEPA Instant for EUR, Faster Payments (FPS) for GBP, and NPP for AUD (real-time settlement via local account number and BSB). Banking infrastructure covers the US, UK, Europe, UAE, Mexico, Brazil, and Southeast Asia.',
      sources: sources.length ? sources : [FAQ, HOW_IT_WORKS],
    }
  }

  if (q.includes('who can') || q.includes('institutional') || q.includes('personal') || q.includes('remittance') || q.includes('psp')) {
    return {
      answer:
        'OpenFX serves institutional clients only: remittance companies, fintechs, payment processors, digital banks, brokers, and investment platforms. Personal or retail transactions are not supported. If you need real-time settlement across fiat and stablecoin rails, OpenFX is purpose-built for your use case.',
      sources: sources.length ? sources : [FAQ, DOC_INDEX[0]],
    }
  }

  if (q.includes('cancel') || q.includes('reverse') || q.includes('undo')) {
    return {
      answer:
        'Once a trade is confirmed on OpenFX, it cannot be canceled. You may reverse the position by executing a new trade in the opposite direction. In some cases, OpenFX may review and offer a one-time spread credit, subject to approval.',
      sources: sources.length ? sources : [FAQ],
    }
  }

  if (q.includes('deposit') || q.includes('fund') || q.includes('credit')) {
    return {
      answer:
        'Fiat deposits typically reflect within 20 minutes once received. Crypto deposits (USDC, USDT) settle in near real-time, subject to blockchain speed and congestion. Timelines may vary depending on the sending institution and rail used.',
      sources: sources.length ? sources : [FAQ, HOW_IT_WORKS],
    }
  }

  if (q.includes('treasury') || q.includes('multi-currency') || q.includes('balance')) {
    return {
      answer:
        'OpenFX supports multi-currency account management from a single dashboard. Hold balances across USD, EUR, GBP, and more; execute FX conversions; move funds between currency accounts; and withdraw multiple times per day — all with real-time settlement tracking.',
      sources: sources.length ? sources : [FAQ, DOC_INDEX[4]],
    }
  }

  if (q.includes('compliance') || q.includes('aml') || q.includes('kyc') || q.includes('regulat')) {
    return {
      answer:
        'OpenFX partners with licensed and regulated entities in each market for AML/KYC and compliance. The platform holds necessary licenses and registrations (including NMLS ID 2680829 in the US) and integrates with clients\' existing compliance workflows.',
      sources: sources.length ? sources : [FAQ],
    }
  }

  if (q.includes('support') || q.includes('24/7') || q.includes('account manager')) {
    return {
      answer:
        'OpenFX support is available 24/7/365. Each client is assigned a dedicated account manager for ongoing relationship management, business reviews, and strategic planning. Contact hello@openfx.com or create a support ticket.',
      sources: sources.length ? sources : [FAQ],
    }
  }

  if (q.includes('community') || q.includes('forum') || q.includes('post')) {
    return {
      answer:
        'The OpenFX Developer Community is where developers share integration patterns, API tips, and corridor updates. Posts are moderated before going live. Visit the Developer Community page to read or submit a post.',
      sources: sources.length ? sources : [COMMUNITY],
    }
  }

  if (q.includes('api') || q.includes('integrat') || q.includes('quote') || q.includes('trade') || q.includes('webhook')) {
    return {
      answer:
        'OpenFX offers a REST Trading API (with REST, FIX, and streaming quote support) for programmatic quotes, trades, deposits, and withdrawals. Authenticate via OAuth client credentials, subscribe to webhooks for settlement events, and test in sandbox before production.',
      sources: sources.length ? sources : [API_OVERVIEW, AUTH, API_REF],
    }
  }

  if (q.includes('php') || q.includes('cop') || q.includes('ars') || q.includes('aed') || q.includes('corridor') || q.includes('currenc')) {
    return {
      answer:
        'OpenFX supports 40+ currency pairs across G20 and emerging markets. Recent corridor expansion includes PHP (Philippine Peso, newly launched), COP and ARS (beta), and AED (active). The roadmap continues to add emerging market currencies and local payout rails.',
      sources: sources.length ? sources : [WHATS_NEW, FAQ],
    }
  }

  if (q.includes('chat') || q.includes('telegram') || q.includes('slack')) {
    return {
      answer:
        'No. OpenFX does not support chat-based trading via Telegram, Slack, or similar channels. All trades must be executed through the secure web GUI or Trading API.',
      sources: sources.length ? sources : [FAQ],
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
      'I could not find an exact match. Try searching for "settlement speed", "stablecoins", "pricing", "getting started", or "payment rails", or browse the guide sections below.',
    sources: [],
  }
}
