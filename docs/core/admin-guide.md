# Admin guide

This guide is for **firm administrators** and compliance leads managing SyntheticFi at the organization level, RIAs, wealth managers, and broker-dealers.

---

## Admin roles and permissions

SyntheticFi uses role-based access control (RBAC):

| Role | Capabilities |
|------|--------------|
| **Firm Admin** | Full settings, billing, user management, integrations |
| **Compliance Officer** | Read-all access, audit logs, approval workflows |
| **Advisor** | Client onboarding, term sheets, monitoring (assigned clients) |
| **Read-only** | View dashboards and reports; no origination |

Assign roles under **Settings → Team → Invite user**.

---

## Firm setup

### Initial configuration

1. **Firm profile**, Legal entity, CRD/IARD, primary address
2. **Compliance contacts**, Designated compliance officer email
3. **Disclosure templates**, Firm-specific language appended to SyntheticFi standard disclosures (where permitted)
4. **Approval workflows**, Optional second approver for financings above threshold

### Integration management

Connect custodians and brokerages at **Settings → Integrations**:

- OAuth credentials per custodian
- Rep code and branch mapping
- Household grouping rules

See [Custodians](../integrations/custodians.md) and [Brokerages](../integrations/brokerages.md).

---

## Advisor management

### Inviting advisors

1. **Settings → Team → Invite**
2. Enter email and assign role
3. Advisor completes profile and **required certification**
4. Certification must be renewed annually

### Certification tracking

Admins view certification status in **Team → Compliance**. Advisors with expired certification cannot originate new financings.

---

## Client and financing oversight

### Dashboard views

- **Active financings**, Amount, term, margin status, advisor of record
- **Margin alerts**, Firm-wide warnings and calls
- **Pipeline**, Pending term sheets and signatures
- **Closed**, Historical financings for reporting

### Export and reporting

Export CSV or PDF from **Reports**:

- Active financing summary
- Margin event log
- Origination by advisor and period
- Client eligibility snapshots

Reports support compliance reviews and client meeting preparation.

---

## Compliance controls

### Suitability documentation

SyntheticFi prompts advisors to record:

- Client cash need and timeline
- Portfolio suitability confirmation
- Margin risk acknowledgment

Documents are stored in the client file with immutable timestamps.

### Audit log

**Settings → Audit log** records:

- User logins and role changes
- Term sheet creation and acceptance
- Integration changes
- Margin actions and repayments

Logs retained per firm agreement (default: 7 years).

### Approval thresholds

Configure optional approvals:

```
Financing amount > $X  →  Requires Compliance Officer approval
New client first trade   →  Requires Admin approval
```

---

## Notifications

### Firm-level alerts

Configure under **Settings → Notifications**:

| Alert type | Recipients |
|------------|------------|
| Margin warning (any client) | Advisor + Compliance |
| Margin call | Advisor + Compliance + Admin |
| Integration failure | Admin |
| New financing originated | Compliance (optional) |

Delivery: email, in-app, webhook (enterprise).

---

## Billing and contracts

### Enterprise billing

- Monthly platform fee + per-financing economics per master agreement
- View invoices at **Settings → Billing**
- Update payment method (ACH or wire)

Contact your SyntheticFi account manager for contract amendments or volume pricing.

---

## Security policies

### SSO (Single Sign-On)

Enterprise firms can enforce SAML SSO:

1. **Settings → Security → SSO**
2. Upload IdP metadata
3. Enforce SSO for all users (optional)

### Session and MFA

- Require MFA for all firm users (recommended)
- Configure session timeout (15 min – 8 hours)
- IP allowlisting available on enterprise plans

---

## API access for firms

Firm admins can provision API keys for internal systems:

1. **Settings → API → Create key**
2. Assign scopes (read-only vs. origination)
3. Store client secret securely, shown once

Documentation: [API overview](../platform/api-overview.md) | [Authentication](../platform/authentication.md)

---

## Offboarding

### Removing an advisor

1. Reassign clients in **Team → Advisor → Reassign**
2. Deactivate user account
3. Audit log retains historical actions

### Firm termination

Contact SyntheticFi enterprise support to wind down active financings and export records before account closure.

---

## Support escalation

| Priority | Scenario | Contact |
|----------|----------|---------|
| P1 | Active margin call unresolved | Priority line in dashboard |
| P2 | Integration outage | [Create ticket](../support/create-ticket.md), mark "Firm admin" |
| P3 | General admin questions | Account manager or support |

---

## Related resources

- [Getting started, advisors](./getting-started.md#for-financial-advisors)
- [How it works](./how-it-works.md)
- [Admin API endpoints](../platform/api-reference.md#firm-administration)
