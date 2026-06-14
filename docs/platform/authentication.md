---
pageClass: sf-api-doc
---

# Authentication

SyntheticFi uses OAuth 2.0 for API access and secure brokerage linking. This guide covers credential types, token exchange, scopes, and security best practices.

<div class="sf-api-banner">
  <span><strong>Token endpoint</strong> <code>POST /oauth/token</code></span>
  <span><strong>Header</strong> <code>Authorization: Bearer {access_token}</code></span>
</div>

---

## Credential types

| Type | Used for |
|------|----------|
| **API client credentials** | Server-to-server API access (`client_id` + `client_secret`) |
| **User access tokens** | Advisor dashboard and client portal sessions |
| **Brokerage OAuth tokens** | Read/trade access to custodian accounts (stored encrypted) |
| **Webhook signing secrets** | Verify event payload authenticity |

Never share credentials in email, chat, or client-side JavaScript.

---

## API authentication (client credentials)

<ApiEndpoint
  method="POST"
  path="/oauth/token"
  sample="oauth-token"
  try-body='{"grant_type":"client_credentials","client_id":"sf_live_xxxxxxxx","client_secret":"sf_secret_xxxxxxxx","scope":"read write"}'
>

### Request an access token

Exchange your `client_id` and `client_secret` for a short-lived Bearer token.

### Token response

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "read write"
}
```

Use the access token in subsequent requests:

```http
GET /v1/clients
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
```

</ApiEndpoint>

<ApiEndpoint method="GET" path="/clients" sample="list-clients">

### Authenticated request example

Call a protected endpoint with the token from the previous step.

### Token refresh

Client credential tokens expire after **3600 seconds** (1 hour). Request a new token before expiry. There is no refresh token for machine-to-machine flows. Re-authenticate with `client_credentials`.

</ApiEndpoint>

---

## Scopes

Request only the scopes you need:

| Scope | Access |
|-------|--------|
| `read` | GET resources: clients, accounts, financings, margin events |
| `write` | POST/PATCH: term sheets, financings, webhooks |
| `admin` | Firm user management, audit logs |
| `sandbox` | Sandbox-only utilities |

Multiple scopes: space-separated (`read write`).

---

## User authentication (dashboard)

### Advisor and client login

Dashboard users authenticate through SyntheticFi's hosted login or your firm's SSO integration (SAML 2.0 or OIDC). User sessions are separate from API client credentials.

### Session tokens

Browser sessions use HTTP-only cookies. Do not copy dashboard session tokens into API integrations. Use client credentials instead.

---

## Brokerage OAuth (account linking)

When a client links a brokerage account, SyntheticFi completes an OAuth flow with the custodian. Your application receives a `link_url` from the API and redirects the user to complete authorization.

Tokens from custodians are stored encrypted and never returned in API responses.

---

## Webhook signature verification

Each webhook delivery includes:

```
X-SyntheticFi-Signature: t=1718380800,v1=abc123...
```

Verify signatures before processing payloads:

1. Parse the timestamp `t` and signature `v1` from the header
2. Compute HMAC-SHA256 of `{t}.{raw_body}` using your signing secret
3. Compare with constant-time equality check

Reject events older than 5 minutes to prevent replay attacks.

---

## Security best practices

| Practice | Recommendation |
|----------|----------------|
| Secret storage | Use a secrets manager (AWS Secrets Manager, Vault, etc.) |
| Rotation | Rotate `client_secret` every 90 days |
| Least privilege | Request minimum scopes |
| Logging | Never log tokens or secrets |
| IP allowlisting | Available for enterprise accounts |
| Idempotency | Use `Idempotency-Key` on financial writes |

---

## Common errors

| HTTP | Code | Cause |
|------|------|-------|
| 401 | `unauthorized` | Missing or expired token |
| 403 | `forbidden` | Valid token but insufficient scope |
| 400 | `invalid_grant` | Bad `client_id` or `client_secret` |

---

## Next steps

- [API reference](./api-reference.md), Full endpoint catalog
- [API overview](./api-overview.md), Environments and rate limits
- [Create a support ticket](../support/create-ticket.md), API / Developer category
