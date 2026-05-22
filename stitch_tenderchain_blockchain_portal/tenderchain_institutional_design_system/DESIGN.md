---
name: TenderChain Institutional Design System
colors:
  surface: '#faf8ff'
  surface-dim: '#dad9e1'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3fb'
  surface-container: '#eeedf5'
  surface-container-high: '#e8e7ef'
  surface-container-highest: '#e2e2e9'
  on-surface: '#1a1b21'
  on-surface-variant: '#434652'
  inverse-surface: '#2f3036'
  inverse-on-surface: '#f1f0f8'
  outline: '#747783'
  outline-variant: '#c4c6d3'
  surface-tint: '#345baf'
  primary: '#002869'
  on-primary: '#ffffff'
  primary-container: '#0b3d91'
  on-primary-container: '#8dadff'
  inverse-primary: '#b1c5ff'
  secondary: '#056e00'
  on-secondary: '#ffffff'
  secondary-container: '#8dfc75'
  on-secondary-container: '#067500'
  tertiary: '#521a00'
  on-tertiary: '#ffffff'
  tertiary-container: '#762900'
  on-tertiary-container: '#ff9162'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2ff'
  primary-fixed-dim: '#b1c5ff'
  on-primary-fixed: '#001947'
  on-primary-fixed-variant: '#144296'
  secondary-fixed: '#8dfc75'
  secondary-fixed-dim: '#72de5c'
  on-secondary-fixed: '#012200'
  on-secondary-fixed-variant: '#035300'
  tertiary-fixed: '#ffdbcd'
  tertiary-fixed-dim: '#ffb597'
  on-tertiary-fixed: '#360f00'
  on-tertiary-fixed-variant: '#7c2e04'
  background: '#faf8ff'
  on-background: '#1a1b21'
  surface-variant: '#e2e2e9'
typography:
  display-lg:
    fontFamily: metropolis
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: metropolis
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: metropolis
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: metropolis
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-lg:
    fontFamily: metropolis
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
---

## Brand & Style

The design system is engineered to project absolute authority, transparency, and institutional trust. It is designed for a high-stakes procurement environment where clarity and accessibility are paramount. The aesthetic follows a **Corporate / Modern** movement, specifically tailored to the rigorous standards of government digital services.

The visual language prioritizes information density without sacrificing legibility. It utilizes a structured hierarchy to guide users through complex data sets, ensuring that critical actions—such as bid submissions and document verification—are unmistakable. The emotional response is one of stability, professionalism, and civic duty, mirroring the reliability of established national digital infrastructure.

## Colors

This design system utilizes a high-contrast palette rooted in institutional heritage. 

- **Primary (Navy Blue):** Used for headers, primary navigation, and core action buttons to signify authority.
- **Secondary (Emerald Green):** Reserved for "Success" states, active status indicators, and verified credentials, evoking growth and approval.
- **Accent (Saffron):** Used sparingly for notifications, warnings, or high-priority calls to action that require immediate attention without signaling "error."
- **Neutral Palette:** Employs a crisp off-white for the main background to reduce eye strain, with pure white cards to create a clear container-based hierarchy. Text utilizes high-contrast charcoal for maximum WCAG compliance.

## Typography

The typography strategy balances geometric precision with humanist readability. 

**Metropolis** is used for headings to provide a structured, architectural feel that conveys modern governance. **Inter** is the workhorse for all functional text, chosen for its exceptional legibility in data-heavy tables and complex forms. 

All type scales follow a strict vertical rhythm. Headlines should always use the Primary color or a dark neutral to maintain a strong visual anchor. Support text should utilize the Secondary text color (#4B5563) to create a clear secondary layer of information.

## Layout & Spacing

This design system employs a **Fixed Grid** model for desktop and a **Fluid Grid** for mobile. 

- **Desktop:** A 12-column grid with a max-width of 1280px. Gutters are fixed at 24px to ensure breathing room between data blocks.
- **Mobile:** A 4-column fluid grid with 16px side margins.
- **Rhythm:** All spacing (padding, margins, component heights) must be multiples of the 8px base unit. This ensures a mathematical harmony across the UI.

Layouts should prioritize a "Top-Down" flow. Navigation is anchored to the top, followed by a breadcrumb trail and a clear page header. Content should be grouped in cards to separate different logical sections of a tender or application form.

## Elevation & Depth

To maintain a professional and "flat" institutional feel, elevation is used conservatively. The system relies primarily on **Tonal Layers** and **Low-contrast Outlines** rather than dramatic shadows.

- **Level 0 (Background):** #F8F9FC. Used for the foundation of the application.
- **Level 1 (Cards/Surfaces):** #FFFFFF with a 1px border (#E5E7EB). This is the default state for content containers.
- **Level 2 (Hover/Active):** A very soft, diffused shadow (0px 4px 6px -1px rgba(0, 0, 0, 0.1)) used to indicate interactivity on cards or dropdowns.
- **Interactions:** Avoid heavy blurs. Depth should feel like physical paper stacked on a desk—subtle and purposeful.

## Shapes

The shape language is disciplined and consistent. A **Rounded (level 2)** setting is applied globally, resulting in a standard 8px (0.5rem) corner radius.

This radius provides a balance: it is modern enough to feel approachable, yet sharp enough to remain professional and serious. 
- **Buttons and Inputs:** 8px radius.
- **Cards:** 12px (rounded-lg) for outer containers to create a nested visual effect.
- **Status Tags/Chips:** 100px (full pill) to distinguish them from actionable buttons.

## Components

### Buttons
- **Primary:** Navy Blue background, White text. Bold and authoritative.
- **Secondary:** White background, Navy Blue border and text.
- **Success:** Emerald Green background for final "Submit" or "Approve" actions.
- **Size:** Minimum height of 44px for accessibility.

### Input Fields
- Standard 1px border (#E5E7EB). On focus, the border shifts to Navy Blue with a 2px offset "halo" in a light blue tint.
- Labels are always visible above the field in `label-md` weight.

### Cards
- White background, 1px border. No shadow in default state.
- Used to group related form fields (e.g., "Company Details," "Financial Bid").

### Status Chips
- Small, pill-shaped indicators.
- **Open:** Light Blue background / Navy text.
- **Closed:** Light Grey background / Dark Grey text.
- **Active:** Light Green background / Emerald text.

### Data Tables
- Professional, dense but legible.
- Header row uses a light grey background (#F3F4F6) with `label-sm` capitalized text.
- Row borders are 1px thick. Every second row can use a subtle zebra stripe for high-volume data.