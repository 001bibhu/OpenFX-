# How it works

This page explains how OpenFX moves money across borders — from funding your account through quote, trade, settlement, and withdrawal.

---

## The big picture

OpenFX connects your institution to a global liquidity network. You deposit funds, request a quote, execute a trade, and withdraw to local rails — all with near-instant settlement and transparent pricing.

```
Fund account → Get quote → Execute trade → Settle → Withdraw
       ↓
Real-time tracking from deposit to delivery
```

Unlike traditional FX, there are no intermediary banks, hidden markups, or multi-day settlement windows. One network, direct routes, minutes to complete.

---

## Steps

<AccordionGroup>

<AccordionItem title="Step 1: Onboard and fund your account" id="step-1-onboard-and-fund">

Getting started takes less than 72 hours — compared to six months or more with traditional FX providers.

**Onboarding includes:**

- KYC and compliance verification
- Account setup and API credential provisioning (if using the Trading API)
- Sandbox access for testing before production

**Funding options:**

- **Fiat deposits** — typically reflect within 20 minutes once received. Supported rails include SEPA Instant (EUR), Faster Payments (GBP), NPP (AUD), and local partner banks in key markets.
- **Crypto deposits** — USDC and USDT settle in near real-time, subject to blockchain speed and congestion.

Once funded, balances appear in your multi-currency dashboard.

</AccordionItem>

<AccordionItem title="Step 2: Get a quote" id="step-2-get-a-quote">

Request a quote for your currency pair and amount via the web GUI or Trading API.

**Quote features:**

- **Time-lock guarantee** — the quoted rate is locked for a defined window
- **Transparent pricing** — mid-market rate plus spread; no hidden fees
- **Any volume** — pricing stays predictable whether you move $5M or $50M

Example API request:

```json
{
  "buy": "AED",
  "sell": "MXN",
  "referenceAmount": 500000,
  "referencedUnit": "MXN"
}
```

Quotes are available 24/7/365.

</AccordionItem>

<AccordionItem title="Step 3: Execute the trade" id="step-3-execute-the-trade">

Confirm the quote to execute the trade. OpenFX routes the conversion through its liquidity network and hedges currency exposure automatically.

**Execution channels:**

- **Web GUI** — manual trades with full visibility
- **Trading API** — programmatic quotes and execution (REST, streaming)
- **Automated workflows** — deposit → trade → withdraw sequences

Once confirmed, trades cannot be canceled. You may reverse the position by executing a new trade in the opposite direction.

**Typical settlement times:**

| Percentile | Settlement time |
|------------|-----------------|
| 30% of trades | Under 10 minutes |
| 90% of trades | Under 60 minutes |
| Remaining | Under 120 minutes |

</AccordionItem>

<AccordionItem title="Step 4: Track settlement in real time" id="step-4-track-settlement">

OpenFX provides complete visibility from quote to settlement.

**Tracking includes:**

- Live status updates on deposits, trades, and withdrawals
- After-hours processing — withdrawals completed in under 60 minutes, even outside banking hours
- Audit trail from quote through delivery

Example trade status flow:

```
Requested → Processing → Executed → Settled
```

</AccordionItem>

<AccordionItem title="Step 5: Withdraw to local rails" id="step-5-withdraw">

Withdraw settled funds to your preferred bank account or wallet. OpenFX supports local payout rails across major markets.

**Withdrawal features:**

- Multiple withdrawals per day
- Local rails in US, UK, Europe, UAE, Mexico, Brazil, Southeast Asia, and more
- Near-instant settlement on supported rails (SEPA Instant, FPS, NPP)

Funds arrive in the destination currency through the appropriate local payment network.

</AccordionItem>

<AccordionItem title="Step 6: Manage treasury" id="step-6-manage-treasury">

Many clients use OpenFX for ongoing treasury operations beyond individual trades.

**Treasury capabilities:**

- Hold multi-currency balances (USD, EUR, GBP, and more)
- Execute FX conversions between accounts
- Move funds between currency accounts quickly and cost-effectively
- Reduce idle balances in foreign currencies
- Integrate with existing treasury management systems via API and webhooks

OpenFX becomes a transparent, embedded part of your payments infrastructure — not an external black box.

</AccordionItem>

</AccordionGroup>

---

## How OpenFX sources liquidity

OpenFX maintains a dynamic balance sheet allocated across currencies and markets based on predicted client demand. A market-making engine uses advanced algorithms to continuously hedge currency exposures.

**Liquidity sources:**

- Global banks and FX brokers
- Stablecoin OTC desks
- Proprietary balance sheet allocation

This architecture enables fulfillment of client requests even in volatile market conditions, with flexible pricing that adjusts spreads as needed during acute liquidity constraints.

---

## Summary

- Onboard in hours, not months
- Quote, trade, and settle 24/7 with transparent pricing
- 90% of trades settle in under 60 minutes
- Fiat and stablecoin rails across 40+ currency pairs
- Full visibility from quote to delivery

---

## Next steps

- [Overview](./overview.md): Product introduction and key concepts
- [Getting started](./getting-started.md): Onboarding steps
- [Use cases](./use-cases.md): Solutions by segment
- [FAQ](./faq.md): Quick answers
