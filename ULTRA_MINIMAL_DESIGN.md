# Ultra-Minimal Design v3.0

## Philosophy
Google Translate-inspired: **Flat. Monochrome. Monospace. Functional.**

---

## Design Principles

### 1. **Extreme Minimalism**
- NO shadows
- NO gradients
- NO rounded corners (except buttons)
- NO icons (except essential: →, ×, ⚙, ⟳)
- NO decorative elements
- Pure function over form

### 2. **Monochrome + Vivid Green**
**Light Mode:**
- Background: #ffffff (pure white)
- Surface: #f5f5f5 (light gray)
- Border: #e0e0e0 (gray)
- Text: #000000 (pure black)
- Accent: #00ff88 (vivid light green)

**Dark Mode:** (auto-detected)
- Background: #000000 (pure black)
- Surface: #0a0a0a (near black)
- Border: #1a1a1a (dark gray)
- Text: #ffffff (pure white)
- Accent: #00ff88 (vivid light green)

### 3. **Monospace Typography**
- Font: JetBrains Mono (professional coding font)
- Bengali: Noto Sans Bengali
- ALL CAPS for labels
- Letter-spacing: 1-2px for readability

### 4. **Flat Design**
- 1px borders everywhere
- No box-shadows
- No depth cues
- Grid-based layout
- Clear visual separators

---

## Key Components

### Modal
```
Simple centered box
1px borders
White/black background
Minimal inputs
Grid button layout
```

### Header
```
Logo text (no icon)
1px bottom border
Settings gear (text: ⚙)
Monospace, uppercase
```

### Translator
```
3-column grid (desktop)
Input | Button | Output
1px borders on panels
Flat textarea/output
Minimal headers
Simple footer
```

### Translate Button
```
64x64px square
Green background (#00ff88)
→ arrow symbol
Center aligned
No animation
```

### Settings
```
Collapsible details
1px borders
Grid layout
Simple range slider
Checkbox toggles (no fancy switches)
All caps labels
```

### Footer
```
1px top border
Centered text
Monospace
Links with underline on hover
```

---

## Free Models (Defaults)

**Best Free Options:**
1. **Trinity Large Preview** - 400B MoE, 128K context (DEFAULT)
2. **Solar Pro 3** - 102B MoE, multilingual
3. **LFM 1.2B Thinking** - Lightweight reasoning
4. **LFM 1.2B Instruct** - Fast edge model
5. **Gemini 2.0 Flash** - Google free tier

**Model Display Format:**
```
[MODEL NAME] [BADGE]
Trinity Large 400B [FREE]
Claude 3.5 Sonnet [PAID]
```

---

## Color Usage

### Primary: Vivid Green (#00ff88)
- Translate button background
- Primary CTA button
- Success states
- Focus outlines
- Selection background
- Links on hover

### Black/White
- Text (switches in dark mode)
- Backgrounds (switches in dark mode)
- Buttons (switches in dark mode)

### Grays
- Borders (subtle)
- Secondary text
- Disabled states
- Surface backgrounds

---

## Typography Scale

```
Logo: 16px, 700, 1px spacing
Labels: 11px, 700, 1.5px spacing (UPPERCASE)
Input: 13px, 400
Body: 14px, 400
Meta: 11px, 400
Footer: 11px, 400
```

---

## Layout Structure

### Desktop
```
┌─────────────────────────────────┐
│ HEADER                          │
├─────────────────────────────────┤
│                                 │
│ ┌──────┐   ┌───┐   ┌──────┐   │
│ │INPUT │ → │ → │ → │OUTPUT│   │
│ └──────┘   └───┘   └──────┘   │
│                                 │
│ [ADVANCED ▼]                    │
│                                 │
├─────────────────────────────────┤
│ FOOTER                          │
└─────────────────────────────────┘
```

### Mobile
```
┌─────────────┐
│ HEADER      │
├─────────────┤
│             │
│  ┌───────┐  │
│  │   →   │  │
│  └───────┘  │
│             │
│  ┌───────┐  │
│  │ INPUT │  │
│  └───────┘  │
│             │
│  ┌───────┐  │
│  │OUTPUT │  │
│  └───────┘  │
│             │
│ [ADVANCED]  │
│             │
├─────────────┤
│ FOOTER      │
└─────────────┘
```

---

## Responsive Behavior

**Breakpoint: 768px**

Desktop (>768px):
- 3-column translator grid
- Side-by-side panels
- Full button visible

Mobile (≤768px):
- Single column stack
- Button moves to top
- Full-width elements
- Footer stacks vertically

---

## Auto Dark Mode

Uses CSS `@media (prefers-color-scheme: dark)`:
- Automatically detects system preference
- No toggle needed
- Seamless transition
- Same accent color (green works in both)

---

## Interactions

### Hover States
- Buttons: Border darkens
- Links: Color changes to green
- Text buttons: Opacity change

### Focus States
- 2px green outline
- 2px offset
- No shadow

### Active States
- No special effect
- Same as hover

### Disabled States
- 30% opacity
- Gray out
- Not allowed cursor

---

## Animations

**NONE.** Completely static. Only CSS transitions:
- 0.2s ease for hovers
- 0.2s ease for color changes
- 1s linear for spinner rotation

No slide-ins, no fades, no bounces.

---

## Icons/Symbols Used

```
→ (U+2192)  - Translate button
× (U+00D7)  - Close/Clear
⚙ (U+2699)  - Settings
⟳ (U+27F3)  - Loading spinner
↗ (U+2197)  - External link
✓ (U+2713)  - Success/Copied
```

---

## File Size

**Total Bundle:**
- HTML: ~3 KB
- CSS: ~7 KB
- JS: ~12 KB
- **Total: ~22 KB** (uncompressed)
- **Gzipped: ~8 KB**

Fonts loaded from Google CDN (cached).

---

## Browser Support

✅ All modern browsers (2020+)
✅ Chrome/Edge/Firefox/Safari
✅ Mobile iOS/Android
✅ Dark mode auto-detect

---

## Accessibility

- High contrast (black/white)
- Large click targets (44px min)
- Keyboard navigation
- Focus indicators
- ARIA-friendly structure
- Screen reader compatible

---

## Comparison: v2.0 → v3.0

| Feature | v2.0 Modern | v3.0 Minimal |
|---------|-------------|--------------|
| **Font** | Inter (sans) | JetBrains Mono |
| **Colors** | Multi-color | Monochrome + green |
| **Shadows** | Yes (5 levels) | No |
| **Icons** | Remix Icon lib | Unicode symbols |
| **Borders** | Rounded 12-16px | Flat 1px |
| **Animations** | Many | None |
| **Size** | 45 KB | 22 KB |
| **Style** | Apple/Vercel | Google Translate |

---

## Philosophy Statement

> "Remove everything that is not essential. What remains is pure function. The interface disappears, leaving only the task."

This design prioritizes:
1. Speed (minimal CSS/HTML)
2. Clarity (monochrome focus)
3. Accessibility (high contrast)
4. Functionality (no decoration)
5. Universality (works everywhere)

---

## Inspirations

- Google Translate (layout)
- GitHub (monochrome)
- Terminal UIs (monospace)
- Unix philosophy (do one thing well)
- Swiss design (grid, typography)

---

**Result:** A brutally minimal, highly functional interface that loads instantly and works perfectly on any device in any lighting condition.
