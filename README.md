# Po3 + IFVG | ICT TradingView Indicator

A Pine Script v5 indicator implementing two core **ICT (Inner Circle Trader)** concepts:

- **Po3 — Power of 3**: Accumulation → Manipulation → Distribution session cycle
- **IFVG — Implied & Inversion Fair Value Gaps**: Advanced FVG zones with higher-probability entries

Optimised for **Trading212 CFD** on XAUUSD, EURUSD, GBPUSD, NAS100, US30, and BTCUSD.

---

## Quick Start

1. Open **TradingView** and navigate to a chart (recommended: XAUUSD or EURUSD, 15M timeframe)
2. Open the **Pine Editor** (bottom panel)
3. Paste the entire contents of `Po3_IFVG_Indicator.pine`
4. Click **Add to chart**
5. The indicator compiles with zero errors — all features are visible immediately

---

## What You See on the Chart

### Session Boxes (Po3 Framework)

| Box Color | Session | Purpose |
|---|---|---|
| Dark blue | Asian (00:00–07:00 UTC) | **Accumulation** — the range smart money builds inside |
| Dark green | London (07:00–10:00 UTC) | **Manipulation zone** — watch for sweeps here |
| Dark purple | NY (12:00–20:00 UTC) | **Distribution zone** — true directional move |

### Fair Value Gap (FVG) Boxes

- **Teal/green** filled boxes: Bullish FVGs (price imbalance above)
- **Red** filled boxes: Bearish FVGs (price imbalance below)
- Boxes extend rightward until price **mitigates** them (body close through zone)
- Toggle "Show Mitigated FVGs" to keep old zones visible

### Implied FVG (IFVG) Boxes

- **Yellow** boxes: Bullish Implied FVGs — wick-overlap imbalance zones acting as support
- **Orange** boxes: Bearish Implied FVGs — wick-overlap imbalance zones acting as resistance
- These are **stronger than standard FVGs** because price has already partially reacted
- Labelled `IFVG ▲` / `IFVG ▼`

### Inversion FVG Boxes

- **Cyan** boxes: Standard bearish FVG that price body-closed through → now bullish support
- **Light red** boxes: Standard bullish FVG that price body-closed through → now bearish resistance
- Labelled `INV FVG ▲` / `INV FVG ▼`

### Po3 Manipulation Labels

- `SWEEP LOW (Manipulation)` — price swept below the Asian range low during London/NY. A **bullish** day is forming; expect distribution upward.
- `SWEEP HIGH (Manipulation)` — price swept above the Asian range high. A **bearish** day is forming.

### Entry Signals + SL/TP Lines

When Po3 manipulation is confirmed AND price enters a FVG/IFVG zone:

- `▲ LONG Po3+IFVG` label printed on the bar
- `▼ SHORT Po3+IFVG` label printed on the bar
- **SL line** (red) — at sweep wick extreme + ATR buffer
- **Entry line** (grey dashed)
- **TP1 line** (light teal/light red) — 1× risk, partial close target
- **TP2 line** (teal/red) — primary target at your RR setting
- **TP3 line** (bright green/dark red) — runner position target

---

## Input Settings Reference

### Fair Value Gap
| Setting | Default | Description |
|---|---|---|
| Show Standard FVGs | On | Toggle all FVG boxes |
| FVG Fill Opacity | 85 | Higher = more transparent |
| Show Mitigated FVGs | Off | Keep filled zones visible |
| Extend Boxes → | 50 bars | How far right boxes extend |
| Max FVG Age | 200 bars | Auto-prune old zones |

### Implied & Inversion FVG
| Setting | Default | Description |
|---|---|---|
| Show Implied FVGs | On | Yellow/orange IFVG boxes |
| Show Inversion FVGs | On | Cyan/light-red flipped boxes |
| IFVG Body Filter × | 1.5 | Middle candle must be 1.5× larger than outer candles |
| Inversion: Require Body Close | On | Stricter inversion trigger (recommended) |

### Power of 3 Sessions
All times are **UTC**. Adjust if your broker uses a different offset.

| Setting | Default |
|---|---|
| Asian Start | 00:00 UTC |
| Asian End | 07:00 UTC |
| London Start | 07:00 UTC |
| London End | 10:00 UTC |
| NY Start | 12:00 UTC |
| NY End | 20:00 UTC |

> **Trading212 uses UTC+0 for forex/gold.** No adjustment needed for most instruments. For US indices, the NY session box matters most.

### Stop Loss / Take Profit
| Setting | Default | Description |
|---|---|---|
| ATR Period | 14 | Period for ATR-based SL buffer |
| SL Buffer × ATR | 0.5 | Extra buffer beyond sweep wick |
| TP2 Risk:Reward | 2.0 | Minimum acceptable RR for TP2 |
| Line Length → | 40 bars | How far right SL/TP lines extend |

---

## Setting Up Alerts

1. Right-click on chart → **Add Alert**
2. Under **Condition**, select `Po3+IFVG | ICT Strategy`
3. Choose from these alert conditions:

| Alert | When it fires |
|---|---|
| Po3+IFVG — Long Signal | Full setup confirmed: sweep + FVG/IFVG entry |
| Po3+IFVG — Short Signal | Full setup confirmed: sweep + FVG/IFVG entry |
| Po3 — Bullish Manipulation | Sweep low detected (early warning) |
| Po3 — Bearish Manipulation | Sweep high detected (early warning) |

> **Recommended workflow**: Set the "Manipulation" alerts for early warning, then watch the chart manually for the FVG/IFVG entry. Or use the full "Long/Short Signal" alerts for automation.

---

## Recommended Timeframe Setup

| Layer | Timeframe | Purpose |
|---|---|---|
| Bias | Daily / 4H | Overall market direction |
| Session structure | 1H | Asian range, key FVGs |
| Entry | **15M** | Po3 sweep + IFVG entry (primary) |
| Precision | 5M / 1M | Fine-tune entry on FVG zone |

For NAS100/US30: use **5M** as the entry timeframe instead of 15M.

---

## Files

| File | Description |
|---|---|
| `Po3_IFVG_Indicator.pine` | Main Pine Script v5 indicator |
| `TRADING_GUIDE.md` | Which pairs to trade, session times, risk management |
