export type PostCategory = 'api' | 'integration' | 'treasury' | 'corridors' | 'question' | 'general'
export type PostStatus = 'pending' | 'approved' | 'rejected'

export interface CommunityPost {
  id: string
  title: string
  body: string
  author: string
  email: string
  company: string
  category: PostCategory
  status: PostStatus
  pinned: boolean
  likes: number
  likedBy: string[]
  timestamp: number
  seeded?: boolean
}

const STORAGE_KEY = 'openfx-developer-community'
const LIKER_KEY = 'openfx-community-liker-id'
const ADMIN_SESSION_KEY = 'openfx-community-admin'

/** Demo admin password for content moderators. Replace with backend auth in production. */
export const COMMUNITY_ADMIN_PASSWORD = 'openfx-admin'

export const CATEGORY_LABELS: Record<PostCategory, string> = {
  api: 'API',
  integration: 'Integration',
  treasury: 'Treasury',
  corridors: 'Corridors',
  question: 'Question',
  general: 'General',
}

function uid(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function getLikerId(): string {
  if (typeof window === 'undefined') return 'server'
  let id = localStorage.getItem(LIKER_KEY)
  if (!id) {
    id = uid()
    localStorage.setItem(LIKER_KEY, id)
  }
  return id
}

const SEED_POSTS: CommunityPost[] = [
  {
    id: 'seed-webhooks-settled',
    title: 'Webhook pattern: closing the loop on trade.settled',
    body: `We wired \`trade.settled\` and \`withdrawal.completed\` webhooks into our payment orchestration layer. Recommended flow:

1. POST /quotes → lock rate with time-lock guarantee
2. POST /trades with Idempotency-Key
3. On \`trade.settled\`, trigger downstream payout logic
4. On \`withdrawal.completed\`, mark beneficiary as paid

Always verify \`X-OpenFX-Signature\` before processing. Reject timestamps older than 5 minutes.

See the Authentication doc for HMAC verification. Happy to share our Node.js middleware if anyone wants it.`,
    author: 'Priya K.',
    email: 'eng@globalpay.example',
    company: 'GlobalPay Solutions',
    category: 'integration',
    status: 'approved',
    pinned: true,
    likes: 42,
    likedBy: [],
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 2,
    seeded: true,
  },
  {
    id: 'seed-php-corridor',
    title: 'PHP corridor is live, anyone testing USD → PHP yet?',
    body: `OpenFX just launched PHP (Philippine Peso) with local payout rails. We're piloting a remittance corridor and seeing sub-60-minute settlement on most trades.

Tips from our sandbox testing:
- Fund USD balance first, then quote MXN→PHP or USD→PHP depending on your flow
- Withdrawals to local PHP rails need verified destination in Settings
- Beta corridors may have occasional spread widening during low-liquidity hours

Curious what rates others are seeing at $500K+ monthly volume. Our account manager quoted 10–12 bps for emerging markets, matches docs.`,
    author: 'Marco D.',
    email: 'dev@remitfast.example',
    company: 'RemitFast',
    category: 'corridors',
    status: 'approved',
    pinned: false,
    likes: 28,
    likedBy: [],
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 5,
    seeded: true,
  },
  {
    id: 'seed-quote-expiry',
    title: 'How do you handle quote expiry in automated PSP flows?',
    body: `Our platform fires hundreds of cross-border payments per hour. Quotes have a time-lock window, and we've hit edge cases where confirmation arrives after expiry.

Current approach:
- Poll quote status before POST /trades
- If expired, re-quote and compare rate drift against a configurable threshold (we use 2 bps)
- Alert treasury if drift exceeds threshold instead of auto-executing

Would love to hear how others handle this, especially for after-hours batches when OpenFX is still 24/7 but our ops team isn't.`,
    author: 'Alex T.',
    email: 'platform@paystream.example',
    company: 'PayStream',
    category: 'question',
    status: 'approved',
    pinned: false,
    likes: 19,
    likedBy: [],
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 8,
    seeded: true,
  },
  {
    id: 'seed-sandbox-prod',
    title: 'Sandbox → production checklist (what we learned)',
    body: `Just went live after 2 weeks in sandbox. Checklist that saved us:

**Before promotion**
- [ ] OAuth token refresh before expiry (3600s default)
- [ ] Idempotency-Key on every POST /trades and /withdrawals
- [ ] Webhook endpoint returns 2xx within timeout
- [ ] Error handling for \`quote_expired\` and \`insufficient_balance\`
- [ ] Separate credentials, never use sandbox secrets in prod

**Day-one monitoring**
- Watch first 10 trades manually in dashboard + API
- Compare sandbox mock timings vs real settlement (ours averaged 12 min for G20)

Certification review with account manager took ~3 business days. Worth doing a recorded walkthrough of your webhook handler.`,
    author: 'Jordan L.',
    email: 'eng@rampco.example',
    company: 'RampCo',
    category: 'api',
    status: 'approved',
    pinned: false,
    likes: 35,
    likedBy: [],
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 12,
    seeded: true,
  },
  {
    id: 'seed-sepa-instant',
    title: 'SEPA Instant EUR deposits, timing expectations?',
    body: `Docs say fiat deposits typically reflect within 20 minutes. For SEPA Instant specifically, we've seen near-instant credits in most cases, but one counterparty sent via standard SEPA and it took 4 hours.

Question for the community: do you maintain separate funding instructions per rail (Instant vs standard)? Our treasury team wants a single IBAN on file but ops keeps getting confused when senders pick the wrong rail.

Also, anyone using EUR as a hub currency for EM payouts (EUR → AED, EUR → MXN)?`,
    author: 'Sofia R.',
    email: 'treasury@fxbridge.example',
    company: 'FX Bridge',
    category: 'treasury',
    status: 'approved',
    pinned: false,
    likes: 14,
    likedBy: [],
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 15,
    seeded: true,
  },
  {
    id: 'seed-idempotency-batch',
    title: 'Idempotency keys for batch remittance payouts',
    body: `When submitting multiple withdrawals for a remittance batch, we generate Idempotency-Key as \`{batch_id}-{beneficiary_id}\`. That way retries after network blips don't double-pay.

Example:
\`\`\`
Idempotency-Key: batch_20260614-bene_8842
\`\`\`

OpenFX returns the original response on duplicate keys, exactly what we needed. We log the trade ID from first response and skip if we see a 409-style conflict.

Pair this with webhook \`withdrawal.completed\` for final confirmation. Don't mark paid on HTTP 201 alone, wait for settlement event.`,
    author: 'Wei C.',
    email: 'dev@yellowcard.example',
    company: 'Yellow Card',
    category: 'api',
    status: 'approved',
    pinned: false,
    likes: 31,
    likedBy: [],
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 18,
    seeded: true,
  },
  {
    id: 'seed-stablecoin-onramp',
    title: 'USDC on-ramp latency vs fiat, real numbers?',
    body: `Building an on/off ramp and testing both funding paths:

| Rail | Typical credit time |
|------|---------------------|
| USDC (Ethereum) | 2–8 min depending on gas |
| USDC (other chains) | varies |
| USD wire | 15–25 min |
| FPS (GBP) | near-instant |

Crypto deposits are great for 24/7 ops but blockchain congestion spikes hurt UX. Considering keeping a float in USDC on-platform and converting via API only when users off-ramp to fiat.

Anyone else using stablecoin as treasury hub with OpenFX? How do you manage chain selection for deposits?`,
    author: 'Hongyi T.',
    email: 'eng@velafi.example',
    company: 'VelaFi',
    category: 'integration',
    status: 'approved',
    pinned: false,
    likes: 22,
    likedBy: [],
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 21,
    seeded: true,
  },
  {
    id: 'seed-streaming-quotes',
    title: 'Feature request: streaming quotes for market-making integrations',
    body: `We integrate OpenFX as a liquidity backend for a neo-broker. Polling POST /quotes works but adds latency when users expect instant conversion previews.

Would a WebSocket or SSE streaming endpoint help others here? Our use case:
- User selects currency pair in app
- Live rate updates every 1–2 seconds while they review
- Lock on "Confirm" with final POST /trades

Upvote if this matters to you, also posted on the feature ideas page. Workaround today: cache quotes for 3 seconds and re-fetch on user action.`,
    author: 'Dev Team',
    email: 'dev@neobroker.example',
    company: 'NeoBroker LATAM',
    category: 'api',
    status: 'approved',
    pinned: false,
    likes: 17,
    likedBy: [],
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 25,
    seeded: true,
  },
]

function sortPosts(posts: CommunityPost[]): CommunityPost[] {
  return [...posts].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
    return b.timestamp - a.timestamp
  })
}

