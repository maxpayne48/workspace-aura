# Plan: Product Demo PPTX — Price Estimator Feature

## Goal
Create a 4-5 slide internal product demo deck in `.pptx` format that showcases the **Price Estimator** feature of the workspace aggregator prototype. The deck should feel like a natural extension of the existing app: modern fintech/proptech aesthetic, clean borders, subtle gradients, and the same indigo/emerald/amber accent colors used in the UI.

## Slide Structure (4-5 slides)

### Slide 1 — Title
- Title: "Price Estimator — Internal Demo"
- Subtitle: "AI-driven commercial bracketing for flexible workspace leases"
- Footer note: Qdesq Aggregator · Prototype

### Slide 2 — The Problem
- Headline: "Static pricing hides the real cost of flexibility"
- Three pain points as icon + text rows:
  - Operators list a single seat rate, ignoring lease duration
  - Teams can't compare 1-month vs 36-month total cost of occupancy
  - Procurement lacks transparency into what drives the price

### Slide 3 — The Feature
- Headline: "Dynamic price bracketing, one slider away"
- Two-column layout:
  - Left: screenshot-style mockup of the Price Estimator card (₹ low–high bracket, month slider, component share bar)
  - Right: three bullets explaining behavior:
    - Lease duration slider (1–36 months) updates the bracket instantly
    - Low/high bounds derived from base seat price + duration factor
    - Component-share bar shows where the money goes (lease, maintenance, IT, credits, utilities)

### Slide 4 — How It Works
- Headline: "Behind the bracket"
- Simple formula callout:
  - `factor = 1 + (12 - months) × 0.012 - max(0, months - 12) × 0.005`
  - `bracket = basePrice × factor × [0.96 … 1.06]`
- Brief explanation of the 58/14/12/8/8 component split

### Slide 5 — Impact / Next Steps
- Headline: "What this unlocks"
- Three stat-style callouts:
  - Instant quote range for any lease length
  - Transparent cost breakdown for procurement
  - Faster comparison across operators
- Closing line: "Ready to integrate live operator pricing APIs."

## Visual Design

- **Palette** (pulled from the app):
  - Primary indigo: `6366F1`
  - Emerald accent: `10B981`
  - Amber accent: `F59E0B`
  - Pink accent: `EC4899`
  - Cyan accent: `22D3EE`
  - Dark background for title slide: `0F172A` or `1E293B`
  - Light background for content slides: `F8FAFC` or `FFFFFF`
- **Typography**: Arial Black for headlines, Calibri for body (safe, universal, minimal)
- **Motif**: rounded cards with soft shadows, subtle left-edge accent bars, and colored micro-dots for list items — mirroring the card UI in the app
- **Layout**: full-width title/conclusion slides, two-column content slides, large stat callouts

## Implementation Steps

1. **Copy and read the PPTX skill reference** from `/tmp/knowledge/skill/pptx/pptxgenjs_reference.md` to ensure correct pptxgenjs API usage.
2. **Generate or source visual assets**:
   - Reconstruct the Price Estimator card as a shape/SVG-based slide mockup (no external image dependencies)
   - Embed all graphics as base64 or native pptxgenjs shapes
3. **Build the deck** with `pptxgenjs`:
   - Apply the slide-by-slide layout and content above
   - Use consistent colors, fonts, and spacing
   - Save to `/mnt/documents/price-estimator-demo.pptx`
4. **Validate and inspect**:
   - Run the OOXML validation script
   - Convert to PDF/images and visually inspect every slide for overflow, alignment, and color issues
   - Fix any layout defects and re-verify
5. **Deliver**:
   - Emit the final `.pptx` via `<presentation-artifact>` tag
   - Summarize what was verified

## Deliverable
A single modern, minimal 4-5 slide `.pptx` file saved to `/mnt/documents/price-estimator-demo.pptx`.