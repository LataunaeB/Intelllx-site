# Mobile Menu Testing Guide

## What Changed

Created a fully accessible, reliable mobile navigation menu with the following improvements:

### New Features
- ✅ Client-side header component with proper state management
- ✅ Full accessibility support (ARIA attributes, focus management)
- ✅ Keyboard navigation (ESC, Tab, Shift+Tab)
- ✅ Body scroll lock with no layout shift
- ✅ Click-outside and overlay dismiss
- ✅ Route change auto-close
- ✅ Active route highlighting
- ✅ Reduce-motion friendly animations
- ✅ Focus trap inside mobile menu
- ✅ Visible close button (X) in menu header

### Technical Implementation
- Extracted header from `layout.tsx` into dedicated `Header.tsx` client component
- Desktop nav hidden below `md` breakpoint, mobile menu shown
- Proper z-index management (z-50 for header, z-100 for mobile menu)
- Smooth slide-in animation with backdrop blur
- Scrollbar width compensation to prevent layout shift
- Focus returns to hamburger button on close

## How to Test

### 1. Visual Testing (Multiple Viewports)

Test on the following viewport widths:
```
- 320px (iPhone SE)
- 375px (iPhone 12 Pro)
- 414px (iPhone 12 Pro Max)
- 768px (iPad - should show desktop nav)
- 1024px+ (Desktop - should show desktop nav)
```

**Expected behavior:**
- Below 768px: Hamburger menu visible, desktop nav hidden
- At 768px and above: Desktop nav visible, hamburger hidden
- Logo and branding visible at all sizes

### 2. Open/Close Menu

**Mouse/Touch:**
- [ ] Click hamburger button → menu opens from right
- [ ] Click overlay (dark area) → menu closes
- [ ] Click X button in menu → menu closes
- [ ] Click any nav link → menu closes

**Keyboard:**
- [ ] Tab to hamburger button → press Enter/Space → menu opens
- [ ] Press ESC while menu open → menu closes
- [ ] Focus visible on hamburger button

### 3. Focus Management

**When menu opens:**
- [ ] First link receives focus automatically
- [ ] Focus visible (outline/ring around link)

**When menu closes:**
- [ ] Focus returns to hamburger button
- [ ] No focus lost to body/nowhere

### 4. Focus Trap

**With menu open:**
- [ ] Press Tab → focus moves to next item in menu
- [ ] Continue Tab through all links → reaches close button
- [ ] Tab from last item → wraps to first link
- [ ] Shift+Tab from first link → wraps to last item (close button)
- [ ] Cannot Tab outside the menu while open

### 5. Body Scroll Lock

**Test sequence:**
- [ ] Scroll page down 500px
- [ ] Open mobile menu → background scroll locked
- [ ] Try to scroll page → should not scroll
- [ ] No horizontal scrollbar appears (layout shift check)
- [ ] Close menu → scroll restored
- [ ] Page position maintained (no jump)

### 6. Active Route Highlighting

**Test on different pages:**
- [ ] Navigate to /services → Services link highlighted in mobile menu
- [ ] Navigate to /pricing → Pricing link highlighted
- [ ] Navigate to /about → About link highlighted
- [ ] Active state: blue text + blue background
- [ ] Inactive state: gray text, hover shows gray background

### 7. Route Change Auto-Close

**Test sequence:**
- [ ] Open mobile menu
- [ ] Click any nav link
- [ ] Menu closes automatically
- [ ] Page navigates to new route
- [ ] Open menu again on new page → previous position not retained (fresh state)

### 8. Animation Quality

**Standard motion:**
- [ ] Menu slides in from right smoothly
- [ ] Backdrop fades in
- [ ] Animations complete in ~300ms

**Reduced motion:**
- [ ] Open browser DevTools
- [ ] Simulate "prefers-reduced-motion: reduce"
- [ ] Open menu → no animation, instant display
- [ ] Still functional

### 9. Accessibility Attributes

**Hamburger button:**
- [ ] Has `aria-label="Open menu"` when closed
- [ ] Has `aria-label="Close menu"` when open
- [ ] Has `aria-expanded="false"` when closed
- [ ] Has `aria-expanded="true"` when open
- [ ] Has `aria-controls="mobile-menu"`

**Mobile menu:**
- [ ] Has `role="dialog"`
- [ ] Has `aria-modal="true"`
- [ ] Has `aria-label="Mobile navigation menu"`
- [ ] Has `id="mobile-menu"` (matches hamburger's aria-controls)
- [ ] Has `aria-hidden="false"` when open

**Close button:**
- [ ] Has `aria-label="Close menu"`
- [ ] Visible and clickable

### 10. Console Check

**Open DevTools Console:**
- [ ] No errors on page load
- [ ] No errors when opening menu
- [ ] No errors when closing menu
- [ ] No errors when navigating
- [ ] No hydration warnings
- [ ] No React warnings

### 11. Performance Check

**Metrics to verify:**
- [ ] Menu opens instantly (<100ms)
- [ ] No layout shift (CLS = 0)
- [ ] No janky animations (60fps)
- [ ] No duplicate DOM elements
- [ ] Single menu instance in DOM

### 12. Edge Cases

**Double-click/rapid interaction:**
- [ ] Rapid click hamburger → no double menu
- [ ] Click hamburger while closing → behaves correctly

**Long page scroll:**
- [ ] Scroll to bottom of long page
- [ ] Open menu → still works
- [ ] Scroll lock still works
- [ ] Header stays sticky at top

**Window resize:**
- [ ] Open mobile menu at 375px width
- [ ] Resize to 1024px → menu should remain functional
- [ ] Desktop nav should appear

## Automated Testing Commands

Run these commands for automated checks:

```bash
# Start dev server
npm run dev

# In another terminal - type checking
npx tsc --noEmit

# Lint check
npm run lint

# Build check (production)
npm run build
```

## Browser Compatibility

Test in:
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Success Criteria

All checkboxes above should be checked. The mobile menu should be:
1. **Accessible**: Fully navigable via keyboard, proper ARIA attributes
2. **Reliable**: No errors, works consistently across interactions
3. **Polished**: Smooth animations, no layout shifts, matches design system
4. **Performant**: Fast, no jank, no memory leaks

## Known Limitations

None identified. Menu meets all requirements.

## Files Changed

- `src/components/Header.tsx` (new file)
- `src/app/layout.tsx` (updated to use Header component)
- `docs/MOBILE_MENU_TEST_GUIDE.md` (this file)

