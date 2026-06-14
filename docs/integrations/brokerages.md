# Brokerage integrations

SyntheticFi connects to major retail and direct-access brokerages so individual investors and advisor-managed brokerage accounts can link portfolios for eligibility and financing.

---

## Supported brokerages

| Brokerage | Connection method | Status | Notes |
|-----------|-------------------|--------|-------|
| **Interactive Brokers (IBKR)** | OAuth + API | Available | Full API; supports margin accounts |
| **Charles Schwab** | OAuth | Available | Retail and Schwab Intelligent Portfolios (eligible accounts) |
| **Fidelity** | OAuth | Available | Brokerage and managed account programs |
| **E*TRADE (Morgan Stanley)** | OAuth | Beta | Rolling availability by region |
| **Vanguard** | OAuth | Roadmap | Partner waitlist |
| **Robinhood** | N/A | Not supported | Eligibility restrictions |

List updated quarterly. [Contact support](../support/contact-support.md) for current status.

---

## How brokerage linking works

### User flow

1. User clicks **Connect account** in SyntheticFi (or partner app)
2. Selects brokerage from list
3. Redirected to brokerage login (OAuth), credentials entered **only** on brokerage site
4. User approves data sharing permissions
5. Redirected back to SyntheticFi; sync begins automatically

```
User → SyntheticFi → Brokerage OAuth → SyntheticFi
                         (login)
```

Typical connection time: **2–5 minutes**

### Permissions requested

| Permission | Purpose |
|------------|---------|
| Read account info | Identity and account type verification |
| Read positions | Eligibility and collateral valuation |
| Read balances | Cash and buying power |
| Trade *(where required)* | Execute structuring trades for financing |

SyntheticFi never requests withdrawal or transfer permissions beyond program scope.

---

## Account eligibility by brokerage

### Generally eligible

- Individual taxable brokerage
- Joint taxable
- Certain revocable trust accounts (brokerage-dependent)
- Margin-enabled accounts (may improve capacity)

### Generally ineligible

- IRA, Roth IRA, 401(k), HSA
- Custodial UTMA/UGMA (minor accounts)
- Accounts with existing proprietary lending restrictions
- Paper trading accounts

### Asset eligibility

Eligible holdings typically include:

- U.S. and international equities (NYSE, NASDAQ, major exchanges)
- ETFs and index funds
- ADRs

Often ineligible or haircut:

- Penny stocks and OTC securities
- Options positions (except as part of SyntheticFi structure)
- Cryptocurrency
- Private placements and illiquid alternatives
- Restricted or unregistered stock

Exact rules vary by brokerage and program.

---

## Brokerage-specific notes

### Interactive Brokers

- **Best for:** Sophisticated investors, international holdings, direct API power users
- **Connection:** IBKR Client Portal OAuth or dedicated API token for enterprise
- **Sync:** Near real-time during market hours
- **Notes:** Multi-currency portfolios supported with USD normalization

### Charles Schwab

- **Best for:** Broad retail and advisor-sweep accounts at Schwab
- **Connection:** Schwab OAuth (retail login or advisor-linked client)
- **Sync:** Every 30–60 minutes
- **Notes:** Some managed portfolio sleeves may be excluded from collateral calculation

### Fidelity

- **Best for:** Fidelity brokerage and certain advisory accounts
- **Connection:** Fidelity OAuth
- **Sync:** Every 30–60 minutes
- **Notes:** Fidelity Go and some robo sleeves may have limited eligibility

---

## Data sync details

After linking, SyntheticFi syncs:

| Data | Frequency |
|------|-----------|
| Positions | 15–60 min (market hours) |
| Cash balance | 15–60 min |
| Account status | Hourly |
| Corporate actions | Daily |

Manual **Refresh** available in dashboard for most integrations.

---

## Collateral holds at brokerages

Retail brokerages implement holds differently than institutional custodians:

1. SyntheticFi marks securities as pledged in platform
2. Brokerage restriction prevents sale/transfer of pledged lot
3. User sees hold notation in brokerage portal (wording varies)
4. Release on repayment confirmation

Hold placement: typically **same business day** after funding for API-enabled brokerages.

---

## Disconnecting an account

Users can disconnect at **Settings → Integrations → Disconnect**.

**Important:** You cannot disconnect while an **active financing** exists. Repay or close financing first.

Revoking access at the brokerage site also stops sync but may leave financing in non-compliant state, always close through SyntheticFi first.

---

## Common issues

| Issue | Solution |
|-------|----------|
| "Brokerage not listed" | Join waitlist via support; use supported brokerage if urgent |
| OAuth popup blocked | Allow pop-ups for SyntheticFi domain |
| Partial portfolio showing | Some sleeves (managed, crypto) excluded from sync |
| Token expired | Reconnect via Settings → Integrations |

[Full troubleshooting →](../core/troubleshooting.md#account-linking)

---

## For developers

Initiate brokerage link via API:

```http
POST /v1/clients/{client_id}/accounts/link
```

```json
{
  "custodian": "interactive_brokers",
  "redirect_uri": "https://yourapp.com/callback"
}
```

See [API reference](../platform/api-reference.md#initiate-account-link).

---

## Related resources

- [Integrations overview](./overview.md)
- [Custodians](./custodians.md), Institutional programs
- [Getting started](../core/getting-started.md)
- [Authentication](../platform/authentication.md)

Not sure which integration path applies? [Create a support ticket](../support/create-ticket.md) with your brokerage name and account type.
