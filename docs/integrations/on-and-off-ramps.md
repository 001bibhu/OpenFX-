# On and off ramps

As a modern neo broker or FX ramp provider, your users expect to fund accounts and withdraw across currencies in seconds, not days. Behind the scenes, fragmented FX systems and settlement delays slow you down. OpenFX gives you the tools to move money globally, instantly, transparently, and with complete control.

---

## The challenge

| | Current alternatives | OpenFX |
|---|---------------------|--------|
| **Settlement speed** | Hours to multiple business days | Always-on, same-day global settlement |
| **Reliability** | Rate volatility, hidden fees | Full visibility from quote to settlement |
| **Setup** | Fragmented onboarding | One platform, one integration |
| **Pricing** | Opaque with high slippage | Clear, competitive rates, zero hidden fees |
| **Coverage** | Limited corridors | Broad multi-currency with local rails |
| **Trust** | Black-box operations | Verified delivery, real-time observability |

---

## How ramp providers use OpenFX

### Faster on-ramps

Users deposit fiat or stablecoin (USDC, USDT) and receive converted balance in minutes. Crypto deposits settle near real-time; fiat deposits typically reflect within 20 minutes.

### Simpler off-ramps

Withdraw settled funds to native currency through local payment rails. After-hours withdrawals processed in under 60 minutes.

### Instant settlements

Fund accounts and withdraw across currencies without the 2–5 day delays of traditional FX. Scale toward 24/7 operations across new corridors.

### API-first integration

Embed quotes, trades, deposits, and withdrawals into your user-facing platform. Programmatic workflows built for reliability, REST API with streaming quote support.

---

## Typical user flow

### On-ramp (fiat → platform balance)

```
User deposits fiat → OpenFX credits account → User sees balance
                                              ↓
                              Optional: trade to desired currency
```

### On-ramp (stablecoin → platform balance)

```
User sends USDC/USDT → Near real-time credit → Available for trading/withdrawal
```

### Off-ramp (platform balance → fiat)

```
User requests withdrawal → Quote locked → Trade executed → Local rail payout
                                                              ↓
                                              User receives native currency
```

---

## Key capabilities

- **Fiat and stablecoin rails**, USDC, USDT, and major fiat currencies on one platform
- **Multi-currency balances**, hold USD, EUR, GBP, and corridor currencies simultaneously
- **Local payout rails**, SEPA Instant, Faster Payments, NPP, and emerging market rails
- **Time-lock quotes**, rate guaranteed for defined window during user checkout
- **Real-time status**, users track deposit, trade, and withdrawal progress live

---

## Client spotlight

> OpenFX has made our trading operations significantly easier and more cost-efficient. Their API integration has streamlined our liquidity routing, and settlements are now faster and more reliable. With the ability to scale toward 24/7 operations, we're excited to expand into new corridors with OpenFX.
>
> - Hongyi Tang, VP LATAM, VelaFi

VelaFi operates stablecoin-powered cross-border financial infrastructure across LATAM, the US, and Asia, supporting hundreds of enterprises with collections, payouts, treasury, and settlement.

---

## Integration checklist

- [ ] Sandbox API credentials provisioned
- [ ] Deposit flows tested (fiat and stablecoin)
- [ ] Quote → trade → withdraw workflow implemented
- [ ] Webhook handlers for settlement events
- [ ] User-facing status tracking integrated
- [ ] Compliance workflow aligned with OpenFX KYC requirements
- [ ] Production certification completed

---

## Getting started

1. [Schedule a demo](https://www.openfx.com/)
2. Complete institutional KYC (~72 hours)
3. Build and test on-ramp/off-ramp flows in sandbox
4. Launch with dedicated support

See [Getting started](../core/getting-started.md) for engineering and treasury onboarding paths.

---

## Next steps

- [API reference](../platform/api-reference.md): Quotes, trades, deposits, withdrawals
- [How it works](../core/how-it-works.md): Settlement lifecycle
- [FAQ](../core/faq.md): Stablecoin support, deposit times, rails
