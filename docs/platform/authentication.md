# Authentication

OpenFX uses OAuth 2.0 for API access. This guide covers credential types, token exchange, scopes, and security best practices.

---

## Credential types

| Type | Used for | How obtained |
|------|----------|--------------|
| **Client credentials** | Server-to-server API access | Dashboard → Settings → API |
| **Webhook signing secret** | Verifying webhook payloads | Created with webhook endpoint |
| **User session** | Web GUI login | Hosted login or SSO (SAML 2.0 / OIDC) |

API integrations use **client credentials** exclusively. User sessions are separate and not used for programmatic trading.

---

## Client credentials flow

### 1. Create API key

In the OpenFX dashboard:

1. Navigate to **Settings → API → Create key**
2. Name the key (e.g., "Production payment service")
3. Select scopes: `read`, `write`, and optionally `admin`
4. Copy `client_id` and `client_secret` — the secret is shown **once**

### 2. Exchange for access token

```http
POST /oauth/token
Content-Type: application/json

{
  "grant_type": "client_credentials",
  "client_id": "ofx_live_xxxxxxxx",
  "client_secret": "ofx_secret_xxxxxxxx",
  "scope": "read write"
}
```

**Response:**

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "read write"
}
```

### 3. Use the token

Include in all API requests:

```http
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
```

Tokens expire after 3600 seconds. Request a new token before expiry — do not cache beyond `expires_in`.

---

## Scopes

| Scope | Access |
|-------|--------|
| `read` | GET endpoints: balances, quotes, trades, deposits, withdrawals |
| `write` | POST endpoints: create quotes, execute trades, initiate withdrawals |
| `admin` | Organization management: users, webhooks, API keys |

Request only the scopes your integration needs.

---

## Idempotency

For `POST /trades` and `POST /withdrawals`, include an idempotency key to prevent duplicate execution:

```http
Idempotency-Key: unique-key-12345
```

Duplicate requests with the same key return the original response without re-executing.

---

## Web GUI authentication

Dashboard users authenticate through OpenFX's hosted login or your organization's SSO integration (SAML 2.0 or OIDC). User sessions are separate from API client credentials.

---

## Webhook signature verification

Webhook payloads include a signature header:

```http
X-OpenFX-Signature: t=1718380800,v1=abc123...
```

Verify by:

1. Extract timestamp `t` and signature `v1` from the header
2. Concatenate `{timestamp}.{raw_body}`
3. Compute HMAC-SHA256 with your webhook signing secret
4. Compare with `v1`

Reject requests with timestamps older than 5 minutes to prevent replay attacks.

---

## Security best practices

- **Rotate secrets** every 90 days; create a new key before revoking the old one
- **Never commit secrets** to source control; use environment variables or secret managers
- **Restrict scopes** to minimum required permissions
- **Use sandbox credentials** for development; never test against production
- **Monitor API usage** in the dashboard for anomalous activity
- **Report incidents** to hello@openfx.com immediately if credentials are compromised

---

## Environment URLs

| Environment | Base URL |
|-------------|----------|
| Sandbox | `https://api.sandbox.openfx.com/v1` |
| Production | `https://api.openfx.com/v1` |

Use sandbox credentials only with the sandbox URL, and production credentials only with the production URL.

---

## Next steps

- [API overview](./api-overview.md): Quick start and core resources
- [API reference](./api-reference.md): Full endpoint catalog
- [Troubleshooting](../core/troubleshooting.md): Authentication error resolution
