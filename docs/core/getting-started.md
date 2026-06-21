# Getting started

This guide walks you through onboarding with OpenFX. The steps differ slightly for **engineering teams** building API integrations and **treasury operations** teams using the web platform. Choose the path that matches your role.

---

## Prerequisites (all clients)

Before you begin, confirm:

- [ ] Your organization is an institutional client (remittance company, PSP, fintech, digital bank, broker, or investment platform)
- [ ] Authorized signatory available for KYC and compliance documentation
- [ ] Defined currency corridors and expected transaction volumes
- [ ] Technical contact identified (if integrating via API)
- [ ] Treasury or finance contact for account funding and operations

OpenFX does not serve personal or retail transactions.

---

<RoleTabs :items="[
  { id: 'engineering', label: 'Engineering & integrations' },
  { id: 'treasury', label: 'Treasury & operations' },
]" aria-label="Onboarding by team">

<template #engineering>

### Step 1: Schedule a demo and sign up

1. Visit [openfx.com](https://www.openfx.com/) and request a demo
2. Complete initial KYC with your OpenFX account manager
3. Receive sandbox API credentials (`client_id`, `client_secret`)

**Timeline:** Account setup typically completes within 72 hours.

### Step 2: Explore the sandbox

1. Access the personalized sandbox environment
2. Test quote, trade, deposit, and withdrawal flows
3. Review [API overview](../platform/api-overview.md) and [Authentication](../platform/authentication.md)
4. Execute sample trades with sandbox balances

The sandbox uses simulated balances and mock settlements — no real money or market trades.

### Step 3: Integrate the Trading API

1. Implement OAuth client credentials flow for authentication
2. Build quote → trade → settle → withdraw workflows
3. Subscribe to [webhooks](../platform/api-overview.md#webhooks) for real-time event notifications
4. Connect to your existing systems (treasury, ERP, payment orchestration)

See [Integrations overview](../integrations/overview.md) for architecture patterns.

### Step 4: Certification and production access

1. Complete integration testing in sandbox
2. Review production credentials and rate limits with your account manager
3. Promote to production after certification review
4. Monitor initial live transactions with dedicated support

**Timeline:** Integration timelines vary by complexity; most API clients go live within 1–2 weeks after sandbox testing.

</template>

<template #treasury>

### Step 1: Schedule a demo and complete onboarding

1. Visit [openfx.com](https://www.openfx.com/) and request a demo
2. Work with your account manager through KYC and account setup
3. Receive web platform credentials and funding instructions

**Timeline:** Onboarding typically completes within 72 hours.

### Step 2: Fund your account

1. Log in to the OpenFX web platform
2. Navigate to **Deposits** and select your funding rail (fiat or stablecoin)
3. Send funds to the provided account details
4. Confirm balance reflects (fiat: ~20 minutes; crypto: near real-time)

Supported rails include SEPA Instant, Faster Payments, NPP, and local partner banks.

### Step 3: Execute your first trade

1. Select currency pair and amount
2. Review the quoted rate (time-lock guarantee applies)
3. Confirm and execute the trade
4. Track settlement status in real time

Most trades settle within 60 minutes; many within 10 minutes.

### Step 4: Withdraw and manage treasury

1. Withdraw settled funds to your preferred bank account
2. Set up multi-currency balances for ongoing operations
3. Configure team roles and permissions (see [Admin guide](./admin-guide.md))
4. Schedule a business review with your dedicated account manager

</template>

</RoleTabs>

---

## What to expect after onboarding

| Milestone | Description |
|-----------|-------------|
| **Welcome email** | Account confirmation, support contacts, and sandbox access |
| **Dashboard access** | View balances, trades, settlements, and reports |
| **Dedicated account manager** | Primary point of contact for strategic planning |
| **24/7 support** | Technical and operational assistance anytime |
| **Transaction reporting** | Real-time and historical analytics on cross-border activity |

---

## Checklist before your first live trade

- [ ] Understand [how settlement works](./how-it-works.md)
- [ ] Confirm funding rail and destination bank details
- [ ] Review pricing tiers for your expected volume
- [ ] Test in sandbox (API clients) or execute a small pilot trade (GUI clients)
- [ ] Read the [FAQ](./faq.md)

---

## Need help?

- **Setup issues:** [Troubleshooting](./troubleshooting.md)
- **API integration:** [API overview](../platform/api-overview.md)
- **Support ticket:** [Create a ticket](../support/create-ticket.md)

Use the **feedback widget** on any page to tell us if this guide was helpful.
