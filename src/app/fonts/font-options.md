# Font Options for Vanda Project

## Quick Font Selection Guide

### Current Font: Gafata
```css
fontFamily: "'Gafata', cursive"
fontWeight: "font-thin"
```
- **Style**: Clean, modern sans-serif
- **Best for**: Professional, readable text
- **Usage**: All text elements, headings, body text

### Alternative Fonts Available:

#### 1. Waterfall (Original)
```css
fontFamily: "'Waterfall', cursive"
fontWeight: "font-thin"
```
- **Style**: Elegant cursive
- **Best for**: Artistic, flowing text
- **Usage**: Main headings, logo

#### 2. Playwrite Australia SA
```css
fontFamily: "'Playwrite Australia SA', cursive"
fontWeight: "font-thin"
```
- **Style**: Handwriting style
- **Best for**: Personal, friendly text
- **Usage**: Contact forms, casual text

#### 3. Edu TAS Beginner
```css
fontFamily: "'Edu TAS Beginner', cursive"
fontWeight: "font-thin"
```
- **Style**: Educational handwriting
- **Best for**: Learning, educational content
- **Usage**: Instructions, educational text

#### 4. Carattere
```css
fontFamily: "'Carattere', cursive"
fontWeight: "font-thin"
```
- **Style**: Italian handwriting
- **Best for**: Elegant, sophisticated text
- **Usage**: Formal content, artistic text

#### 5. Dancing Script (Available in layout)
```css
fontFamily: "'Dancing Script', cursive"
fontWeight: "font-thin"
```
- **Style**: Flowing script
- **Best for**: Decorative text
- **Usage**: Special headings, decorative elements

## How to Change Font

### Step 1: Update Google Fonts Import
In `src/app/layout.tsx`, change the import:
```html
<link 
  href="https://fonts.googleapis.com/css2?family=NEW_FONT_NAME&display=swap" 
  rel="stylesheet" 
/>
```

### Step 2: Update All Components
Replace all instances of:
```css
fontFamily: "'Gafata', cursive"
```
with:
```css
fontFamily: "'NEW_FONT_NAME', cursive"
```

### Step 3: Test Font Weight
Adjust font weight if needed:
- `font-thin` (current)
- `font-light`
- `font-normal`
- `font-medium`

## Files to Update When Changing Font
1. `src/app/page.tsx`
2. `src/components/VandaLogo.tsx`
3. `src/components/HorizontalAlbum.tsx`
4. `src/components/Navigation.tsx`
5. `src/components/Header.tsx`
6. `src/app/gallery/page.tsx`
7. `src/app/virtual-pantam/page.tsx`
8. `src/app/layout.tsx` (for import)
