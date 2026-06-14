# Overview

SyntheticFi is a financial platform that helps investors and advisors access cash using an investment portfolio, without selling the underlying assets.

This page explains what SyntheticFi does, who it is for, and how it works at a high level.

---

## What is SyntheticFi?

SyntheticFi enables you to turn your investment portfolio into usable cash while keeping your investments intact.

Instead of selling stocks or ETFs, SyntheticFi uses your portfolio as collateral and structures financing through public markets. This allows you to receive cash today and repay it later at a known cost.

In simple terms:

- You need cash
- You want to stay invested
- SyntheticFi helps you access liquidity without selling

The platform handles the full lifecycle, including collateral management, trade execution, and monitoring.

![SyntheticFi overview flow](/assets/syntheticfi-overview-flow.png)

*Illustration: Converting an investment portfolio into cash without selling assets.*

---

## Who uses SyntheticFi?

SyntheticFi is designed for both financial professionals and investors.

### Financial advisors

- Registered Investment Advisors (RIAs)
- Wealth managers
- Broker-dealers

They use SyntheticFi to:

- Offer liquidity solutions to clients
- Structure financing strategies
- Monitor collateral and risk

### Investors

- Individuals with large brokerage portfolios
- High-net-worth investors

They use SyntheticFi to:

- Access cash for major expenses
- Avoid selling investments
- Maintain long-term investment strategies

### Financial service providers

- Mortgage brokers
- Lending platforms

They use SyntheticFi to:

- Integrate portfolio-backed liquidity into financing workflows

---

## Why SyntheticFi exists

Many investors have significant wealth in their portfolios but limited available cash.

Selling investments can:

- Trigger capital gains taxes
- Disrupt long-term strategies
- Create timing risk

SyntheticFi provides a way to access cash while staying invested, helping investors meet short-term needs without changing their long-term plans.

---

## High-level workflow

Here is how SyntheticFi works from start to finish:

1. **Connect portfolio**: Link your brokerage or custodian account
2. **Review eligibility**: Evaluate portfolio value and financing capacity
3. **Structure financing**: SyntheticFi sets up a market-based financing strategy
4. **Receive cash**: Funds are delivered to your account
5. **Monitor during the term**: Track portfolio value and margin status
6. **Repay and close**: Repay at the agreed cost and release collateral

![SyntheticFi workflow steps](/assets/syntheticfi-workflow-steps.png)

*Illustration: End-to-end workflow from portfolio connection to repayment.*

---

## How SyntheticFi creates financing

SyntheticFi uses public market instruments to structure financing with a predictable outcome.

One of the key strategies used is called a **box spread**.

A box spread combines multiple options contracts to create a fixed future payoff. This payoff behaves like a loan:

- You receive cash today
- You repay a fixed amount later

Unlike traditional investing, this approach is not based on predicting market direction. It is designed to produce a known outcome regardless of how the market moves.

### Box spread (simplified)

The strategy combines:

- Buying a call option
- Selling a call option
- Buying a put option
- Selling a put option

All positions are set at specific prices and expire at the same time.

Together, they create a fixed difference between what you receive today and what you repay later.

### Visual overview

![Box spread diagram](./assets/box-spread-diagram.svg)

*Illustration: A box spread combines four options positions to create a fixed payoff, similar to a loan.*

---

## Key concepts

### Liquidity

Access to cash that can be used immediately. SyntheticFi converts portfolio value into usable liquidity.

### Collateral

Your investment portfolio is used to secure the financing.

### Locking

A portion of your portfolio may be restricted while financing is active. This ensures the collateral remains available.

### Fixed cost

The total repayment amount is known upfront based on market conditions at the time of structuring.

### Margin risk

If your portfolio value declines significantly, you may need to add collateral or reduce the financing amount.

---

## What happens behind the scenes

SyntheticFi manages:

- Portfolio evaluation
- Trade execution
- Collateral management
- Risk monitoring

You do not need to place trades or manage options directly. The platform handles the complexity while you experience a simplified financing flow.

For a deeper walkthrough of each step, see [How it works](./how-it-works.md).

---

## Next steps

- [How it works](./how-it-works.md): Learn how financing is structured end to end
- [Getting started](./getting-started.md): Set up your account
- [Use cases](./use-cases.md): Explore real-world scenarios
- [FAQ](./faq.md): Find quick answers
