
# Color Palette Overhaul - Affrica.com Style

## Overview
Update the color scheme to match the sophisticated, modern look of affrica.com with a darker background and bright cyan accent instead of the current gold-heavy theme.

## Color Changes

### New Color Palette
| Element | Current | New (Affrica Style) |
|---------|---------|---------------------|
| Background | Dark blue-gray `hsl(220 20% 6%)` | Darker charcoal `hsl(220 15% 8%)` |
| Card | `hsl(220 18% 10%)` | Slightly lighter `hsl(220 15% 11%)` |
| Primary (buttons) | Gold `hsl(45 100% 50%)` | Cyan `hsl(168 100% 45%)` |
| Secondary | Amber `hsl(35 100% 45%)` | Gold accent `hsl(45 90% 55%)` |
| Text | Warm off-white | Neutral white `hsl(0 0% 96%)` |
| Muted text | Blue-gray | Neutral gray `hsl(220 8% 55%)` |
| Borders | Warm tinted | Neutral dark `hsl(220 10% 18%)` |

### Accent Strategy
- **Cyan** for CTAs, buttons, and interactive elements (like affrica's "LET'S GET RICA!")
- **Gold** reserved for premium decorative highlights (sparingly used)

## Files to Modify

### 1. `src/index.css`
- Update all CSS custom properties with new color values
- Change gradient definitions to use cyan as primary
- Reduce glow intensity significantly
- Update `.text-gradient-gold` to `.text-gradient-cyan` styling

### 2. `tailwind.config.ts`
- Rename `cyan` color to match actual cyan values
- Update color token references

### 3. `src/components/ui/button.tsx`
- Update `hero` variant to use proper cyan colors
- Reduce shadow intensity for cleaner look

### 4. `src/components/HeroSection.tsx`
- Tone down animated glow orbs
- Update gradient badge styling

### 5. `src/components/GlowCard.tsx`
- Reduce glow intensity
- Update hover effects to use cyan

### 6. Component Updates (minimal text changes)
- `AboutSection.tsx` - Update gradient text class
- `DealsSection.tsx` - Update gradient text class
- `WhyUsSection.tsx` - Already uses `text-gradient-cyan`
- `CTASection.tsx` - Update gradient text class
- `Header.tsx` - Update logo gradient
- `Footer.tsx` - Update logo gradient

### 7. `src/components/FloatingParticles.tsx`
- Update particle colors to subtle cyan
- Reduce opacity for subtlety

## Key Design Principles
1. **Less is more** - Remove excessive glows and gradients
2. **Single accent color** - Cyan dominates, gold is decorative only
3. **Darker, richer background** - More premium feel
4. **Cleaner typography** - Neutral white instead of warm tints

## Technical Details

### Updated CSS Variables (src/index.css)
```css
:root {
  --background: 220 15% 8%;
  --foreground: 0 0% 96%;
  --card: 220 15% 11%;
  --primary: 168 100% 45%;  /* Cyan */
  --secondary: 45 90% 55%;   /* Gold for accents */
  --muted-foreground: 220 8% 55%;
  --border: 220 10% 18%;
  --cyan: 168 100% 45%;
  --cyan-light: 168 85% 55%;
  --gold: 45 90% 55%;
}
```

### Updated Gradient Classes
```css
.text-gradient-cyan {
  background-image: linear-gradient(135deg, hsl(168 100% 50%), hsl(168 80% 40%));
}

.glow-cyan {
  box-shadow: 0 0 30px hsl(168 100% 45% / 0.25);
}
```

## Visual Impact
- Buttons will have a vibrant cyan pop (matching affrica's CTAs)
- Headlines will use cyan gradients instead of gold
- Cards will have subtle cyan glow on hover
- Overall aesthetic will feel more modern and less "template-like"
