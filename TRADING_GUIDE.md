# Trading Guide — Po3 + IFVG on Trading212 CFD

> This guide explains which instruments to trade, which sessions to focus on,
> how to set your stop loss and take profit, and the full trade execution checklist.

---

## Best Instruments on Trading212 CFD

### Tier 1 — Highest Probability (Trade These First)

| Instrument | Why It Works | Best Kill Zone | Entry TF |
|---|---|---|---|
| **XAU/USD (Gold)** | ICT methodology was built on Gold. Massive ATR, clean Po3 every London/NY session. Best single instrument for this strategy. | NY COMEX open (08:20 EST / 13:20 UTC) | 15M |
| **EUR/USD** | Most liquid forex pair, tightest spread, textbook Asian range, very clean FVGs | London Kill Zone (02:00–05:00 EST / 07:00–10:00 UTC) | 15M |
| **GBP/USD** | Explosive manipulation sweeps, large Asian range, strong intraday Po3 | London Kill Zone (02:00–05:00 EST) | 15M |
| **NAS100** | Strong IFVG reactions, high ATR, SMT with SPX500 useful for confirmation | NY open (07:00–10:00 EST / 12:00–15:00 UTC) | 5M |

### Tier 2 — Strong Secondary Options

| Instrument | Notes |
|---|---|
| **US30 (Dow Jones)** | Clean swing structure, strong Po3, slightly less volatile than NAS100 |
| **SPX500** | Smoother than NAS100, lower ATR — good for learning the pattern |
| **GBP/JPY** | Very large swings, requires wider stops — advanced setups only |
| **USD/JPY** | Asian session specialist: Tokyo Kill Zone (20:00–23:00 EST) |
| **BTC/USD** | ICT structure applies well on 1H+; 24h market means multiple Po3 cycles daily |

### Tier 3 — Valid but Noisier

AUD/USD, NZD/USD, USD/CAD — valid ICT structure but less dramatic Po3 moves, tighter pip value.

---

## Session Times & Kill Zones

All times shown in both UTC and EST (UTC−5 standard, UTC−4 summer):

| Session | UTC | EST | Focus |
|---|---|---|---|
| **Asian (Accumulation)** | 00:00–07:00 | 19:00–02:00 prev day | Build the range. Mark highs and lows. |
| **London Kill Zone** | 07:00–10:00 | 02:00–05:00 | Manipulation sweep most likely here for forex |
| **London–NY Overlap** | 12:00–15:00 | 07:00–10:00 | Highest volume period — strong IFVG reactions |
| **NY Kill Zone** | 13:00–16:00 | 08:00–11:00 | Manipulation + distribution for indices and Gold |
| **NY PM** | 17:00–20:00 | 12:00–15:00 | Secondary NY session entries |

> **Trading212 note:** Forex and Gold charts are shown in UTC on Trading212. Indices like NAS100/US30 follow US market hours. Always confirm the correct UTC offset for your instrument.

---

## Complete Trade Execution Checklist

Work through these steps in order before pressing the button:

### Step 1: Establish Bias (HTF — 4H or Daily)

- [ ] Is price making Higher Highs / Higher Lows (bullish) or Lower Highs / Lower Lows (bearish)?
- [ ] Where is the next draw on liquidity? (Previous session high/low, equal highs/lows, major FVG)
- [ ] Does your intended direction align with the daily trend?

> **Rule:** Only take longs when HTF is bullish. Only take shorts when HTF is bearish.
> Going counter-trend with this strategy requires advanced confirmation — skip it early on.

### Step 2: Mark the Asian Range (Accumulation)

- [ ] Open a 15M or 5M chart
- [ ] Note the Asian session high and low (the blue box drawn by the indicator)
- [ ] This range is the **accumulation zone** — smart money has loaded positions inside it

### Step 3: Wait for Manipulation

- [ ] During **London** (07:00–10:00 UTC) or **NY** (12:00–16:00 UTC):
  - Bullish setup: price sweeps **below** the Asian low (the indicator prints `SWEEP LOW`)
  - Bearish setup: price sweeps **above** the Asian high (`SWEEP HIGH` label)
- [ ] The sweep candle should have a clear wick beyond the range and **close back inside**
- [ ] Do NOT enter on the sweep candle itself — it is the trap

### Step 4: Wait for Market Structure Shift (MSS)

On your 5M chart (or 1M for precision):
- [ ] After the sweep, wait for a **higher-low** (bullish) or **lower-high** (bearish) to form
- [ ] This confirms smart money has reversed and distribution is beginning
- [ ] A strong displacement candle away from the sweep is a key signal

### Step 5: Find the FVG / IFVG Entry Zone

- [ ] Look for a **bullish FVG** (teal box) or **bullish IFVG** (yellow box) created during the first displacement leg
- [ ] For shorts: bearish FVG (red box) or bearish IFVG (orange box)
- [ ] The IFVG is preferred — it represents a stronger imbalance with two layers of evidence
- [ ] Inversion FVGs (cyan/light-red) are also valid if confluence is strong

### Step 6: Enter at the Zone

- [ ] Place a **limit order at the midpoint (CE)** of the FVG/IFVG zone
- [ ] OR enter at market when price pulls back into the zone
- [ ] The indicator fires a `▲ LONG` or `▼ SHORT` signal when conditions are met on current bar

### Step 7: Apply Risk Management

See the SL/TP section below for exact placement.

---

## Stop Loss Placement

