# Fonts Used in Vanda Project

## Currently Active Font
- **Gafata** - Currently being used throughout the project
  - Imported in `layout.tsx` via Google Fonts
  - Used in all components with `fontFamily: "'Gafata', cursive"`
  - Font weight: `font-thin`
  - Style: Clean, modern sans-serif
  - Best for: Professional, readable text

## Previously Used Fonts (in chronological order)

### 1. Waterfall (Original)
- First font used in the project
- Cursive style font
- Used for main text elements

### 2. Playwrite Australia SA
- Second font we tried
- Handwriting style font
- Replaced Waterfall

### 3. Edu TAS Beginner
- Third font we tried
- Educational handwriting font
- Replaced Playwrite Australia SA

### 4. Carattere
- Fourth font we tried
- Italian handwriting style font
- Replaced Edu TAS Beginner

## Available Fonts in Layout

### Google Fonts (Imported)
- **Geist** - Default Next.js font (variable: --font-geist-sans)
- **Geist_Mono** - Default Next.js monospace font (variable: --font-geist-mono)
- **Dancing_Script** - Imported but not currently used (variable: --font-dancing)

## Font Usage Locations

### Main Components
- `src/app/page.tsx` - Welcome text
- `src/components/VandaLogo.tsx` - Logo text
- `src/components/HorizontalAlbum.tsx` - Contact form
- `src/components/Navigation.tsx` - Navigation elements
- `src/components/Header.tsx` - Header text

### Pages
- `src/app/gallery/page.tsx` - Gallery page text
- `src/app/virtual-pantam/page.tsx` - Virtual Pantam page text
- `src/app/order/page.tsx` - Order page text

## Current Font Weight
- All text elements use `font-thin` for a lighter appearance

## Font Import Location
- Google Fonts import: `src/app/layout.tsx`
- Current import: `https://fonts.googleapis.com/css2?family=Gafata&display=swap`

## Notes
- All fonts are set to `cursive` fallback
- Font weight has been optimized to `font-thin` for better appearance
- Fonts are applied consistently across all components
