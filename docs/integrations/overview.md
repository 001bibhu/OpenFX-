# Integrations overview

SyntheticFi connects to brokerages, custodians, and partner systems to read portfolio data, execute financing structures, and deliver a seamless experience for advisors and investors.

This page explains how integrations fit together and how data flows through the platform.

---

## Why integrations matter

Portfolio-backed financing requires **accurate, timely data** about holdings and account status. SyntheticFi integrates directly with custodians and brokerages so that:

- Portfolio values stay current for eligibility and margin monitoring
- Collateral can be locked and released programmatically
- Advisors see unified client data in one dashboard
- Partners embed SyntheticFi without manual data entry

---

## Integration categories

| Category | Purpose | Examples |
|----------|---------|----------|
| **Brokerages** | Retail and direct brokerage accounts | Interactive Brokers, Schwab, Fidelity |
| **Custodians** | RIA and institutional custody | Schwab Advisor, Fidelity Institutional, Pershing |
| **Partner platforms** | CRM, planning, mortgage tech | Custom via API |
| **Identity & compliance** | KYC/AML verification | Integrated providers (behind the scenes) |

Detailed guides:

- [Brokerages](./brokerages.md)
- [Custodians](./custodians.md)

---

## How data flows

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────────┐
│  Custodian /    │  OAuth   │   SyntheticFi    │  API    │  Advisor /      │
│  Brokerage      │ ◄──────► │   Platform       │ ◄──────► │  Partner App    │
└─────────────────┘         └──────────────────┘         └─────────────────┘
        │                            │
        │  Positions, balances,      │  Eligibility, term sheets,
        │  trades, account metadata  │  margin alerts, webhooks
        ▼                            ▼
   Holdings sync              Structuring & monitoring
   (every 15–60 min)           (real-time margin checks)
```

### Inbound data (from custodians)

- Account metadata (type, owner, tax status)
- Positions and quantities
- Market values and cost basis (where available)
- Cash balances
- Corporate actions and dividends

### Outbound actions (to custodians)

- Collateral lock instructions
- Structuring trades (approved instruments only)
- Release of locks upon repayment

---

## Connection methods

### OAuth 2.0 (preferred)

Users authorize SyntheticFi at the custodian's login page. No passwords stored by SyntheticFi.

**Used for:** Schwab, Fidelity, Interactive Brokers, most retail flows

### API token (institutional)

Firm-level API credentials provisioned by the custodian for advisor enterprises.

**Used for:** Large RIAs, custom rep code mapping, bulk household import

### File-based (legacy)

End-of-day position files for custodians without real-time API.

**Used for:** Select institutional programs; higher latency for margin monitoring

---

## Sync frequency and latency

| Integration type | Holdings sync | Margin evaluation |
|------------------|---------------|-------------------|
| Real-time API | 15–60 minutes | Intraday (market hours) |
| End-of-day file | Next business day | Daily |
| Hybrid | Intraday + EOD reconcile | Intraday with EOD true-up |

Margin-critical accounts should use real-time API integrations where available.

---

## Supported vs. roadmap

### Generally available

- Interactive Brokers
- Charles Schwab (retail and advisor)
- Fidelity (retail and institutional)
- Pershing (select programs)

### Beta / partner preview

- TD Ameritrade legacy migration paths
- E*TRADE
- Custom trust company integrations

Contact [support](../support/contact-support.md) for the latest availability in your region and program.

---

## Partner integrations (API)

Technology partners embed SyntheticFi via REST API and webhooks:

1. **Initiate account link** from your application
2. **Receive eligibility** and present term sheets in your UI
3. **Subscribe to webhooks** for funding and margin events
4. **Display status** using financing and margin endpoints

Start here: [API overview](../platform/api-overview.md)

---

## Security and compliance

- All connections encrypted in transit (TLS 1.2+)
- Custodian tokens encrypted at rest (AES-256)
- SOC 2 Type II controls *(placeholder for production claim)*
- Data processing agreements with enterprise firms
- Least-privilege access scopes per custodian requirements

---

## Setting up integrations

### For advisors

1. Firm admin connects custodian at **Settings → Integrations**
2. Map rep codes and advisor assignments
3. Clients link accounts via secure onboarding link

See [Getting started, advisors](../core/getting-started.md#for-financial-advisors)

### For partners

1. Obtain sandbox API credentials
2. Implement OAuth callback and webhook handlers
3. Complete certification review before production

---

## Troubleshooting

| Issue | Resource |
|-------|----------|
| Connection failed | [Troubleshooting, account linking](../core/troubleshooting.md#account-linking) |
| Missing holdings | [Brokerages](./brokerages.md), asset eligibility |
| Rep code mapping | [Custodians](./custodians.md), institutional setup |

[Create a support ticket →](../support/create-ticket.md)