| Setup | SL Placement |
|---|---|
| Po3 long (entry at FVG/IFVG after sweep low) | **Below the sweep wick low** + ATR buffer (default 0.5×ATR) |
| Po3 short (entry at FVG/IFVG after sweep high) | **Above the sweep wick high** + ATR buffer |
| Inversion FVG long | Below the bottom edge of the inverted FVG zone |
| Inversion FVG short | Above the top edge of the inverted FVG zone |
| Implied FVG long | Below the lower boundary of the IFVG zone |
| Implied FVG short | Above the upper boundary of the IFVG zone |

The **SL line drawn on the chart** places your stop at the sweep wick extreme plus the ATR buffer. This is the **invalidation point** — if price reaches here, the entire Po3 setup has failed.

> **For Gold (XAUUSD):** SL is typically 50–150 pips below the sweep wick. Wide, but the RR compensates.
> **For Forex (EURUSD/GBPUSD):** SL is typically 10–30 pips beyond the sweep.
> **For Indices (NAS100/US30):** SL is typically 20–50 points beyond the sweep.

---

## Take Profit Targets

| Level | Placement | Recommended Action |
|---|---|---|
| **TP1 — 1:1 R** (teal/light-red line) | Equal to your risk distance | Close **50%** of position. Move SL to breakeven. |
| **TP2 — 1:2 R** (darker teal/red line) | 2× your risk (default, adjustable) | Close **30%** of remaining position |
| **TP3 — Runner** (bright green/dark red) | 3× your risk (1.5×RR setting) | Let remaining **20%** run to major liquidity |

### Priority Target Hierarchy

When choosing where TP2/TP3 should sit, look for:

1. **Previous session high/low** — most reliable; price frequently returns to session extremes
2. **Previous day's high/low** — daily liquidity pools, especially on NY open
3. **Equal highs/equal lows** — external liquidity; price is drawn to these
4. **Next HTF FVG** — a 1H or 4H FVG above (for longs) / below (for shorts)
5. **Weekly high/low** — major draw for runner positions

> **Rule:** If TP2 doesn't sit near any of the above, the RR may not justify the trade.

---

## Position Sizing for Trading212 CFD

Use **1–2% account risk per trade** (no more than 2% in a single trade).

### Formula
```
Risk Amount  = Account Balance × Risk %
               e.g. £1,000 × 1% = £10 risk

Pip/Point Value depends on your lot size and instrument.

Position Size = Risk Amount ÷ (SL distance in pips × pip value)
```

### Example — EURUSD on Trading212 CFD
```
Account:       £1,000
Risk:          1% = £10
SL distance:   20 pips
Pip value:     £1 per pip per lot (at standard lot)

Position size: £10 ÷ (20 × £1) = 0.5 lots
```

Trading212 CFD uses **contracts** not lots — check the instrument info panel for pip value per contract.

---

## Common Mistakes to Avoid

| Mistake | What to Do Instead |
|---|---|
| Entering during the sweep candle | Wait for the sweep to COMPLETE and price to close back inside the Asian range |
| Ignoring HTF bias | Always check 4H/Daily before taking a signal |
| Entering without a nearby FVG/IFVG | The zone IS the entry — no zone = no trade |
| Moving SL before TP1 hits | Only move to breakeven AFTER TP1 is reached |
| Trading at random times | Focus on London Kill Zone (07:00–10:00 UTC) and NY Kill Zone (13:00–16:00 UTC) |
| Wide RR without confirmation | Minimum 2:1 RR. If SL is large and TP seems far, pass |
| Overtrading | One high-quality Po3 setup per session per instrument is enough |

---

## Indicator Settings for Each Instrument

| Instrument | TF | ATR Period | SL Buffer | RR (TP2) | Notes |
|---|---|---|---|---|---|
| XAU/USD | 15M | 14 | 0.5 | 2.0 | Volatile; wider stops acceptable |
| EUR/USD | 15M | 14 | 0.5 | 2.0 | Standard settings |
| GBP/USD | 15M | 14 | 0.7 | 2.0 | Wider buffer due to volatility |
| NAS100 | 5M  | 14 | 0.5 | 2.5 | Higher RR — moves fast once distributed |
| US30 | 5M  | 14 | 0.5 | 2.0 | Standard |
| BTC/USD | 1H  | 14 | 0.5 | 2.0 | Use hourly due to 24h noise |

---

## Quick Reference Card

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BULLISH DAY SETUP

1. Asian session forms a range (blue box)
2. London/NY breaks BELOW the range (sweep low)
   → Indicator prints "SWEEP LOW"
3. Price closes back inside the range
4. Market structure shifts bullish on 5M
5. Price pulls into bullish FVG/IFVG zone
   → Indicator prints "▲ LONG Po3+IFVG"
6. Enter long. SL = below sweep wick + buffer
7. TP1 at 1:1, close 50%, move SL to BE
8. TP2 at 1:2, close 30%
9. TP3 (runner) at previous session high
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BEARISH DAY SETUP (mirror image)

1. Asian range forms
2. London/NY sweeps ABOVE the range
   → Indicator prints "SWEEP HIGH"
3. Price closes back inside range
4. Market structure shifts bearish on 5M
5. Price pulls into bearish FVG/IFVG zone
   → Indicator prints "▼ SHORT Po3+IFVG"
6. Enter short. SL = above sweep wick + buffer
7. Same TP management in reverse
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Disclaimer

This indicator and guide are for **educational purposes**. Trading CFDs carries significant risk and may not be suitable for all investors. Past performance does not guarantee future results. Always use a demo account first, and never risk money you cannot afford to lose.
