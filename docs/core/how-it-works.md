# How it works

This guide explains how SyntheticFi turns an investment portfolio into cash, what happens to your holdings, how financing is structured, and what to expect from start to finish.

---

## The big picture

SyntheticFi follows a consistent pattern:

```
Portfolio connected → Collateral verified → Financing structured → Cash delivered
        ↓
Active term (monitoring) → Repayment → Collateral released
```

Your portfolio stays invested. SyntheticFi uses it as backing for structured financing rather than requiring a sale.

---

## Portfolio as collateral

### What "collateral" means here

Your brokerage or custodian account holds stocks, ETFs, and other eligible assets. SyntheticFi evaluates:

- **Total portfolio value**, Current market value of eligible holdings
- **Composition**, Which assets qualify (some holdings may be excluded)
- **Concentration**, Over-weighted single positions may require adjustment
- **Liquidity**, How easily holdings can be valued and monitored

Based on this review, SyntheticFi determines how much financing the portfolio can support, similar in concept to a **loan-to-value (LTV) ratio**, but applied to securities rather than real estate.

### What stays the same

- You remain the beneficial owner of your investments
- Dividends and corporate actions generally flow to you (subject to program terms)
- Your advisor retains visibility per firm permissions

### What changes

- A defined portion of the portfolio is **pledged** to secure the financing
- Those pledged holdings are **locked** for the financing term (see below)
- You must maintain sufficient portfolio value to satisfy margin requirements

---

## What "locking" means

**Locking** restricts certain actions on pledged holdings during an active financing term.

While locked, you typically **cannot**:

- Sell the pledged securities
- Transfer them to another account
- Use them as collateral elsewhere (without SyntheticFi approval)

You **can** usually:

- View positions and performance
- Receive dividends (program-dependent)
- Work with your advisor to add collateral or adjust the structure if needed

Locking protects the financing structure. When you **repay and close**, locks are removed and full control returns to normal account operations.

```
Before financing:     [ Portfolio, full flexibility ]
During financing:     [ Portfolio, pledged portion LOCKED ]
After repayment:      [ Portfolio, full flexibility restored ]
```

---

## How SyntheticFi structures financing

SyntheticFi is a **structuring platform**, not a simple line of credit from a bank.

### Step 1: Define the need

You specify (with your advisor):

- **Cash amount** required
- **Intended use** (e.g., home purchase, taxes)
- **Preferred term** or repayment timeline

### Step 2: Match to portfolio capacity

SyntheticFi calculates maximum eligible financing based on portfolio value, haircuts on specific holdings, and firm-level limits.

### Step 3: Structure in public markets

SyntheticFi executes a financing structure through public markets. This may involve options-based strategies (such as box spreads) that produce a **defined cash amount** and **defined cost** for the term.

You do not trade these instruments yourself. SyntheticFi's infrastructure and approved counterparties handle execution, subject to compliance and risk controls.

### Step 4: Deliver cash

Once structured and confirmed, cash is sent to the designated account, often the same brokerage account or a linked bank account, depending on program setup.

**No deep math required on your part.** You receive disclosures showing cash received, total cost, key dates, and margin requirements.

---

## Financing lifecycle

### Phase 1: Origination

| Step | What happens |
|------|----------------|
| Account linking | Connect brokerage/custodian via secure integration |
| KYC & compliance | Identity verification and regulatory checks |
| Term sheet | Review amount, cost, term, and margin thresholds |
| Acceptance | Client (and advisor, if applicable) confirms |
| Execution | Structure is placed; collateral is locked |

**Typical timeline:** 1–5 business days for standard integrations; longer for manual or custom setups.

### Phase 2: Active term

During the financing term:

- **Portfolio is monitored** daily (or intraday for large positions)
- **Value alerts** notify you if the portfolio approaches margin thresholds
- **Statements** show outstanding balance, cost accrual (if applicable), and collateral status
- **Advisor dashboard** provides firm-level visibility (see [Admin guide](./admin-guide.md))

### Phase 3: Repayment and closure

Repayment options depend on program terms:

- **Full repayment** at term end (most common)
- **Early repayment** (may be allowed with adjusted economics)
- **Roll or extend** (subject to re-qualification and new terms)

Upon full repayment:

1. Financing structure is unwound
2. Collateral locks are released
3. Confirmation is sent to client and advisor
4. Account returns to standard operating status

---

## What happens if the market drops

Portfolio value fluctuates. If your portfolio **declines**, collateral coverage weakens. SyntheticFi handles this through a **margin framework**.

### Margin thresholds (simplified)

```
Healthy        →  Portfolio comfortably covers financing
Warning        →  Approaching minimum coverage, action recommended
Margin call    →  Coverage below required level, action required
Remediation    →  Add collateral, partial repayment, or restructure
```

### Your options when notified

1. **Add collateral**, Transfer additional eligible securities or cash into the account
2. **Partial repayment**, Reduce the outstanding financing amount
3. **Restructure**, Work with SyntheticFi and your advisor to adjust terms (if available)
4. **Liquidation (last resort)**, If no action is taken, pledged holdings may be sold to restore required coverage

SyntheticFi sends notifications by email and in-platform alerts. Advisors receive parallel notifications for client accounts they manage.

**Important:** Margin events are not failures, they are a normal part of portfolio-backed financing. Proactive monitoring reduces the risk of forced liquidation.

---

## Repayment and closure

### Standard repayment

At the end of the term, you repay the **principal plus the agreed fixed cost**. Payment methods include:

- ACH from a linked bank account
- Journal of cash within the brokerage account
- Wire transfer (for larger amounts)

### Early closure

If you repay before the scheduled end date, economics may differ from the original term sheet. Review early repayment terms before originating.

### After closure

- All locks removed
- Financing marked closed in dashboard and statements
- Tax reporting documents issued as applicable (consult your tax advisor)

---

## Data and security flow

```
[ Brokerage / Custodian ]  ←→  [ SyntheticFi Platform ]  ←→  [ Advisor Dashboard ]
         ↑                              ↑
    Holdings & balances            Structuring & monitoring
```

SyntheticFi reads portfolio data through secure, read-only (and where required, trading) integrations. Credentials are never stored in plain text; OAuth and API tokens follow industry standards. See [Authentication](../platform/authentication.md) and [Integrations overview](../integrations/overview.md).

---

## Related reading

- [Overview](./overview.md), Product introduction and key concepts
- [Getting started](./getting-started.md), Onboarding steps
- [Use cases](./use-cases.md), When to use portfolio liquidity
- [FAQ](./faq.md), Common questions
- [Troubleshooting](./troubleshooting.md), Resolve issues
