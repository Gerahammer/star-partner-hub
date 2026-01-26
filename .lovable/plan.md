
# Lighten the Overall Site Theme

## Problem
The current color scheme uses very dark backgrounds (8-11% lightness) which makes the site feel too dark and hard to read. After the affrica.com-inspired overhaul, the site needs better contrast and a more balanced feel.

## Solution Overview
Lighten the background, card, and muted colors while keeping the cyan and gold accents intact. This will improve readability and give the site a more polished, professional appearance without losing the premium dark theme aesthetic.

## Color Adjustments

| Element | Current Value | New Value | Change |
|---------|--------------|-----------|--------|
| Background | `220 15% 8%` | `220 15% 12%` | +4% lightness |
| Card | `220 15% 11%` | `220 15% 16%` | +5% lightness |
| Muted | `220 12% 16%` | `220 12% 22%` | +6% lightness |
| Border | `220 10% 18%` | `220 10% 24%` | +6% lightness |
| Input | `220 10% 18%` | `220 10% 24%` | +6% lightness |
| Muted Foreground | `220 8% 55%` | `220 8% 60%` | +5% lightness |

## Files to Modify

### 1. `src/index.css`
Update CSS custom properties in the `:root` selector:
- Increase background lightness from 8% to 12%
- Increase card lightness from 11% to 16%
- Increase muted/border lightness proportionally
- Update gradient definitions to use the new lighter values
- Adjust the `.card-premium` class background gradients

### 2. `src/components/WhyUsSection.tsx`
- Update the `bg-card/50` class to ensure proper contrast with the new lighter card color

### 3. `src/components/Footer.tsx`
- Ensure `bg-card/50` provides good contrast with the lighter theme

### 4. `src/components/TestimonialsSection.tsx`
- The section uses `from-background to-muted/20` gradient - will automatically benefit from the lighter colors

## Visual Impact
- Overall site will feel more balanced and less "cave-like"
- Text will have better contrast against backgrounds
- Cards will stand out more clearly from the page background
- The cyan and gold accents will pop more effectively against the lighter base
- Maintains the dark/premium aesthetic while being more comfortable to view

## Technical Details

The core changes in `src/index.css`:

```css
:root {
  --background: 220 15% 12%;        /* Was 8% */
  --card: 220 15% 16%;              /* Was 11% */
  --muted: 220 12% 22%;             /* Was 16% */
  --muted-foreground: 220 8% 60%;   /* Was 55% */
  --border: 220 10% 24%;            /* Was 18% */
  --input: 220 10% 24%;             /* Was 18% */
  
  /* Updated gradients */
  --gradient-dark: linear-gradient(180deg, hsl(220 15% 14%) 0%, hsl(220 15% 10%) 100%);
  --gradient-card: linear-gradient(145deg, hsl(220 15% 18%) 0%, hsl(220 15% 14%) 100%);
}

.card-premium {
  background: linear-gradient(145deg, hsl(220 15% 18%) 0%, hsl(220 15% 14%) 100%);
  border: 1px solid hsl(220 10% 24%);
}
```

The foreground text color remains `0 0% 96%` (near white) for maximum contrast.