function loadRaw(): CommunityPost[] {
  if (typeof window === 'undefined') return sortPosts([...SEED_POSTS])
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      savePosts([...SEED_POSTS])
      return sortPosts([...SEED_POSTS])
    }
    const parsed = JSON.parse(raw) as CommunityPost[]
    if (!parsed.length) {
      savePosts([...SEED_POSTS])
      return sortPosts([...SEED_POSTS])
    }
    return sortPosts(parsed)
  } catch {
    savePosts([...SEED_POSTS])
    return sortPosts([...SEED_POSTS])
  }
}

function savePosts(posts: CommunityPost[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
}

export function isCommunityAdmin(): boolean {
  if (typeof window === 'undefined') return false
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === '1'
}

export function loginCommunityAdmin(password: string): boolean {
  if (password === COMMUNITY_ADMIN_PASSWORD) {
    sessionStorage.setItem(ADMIN_SESSION_KEY, '1')
    return true
  }
  return false
}

export function logoutCommunityAdmin(): void {
  if (typeof window === 'undefined') return
  sessionStorage.removeItem(ADMIN_SESSION_KEY)
}

/** Public feed: approved posts only. Admin sees everything. */
export function getCommunityPosts(options?: {
  category?: PostCategory | 'all'
  adminView?: boolean
}): CommunityPost[] {
  const posts = loadRaw()
  const admin = options?.adminView ?? isCommunityAdmin()
  let filtered = admin ? posts : posts.filter((p) => p.status === 'approved')

  if (options?.category && options.category !== 'all') {
    filtered = filtered.filter((p) => p.category === options.category)
  }

  return sortPosts(filtered)
}

export function submitCommunityPost(entry: {
  title: string
  body: string
  author: string
  email: string
  company: string
  category: PostCategory
}): CommunityPost {
  const posts = loadRaw()
  const record: CommunityPost = {
    id: uid(),
    title: entry.title.trim(),
    body: entry.body.trim(),
    author: entry.author.trim(),
    email: entry.email.trim(),
    company: entry.company.trim(),
    category: entry.category,
    status: 'pending',
    pinned: false,
    likes: 0,
    likedBy: [],
    timestamp: Date.now(),
  }
  savePosts([record, ...posts])
  return record
}

export function likePost(id: string): { ok: boolean; posts: CommunityPost[] } {
  const likerId = getLikerId()
  const posts = loadRaw()
  const post = posts.find((p) => p.id === id)
  if (!post || post.status !== 'approved') return { ok: false, posts }
  if (post.likedBy.includes(likerId)) return { ok: false, posts }
  post.likedBy.push(likerId)
  post.likes += 1
  savePosts(posts)
  return { ok: true, posts: sortPosts(posts) }
}

export function hasLiked(id: string): boolean {
  const post = loadRaw().find((p) => p.id === id)
  return post ? post.likedBy.includes(getLikerId()) : false
}

export function moderatePost(
  id: string,
  action: 'approve' | 'reject' | 'delete' | 'pin' | 'unpin',
): CommunityPost[] {
  if (!isCommunityAdmin()) return loadRaw()
  let posts = loadRaw()
  const post = posts.find((p) => p.id === id)
  if (!post) return posts

  switch (action) {
    case 'approve':
      post.status = 'approved'
      break
    case 'reject':
      post.status = 'rejected'
      break
    case 'delete':
      posts = posts.filter((p) => p.id !== id)
      break
    case 'pin':
      post.pinned = true
      break
    case 'unpin':
      post.pinned = false
      break
  }

  savePosts(posts)
  return sortPosts(posts)
}

export function getPendingCount(): number {
  return loadRaw().filter((p) => p.status === 'pending').length
}

export function resetCommunityPosts(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}
