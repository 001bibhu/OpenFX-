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

const IDEAS_KEY = 'syntheticfi-feature-ideas'
const VOTER_KEY = 'syntheticfi-feature-voter-id'

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
    id: 'seed-mobile-alerts',
    title: 'Mobile margin alert notifications',
    description:
      'Push notifications when a client portfolio approaches a margin warning or call, so advisors can act before market close.',
    email: 'advisor@summitwealth.example',
    company: 'Summit Wealth Partners',
    votes: 31,
    votedBy: [],
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 14,
    seeded: true,
  },
  {
    id: 'seed-vanguard',
    title: 'Vanguard brokerage integration',
    description:
      'Connect Vanguard accounts for eligibility review and collateral sync, similar to Schwab and Fidelity.',
    email: 'ops@ouifinancial.example',
    company: 'Oui Financial',
    votes: 28,
    votedBy: [],
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 21,
    seeded: true,
  },
  {
    id: 'seed-margin-csv',
    title: 'Export margin events to CSV',
    description:
      'Filter margin warnings and calls by date range and export for compliance reviews and client meetings.',
    email: 'compliance@fortressfp.example',
    company: 'Fortress Financial Partners',
    votes: 19,
    votedBy: [],
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 30,
    seeded: true,
  },
  {
    id: 'seed-advisor-dashboard',
    title: 'Household-level financing dashboard',
    description:
      'View all active financings across a client household in one screen, including combined margin status.',
    email: 'lia@ablewealth.example',
    company: 'Able Wealth Management',
    votes: 15,
    votedBy: [],
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 45,
    seeded: true,
  },
  {
    id: 'seed-api-webhooks',
    title: 'Webhook for term sheet acceptance',
    description:
      'Fire a webhook when a client signs a term sheet so CRM systems can update pipeline stages automatically.',
    email: 'dev@partnerfirm.example',
    company: 'Northbridge Advisors',
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
