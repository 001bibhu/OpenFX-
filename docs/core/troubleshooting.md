# Troubleshooting

Resolve common issues with SyntheticFi account linking, financing status, and platform access. If your issue is not listed, [create a support ticket](../support/create-ticket.md).

---

## Account linking

### Brokerage connection fails

**Symptoms:** Error during OAuth; account does not appear in dashboard.

**Try these steps:**

1. Confirm your brokerage is on the [supported list](../integrations/brokerages.md)
2. Use the same login you use for the brokerage website (not a read-only sub-account if trade access is required)
3. Disable browser extensions that block pop-ups or third-party cookies
4. Revoke and re-authorize: **Settings → Integrations → Disconnect → Reconnect**
5. Wait 15 minutes and retry, some custodians rate-limit API connections

**Still failing?** Include the error message and brokerage name in a [support ticket](../support/create-ticket.md).

### Holdings not syncing

**Symptoms:** Portfolio value shows $0 or is missing recent trades.

**Try these steps:**

1. Click **Refresh holdings** in the dashboard (or wait for the next scheduled sync, typically every 15–60 minutes)
2. Verify the connected account holds eligible securities
3. Confirm recent transfers have settled at the custodian

**Note:** Manual accounts or unsupported asset types may not sync automatically.

---

## Eligibility and term sheets

### "Portfolio not eligible" message

**Common causes:**

| Cause | Action |
|-------|--------|
| Below minimum portfolio value | Review minimums with your advisor or support |
| Ineligible holdings (options, crypto, etc.) | Adjust portfolio or reduce requested amount |
| Concentration limits exceeded | Add diversification or lower financing request |
| Account type not supported | Confirm taxable brokerage or eligible trust |

### Term sheet expired

Term sheets are valid for a limited window (typically 48–72 hours). Request a new term sheet from the dashboard if market conditions or portfolio value changed.

---

## Financing execution

### Funding delayed

**Expected:** 1–5 business days after acceptance.

**If delayed beyond 5 business days:**

1. Check dashboard for outstanding action items (signatures, compliance holds)
2. Verify cash destination account is verified
3. Contact support with your financing ID

### Collateral not unlocking after repayment

Repayment confirmation can take 1–2 business days to process. If locks persist beyond 2 business days after confirmed repayment, [create a ticket](../support/create-ticket.md) with payment confirmation attached.

---

## Margin alerts

### Received a margin warning

1. Log in to the dashboard and review **current coverage ratio**
2. Choose an action: add collateral, partial repayment, or contact your advisor
3. Do not ignore follow-up notifications, escalation timelines are in your term sheet

See [What happens if the market drops](./how-it-works.md#what-happens-if-the-market-drops).

### Alert seems incorrect

Market data may lag briefly during volatile sessions. Wait 30 minutes and refresh. If the alert persists and you believe it is wrong, open a ticket with screenshots and financing ID.

---

## Advisor dashboard

### Client not visible

- Confirm the client completed the onboarding link
- Verify you have permission for that client's household in **Settings → Team**
- Check if client is under a different rep code mapping

### Cannot originate financing

- Confirm advisor certification is current
- Verify firm compliance status is active
- Ensure client account is linked and eligible

---

## Login and access

### Forgot password

Use **Forgot password** on the login page. Reset links expire in 24 hours.

### Two-factor authentication issues

- Ensure device time is synced (TOTP codes are time-sensitive)
- Use backup codes stored at enrollment
- Contact support if locked out, identity verification required

### Session expires quickly

Firm security policies may enforce short sessions. Re-login or contact your firm admin for policy details.

---

## API and integrations (developers)

| Issue | Resource |
|-------|----------|
| 401 Unauthorized | [Authentication](../platform/authentication.md), refresh token |
| 429 Rate limited | Reduce request frequency; see API overview |
| Webhook not received | Verify endpoint URL and signing secret |

---

## Before contacting support

Gather this information to speed resolution:

- [ ] SyntheticFi account email
- [ ] Financing or client ID (if applicable)
- [ ] Brokerage/custodian name
- [ ] Error message (screenshot helpful)
- [ ] Steps already attempted

[Create a support ticket →](../support/create-ticket.md)

We track common troubleshooting page views to improve this guide. If this page helped, tap 👍 on the feedback widget.
