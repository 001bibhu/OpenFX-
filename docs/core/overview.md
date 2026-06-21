# Overview

OpenFX is a next-generation cross-border payment infrastructure provider. It enables institutions to move money globally with near-instant settlement, deep liquidity, and exceptional cost efficiency.

This page explains what OpenFX does, who it is for, and how it works at a high level.

---

## What is OpenFX?

OpenFX combines the reliability of traditional finance with the speed and programmability of modern blockchain rails. Institutions use OpenFX to quote, convert, settle, and withdraw funds across fiat and stablecoin corridors — without the delays, hidden fees, and pre-funding requirements of legacy FX.

In simple terms:

- You need to move money across borders quickly
- You want transparent pricing at any volume
- OpenFX routes funds through an optimized liquidity network in minutes, not days

The platform handles the full lifecycle: quoting, trade execution, settlement tracking, treasury management, and reporting.

---

## Who uses OpenFX?

OpenFX serves **institutional clients only** — remittance companies, fintechs, payment processors, digital banks, brokers, and investment platforms that require real-time settlement across fiat and stablecoin rails.

<OverviewAudienceTabs>

<template #remittance>

- Global remittance providers
- Cross-border payroll platforms
- Money transfer operators

They use OpenFX to:

- Beat bank FX rates with tight, transparent spreads
- Settle same-day across payout corridors
- Eliminate pre-funding and free up working capital

</template>

<template #psp>

- Payment service providers
- Payment processors
- Digital banks and neobanks

They use OpenFX to:

- Ship capital with 24/7 payment capabilities
- Settle near-instantly with full quote-to-settlement visibility
- Simplify treasury and reduce balance-sheet strain

</template>

<template #ramps>

- FX on/off ramp providers
- Neo brokers and trading platforms
- Stablecoin infrastructure companies

They use OpenFX to:

- Fund accounts and withdraw to native currency in minutes
- Route liquidity programmatically via API
- Scale into new corridors without fragmented onboarding

</template>

</OverviewAudienceTabs>

---

## Why OpenFX exists

Traditional cross-border FX is slow, opaque, and capital-intensive. Payments pass through multiple intermediaries — each adding fees, delays, and operational risk.

| | Legacy FX | OpenFX |
|---|-----------|--------|
| **Settlement** | 2–5 business days | Under 60 minutes (90% of trades) |
| **Availability** | Banking hours only | 24/7/365 |
| **Total cost** | 3–5% (fees + FX markup) | 0.01–0.3% all-in pricing |
| **Pre-funding** | Often required | Eliminated |

OpenFX provides a direct route through an optimized liquidity network — one platform, transparent pricing, and real-time settlement.

---

## High-level workflow

Here is how OpenFX works from start to finish:

1. **Onboard**: Complete KYC and account setup (typically within 72 hours)
2. **Fund your account**: Deposit fiat or stablecoin (USDC, USDT)
3. **Get a quote**: Lock a rate via the web GUI or Trading API
4. **Execute a trade**: Convert between currencies with time-lock guarantee
5. **Settle and withdraw**: Funds settle in minutes; withdraw to local rails multiple times per day
6. **Monitor treasury**: Track balances, deposits, and settlements in real time

```
Deposit → Quote → Trade → Settle → Withdraw
     ↓
Multi-currency balances + real-time tracking
```

---

## Platform capabilities

<AccordionGroup>

<AccordionItem title="40+ currency pairs">

Support for major G20 currencies and emerging markets including USD, EUR, GBP, AED, MXN, BRL, PHP, COP, ARS, and more — with local payment rails in 25+ markets.

</AccordionItem>

<AccordionItem title="Fiat and stablecoin rails">

Move value across fiat bank accounts and stablecoins (USDC, USDT). Use stablecoins for on-ramping, off-ramping, and cross-border transfers.

</AccordionItem>

<AccordionItem title="Web GUI and Trading API">

Execute trades through a web-based dashboard or embed the REST API into your platform for programmatic quotes, trades, deposits, and withdrawals.

</AccordionItem>

<AccordionItem title="Transparent pricing">

Mid-market rate plus a small spread (3–5 bps for G20, 10–12 bps for emerging markets). Volume-based tiers with no hidden markups.

</AccordionItem>

<AccordionItem title="Real-time settlement">

90% of trades settle in under 60 minutes; 30% in under 10 minutes. T+0 settlement for many transactions.

</AccordionItem>

<AccordionItem title="Treasury management">

Hold multi-currency balances, execute FX conversions, manage internal fund movements, and optimize liquidity from a single dashboard.

</AccordionItem>

</AccordionGroup>

---

## What happens behind the scenes

OpenFX manages:

- Dynamic balance sheet allocation across currencies and markets
- Market-making and automated hedging of currency exposures
- Liquidity sourcing from banks, FX brokers, and stablecoin OTC desks
- Compliance and AML/KYC through licensed partners in each market
- 24/7 platform operations and client support

You interact through quotes, trades, and withdrawals — OpenFX handles liquidity, routing, and settlement complexity.

For a deeper walkthrough of each step, see [How it works](./how-it-works.md).

---

## Next steps

- [How it works](./how-it-works.md): Learn the trade and settlement lifecycle
- [Getting started](./getting-started.md): Onboard and access the sandbox
- [Use cases](./use-cases.md): Solutions by segment
- [FAQ](./faq.md): Find quick answers
