# Custodian integrations

SyntheticFi integrates with institutional custodians used by RIAs, wealth managers, and broker-dealers. This page covers supported platforms, setup requirements, and operational considerations.

---

## What custodians provide

Custodians hold client assets and provide advisors with:

- Consolidated household views
- Rep code and branch hierarchy
- Compliance-friendly reporting
- Institutional trading and billing

SyntheticFi connects at the **custodian level** to sync client portfolios and manage collateral for advisor-led financings.

---

## Supported custodians

| Custodian | Integration | Status | Sync type |
|-----------|-------------|--------|-----------|
| **Schwab Advisor Services** | API + OAuth | Available | Real-time |
| **Fidelity Institutional** | API | Available | Real-time |
| **Pershing (BNY Mellon)** | API | Available | Real-time |
| **Altruist** | API | Beta | Real-time |
| **AssetMark** | File + API | Partner program | Hybrid |
| **SEI** | Custom | By request | EOD / hybrid |

Availability varies by firm size and program. Contact your SyntheticFi account manager for enrollment.

---

## Firm setup process

### 1. Custodian authorization

Your firm completes custodian-specific paperwork:

- Third-party data access authorization
- SyntheticFi listed as approved technology vendor
- Rep code disclosure (if required by custodian)

**Timeline:** 5–15 business days depending on custodian.

### 2. SyntheticFi firm configuration

Firm admin in SyntheticFi dashboard:

1. **Settings → Integrations → Add custodian**
2. Enter firm master account numbers and rep code list
3. Upload custodian authorization confirmation
4. Map rep codes to SyntheticFi advisor users

### 3. Validation

SyntheticFi runs a validation sync:

- Confirms API connectivity
- Matches sample accounts to expected rep codes
- Verifies position data accuracy

You'll receive a **validation report** before client onboarding goes live.

---

## Rep code and household mapping

Institutional accounts are organized by rep codes and household IDs.

```
Custodian                    SyntheticFi
─────────                    ───────────
Master firm account    →     Firm record
Rep code               →     Advisor assignment
Household / account    →     Client record
Sub-account            →     Linked account
```

Incorrect mapping causes clients to appear under the wrong advisor or fail eligibility sync. Review mappings quarterly when rep codes change.

---

## Data available from custodians

| Data element | Used for |
|--------------|----------|
| Positions & quantities | Eligibility, collateral valuation |
| Market values | LTV and margin ratios |
| Account type & registration | Eligibility rules (trust, joint, etc.) |
| Cash balances | Repayment and collateral top-ups |
| Restrictions / holds | Lock compatibility checks |
| Advisor of record | Dashboard permissions |

Cost basis may be available but is not required for SyntheticFi financing calculations.

---

## Collateral operations

When financing executes:

1. SyntheticFi sends **collateral instruction** to custodian (API or secure message)
2. Custodian places **hold** on pledged securities
3. Status reflected in SyntheticFi dashboard and custodian portal
4. Upon repayment, SyntheticFi sends **release** instruction

Custodian-specific timing:

- **Real-time API holds:** Minutes to hours
- **Manual desk review:** 1 business day (some trust accounts)

---

## Trust and entity accounts

Trust and entity registrations require additional review:

- Trust agreement may need to authorize pledging
- Trustee signatures on SyntheticFi disclosures
- Some custodians require manual approval for holds on trust accounts

Start trust onboarding early, add 3–5 business days to standard timelines.

---

## Compliance considerations

- Custodian statements continue to show client as beneficial owner
- SyntheticFi financing disclosures are **in addition to** custodian agreements
- Firm ADV may need updating to describe portfolio-based financing referrals
- Audit logs in SyntheticFi complement custodian trade confirms

Consult your compliance officer before rolling out to clients.

---

## File-based integrations

Some custodian programs use end-of-day files:

| File type | Contents |
|-----------|----------|
| Position file | Holdings as of prior close |
| Account file | Registrations and rep codes |
| Transaction file | Trades and transfers |

**Limitation:** Intraday margin monitoring is less precise. Firms on file-based sync should maintain higher collateral buffers.

---

## Troubleshooting

### Client account not syncing

1. Verify rep code is in firm's mapped list
2. Confirm client account is under authorized master account
3. Check for custodian-side data access expiration (annual renewal)

### Hold not applied

1. Confirm financing status is `active` in SyntheticFi
2. Check custodian portal for pending desk review
3. Trust/entity accounts may require manual custodian action

[Full troubleshooting guide →](../core/troubleshooting.md)

---

## Related resources

- [Integrations overview](./overview.md)
- [Brokerages](./brokerages.md), Retail account connections
- [Admin guide](../core/admin-guide.md), Firm configuration
- [Authentication](../platform/authentication.md), API and OAuth

Questions about a specific custodian? [Contact support](../support/contact-support.md) and include your firm name and custodian.
