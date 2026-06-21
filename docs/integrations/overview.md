# Integrations overview

OpenFX connects to your payment systems, treasury tools, and internal platforms through the Trading API and webhooks. This page covers integration patterns, data flow, and connection methods.

---

## Why integrate with OpenFX?

Cross-border payment operations require **accurate, timely execution** across currency corridors. OpenFX integrates directly with your systems so that:

- Quotes and trades execute programmatically without manual steps
- Settlement events trigger downstream workflows in real time
- Treasury teams see unified balances across fiat and stablecoin rails
- You embed OpenFX without fragmented onboarding or enterprise gatekeeping

---

## Integration architecture

```
┌─────────────────┐          ┌──────────────────┐          ┌─────────────────┐
│  Your platform  │   API    │     OpenFX       │  Rails   │  Local banks /  │
│  (PSP, remit,   │ ◄──────► │  Liquidity net   │ ◄──────► │  stablecoin     │
│   fintech)      │ Webhooks │                  │          │  networks       │
└─────────────────┘          └──────────────────┘          └─────────────────┘
```

**Your platform** initiates quotes, trades, deposits, and withdrawals via REST API.

**OpenFX** routes conversions through its liquidity network, hedges exposure, and settles funds.

**Local rails** deliver fiat to bank accounts or stablecoins to wallets in destination markets.

---

## Connection methods

### Trading API (REST)

Primary integration path for programmatic workflows:

- **Quotes** — lock rates with time-lock guarantee
- **Trades** — execute conversions
- **Deposits & withdrawals** — fund accounts and pay out
- **Balances** — query multi-currency positions

See [API overview](../platform/api-overview.md) and [API reference](../platform/api-reference.md).

### Webhooks

Subscribe to real-time events instead of polling:

| Event | When fired |
|-------|------------|
| `deposit.received` | Funds credited to your account |
| `quote.expired` | Quote window closed without execution |
| `trade.executed` | Trade confirmed and processing |
| `trade.settled` | Settlement complete |
| `withdrawal.completed` | Funds delivered to destination |
| `withdrawal.failed` | Withdrawal rejected or returned |

Webhook payloads are signed with `X-OpenFX-Signature`. Verify before processing.

### Web GUI

For treasury teams that prefer a dashboard:

- Manual quotes and trades
- Real-time balance and settlement tracking
- Multi-currency account management
- Role-based team access

Many clients use **both** API and GUI — API for automated flows, GUI for oversight and exception handling.

---

## Solutions by segment

| Segment | Primary use case | Integration focus |
|---------|-----------------|-------------------|
| [Remittance companies](./remittance-companies.md) | High-volume cross-border payouts | Quote → trade → withdraw per corridor |
| [Payment service providers](./payment-service-providers.md) | 24/7 instant settlement | API-driven payment orchestration |
| [On and off ramps](./on-and-off-ramps.md) | User funding and withdrawal | Fiat + stablecoin deposit/withdraw flows |

---

## Treasury system integration

OpenFX works alongside your existing infrastructure:

| System | Integration approach |
|--------|---------------------|
| **ERP / accounting** | Export transaction reports; webhook-driven journal entries |
| **Payment orchestration** | API-initiated trades triggered by payment events |
| **Internal dashboards** | Balance and trade APIs for custom UI |
| **Compliance tools** | Audit logs and transaction exports |

Our goal is to become a transparent, embedded part of your treasury and payments infrastructure.

---

## Sandbox and certification

1. **Sandbox access** — personalized environment with simulated balances
2. **Integration testing** — execute sample quote/trade/withdraw flows
3. **Certification review** — validate error handling, webhook processing, idempotency
4. **Production promotion** — receive production credentials and rate limits

Typical timeline: 1–2 weeks from sandbox access to production go-live.

---

## Security

- TLS 1.2+ required for all API communication
- OAuth 2.0 client credentials for authentication
- Webhook signature verification
- Rotate `client_secret` every 90 days (recommended)
- Never expose secrets in client-side code

Details: [Authentication](../platform/authentication.md)

---

## Next steps

- [Remittance companies](./remittance-companies.md)
- [Payment service providers](./payment-service-providers.md)
- [On and off ramps](./on-and-off-ramps.md)
- [Getting started](../core/getting-started.md)

Questions? [Create a support ticket](../support/create-ticket.md) and select **API / Developer**.
