# Troubleshooting

Resolve common issues with OpenFX account setup, trades, settlements, and API integration. If your issue is not listed, [create a support ticket](../support/create-ticket.md).

---

## Account and onboarding

### KYC verification delayed

**Symptoms:** Onboarding stuck in pending status beyond 72 hours.

**Try these steps:**

1. Confirm all required documents were submitted (entity registration, authorized signatory ID)
2. Check for follow-up emails from the compliance team requesting additional information
3. Verify entity details match official registration documents exactly

**Still pending?** Contact your account manager or [support](../support/contact-support.md) with your organization ID.

### Cannot log in to the platform

**Symptoms:** Login fails or MFA not received.

**Try these steps:**

1. Confirm you are using the email address registered during onboarding
2. Check spam/junk folder for MFA codes
3. Reset password via **Forgot password** on the login page
4. Ensure your account has not been deactivated by an org admin

---

## Deposits and funding

### Fiat deposit not reflecting

**Symptoms:** Sent funds but balance has not updated after 20+ minutes.

**Try these steps:**

1. Confirm you sent to the correct account details shown in **Deposits**
2. Verify the sending institution has processed the transfer
3. Check that the deposit rail matches (SEPA Instant vs standard SEPA, etc.)
4. Allow additional time for cross-border wire transfers

**Note:** Some counterparties impose business-hour limitations even on instant rails.

### Crypto deposit delayed

**Symptoms:** USDC/USDT deposit not credited.

**Try these steps:**

1. Confirm the transaction has sufficient blockchain confirmations
2. Verify you sent to the correct network and wallet address
3. Check for blockchain congestion affecting confirmation times

---

## Trades and quotes

### Quote expired before execution

**Symptoms:** Error when confirming a trade; quote no longer valid.

**Action:** Request a new quote. Quotes have a time-lock window; market conditions may change the rate.

### Trade stuck in processing

**Symptoms:** Trade status shows "Processing" beyond expected settlement time.

**Try these steps:**

1. Check real-time status in the dashboard or via `GET /trades/{id}`
2. Review platform status page for any ongoing incidents
3. Most trades settle within 60 minutes; allow up to 120 minutes before escalating

**Still processing?** Include the trade ID in a [support ticket](../support/create-ticket.md).

### Unexpected spread or pricing

**Symptoms:** Executed rate differs from expected mid-market rate.

**Remember:** OpenFX pricing is mid-market plus spread (3–5 bps G20, 10–12 bps emerging markets). During acute liquidity constraints, spreads may widen temporarily with transparency provided at quote time.

---

## Withdrawals

### Withdrawal delayed

**Symptoms:** Withdrawal requested but funds not received at destination.

**Try these steps:**

1. Confirm withdrawal status in the dashboard (Requested → Processing → Complete)
2. Verify destination bank details are correct
3. Check if the destination rail has business-hour limitations
4. Allow up to 60 minutes for after-hours processing

### Withdrawal rejected

**Common causes:**

| Cause | Action |
|-------|--------|
| Unverified destination | Complete destination verification in Settings |
| Insufficient settled balance | Confirm trade has fully settled before withdrawing |
| Compliance hold | Contact support for review status |
| Incorrect bank details | Update destination and retry |

---

## API integration

### Authentication failures (401)

**Try these steps:**

1. Confirm `client_id` and `client_secret` are correct and not expired
2. Verify the access token has not expired (default 3600 seconds)
3. Check that the token is included as `Authorization: Bearer {token}`
4. Ensure you are using the correct environment (sandbox vs production)

See [Authentication](../platform/authentication.md).

### Rate limiting (429)

**Symptoms:** `429 Too Many Requests` responses.

**Action:** Check `Retry-After` header and implement exponential backoff. Contact your account manager if you need higher rate limits.

### Webhook delivery failures

**Try these steps:**

1. Verify your endpoint returns `2xx` within timeout
2. Confirm webhook signature verification uses the correct signing secret
3. Review failed deliveries at **Settings → Webhooks → Deliveries**
4. Retry failed deliveries or re-register the endpoint

---

## Dashboard and reporting

### Balances not updating

**Symptoms:** Dashboard shows stale balance after recent trade or deposit.

**Try these steps:**

1. Refresh the page or wait for the next sync cycle
2. Check individual transaction status for pending items
3. Use the API (`GET /balances`) for programmatic verification

### Missing transactions in reports

**Action:** Adjust date range filters and confirm the transaction status (pending trades may not appear in settled reports).

---

## Getting help

OpenFX support is available **24/7/365**.

| Channel | Best for |
|---------|----------|
| **[Create a ticket](../support/create-ticket.md)** | Technical issues, trade disputes |
| **Account manager** | Strategic questions, volume pricing |
| **hello@openfx.com** | General inquiries |
| **[Get a demo](https://www.openfx.com/)** | New corridor or product questions |

Include your organization ID, trade ID (`trd_`), or withdrawal ID (`wd_`) in support requests for faster resolution.
