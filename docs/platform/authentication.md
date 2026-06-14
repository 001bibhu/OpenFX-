# Authentication

SyntheticFi uses OAuth 2.0 for API access and secure brokerage linking. This guide covers credential types, token exchange, scopes, and security best practices.

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

### Token request

```http
POST /oauth/token
Content-Type: application/json
```

```json
{
  "grant_type": "client_credentials",
  "client_id": "sf_live_xxxxxxxx",
  "client_secret": "sf_secret_xxxxxxxx",
  "scope": "read write"
}
```

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

### Token refresh

Client credential tokens expire after **3600 seconds** (1 hour). Request a new token before expiry. There is no refresh token for machine-to-machine flows, re-authenticate with `client_credentials`.

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

- Email + password with mandatory MFA (TOTP or SMS)
- Enterprise SSO via SAML 2.0 (optional)

Session cookies are `HttpOnly`, `Secure`, and `SameSite=Lax`.

### Session duration

| Context | Default TTL |
|---------|-------------|
| Standard login | 8 hours |
| "Remember device" | 30 days (MFA still required for sensitive actions) |
| SSO | Per IdP policy |

---

## Brokerage account linking (OAuth)

Account linking uses a **delegated OAuth flow**, users authorize SyntheticFi at their custodian without sharing passwords.

### Flow

```
1. Your app calls POST /clients/{id}/accounts/link
2. User redirected to SyntheticFi connect URL
3. User selects custodian and logs in at custodian site
4. Custodian redirects back with authorization code
5. SyntheticFi exchanges code for access token (encrypted storage)
6. Webhook: account.linked fired to your endpoint
```

### Permissions requested (varies by custodian)

- **Read:** Positions, balances, account metadata
- **Trade:** Required for structuring financing (limited to approved instruments)

SyntheticFi requests the minimum scope needed for each program.

---

## Webhook signature verification

Each webhook includes:

```
X-SyntheticFi-Signature: t=1718380800,v1=abc123...
X-SyntheticFi-Event-Id: evt_xxxxxxxx
```

### Verification (pseudocode)

```
payload = timestamp + "." + raw_request_body
expected = HMAC_SHA256(webhook_signing_secret, payload)
compare(expected, signature_from_header)
```

Reject requests with timestamps older than **5 minutes** to prevent replay attacks.

---

## Idempotency

Origination endpoints (`POST /term-sheets`, `POST /financings`) support idempotency:

```http
Idempotency-Key: 550e8400-e29b-41d4-a716-446655440000
```

Duplicate requests with the same key return the original response without double execution.

---

## IP allowlisting (enterprise)

Restrict API access to known IP ranges:

**Settings → Security → IP allowlist**

Requests from non-allowlisted IPs receive `403 Forbidden`.

---

## Key rotation

### Rotate client secret

1. **Settings → API → Rotate secret**
2. Update your systems with the new secret
3. Old secret valid for **24-hour grace period**
4. Revoke old secret after verification

### Rotate webhook signing secret

1. Generate new secret in dashboard
2. Update verification in your webhook handler
3. Revoke old secret after successful test delivery

---

## Security checklist

- [ ] Store secrets in a secrets manager (not source code)
- [ ] Use sandbox credentials for development only
- [ ] Enable MFA for all dashboard users
- [ ] Verify webhook signatures on every request
- [ ] Log and alert on repeated `401` responses
- [ ] Rotate credentials every 90 days

---

## Troubleshooting auth errors

| Error | Cause | Fix |
|-------|-------|-----|
| `401 invalid_client` | Wrong client_id or secret | Verify credentials; check live vs sandbox |
| `401 invalid_token` | Expired or malformed token | Request new token |
| `403 insufficient_scope` | Missing scope | Re-authenticate with required scope |
| `403 ip_not_allowed` | IP not on allowlist | Update allowlist or use approved egress |

More help: [Troubleshooting](../core/troubleshooting.md) | [Create ticket](../support/create-ticket.md)
