# Design System — Phat.N Portfolio

## 1. Brand Identity
- **Name**: Nguyen Huy Phat — Marketing Creative Professional
- **Personality**: Premium, editorial, tech-forward portfolio
- **Aesthetic**: Dark mode electric — high-contrast accents on deep near-black backgrounds

## 2. Color Tokens

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Canvas/Background | Void Black | `#0a0a0a` | Page backgrounds |
| Surface | Charcoal | `#111111` | Cards, elevated elements |
| Surface Hover | Dark Gray | `#1a1a1a` | Card hover states |
| Elevated | Onyx | `#161616` | Modals, dropdowns |
| Primary Text | Snow | `#e8e8e8` | Headings, body |
| Muted Text | Platinum | `#888888` | Secondary copy |
| Dim Text | Graphite | `#555555` | Subtle labels |
| Primary Accent | Neon Green | `#4ade80` | CTAs, highlights, glow |
| Accent Dim | Green Mist | `#22c55e33` | Accent backgrounds |
| Accent Glow | Green Aura | `#4ade8044` | Glow/shadow effects |
| Secondary Accent | Electric Cyan | `#06b6d4` | Gradient endpoints |
| Border | Slate Line | `#222222` | Default borders |
| Border Hover | Silver Line | `#333333` | Hover borders |

## 3. Typography

| Role | Font | Weight | Notes |
|------|------|--------|-------|
| Headings | Space Grotesk | 600–700 | Tight letter-spacing (-1.5px to -2px) |
| Body | Inter | 400 | Line-height 1.6 |
| Labels | Inter | 500–600 | Uppercase, letter-spacing 2–3px |

## 4. Components

### Buttons
- **Primary**: Solid Neon Green pill, dark text, inner highlight, ambient shadow
- **Ghost**: Frosted glass (backdrop-filter blur 8px), outline border, green tint on hover

### Cards
- Background: Gradient from `#111111` to `rgba(17,17,17,0.7)`
- Border: 1px `#222222`, glows green on hover
- Border-radius: 16px
- Hover: translateY(-4px to -6px), box-shadow, inner glow

### Section Labels
- Green accent dot or dash before text
- Uppercase, small caps, letter-spacing 3px, weight 600

### Tags
- Pill-shaped (border-radius 100px)
- Color-coded by category: Green (expert), Cyan (advanced), Purple (AI)

## 5. Motion & Transitions

| Type | Value |
|------|-------|
| Default easing | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Spring easing | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| Duration | 0.4s standard, 0.6–0.8s for transforms |
| Reveal | Fade-in + translateY(20px) on scroll |

## 6. Design System Notes for Stitch Generation

```
DESIGN SYSTEM (REQUIRED):
- Platform: Web, Desktop-first
- Palette: Neon Green (#4ade80 for accent/CTA), Electric Cyan (#06b6d4 for gradients), Void Black (#0a0a0a for backgrounds), Charcoal (#111111 for surfaces), Snow (#e8e8e8 for text)
- Typography: Space Grotesk (headings, tight letter-spacing), Inter (body, 1.6 line-height)  
- Styles: Softly rounded (16px containers, pill-shaped buttons), Glassmorphism cards with frosted borders
- Depth: Whisper-soft ambient shadows, subtle green glow on hover
- Atmosphere: Electric dark mode, high-contrast, premium editorial feel — think Denis Snellenberg, Bruno Simon, Linear.app
- Shapes: Rounded-xl containers (16px), pill-shaped tags and buttons
- Borders: Thin 1px slate (#222) default, glowing green (#4ade80) on hover
```
