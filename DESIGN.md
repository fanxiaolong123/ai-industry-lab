# Design

## Visual Theme

The interface is a restrained research workstation for AI infrastructure and semiconductor investing. The scene is a quiet analyst desk after an earnings call: white surface, dark ink, disciplined green signal color, and amber highlights for risk and uncertainty.

Direction confirmed 2026-07 by the user: the light "research desk" option (option 1 of 3 in `output/design-preview.html`), over a dark terminal style and an editorial print style.

## Color Palette

Use OKLCH values only.

- `--bg`: `oklch(1 0 0)`
- `--surface`: `oklch(0.972 0.004 145)`
- `--surface-2`: `oklch(0.945 0.006 145)`
- `--ink`: `oklch(0.18 0.018 145)`
- `--muted`: `oklch(0.45 0.018 145)`
- `--primary`: `oklch(0.35 0.11 140)`
- `--primary-2`: `oklch(0.48 0.12 140)`
- `--accent`: `oklch(0.60 0.135 58)`
- `--danger`: `oklch(0.52 0.16 28)`
- `--info`: `oklch(0.47 0.10 245)`
- `--line`: `oklch(0.88 0.006 145)`

## Typography

Use system Chinese and Latin sans-serif stacks for clarity and speed:

`-apple-system, BlinkMacSystemFont, "SF Pro Text", "PingFang SC", "Microsoft YaHei", "Noto Sans CJK SC", system-ui, sans-serif`

Product UI labels should stay compact and legible. Long-form explanations should keep line length around 65-75 Chinese characters where possible.

## Layout

Use a left navigation rail on desktop and a sticky top selector on mobile. The page should behave like a study console:

- Overview and learning path at the top
- Dense modules below, each with an interactive learning task
- Source and verification area near the end
- No marketing hero or decorative illustration

## Components

- Module sections with tabs for "本质", "怎么判断", "练习"
- Interactive sliders for shortage, price, fixed cost, and holding period
- Checklists for earnings-call evidence
- Layer map for AI infrastructure chain
- Scenario cards with answer reveal
- Decision-replay cards: real dated information first, learner commits a choice, then the expert reasoning and what actually happened
- Derivation strips: key numbers derived on the page from primary data, never asserted
- Source badges separating `已核验`(with source link), `专家判断`(with attribution), and `估算`(with estimator and year); every key number must carry one

## Motion

Use short 160-220ms state transitions for tabs, reveal panels, and score changes. Respect reduced motion with instant state changes.

## Accessibility

Target WCAG AA or better. All interactions must be keyboard reachable. Avoid text overflow, especially in Chinese labels and compact buttons.
