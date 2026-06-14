# API overview

The SyntheticFi API lets partners, enterprise firms, and developers integrate portfolio liquidity into custom workflows, CRM systems, advisor tools, mortgage platforms, and internal dashboards.

This page covers base concepts, environments, and how to get started.

---

## What you can do with the API

| Capability | Description |
|------------|-------------|
| **Account linking** | Initiate OAuth flows and verify connection status |
| **Eligibility** | Check portfolio capacity and generate term sheets |
| **Origination** | Submit financings for execution after client acceptance |
| **Monitoring** | Read financing status, margin levels, and alerts |
| **Webhooks** | Receive real-time events (margin warnings, funding complete) |
| **Firm admin** | Manage users, clients, and reports programmatically |

---

## Base URL

| Environment | Base URL |
|-------------|----------|
| **Production** | `https://api.syntheticfi.com/v1` |
| **Sandbox** | `https://api.sandbox.syntheticfi.com/v1` |

All requests use HTTPS. JSON request and response bodies unless noted.

---

## Quick start

### 1. Obtain credentials

Enterprise and partner accounts receive API keys from the dashboard or account manager:

**Settings → API → Create key**

You'll receive:

- `client_id`
- `client_secret` (shown once)
- Optional webhook signing secret

See [Authentication](./authentication.md) for token exchange.

### 2. Authenticate

```bash
curl -X POST https://api.sandbox.syntheticfi.com/v1/oauth/token \
  -H "Content-Type: application/json" \
  -d '{
    "grant_type": "client_credentials",
    "client_id": "sf_live_xxxxxxxx",
    "client_secret": "sf_secret_xxxxxxxx",
    "scope": "read write"
  }'
```

Response:

```json
{
  "access_token": "eyJhbG...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "read write"
}
```

### 3. Make your first request

```bash
curl https://api.sandbox.syntheticfi.com/v1/clients \
  -H "Authorization: Bearer eyJhbG..."
```

---

## API design principles

- **RESTful** resources with predictable URLs
- **Idempotent** `POST` with `Idempotency-Key` header for origination
- **Versioned** via URL path (`/v1`)
- **Paginated** list endpoints with `cursor` and `limit`
- **Consistent errors** with machine-readable `code` and human `message`

---

## Core resources

```
/clients              Client records
/clients/{id}/accounts   Linked brokerage accounts
/eligibility          Portfolio capacity checks
/term-sheets          Financing proposals
/financings           Active and historical financings
/margin-events        Warnings and calls
/webhooks             Event subscriptions
/firm/users           Team management (admin scope)
```

Full reference: [API reference](./api-reference.md)

---

## Webhooks

Subscribe to events instead of polling:

| Event | When fired |
|-------|------------|
| `account.linked` | Brokerage connection successful |
| `eligibility.updated` | Portfolio sync changed capacity |
| `term_sheet.accepted` | Client signed term sheet |
| `financing.funded` | Cash delivered |
| `margin.warning` | Coverage below warning threshold |
| `margin.call` | Coverage below required level |
| `financing.closed` | Repayment complete |

Webhook payloads are signed with `X-SyntheticFi-Signature`. Verify before processing.

---

## Rate limits

| Tier | Requests/minute |
|------|-----------------|
| Sandbox | 60 |
| Standard | 300 |
| Enterprise | Custom |

Rate limit headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`

`429 Too Many Requests` includes `Retry-After`.

---

## Sandbox

The sandbox environment uses simulated portfolios and mock executions:

- No real money or market trades
- Test margin scenarios with `/sandbox/simulate-margin-drop`
- Reset data with `/sandbox/reset`

Use sandbox for development and CI; promote to production after certification review.

---

## SDKs and tools

Official SDKs *(roadmap / partner program)*:

- TypeScript / Node.js
- Python
- C# (.NET)

Community tools and OpenAPI spec: available on request via [support](../support/contact-support.md).

---

## Error handling

Example error response:

```json
{
  "error": {
    "code": "portfolio_ineligible",
    "message": "Portfolio value below minimum threshold.",
    "details": {
      "minimum_required": 500000,
      "current_value": 420000
    }
  }
}
```

Common codes: `unauthorized`, `forbidden`, `not_found`, `validation_error`, `rate_limited`.

---

## Security

- TLS 1.2+ required
- Rotate `client_secret` every 90 days (recommended)
- Never expose secrets in client-side code
- Use webhook signature verification

Details: [Authentication](./authentication.md)

---

## Next steps

- [Authentication](./authentication.md), OAuth, scopes, and tokens
- [API reference](./api-reference.md), Endpoint catalog
- [Integrations overview](../integrations/overview.md), Custodian and brokerage data flow

Questions? [Create a support ticket](../support/create-ticket.md) and select **API / Developer**.
