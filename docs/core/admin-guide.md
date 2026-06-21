# Admin guide

This guide is for **organization administrators** and compliance leads managing OpenFX at the enterprise level — treasury heads, operations managers, and compliance officers at remittance companies, PSPs, and fintechs.

---

## Admin roles and permissions

OpenFX uses role-based access control (RBAC):

| Role | Capabilities |
|------|--------------|
| **Org Admin** | Full settings, billing, user management, API credentials |
| **Compliance Officer** | Read-all access, audit logs, approval workflows |
| **Treasury Manager** | Execute trades, manage balances, initiate withdrawals |
| **Trader** | Quote and execute trades within assigned limits |
| **Read-only** | View dashboards and reports; no execution |
| **API Service Account** | Programmatic access via client credentials |

Assign roles under **Settings → Team → Invite user**.

---

## Organization setup

### Initial configuration

1. **Organization profile** — Legal entity, registered address, primary contacts
2. **Compliance contacts** — Designated compliance officer email
3. **Approval workflows** — Optional second approver for trades above threshold
4. **Spending limits** — Per-user and per-role trade limits

### API credential management

Manage API keys at **Settings → API**:

- Create and rotate `client_id` / `client_secret` pairs
- Assign scopes (`read`, `write`, `admin`)
- Configure webhook endpoints and signing secrets
- Review API usage and rate limit status

See [Authentication](../platform/authentication.md) for credential security best practices.

---

## Team management

### Inviting team members

1. **Settings → Team → Invite**
2. Enter email and assign role
3. User completes profile and MFA setup
4. Role permissions take effect immediately

### Offboarding users

1. **Settings → Team → Select user → Deactivate**
2. Revoke active sessions and API tokens associated with the user
3. Audit log records the deactivation

---

## Treasury configuration

### Multi-currency accounts

Configure currency accounts under **Treasury → Accounts**:

- Enable currencies relevant to your corridors
- Set default funding and withdrawal destinations
- Configure auto-conversion rules (where available)

### Withdrawal destinations

Manage bank accounts and wallet addresses at **Settings → Destinations**:

- Verify ownership through micro-deposit or document upload
- Assign destinations to specific currency accounts
- Set default withdrawal rails per currency

---

## Compliance and audit

### Audit logs

**Compliance → Audit log** captures:

- Trade executions with quote IDs and settlement status
- User login and permission changes
- API credential creation and rotation
- Withdrawal requests and completions

Export logs as CSV for regulatory reporting.

### Transaction reporting

Generate reports at **Reports → Transactions**:

- Filter by date range, currency pair, status, and user
- Export for reconciliation with internal systems
- Schedule recurring report delivery (where available)

---

## Integration management

Connect OpenFX to your existing systems:

| Integration | Purpose |
|-------------|---------|
| **Trading API** | Programmatic quotes, trades, deposits, withdrawals |
| **Webhooks** | Real-time event notifications to your backend |
| **Treasury systems** | ERP, payment orchestration, internal dashboards |

See [Integrations overview](../integrations/overview.md) for architecture patterns.

---

## Billing and pricing

### Volume tiers

Pricing is volume-based. Review your current tier at **Settings → Billing**:

| Monthly volume | Typical spread (G20) |
|----------------|---------------------|
| $30M–$500M | 3–5 bps |
| $500M+ | Custom pricing |

Contact your account manager for volume discounts above $100M monthly.

### Invoices

Access invoices and payment history at **Settings → Billing → Invoices**.

---

## Account closure

Contact your OpenFX account manager to:

- Settle outstanding balances
- Export transaction records and audit logs
- Revoke API credentials and deactivate users
- Close the organization account

---

## Next steps

- [Getting started](./getting-started.md): Onboarding overview
- [Troubleshooting](./troubleshooting.md): Common admin issues
- [Contact support](../support/contact-support.md): Enterprise support
