# Cross-Browser Optimization Guidelines

This document outlines key principles, known browser-specific bugs (especially in Firefox and Safari), and best practices for developing consistent, glitch-free UI components across all major web browsers. Please consult these guidelines when building complex layouts, CSS animations, or fluid typography/spacing.

---

## 1. Flexbox & Fluid Widths (`clamp()`, `min()`, `max()`)

### The Firefox `max-content` Bug
**Issue:** When using fluid sizing functions like `clamp()`, `min()`, or `max()` for the `width` or `flex-basis` of a flex item inside a container that has `width: max-content`, Firefox evaluates the width incorrectly. It often uses the absolute maximum bounds (e.g., the upper limit of the `clamp`) to calculate the container's physical width, but renders the actual item at the smaller, computed width. This results in huge phantom gaps and massively distorts `-50%` translational transforms.

**Solution:**
Do not use `clamp()` as the primary `width` or `flex-basis` in `max-content` tracks. Instead, use exact pixel breakpoints or the `min-width` / `max-width` paradigm:

```css
/* ❌ BAD (Breaks Firefox max-content calculation) */
.track { width: max-content; display: flex; }
.card { width: clamp(250px, 20vw, 400px); }

/* ✅ GOOD */
.track { width: max-content; display: flex; }
.card { 
  min-width: clamp(250px, 20vw, 400px);
  max-width: 400px;
  flex: 0 0 auto; 
}
```

---

## 2. Text Truncation & Intrinsic Heights

### The Firefox `-webkit-line-clamp` Height Bug
**Issue:** When using `-webkit-line-clamp` to truncate text inside a flex/grid item, Firefox sometimes calculates the physical intrinsic height of the container based on the **full, unclipped text** (as if it had wrapped to dozens of lines). This causes severe vertical layout shifts and massive empty gaps below elements when the fonts load.

**Solution:**
Never rely purely on `min-height` when using line-clamping in flex/grid items. Always provide an explicit `height` or `max-height` restriction to strictly constrain the browser's box-model calculations.

```css
/* ❌ BAD (Firefox will evaluate height to 500px+ if text is long) */
.card {
  min-height: 150px;
}
.review-text {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

/* ✅ GOOD */
.card {
  min-height: 150px;
  height: 150px; /* Explicit lock prevents height inflation */
}
/* When expanding to show all text, explicitly reset the height */
.card.expanded {
  height: auto; 
}
```

---

## 3. Marquees & Infinite Scrolling

### Seamless Looping Mathematics
When creating CSS-only horizontal marquees (infinite scrolling tracks), standardizing the math across browsers is crucial. If you use CSS `gap` on the track, the gap is not applied *after* the final element. Translating exactly `-50%` will result in a visual "jump" equivalent to half the gap size.

**Solution:**
Manually compensate for the missing trailing gap in your `transform` keyframes using `calc()` and CSS variables.

```css
.track {
  --track-gap: 16px;
  display: flex;
  gap: var(--track-gap);
  width: max-content;
  animation: scroll 20s linear infinite;
}

@keyframes scroll {
  from { transform: translate3d(0, 0, 0); }
  /* Subtract exactly half the gap to align the loop seamlessly */
  to { transform: translate3d(calc(-50% - calc(var(--track-gap) / 2)), 0, 0); }
}
```

---

## 4. Hardware Acceleration Quirks

### `will-change: transform` vs `gap`
**Issue:** Applying `will-change: transform` to a flex container that utilizes the `gap` property can occasionally cause Firefox (and sometimes Safari) to composite the layers incorrectly. This results in the gaps randomly scaling, stretching, or appearing to increase in size independently of the items.

**Solution:**
Avoid `will-change: transform` on complex flex containers with `gap`. Instead, force hardware acceleration (GPU compositing) strictly on the transform property itself by using `translate3d()` instead of `translateX()`.

```css
/* ❌ BAD (Causes gap distortion in Firefox) */
.track {
  gap: 16px;
  will-change: transform;
}
@keyframes slide { to { transform: translateX(-50%); } }

/* ✅ GOOD (Safe hardware acceleration) */
.track {
  gap: 16px;
}
@keyframes slide { to { transform: translate3d(calc(-50% - 8px), 0, 0); } }
```

---

## Summary Checklist for New Components
1. **Fluid Sizes in Flex Tracks:** Always test horizontal tracks with `clamp()` in Firefox. Use `min-width` / `max-width` + `flex: 0 0 auto` instead of bare `width`.
2. **Text Truncation:** Always lock the `height` of the parent element when using `-webkit-line-clamp`.
3. **Marquee Loops:** Use `translate3d()` and mathematically compensate for your flex `gap` using `calc(-50% - (gap/2))`.
4. **Hardware Acceleration:** Prefer `translate3d()` over `will-change` on flex containers.
