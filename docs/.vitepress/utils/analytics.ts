export type Vote = 'up' | 'down'

export interface FeedbackEntry {
  id: string
  page: string
  pageTitle: string
  vote: Vote
  comment: string
  timestamp: number
}

export interface TicketEntry {
  id: string
  name: string
  email: string
  category: string
  subject: string
  description: string
  timestamp: number
}

export interface FeatureRequestEntry {
  id: string
  name: string
  email: string
  title: string
  category: string
  description: string
  timestamp: number
}

export interface AnalyticsStore {
  pageViews: Record<string, number>
  feedback: FeedbackEntry[]
  tickets: TicketEntry[]
  featureRequests: FeatureRequestEntry[]
}

const STORAGE_KEY = 'openfx-docs-analytics'

function uid(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function loadAnalytics(): AnalyticsStore {
  if (typeof window === 'undefined') {
    return { pageViews: {}, feedback: [], tickets: [], featureRequests: [] }
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return seedAnalytics()
    return JSON.parse(raw) as AnalyticsStore
  } catch {
    return seedAnalytics()
  }
}

function seedAnalytics(): AnalyticsStore {
  return {
    pageViews: {
      '/core/overview': 128,
      '/core/getting-started': 94,
      '/core/faq': 76,
      '/platform/api-overview': 52,
    },
    feedback: [],
    tickets: [],
    featureRequests: [],
  }
}

function saveAnalytics(data: AnalyticsStore): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function trackPageView(path: string): void {
  const data = loadAnalytics()
  data.pageViews[path] = (data.pageViews[path] ?? 0) + 1
  saveAnalytics(data)
}

export function submitFeedback(entry: Omit<FeedbackEntry, 'id' | 'timestamp'>): FeedbackEntry {
  const data = loadAnalytics()
  const record: FeedbackEntry = { ...entry, id: uid(), timestamp: Date.now() }
  data.feedback.unshift(record)
  saveAnalytics(data)
  return record
}

export function submitTicket(entry: Omit<TicketEntry, 'id' | 'timestamp'>): TicketEntry {
  const data = loadAnalytics()
  const record: TicketEntry = { ...entry, id: uid(), timestamp: Date.now() }
  data.tickets.unshift(record)
  saveAnalytics(data)
  return record
}

export function submitFeatureRequest(
  entry: Omit<FeatureRequestEntry, 'id' | 'timestamp'>,
): FeatureRequestEntry {
  const data = loadAnalytics()
  const record: FeatureRequestEntry = { ...entry, id: uid(), timestamp: Date.now() }
  data.featureRequests.unshift(record)
  saveAnalytics(data)
  return record
}

export function getAnalyticsSummary() {
  const data = loadAnalytics()
  const totalViews = Object.values(data.pageViews).reduce((a, b) => a + b, 0)
  const likes = data.feedback.filter((f) => f.vote === 'up').length
  const dislikes = data.feedback.filter((f) => f.vote === 'down').length
  const topPages = Object.entries(data.pageViews)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)

  return { data, totalViews, likes, dislikes, topPages }
}

export function clearAnalytics(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}
