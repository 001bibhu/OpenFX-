export interface FeatureIdea {
  id: string
  title: string
  description: string
  email: string
  company: string
  votes: number
  votedBy: string[]
  timestamp: number
  seeded?: boolean
}

const IDEAS_KEY = 'openfx-feature-ideas'
const VOTER_KEY = 'openfx-feature-voter-id'

function uid(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function getVoterId(): string {
  if (typeof window === 'undefined') return 'server'
  let id = localStorage.getItem(VOTER_KEY)
  if (!id) {
    id = uid()
    localStorage.setItem(VOTER_KEY, id)
  }
  return id
}

const SEED_IDEAS: FeatureIdea[] = [
  {
    id: 'seed-streaming-quotes',
    title: 'Streaming quote API for high-frequency trading',
    description:
      'WebSocket or SSE endpoint for live FX quotes instead of polling, reducing latency for payment orchestration flows.',
    email: 'eng@yellowcard.example',
    company: 'Yellow Card',
    votes: 31,
    votedBy: [],
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 14,
    seeded: true,
  },
  {
    id: 'seed-virtual-accounts',
    title: 'Virtual named accounts for end clients',
    description:
      'Issue virtual IBANs or local account numbers per end customer for easier reconciliation and compliance.',
    email: 'ops@velafi.example',
    company: 'VelaFi',
    votes: 28,
    votedBy: [],
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 21,
    seeded: true,
  },
  {
    id: 'seed-settlement-csv',
    title: 'Export settlement history to CSV',
    description:
      'Filter trades and withdrawals by date range and corridor, then export for reconciliation and regulatory reporting.',
    email: 'treasury@globalpay.example',
    company: 'GlobalPay Solutions',
    votes: 19,
    votedBy: [],
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 30,
    seeded: true,
  },
  {
    id: 'seed-multi-withdraw',
    title: 'Batch withdrawal API',
    description:
      'Submit multiple payouts in a single API call for remittance corridors with high beneficiary volume.',
    email: 'dev@remitfast.example',
    company: 'RemitFast',
    votes: 15,
    votedBy: [],
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 45,
    seeded: true,
  },
  {
    id: 'seed-webhook-retry',
    title: 'Webhook delivery retry dashboard',
    description:
      'View failed webhook deliveries and manually retry from the dashboard without re-registering endpoints.',
    email: 'dev@rampco.example',
    company: 'RampCo',
    votes: 11,
    votedBy: [],
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 60,
    seeded: true,
  },
]

function sortIdeas(ideas: FeatureIdea[]): FeatureIdea[] {
  return [...ideas].sort((a, b) => b.votes - a.votes || b.timestamp - a.timestamp)
}

function loadRaw(): FeatureIdea[] {
  if (typeof window === 'undefined') return sortIdeas([...SEED_IDEAS])
  try {
    const raw = localStorage.getItem(IDEAS_KEY)
    if (!raw) {
      saveIdeas([...SEED_IDEAS])
      return sortIdeas([...SEED_IDEAS])
    }
    const parsed = JSON.parse(raw) as FeatureIdea[]
    if (!parsed.length) {
      saveIdeas([...SEED_IDEAS])
      return sortIdeas([...SEED_IDEAS])
    }
    return sortIdeas(parsed)
  } catch {
    saveIdeas([...SEED_IDEAS])
    return sortIdeas([...SEED_IDEAS])
  }
}

function saveIdeas(ideas: FeatureIdea[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(IDEAS_KEY, JSON.stringify(ideas))
}

export function getFeatureIdeas(): FeatureIdea[] {
  return loadRaw()
}

export function submitFeatureIdea(entry: {
  title: string
  description: string
  email: string
  company: string
}): FeatureIdea {
  const ideas = loadRaw()
  const record: FeatureIdea = {
    id: uid(),
    title: entry.title.trim(),
    description: entry.description.trim(),
    email: entry.email.trim(),
    company: entry.company.trim(),
    votes: 1,
    votedBy: [getVoterId()],
    timestamp: Date.now(),
  }
  saveIdeas([record, ...ideas])
  return record
}

export function voteForIdea(id: string): { ok: boolean; ideas: FeatureIdea[] } {
  const voterId = getVoterId()
  const ideas = loadRaw()
  const idea = ideas.find((i) => i.id === id)
  if (!idea) return { ok: false, ideas }
  if (idea.votedBy.includes(voterId)) return { ok: false, ideas }
  idea.votedBy.push(voterId)
  idea.votes += 1
  saveIdeas(ideas)
  return { ok: true, ideas: sortIdeas(ideas) }
}

export function hasVoted(id: string): boolean {
  const idea = loadRaw().find((i) => i.id === id)
  return idea ? idea.votedBy.includes(getVoterId()) : false
}

export function resetFeatureIdeas(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(IDEAS_KEY)
}
