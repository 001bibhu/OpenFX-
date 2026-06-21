---
pageClass: sf-api-doc
---

# API overview

The OpenFX Trading API lets partners and developers integrate cross-border FX liquidity into payment platforms, remittance systems, treasury tools, and internal dashboards.

<div class="sf-api-banner">
  <span><strong>Sandbox base URL</strong> <code>https://api.sandbox.openfx.com/v1</code></span>
  <span><strong>Production</strong> <code>https://api.openfx.com/v1</code></span>
</div>

<ApiSection method="GET" path="/balances" sample="list-balances">

Use the **Code examples** tab for cURL, Node.js, Python, Ruby, Java, C++, Go, PHP, HTML, and JSON samples. Switch to **Try it** to send a request and inspect the response.

</ApiSection>

---

## What you can build

| Capability | Description |
|------------|-------------|
| **Quotes** | Lock FX rates with time-lock guarantee |
| **Trades** | Execute currency conversions programmatically |
| **Deposits** | Track and initiate account funding |
| **Withdrawals** | Pay out to local rails and wallets |
| **Balances** | Query multi-currency account positions |
| **Webhooks** | Receive real-time settlement and status events |

---

## Quick start

### 1. Obtain credentials

Institutional accounts receive API keys from the dashboard or account manager:

**Settings → API → Create key**

You receive a `client_id`, `client_secret` (shown once), and optional webhook signing secret. See [Authentication](./authentication.md).

### 2. Authenticate

<ApiEndpoint
  method="POST"
  path="/oauth/token"
  sample="oauth-token"
  try-body='{"grant_type":"client_credentials","client_id":"ofx_live_xxxxxxxx","client_secret":"ofx_secret_xxxxxxxx","scope":"read write"}'
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

<ApiEndpoint method="GET" path="/balances" sample="list-balances">

List account balances with your access token. Use sandbox credentials while developing.

</ApiEndpoint>

---

## API design

- **RESTful** resources with predictable URLs
- **Idempotent** `POST` with `Idempotency-Key` header for trades and withdrawals
- **Versioned** via URL path (`/v1`)
- **Paginated** list endpoints with `cursor` and `limit`
- **Consistent errors** with machine-readable `code` and human `message`

---

## Core resources

```
/balances                  Multi-currency account balances
/quotes                    FX rate quotes with time-lock
/trades                    Executed currency conversions
/deposits                  Incoming fund transfers
/withdrawals               Outgoing payouts to local rails
/webhooks                  Event subscriptions
/organization/users        Team management (admin scope)
```

Full endpoint catalog: [API reference](./api-reference.md)

---

## Webhooks

Subscribe to events instead of polling:

| Event | When fired |
|-------|------------|
| `deposit.received` | Funds credited to your account |
| `quote.expired` | Quote window closed without execution |
| `trade.executed` | Trade confirmed and processing |
| `trade.settled` | Settlement complete |
| `withdrawal.completed` | Funds delivered to destination |
| `withdrawal.failed` | Withdrawal rejected or returned |

Webhook payloads are signed with `X-OpenFX-Signature`. Verify before processing.

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

The sandbox uses simulated balances and mock settlements:

- No real money or market trades
- Test full quote → trade → withdraw workflows
- Reset data with `/sandbox/reset`

Use sandbox for development and CI. Promote to production after certification review.

---

## Error handling

```json
{
  "error": {
    "code": "insufficient_balance",
    "message": "Account balance insufficient for requested trade amount.",
    "details": {
      "currency": "USD",
      "available": 1250000.00,
      "requested": 2000000.00
    }
  }
}
```

Common codes: `unauthorized`, `forbidden`, `not_found`, `validation_error`, `quote_expired`, `rate_limited`.

---

## Security

- TLS 1.2+ required
- Rotate `client_secret` every 90 days (recommended)
- Never expose secrets in client-side code
- Use webhook signature verification

Details: [Authentication](./authentication.md)

---

## Next steps

- [Authentication](./authentication.md): OAuth, scopes, and tokens
- [API reference](./api-reference.md): Endpoint catalog with code samples
- [Integrations overview](../integrations/overview.md): Architecture patterns

Questions? [Create a support ticket](../support/create-ticket.md) and select **API / Developer**.
