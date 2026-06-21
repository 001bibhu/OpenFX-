# Remittance companies

Global remittance providers are under constant pressure to reduce costs, accelerate delivery, and expand payout corridors. Traditional FX rails are slow, opaque, and capital-intensive. OpenFX removes those constraints — helping you move money faster, cheaper, and smarter.

---

## The challenge

| | Current alternatives | OpenFX |
|---|---------------------|--------|
| **Settlement speed** | Hours to multiple business days | Always-on, same-day global settlement |
| **Reliability** | Rate volatility, hidden fees, no audit trail | Full visibility from quote to settlement |
| **Setup** | Fragmented onboarding, enterprise gatekeeping | One platform, one integration — onboard in ~72 hours |
| **Pricing** | Opaque with high slippage and markups | Clear, competitive rates with zero hidden fees |
| **Coverage** | Limited corridors, inconsistent local rails | 40+ currency pairs, 25+ local rails |
| **Trust** | Varies — some lack transparency | Verified delivery and real-time observability |

---

## How remittance companies use OpenFX

### Eliminate pre-funding

Traditional remittance requires pre-funded nostro accounts in each corridor. OpenFX's liquidity network eliminates this requirement, freeing working capital for growth.

### Beat bank rates

Transparent spreads of 3–5 bps (G20) and 10–12 bps (emerging markets) — significantly lower than the 20–50+ bps typical of expedited bank FX.

### Settle same-day

90% of trades settle in under 60 minutes. Settle multiple times per day at any volume — essential when moving hundreds of millions daily.

### Expand corridors

Access emerging market currencies including PHP, COP, ARS, AED, and more — with local payout rails and ongoing roadmap expansion.

---

## Integration workflow

```
1. Receive remittance request in your platform
2. GET quote via API (source → destination currency)
3. POST trade to lock rate and execute conversion
4. POST withdrawal to local payout rail
5. Webhook: trade.settled → notify sender
6. Webhook: withdrawal.completed → confirm delivery
```

### Example corridor: USD → PHP

1. Customer initiates remittance to the Philippines
2. Your platform requests a USD/PHP quote from OpenFX
3. Trade executes at locked rate
4. Withdrawal sent via local PHP rail
5. Recipient receives funds same-day

---

## Key capabilities

- **High-volume processing** — platform designed for scale without disruption
- **Consistent pricing at volume** — volume-based tiers reward scale ($30M–$500M monthly at 3–5 bps)
- **24/7 operations** — weekends, holidays, after-hours — no banking-hour constraints
- **Real-time tracking** — complete audit trail from quote to delivery
- **Compliance integration** — AML/KYC through licensed partners; integrate with your existing workflows

---

## Client spotlight

> When you move hundreds of millions daily, scale and speed are essential. OpenFX enables us to settle multiple times a day at any volume, with unmatched precision.
>
> — Chris Maurice, CEO, Yellow Card

Yellow Card uses OpenFX for stablecoin-based infrastructure across emerging markets — from payment infrastructure to fiat settlement rails and custody services.

---

## Getting started

1. [Schedule a demo](https://www.openfx.com/)
2. Complete institutional KYC (~72 hours)
3. Access sandbox and test your primary corridors
4. Go live with dedicated account manager support

See [Getting started](../core/getting-started.md) for detailed onboarding steps.

---

## Next steps

- [How it works](../core/how-it-works.md): Trade and settlement lifecycle
- [API reference](../platform/api-reference.md): Endpoint catalog
- [FAQ](../core/faq.md): Pricing, settlement, and compliance
