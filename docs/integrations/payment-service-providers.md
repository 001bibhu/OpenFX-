# Payment service providers

Modern PSPs are expected to move money instantly, support diverse currencies, and operate 24/7 — but legacy infrastructure can't keep up. OpenFX helps you eliminate delays, reduce costs, and simplify treasury through one API or interface.

---

## The challenge

| | Current alternatives | OpenFX |
|---|---------------------|--------|
| **Settlement speed** | Hours to multiple business days | Always-on, same-day global settlement |
| **Reliability** | Rate volatility, hidden fees, no audit trail | Full visibility from quote to settlement with automation |
| **Setup** | Fragmented onboarding, enterprise gatekeeping | One platform, one integration — fast ramp |
| **Pricing** | Opaque with hidden markups | Clear, competitive rates with zero hidden fees |
| **Coverage** | Limited corridors | Broad multi-currency with local payout rails |
| **Trust** | Some operate like a black box | Verified delivery and real-time observability |

---

## How PSPs use OpenFX

### Ship capital like code

Embed the Trading API into your payment orchestration layer. Automate quotes, trades, deposits, and withdrawals — no manual steps, no chat-based trading.

### 24/7 payment capabilities

Move money anytime: weekends, holidays, or the middle of the night. Your PSP operates on your schedule, not banking hours.

### Simplify treasury

Track every dollar across corridors from a single dashboard. Reduce balance-sheet strain by eliminating pre-funding requirements. Multi-currency account management with bank-grade security.

### Transparent FX pricing

Mid-market rate plus spread — no hidden markups, no enterprise-only tiers. Pricing stays predictable whether you move $5M or $50M.

---

## Integration architecture

```
Payment request → Your orchestration → OpenFX API
                                            ↓
                                    Quote → Trade → Settle
                                            ↓
                              Webhook → Update payment status
                                            ↓
                                    Withdraw to beneficiary
```

### API-driven payment flow

1. **Payment initiated** — customer or merchant triggers cross-border payment
2. **Quote requested** — your platform calls `POST /quotes` with currency pair and amount
3. **Trade executed** — confirm quote via `POST /trades` with time-locked rate
4. **Settlement tracked** — webhook `trade.settled` triggers downstream processing
5. **Payout delivered** — `POST /withdrawals` to beneficiary's local rail
6. **Confirmation** — webhook `withdrawal.completed` closes the payment loop

---

## Key capabilities

- **Enterprise role management** — granular permissions, multiple roles, team access controls
- **Automated workflows** — deposit → trade → withdraw sequences with full visibility
- **Real-time tracking** — live updates on every payment from initiation to delivery
- **Webhook events** — integrate settlement notifications into your existing systems
- **Reporting and analytics** — transaction history, corridor performance, reconciliation exports

---

## Treasury without limits

Whether you're moving $5M or $50M, pricing stays predictable. With 24/7 access to trading tools, you have complete control over your treasury:

- Hold multi-currency balances (USD, EUR, GBP, and more)
- Execute FX conversions on demand
- Withdraw multiple times per day
- Monitor all accounts from a single dashboard

---

## Getting started

1. [Schedule a demo](https://www.openfx.com/)
2. Complete institutional KYC (~72 hours)
3. Integrate Trading API in sandbox
4. Certify and promote to production

See [API overview](../platform/api-overview.md) for integration details.

---

## Next steps

- [Integrations overview](./overview.md): Architecture patterns
- [Admin guide](../core/admin-guide.md): Team roles and permissions
- [Authentication](../platform/authentication.md): API credentials and security
