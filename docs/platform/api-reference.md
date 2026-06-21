---
pageClass: sf-api-doc
---

# API reference

Complete reference for OpenFX Trading API v1. Each endpoint includes multi-language code samples and an interactive **Try it** console on the right.

<div class="sf-api-banner">
  <span><strong>Base URL</strong> <code>https://api.openfx.com/v1</code></span>
  <span><strong>Sandbox</strong> <code>https://api.sandbox.openfx.com/v1</code></span>
</div>

All endpoints require `Authorization: Bearer {access_token}` unless marked *Public*. See [Authentication](./authentication.md).

---

## Authentication

<ApiEndpoint
  method="POST"
  path="/oauth/token"
  sample="oauth-token"
  try-body='{"grant_type":"client_credentials","client_id":"ofx_live_xxxxxxxx","client_secret":"ofx_secret_xxxxxxxx","scope":"read write"}'
>

### Obtain access token

*Public endpoint.* Exchange client credentials for a Bearer token.

</ApiEndpoint>

---

## Balances

<ApiEndpoint method="GET" path="/balances" sample="list-balances">

### List balances

Returns balances across all currency accounts.

**Response `200`**

```json
{
  "data": [
    {
      "currency": "USD",
      "available": 5450822.00,
      "pending": 125000.00,
      "updated_at": "2026-06-14T18:00:00Z"
    },
    {
      "currency": "EUR",
      "available": 545650.00,
      "pending": 0,
      "updated_at": "2026-06-14T18:00:00Z"
    }
  ]
}
```

</ApiEndpoint>

---

## Quotes

<ApiEndpoint
  method="POST"
  path="/quotes"
  sample="create-quote"
  try-body='{"buy":"AED","sell":"MXN","referencedUnit":"MXN","referenceAmount":500000}'
>

### Create quote

Request an FX rate quote with time-lock guarantee.

**Body:**

```json
{
  "buy": "AED",
  "sell": "MXN",
  "referencedUnit": "MXN",
  "referenceAmount": 500000
}
```

**Response `201`:**

```json
{
  "id": "qt_9a8b7c6d",
  "buy": "AED",
  "sell": "MXN",
  "rate": 0.19843472,
  "buy_amount": 99217.36,
  "sell_amount": 500000.00,
  "expires_at": "2026-06-14T19:00:00Z",
  "status": "open"
}
```

</ApiEndpoint>

---

## Trades

<ApiEndpoint
  method="POST"
  path="/trades"
  sample="create-trade"
  try-body='{"quote_id":"qt_9a8b7c6d"}'
>

### Execute trade

Execute a trade against an open quote. Requires `Idempotency-Key` header.

**Body:**

```json
{
  "quote_id": "qt_9a8b7c6d"
}
```

**Response `201`:**

```json
{
  "id": "trd_1a2b3c4d",
  "quote_id": "qt_9a8b7c6d",
  "buy": "AED",
  "sell": "MXN",
  "buy_amount": 99217.36,
  "sell_amount": 500000.00,
  "status": "executed",
  "executed_at": "2026-06-14T18:05:00Z"
}
```

</ApiEndpoint>

### Get trade

```http
GET /trades/{trade_id}
```

Returns trade details including settlement status.

**Response `200`:**

```json
{
  "id": "trd_1a2b3c4d",
  "status": "settled",
  "buy": "AED",
  "sell": "MXN",
  "buy_amount": 99217.36,
  "sell_amount": 500000.00,
  "executed_at": "2026-06-14T18:05:00Z",
  "settled_at": "2026-06-14T18:12:00Z"
}
```

---

### List trades

```http
GET /trades
```

**Query parameters:** `status` (`executed`, `settled`, `failed`), `currency`, `limit`, `cursor`

---

## Deposits

### List deposits

```http
GET /deposits
```

**Query parameters:** `status` (`pending`, `received`), `currency`, `limit`, `cursor`

**Response `200`:**

```json
{
  "data": [
    {
      "id": "dep_7x8y9z",
      "currency": "USD",
      "amount": 1000000.00,
      "status": "received",
      "rail": "wire",
      "received_at": "2026-06-14T10:30:00Z"
    }
  ]
}
```

---

## Withdrawals

<ApiEndpoint
  method="POST"
  path="/withdrawals"
  sample="create-withdrawal"
  try-body='{"currency":"GBP","amount":675900.00,"destination_id":"dest_abc123"}'
>

### Create withdrawal

Initiate a withdrawal to a verified destination. Requires `Idempotency-Key` header.

**Body:**

```json
{
  "currency": "GBP",
  "amount": 675900.00,
  "destination_id": "dest_abc123"
}
```

**Response `201`:**

```json
{
  "id": "wd_5e6f7a8b",
  "currency": "GBP",
  "amount": 675900.00,
  "status": "processing",
  "destination_id": "dest_abc123",
  "created_at": "2026-06-14T18:30:00Z"
}
```

</ApiEndpoint>

### Get withdrawal

```http
GET /withdrawals/{withdrawal_id}
```

---

## Webhooks

### Create webhook endpoint

```http
POST /webhooks
```

**Body:**

```json
{
  "url": "https://yourapp.com/webhooks/openfx",
  "events": ["trade.settled", "withdrawal.completed", "deposit.received"]
}
```

**Response `201`:**

```json
{
  "id": "wh_5e6f7a8b",
  "url": "https://yourapp.com/webhooks/openfx",
  "events": ["trade.settled", "withdrawal.completed", "deposit.received"],
  "signing_secret": "whsec_xxxxxxxx"
}
```

---

### List webhook deliveries

```http
GET /webhooks/{webhook_id}/deliveries
```

---

## Organization administration

### List organization users

```http
GET /organization/users
```

Requires `admin` scope.

---

### Invite user

```http
POST /organization/users/invite
```

**Body:**

```json
{
  "email": "treasury@company.com",
  "role": "treasury_manager"
}
```

---

## Sandbox utilities

*Sandbox only*

### Reset sandbox data

```http
POST /sandbox/reset
```

Clears sandbox balances and transaction history for fresh testing.

---

## HTTP status codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 202 | Accepted (async processing) |
| 400 | Validation error |
| 401 | Unauthorized |
| 403 | Forbidden (scope or role) |
| 404 | Not found |
| 409 | Conflict (e.g., duplicate idempotency) |
| 429 | Rate limited |
| 500 | Server error |

---

## Changelog

| Version | Date | Notes |
|---------|------|-------|
| v1.0 | 2026-01 | Initial public Trading API |
| v1.1 | 2026-04 | Webhooks, streaming quotes |

Subscribe to API changelog emails via [contact support](../support/contact-support.md).
