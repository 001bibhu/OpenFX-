---
pageClass: sf-api-doc
---

# API overview

The SyntheticFi REST API lets partners and developers integrate portfolio liquidity into CRM systems, advisor tools, mortgage platforms, and internal dashboards.

<div class="sf-api-banner">
  <span><strong>Sandbox base URL</strong> <code>https://api.sandbox.syntheticfi.com/v1</code></span>
  <span><strong>Production</strong> <code>https://api.syntheticfi.com/v1</code></span>
</div>

<ApiSection method="GET" path="/clients" sample="list-clients">

Use the **Code examples** tab for cURL, Node.js, Python, Ruby, Java, C++, Go, PHP, HTML, and JSON samples. Switch to **Try it** to send a request and inspect the response.

</ApiSection>

---

## What you can build

| Capability | Description |
|------------|-------------|
| **Account linking** | Initiate OAuth flows and verify connection status |
| **Eligibility** | Check portfolio capacity and generate term sheets |
| **Origination** | Submit financings for execution after client acceptance |
| **Monitoring** | Read financing status, margin levels, and alerts |
| **Webhooks** | Receive real-time events (margin warnings, funding complete) |
| **Firm admin** | Manage users, clients, and reports programmatically |

---

## Quick start

### 1. Obtain credentials

Enterprise and partner accounts receive API keys from the dashboard or account manager:

**Settings → API → Create key**

You receive a `client_id`, `client_secret` (shown once), and optional webhook signing secret. See [Authentication](./authentication.md).

### 2. Authenticate

<ApiEndpoint
  method="POST"
  path="/oauth/token"
  sample="oauth-token"
  try-body='{"grant_type":"client_credentials","client_id":"sf_live_xxxxxxxx","client_secret":"sf_secret_xxxxxxxx","scope":"read write"}'
>

Exchange client credentials for a Bearer token.

**Response fields**

| Field | Description |
|-------|-------------|
| `access_token` | JWT used in the `Authorization` header |
| `expires_in` | Lifetime in seconds (default 3600) |
| `scope` | Granted scopes |

</ApiEndpoint>

### 3. Make your first request

<ApiEndpoint method="GET" path="/clients" sample="list-clients">

List client records with your access token. Use sandbox credentials while developing.

</ApiEndpoint>

---

## API design

- **RESTful** resources with predictable URLs
- **Idempotent** `POST` with `Idempotency-Key` header for origination
- **Versioned** via URL path (`/v1`)
- **Paginated** list endpoints with `cursor` and `limit`
- **Consistent errors** with machine-readable `code` and human `message`

---

## Core resources

```
/clients                    Client records
/clients/{id}/accounts      Linked brokerage accounts
/eligibility                Portfolio capacity checks
/term-sheets                Financing proposals
/financings                 Active and historical financings
/margin-events              Warnings and calls
/webhooks                   Event subscriptions
/firm/users                 Team management (admin scope)
```

Full endpoint catalog: [API reference](./api-reference.md)

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

Response headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`. A `429 Too Many Requests` response includes `Retry-After`.

---

## Sandbox

The sandbox uses simulated portfolios and mock executions:

- No real money or market trades
- Test margin scenarios with `/sandbox/simulate-margin-drop`
- Reset data with `/sandbox/reset`

Use sandbox for development and CI. Promote to production after certification review.

---

## Error handling

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
- [API reference](./api-reference.md), Endpoint catalog with code samples
- [Integrations overview](../integrations/overview.md), Custodian and brokerage data flow

Questions? [Create a support ticket](../support/create-ticket.md) and select **API / Developer**.
