# High Contrast Mode Testing Guide

## Overview

This guide provides instructions for testing the high contrast mode implementation on KAINET. The high contrast mode ensures WCAG 2.1 AA compliance with minimum 7:1 contrast ratios and enhanced visibility for users with visual impairments.

## Prerequisites

- Development server running (`npm run dev`)
- Access to system settings to enable high contrast mode
- Browser DevTools for manual testing

---

## Testing on macOS

### Enable High Contrast Mode

1. Open **System Settings** (or System Preferences on older macOS)
2. Navigate to **Accessibility** → **Display**
3. Enable **Increase Contrast**
4. Optionally enable **Reduce Transparency** for additional testing

### What to Verify

✅ **Color Contrast**
- All text should have enhanced contrast (white on black)
- Cyan color should be brighter (#00FFFF instead of #00E5FF)
- Purple accent should be more vibrant (#CC66FF)

✅ **Border Visibility**
- All interactive elements (buttons, links, cards) should have 2px borders
- Focus states should have 4px outlines with cyan color
- Cards should have visible borders even when not hovered

✅ **Effects Disabled**
- Glitch effects should be completely disabled
- Holographic shimmer should not appear on cards
- Scanning lines should be hidden
- Kanji particles should be invisible (opacity: 0)
- Circuit lines should be hidden

✅ **Interactive Elements**
- Buttons should have clear borders and high contrast backgrounds
- Links should be underlined with 2px thickness
- Form inputs should have visible borders and high contrast

✅ **Text Selection**
- Selected text should have cyan background with black text
- Selection should be clearly visible

### Disable High Contrast Mode

1. Return to **System Settings** → **Accessibility** → **Display**
2. Disable **Increase Contrast**
3. Verify site returns to normal appearance

---

## Testing on Windows

### Enable High Contrast Mode

1. Press **Windows Key + U** to open Ease of Access settings
2. Select **High Contrast** from the left menu
3. Toggle **Turn on high contrast** to ON
4. Choose a high contrast theme (e.g., "High Contrast Black")
5. Click **Apply**

### What to Verify

✅ **Color Contrast**
- All text should be white (#FFFFFF) on black (#000000)
- Interactive elements should use system high contrast colors
- Cyan accents should be bright and visible

✅ **Border Visibility**
- All buttons, links, and cards should have thick borders (2-3px)
- Focus indicators should be 4px with cyan color
- Dividers and separators should be clearly visible

✅ **Effects Disabled**
- No glitch animations on text
- No holographic effects on cards
- No scanning lines
- No parallax scrolling
- No motion blur

✅ **Interactive Elements**
- Buttons should have clear visual states (default, hover, focus, active)
- Links should be underlined and change on hover
- Form elements should have visible borders and clear focus states

✅ **Navigation**
- Navbar should have clear bottom border
- Footer should have clear top border
- All navigation links should be easily identifiable

### Disable High Contrast Mode

1. Press **Windows Key + U**
2. Toggle **Turn on high contrast** to OFF
3. Verify site returns to normal appearance

---

## Browser DevTools Testing

### Emulate High Contrast Mode

**Chrome/Edge:**
1. Open DevTools (F12)
2. Press `Ctrl+Shift+P` (Windows) or `Cmd+Shift+P` (Mac)
3. Type "Rendering" and select "Show Rendering"
4. Scroll to "Emulate CSS media feature prefers-contrast"
5. Select "more" from dropdown

**Firefox:**
1. Open DevTools (F12)
2. Go to Settings (gear icon)
3. Under "Advanced settings", find "Enable browser chrome and add-on debugging toolboxes"
4. In the console, type: `matchMedia('(prefers-contrast: high)').matches`
5. Should return `true` when high contrast is enabled

### Manual CSS Testing

You can also manually test by adding this to the browser console:

```javascript
// Force high contrast mode
document.documentElement.style.setProperty('--cyan-neon', '#00FFFF');
document.documentElement.style.setProperty('--text-primary', '#FFFFFF');
document.documentElement.style.setProperty('--black-base', '#000000');

// Disable effects
document.querySelectorAll('.glitch-effect, [class*="glitch"]').forEach(el => {
  el.style.animation = 'none';
  el.style.textShadow = 'none';
});

document.querySelectorAll('.holographic-overlay, [class*="holographic"]').forEach(el => {
  el.style.display = 'none';
});
```

---

## Comprehensive Test Checklist

### Visual Elements

- [ ] **Text Contrast**: All text has minimum 7:1 contrast ratio
- [ ] **Headings**: All headings are clearly visible with enhanced contrast
- [ ] **Body Text**: Paragraph text is white on black background
- [ ] **Links**: Links are underlined and have sufficient contrast
- [ ] **Buttons**: Buttons have clear borders and high contrast colors
- [ ] **Cards**: Cards have visible borders and enhanced backgrounds
- [ ] **Icons**: Icons have sufficient contrast and are clearly visible
- [ ] **Images**: Images maintain visibility (contrast filter applied)

### Interactive Elements

- [ ] **Button Hover**: Buttons change to cyan background on hover
- [ ] **Button Focus**: Buttons have 4px cyan outline on focus
- [ ] **Link Hover**: Links have thicker underline and background on hover
- [ ] **Link Focus**: Links have 4px cyan outline on focus
- [ ] **Card Hover**: Cards have cyan border on hover
- [ ] **Form Focus**: Form inputs have cyan border on focus
- [ ] **Tab Navigation**: All interactive elements are reachable via Tab key
- [ ] **Focus Indicators**: Focus indicators are always visible

### Effects Disabled

- [ ] **Glitch Text**: No glitch animation on logo or headings
- [ ] **Holographic Cards**: No holographic shimmer on project cards
- [ ] **Scanning Lines**: No scanning line animation
- [ ] **Kanji Particles**: Background kanji particles are invisible
- [ ] **Circuit Lines**: Decorative circuit lines are hidden
- [ ] **Parallax**: No parallax scrolling effects
- [ ] **Motion Blur**: No blur effects during transitions
- [ ] **Page Transitions**: Simplified fade transitions (no wipe effect)

### Layout & Structure

- [ ] **Navbar**: Clear bottom border, high contrast background
- [ ] **Footer**: Clear top border, high contrast background
- [ ] **Sections**: Clear separation between sections
- [ ] **Dividers**: Horizontal rules are clearly visible (2px)
- [ ] **Spacing**: Adequate spacing maintained
- [ ] **Grid Layout**: Layout remains intact

### Forms & Inputs

- [ ] **Input Borders**: All inputs have 2px borders
- [ ] **Input Focus**: Inputs have cyan border on focus
- [ ] **Input Text**: Input text is white on dark background
- [ ] **Placeholder Text**: Placeholder text has sufficient contrast
- [ ] **Error States**: Error messages are clearly visible in red
- [ ] **Success States**: Success messages are clearly visible in green
- [ ] **Labels**: Form labels have high contrast

### Special Components

- [ ] **Badges**: Badges have 2px borders and bold text
- [ ] **Tooltips**: Tooltips have clear borders and high contrast
- [ ] **Modals**: Modals have 3px cyan borders
- [ ] **Loaders**: Loading indicators have thicker borders (3px)
- [ ] **Code Blocks**: Code blocks have clear borders and high contrast
- [ ] **Tables**: Tables have visible borders and clear headers
- [ ] **Blockquotes**: Blockquotes are clearly distinguished

### Accessibility

- [ ] **Keyboard Navigation**: All interactive elements accessible via keyboard
- [ ] **Focus Order**: Logical tab order maintained
- [ ] **Screen Reader**: No decorative elements announced
- [ ] **ARIA Labels**: Interactive elements have proper labels
- [ ] **Skip Links**: Skip to content link works properly
- [ ] **Color Independence**: Information not conveyed by color alone

### Performance

- [ ] **Page Load**: Page loads without errors
- [ ] **No Console Errors**: No JavaScript errors in console
- [ ] **Smooth Transitions**: Transitions between states are smooth
- [ ] **No Layout Shift**: No unexpected layout shifts
- [ ] **Responsive**: High contrast works on all screen sizes

---

## Common Issues & Solutions

### Issue: Effects Still Visible

**Solution**: Check that the CSS media query is properly applied:
```css
@media (prefers-contrast: high) {
  .glitch-effect { animation: none !important; }
}
```

### Issue: Insufficient Contrast

**Solution**: Verify color values in variables.css:
```css
--cyan-neon: #00FFFF;  /* Should be bright cyan */
--text-primary: #FFFFFF;  /* Should be pure white */
--black-base: #000000;  /* Should be pure black */
```

### Issue: Borders Not Visible

**Solution**: Check border width overrides:
```css
button, a, .card {
  border-width: 2px !important;
  border-style: solid !important;
}
```

### Issue: Focus Indicators Not Visible

**Solution**: Ensure focus styles have high specificity:
```css
*:focus-visible {
  outline: 4px solid var(--cyan-neon) !important;
  outline-offset: 4px !important;
}
```

---

## Automated Testing

### Contrast Ratio Checker

Use browser extensions or online tools:
- **Chrome**: Lighthouse accessibility audit
- **Firefox**: Accessibility Inspector
- **Online**: WebAIM Contrast Checker (https://webaim.org/resources/contrastchecker/)

### Target Ratios

- **Normal Text**: Minimum 7:1 (AAA level)
- **Large Text**: Minimum 4.5:1 (AA level)
- **UI Components**: Minimum 3:1

### Example Test

```javascript
// Check contrast ratio for a specific element
const element = document.querySelector('.btn-kainet');
const styles = getComputedStyle(element);
const bgColor = styles.backgroundColor;
const textColor = styles.color;

console.log('Background:', bgColor);
console.log('Text:', textColor);
// Use contrast checker tool to verify ratio
```

---

## Reporting Issues

If you find any issues during testing, please document:

1. **Issue Description**: What's wrong?
2. **Steps to Reproduce**: How to trigger the issue?
3. **Expected Behavior**: What should happen?
4. **Actual Behavior**: What actually happens?
5. **Screenshots**: Visual evidence of the issue
6. **Environment**: OS, browser, version
7. **Severity**: Critical, High, Medium, Low

---

## Success Criteria

High contrast mode is considered successful when:

✅ All text has minimum 7:1 contrast ratio
✅ All interactive elements have visible borders (2px+)
✅ All focus indicators are clearly visible (4px outline)
✅ All decorative effects are disabled
✅ All subtle animations are removed
✅ Navigation and layout remain functional
✅ No console errors or warnings
✅ Works on both macOS and Windows
✅ Works in all supported browsers (Chrome, Firefox, Safari, Edge)
✅ Passes WCAG 2.1 AA compliance

---

## Additional Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN: prefers-contrast](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Chrome DevTools Accessibility](https://developer.chrome.com/docs/devtools/accessibility/)
- [Windows High Contrast Mode](https://support.microsoft.com/en-us/windows/change-color-contrast-in-windows-fedc744c-90ac-69df-aed5-c8a90125e696)
- [macOS Accessibility Display](https://support.apple.com/guide/mac-help/change-accessibility-display-options-unac089/mac)
