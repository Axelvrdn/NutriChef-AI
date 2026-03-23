# Design System Strategy: The Digital Apothecary

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Digital Apothecary."** 

Unlike traditional fitness apps that rely on high-intensity colors and rigid, data-heavy grids, this system treats meal planning as a ritual of wellness. We move beyond the "template" look by embracing **Intentional Asymmetry** and **Tonal Depth**. The goal is to make the user feel as though they are browsing a high-end lifestyle editorial rather than a utility tool. We achieve this by prioritizing expansive white space (using the upper end of our Spacing Scale) and allowing elements to breathe, overlap, and flow organically.

## 2. Colors & Surface Philosophy
The palette is rooted in organic serenity, using a sophisticated "Tone-on-Tone" approach to define hierarchy.

*   **Primary (`#4c644f` - Sage):** Reserved for growth, health, and primary actions.
*   **Surface & Background (`#fbf9f5` - Warm Cream):** Our canvas. It should feel like high-quality, uncoated paper.
*   **On-Surface (`#30332e` - Charcoal):** A soft, breathable dark that avoids the "vibration" of pure black.

### The "No-Line" Rule
**Explicit Instruction:** 1px solid borders for sectioning are strictly prohibited. Structure must be defined through background color shifts. For example, a `surface-container-low` section sitting on a `surface` background creates a boundary that is felt, not seen.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the `surface-container` tiers to create "nested" depth. 
*   **Base:** `surface` (#fbf9f5)
*   **Sectioning:** `surface-container-low` (#f5f4ef)
*   **Interactive Cards:** `surface-container-lowest` (#ffffff) to create a subtle "pop" against the cream background.

### The "Glass & Signature Texture" Rule
To elevate the experience, use **Glassmorphism** for floating navigation bars or overlays. Use `surface_bright` at 80% opacity with a `20px` backdrop blur. For primary Call-to-Actions (CTAs), apply a subtle linear gradient from `primary` (#4c644f) to `primary_dim` (#405843) at a 145-degree angle to provide a tactile, premium finish.

## 3. Typography: Editorial Sophistication
We utilize a dual-font system to balance authority with approachable warmth.

*   **Display & Headlines (Manrope):** Chosen for its geometric purity and modern proportions. Use `display-lg` (3.5rem) with tight letter-spacing (-0.02em) for hero headlines to create an editorial impact.
*   **Body & Labels (Plus Jakarta Sans):** A highly legible sans-serif with a friendly personality. 
*   **The Contrast Rule:** Pair a `headline-lg` in Charcoal (`on_surface`) with a `body-md` in Sage (`primary`) to guide the eye through the information hierarchy without using aggressive bolding.

## 4. Elevation & Depth
Depth is achieved through **Tonal Layering** and ambient light simulation, never through heavy drop shadows.

*   **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` background. This creates a natural "lift" using only the color tokens.
*   **Ambient Shadows:** For floating elements (like a meal-add FAB), use a custom shadow: `0 20px 40px rgba(48, 51, 46, 0.06)`. This uses the `on_surface` color at a very low opacity to mimic natural light.
*   **The "Ghost Border":** If a boundary is required for accessibility, use the `outline_variant` token at 15% opacity. Never use 100% opaque borders.

## 5. Components

### Cards & Nutrition Modules
*   **Style:** No borders. Use `md` (0.75rem) or `lg` (1rem) corner radius.
*   **Content:** Forbid the use of divider lines. Separate "Ingredients" from "Instructions" using the `8` (2.75rem) spacing token.
*   **Nutrition Rings:** Use `primary_container` as the track color and `primary` for the progress. Ensure the stroke ends are rounded (`full`) to maintain the fluid aesthetic.
*   **Data source (product nutrition):** When displaying per-product macros (kcal, protein, carbs, fat, etc.), values are **reference data** from [**Open Food Facts**](https://world.openfoodfacts.org/data) (API / documented fields), retrieved **through the NutriFlow backend** — not computed arbitrarily in the UI. Attribute OFF where required by their [reuse terms](https://world.openfoodfacts.org/data).

### Buttons & Interaction
*   **Primary:** A soft-gradient fill (Primary to Primary Dim). Use `xl` (1.5rem) rounding for a pill-shaped, organic feel. 
*   **Secondary:** No fill. Use a `surface-container-high` background on hover. Text should be `on_surface`.
*   **Selection Chips:** Use `tertiary_container` for unselected states and `primary` for selected. Avoid checkboxes; use chips for a more "lifestyle" interaction.

### Input Fields
*   **Design:** Minimalist "Underline" style or subtle `surface-container-low` flood fills. 
*   **Error State:** Use `error` (#9f403d) text, but never a red box. Use a subtle `error_container` background tint to signal the area of concern.

### Signature Component: The Fluid Meal Timeline
Instead of a standard list, use a vertical "Flow" line using `surface_variant`. Meal cards should be staggered left and right of the line (Asymmetry) to create a sense of movement and discovery.

## 6. Do’s and Don’ts

### Do:
*   **Embrace the Void:** Use the `12` (4rem) and `16` (5.5rem) spacing tokens between major sections. White space is a functional element, not wasted space.
*   **Layer Surfaces:** Use `surface-container-lowest` for high-priority interactive elements to make them feel closer to the user.
*   **Use Soft-Loading Transitions:** All components should fade and slide 10px upward when appearing, reinforcing the "fluid" brand pillar.

### Don’t:
*   **Don't use Divider Lines:** If you feel the need for a line, increase the spacing by two increments on the scale instead.
*   **Don't use High Contrast:** Avoid placing `on_surface` text on a `primary` background. Use `on_primary` to maintain the soothing, low-strain visual profile.
*   **Don't use Standard Grids:** Occasionally break the grid. Let a recipe image bleed off the edge of the screen or overlap a card boundary to create that high-end editorial "boutique" feel.
