# Accessibility Audit & Remediation Log

**Target Compliance:** WCAG 2.2 Level AA  
**Scope:** Movie Detail Page Case Study

## Initial Audit Findings (Hypothetical "Before" State)
If this page were built using standard "div-soup" practices, these common failures would likely exist:

1.  **Failure of WCAG 1.3.1 (Info and Relationships):**
    * *Finding:* The Cast list was implemented as a series of `<div>` tags. Screen readers announced them as plain text, giving users no indication of how many items were in the list or where the list started/ended.
    * *Finding:* The "Play" button was a `div` with an `onClick` event. It was not reachable via the Tab key.

2.  **Failure of WCAG 2.4.1 (Bypass Blocks):**
    * *Finding:* Keyboard users had to tab through 15 navigation links in the header before reaching the "Play" button on every page load.

## Remediation Strategy

### 1. Semantic Structure (Fixing Info and Relationships)
* **Change:** Converted the Cast section from `div`s to a `<ul>`.
* **Why:** Screen readers now announce "List, 3 items" when entering the section. Users can use list navigation shortcuts (like `i` in NVDA) to jump between items.
* **Change:** Wrapped Metadata (Year, Rating) in `<time>` elements and semantic lists.
* **Why:** Ensures machine-readable dates and prevents metadata from running together as a single text string.

### 2. Interactive Elements (Keyboard Access)
* **Change:** Replaced all clickable `div`s with native `<button type="button">` elements.
* **Why:** This automatically provides:
    * Focusability (Tab index).
    * Activation via both `Enter` and `Space` keys.
    * Implicit `role="button"`.

### 3. Navigation Efficiency (Bypass Blocks)
* **Change:** Added a "Skip to main content" link as the first DOM element.
* **Why:** Allows keyboard and switch device users to jump immediately to the `#main-content` container, bypassing the header navigation.

### 4. Visual Focus (Focus Visible)
* **Change:** Implemented `:focus-visible` styles with a high-contrast (White on Red/Black) 3px outline.
* **Why:** Browsers often suppress focus rings on click but show them on keypress. We ensured a custom, highly visible ring always appears for keyboard users, surpassing the minimum contrast ratio requirements.

## Decision Log: ARIA Usage
* **`aria-label` on Nav:** Used to distinguish the primary navigation (`<nav aria-label="Global">`) from potential secondary navs.
* **`aria-hidden="true"` on Icons:** The "Play" and "Plus" icons are decorative. The text inside the button provides the context. Hiding the icons prevents screen readers from announcing "Graphic" or "Unlabeled image" redundantly.
* **No ARIA on Headings:** Native `<h1>` through `<h2>` tags were sufficient. No `role="heading"` was applied.