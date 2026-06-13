# UI/UX Audit — Full Site

**Scope:** All user-facing pages (Home, About Us, Contact, Donate, Get Involved, Impact, Causes, Stories, NotFound/Notice, and the 5 program pages: CWG, FSEDS, HRDS, LAC, WHG) plus shared components (Navbar, Footer, CampaignCard, SectionNavigator).

**Method:** Read-only audit. No code changes in this pass. Findings are organized by (1) cross-cutting systemic issues that affect the whole site, (2) page-by-page findings, and (3) a prioritized roadmap for implementation.

**Implementation priority confirmed with stakeholder:** Home page first, visual/UX redesign only (no new backend-dependent features in this phase).

---

## 1. Cross-Cutting Systemic Issues

These show up on nearly every page and should be fixed once, centrally, rather than page-by-page.

### 1.1 The design system exists but is almost never used
`client/src/index.css` defines a solid `@theme` token set: brand colors (`--color-primary #1a3270`, `--color-secondary #f97316`, cause colors, purple/teal accents), fonts (`--font-sans` Inter, `--font-heading` Poppins, `--font-script` Dancing Script), spacing (`--spacing-section: 5rem`, `--spacing-container: 1.5rem`), radius scale, and shadow tokens (`--shadow-card`, `--shadow-button`, `--shadow-donate`).

In practice, the vast majority of components — especially Navbar, Footer, SectionNavigator, all 5 program pages (CWG/FSEDS/HRDS/LAC/WHG), DonateHero, ContactFormSection, NotFoundPage, NoticePage — use raw inline `style={{...}}` objects with hardcoded hex/px/rem values that bypass the tokens entirely. A handful of newer components (CampaignCard, ImageGallery, Impact, Campaigns, ImpactNumbers, CauseCard) use the tokens correctly and should be the reference pattern going forward.

**Why it matters:** Any future rebrand or spacing/color adjustment currently requires editing dozens of files and hundreds of magic numbers instead of a handful of CSS variables. This is the single biggest blocker to a coherent visual identity.

### 1.2 Color palette has fragmented into 5+ "navy" and multiple unrelated accent families
Beyond the documented tokens, the codebase has accumulated:
- Navy variants: `#1a3270` (token), `#0f2057` (Footer), `#1e3a8a` (VideoStories), `#1a1a4b` (About/Contact/GetInvolved headings), and `#1e293b` (`--color-heading`, used correctly on Impact pages).
- Accent variants: `#e63975`/`#fce7ef` (Volunteer + modal, pink), `#3a47c5`/`#4a5080`/`#8890b8` (NewsletterSubscribe, indigo), Tailwind default `purple-600` (`#9333ea`, Donate.tsx CTA — different from token `--color-purple #7c3aed`).
- Each of the 5 program pages defines its own `PRIMARY/SECONDARY/LIGHT_BG` (or `NAV_BLUE/BRIGHT_BLUE/GOLD` for LAC) in separate `*.constants.ts` files, none of which map cleanly onto `--color-cause-env/edu/hunger/health`.
- A third parallel color system exists for Notice category colors (`NoticePage.tsx` local `categoryColors` map) and a fourth for cross-link "other groups" colors (`CwgCommunities.tsx` and equivalents in each program page).

**The dual heading-color bug:** About/Contact/GetInvolved use `#1a1a4b` for headings; Impact pages correctly use `#1e293b` (`--color-heading`). These read as two different "almost black" navies side by side when navigating the site.

**Recommendation:** Audit and consolidate to a single source of truth — either map every off-palette color to an existing token, or formally extend `@theme` with the 2-3 additional accents that are clearly intentional (e.g., a pink/magenta accent for volunteer-related CTAs), then do a global find/replace.

### 1.3 Typography drift
- `--font-script` (Dancing Script) is defined but **never used anywhere** — a missed opportunity for the "warm/handwritten" NGO accent the design system clearly intended (the Hero's hand-drawn "Change Lives" SVG headline on Home is the closest realization of this idea and is genuinely good).
- An undocumented `Georgia, serif` italic accent appears ~6+ times across the 5 program pages (hero taglines, quotes) and once on Home (StoriesOfChange quote mark as `font-serif`) — this competes with the script-font intent and should either become the official `--font-script` usage or be removed.
- All 5 program pages set `fontFamily: "'Poppins', sans-serif"` at the page-wrapper level, which cascades **Poppins onto body text** — but the token system designates Poppins for headings only and Inter for body. Every paragraph on these 5 pages is in the wrong font.
- Section heading (`h2`) sizes vary with no consistent scale across adjacent sections on the same page (Home: `text-2xl xl:text-3xl` vs `text-3xl xl:text-4xl` vs plain `text-3xl`).

### 1.4 Section spacing rhythm is inconsistent
Vertical section padding values found in the wild: `py-14`, `py-16`, `py-20`, `py-24`, `3rem`, `5rem`, `6rem` — sometimes on adjacent sections of the same page. `--spacing-section` (5rem = `py-20`) should become the default, with documented, deliberate exceptions (e.g., a visually "lighter" newsletter section).

### 1.5 Template duplication across the 5 program pages
CWG, FSEDS, HRDS, and WHG are ~90% structurally identical (Hero → Mission → Activities → CTA → Stats → Communities), each re-implemented as separate ~300-500 line files with copy-pasted layout and per-page color drift. LAC diverges further (8 sections, different naming convention, but the most polished visual treatment — see `LacWhatWeDo.tsx`). This is both a visual-consistency problem and a maintenance problem: a single shared `<CauseHero>`, `<CauseMission>`, `<CauseActivities>`, `<CauseCTA>` set, parameterized by content + an accent color, would fix both at once.

### 1.6 Accessibility gaps that recur across the site
- **Modals are inconsistent**: `DonateQRModal` has `role="dialog"`, `aria-modal`, and Escape-key handling; `CauseModal` and `StoryModal` have neither. Standardize on one accessible modal pattern.
- **Decorative SVGs/icons** frequently lack `aria-hidden="true"` (About sections, program-page CTA watermarks).
- **Breadcrumbs** on the 5 program pages are styled `<div>`/`<span>` rows, not semantic `<nav aria-label="Breadcrumb"><ol>`.
- **Color contrast**: low-opacity white text (`rgba(255,255,255,0.5–0.65)`) on dark/saturated backgrounds in the Footer and several program-page hero cards likely fails WCAG AA for body-size text.
- **Focus states** in several forms (ContactFormSection, DonateHero, NoticePage) are wired via JS `onFocus`/`onBlur` style mutation instead of `focus:`/`focus-visible:` Tailwind classes — fragile and inconsistent with keyboard navigation.
- **Accordions** (DonateFAQ, NoticePage) lack `aria-expanded` on toggle buttons.

### 1.7 Performance: lazy loading is essentially absent
No `<img>` across Home (ImageGallery, VideoStories, Campaigns, StoriesOfChange), CausesPage, StoriesPage, or the program-page galleries uses `loading="lazy"`, and several lack explicit `width`/`height` (CLS risk). Campaigns.tsx also pulls 6 hardcoded Unsplash URLs with query-string sizing and no `srcset` — flagged in the code itself as a placeholder pending real CMS data.

### 1.8 Conversion/trust gaps (donation-focused NGO)
- **Hero (Home) has no Donate CTA** — only "About Us" / "Get Involved". The primary conversion action isn't in the first viewport.
- **Donate.tsx (Home section)** is the visually weakest section on the homepage — no card treatment, no trust signals, blends into surrounding white sections — despite being the most conversion-critical block.
- **DonatePage trust badges** ("100% Secure", "Trusted NGO") are unsupported claims with no links to registration numbers, 80G certificates, or annual reports.
- **DonateQRModal** uses a placeholder UPI ID (`yourupi@okaxis`) — a functional blocker for real donations, flagged here because it directly undermines any conversion-focused redesign work until fixed.
- **"Receipt sent" messaging** in DonateFormSection appears before payment is actually completed via the QR flow — misleading.
- **Footer social links** are all empty (`url: ""`), so the entire social-proof block silently disappears.
- Several pages carry **placeholder/dummy content** (LAC contact info, About team "Coming soon" social icons, unused `AboutCTA`/`AboutMissionVision` components) that read as unfinished to a visitor evaluating trust.

---

## 2. Page-by-Page Findings

### 2.1 Home Page — PRIORITY for implementation

**Files:** `HomePage.tsx` + `components/user/home/*` (Hero, Mission, VideoStories, ImageGallery, Groups, Impact, Campaigns, StoriesOfChange, Donate, DonateQRModal, Volunteer, VolunteerModal, NewsletterSubscribe) + shared Navbar/Footer/SectionNavigator/CampaignCard.

**Strengths to preserve:**
- Hero's animated hand-drawn "Change Lives" SVG headline — genuinely unique, on-brand.
- CampaignCard, ImageGallery, Groups, Impact — good token usage, hover micro-interactions, staggered scroll animations already in place via framer-motion.
- VolunteerModal and DonateQRModal have solid form a11y (label associations, aria-invalid, focus handling).

**Top issues (see §1 for detail):**
1. Color palette fragmentation — Volunteer (`#e63975`/`#1a1a4b`), NewsletterSubscribe (`#3a47c5` family), VideoStories (`#1e3a8a`), Donate (`purple-600`), Footer (`#0f2057`) all introduce off-token colors.
2. Section padding inconsistency (`py-14`/`py-16`/`py-20`/`3rem`).
3. Donate section (home) needs a visual/trust overhaul — currently the weakest section on the page despite being the conversion goal.
4. No Donate CTA in the Hero.
5. Footer text contrast (`rgba(255,255,255,0.5–0.65)` on `#0f2057`) likely fails WCAG AA; social links array is empty.
6. Campaigns.tsx uses 6 hardcoded Unsplash placeholder images, no lazy loading.
7. No `loading="lazy"` on below-the-fold images (ImageGallery, VideoStories, StoriesOfChange).
8. Heading-scale inconsistency between adjacent sections.
9. Navbar/Footer/SectionNavigator/Groups/NewsletterSubscribe are fully inline-style — should move to Tailwind + tokens.
10. `--font-script` unused; ad hoc `font-serif` quote mark in StoriesOfChange should be reconciled with the script-font intent.
11. VideoStories progress bar (clickable div) has no keyboard/`role="slider"` support.

### 2.2 Program Pages — CWG, FSEDS, HRDS, LAC, WHG

**Shared template issues (fix once, apply to all 5):**
- Zero Tailwind/token usage — entirely inline styles with per-page magic numbers.
- 5 separate, non-aligned color-constant files (`*.constants.ts`).
- Hero pattern copy-pasted with drift: FSEDS renders **three `<h1>` elements** (accessibility/SEO issue); hero font sizes differ between FSEDS and the other three; right-side hero "card" content varies (icon-list vs. quote vs. chart) without clear rationale.
- Page-level `fontFamily: "'Poppins', sans-serif"` incorrectly applies the heading font to all body text.
- Mission/Activities/CTA sections follow an identical 3-column / repeated-card-grid layout, ~90% duplicated across CWG/FSEDS/HRDS/WHG, recolored only.
- Undocumented `Georgia, serif` italic accents (~6 instances).
- Section padding drift (`5rem` vs `6rem` vs `5.5rem`).
- Breadcrumbs are non-semantic `<div>` rows; decorative icons lack `aria-hidden`.
- Gallery `<img>` tags lack `loading="lazy"`, width/height, and use only an `onError` fallback.

**Page-specific notes:**
- **HRDS** is closest to a "clean baseline" — near pixel-identical to CWG, just recolored green.
- **WHG**'s hero swaps the icon-list right card for a Gandhi quote — a nice unique touch, but breaks rhythm with the other three; should be a deliberate choice if kept.
- **LAC** is structurally the richest (8 sections incl. a full Contact section the others lack) and has the most polished visual treatment (`LacWhatWeDo.tsx` — gradient-text heading, dark stat-tile panel, hover-lift cards). **Recommendation: use LAC's visual language as the new shared baseline** when extracting common components, not CWG's plainer version.
- **LAC contact info is placeholder/dummy data** (`legalaid@helpinghands.org`, fake phone/address) — must be replaced before launch regardless of redesign timing.

### 2.3 About Us Page
- Heading color uses off-token `#1a1a4b` (vs. `--color-heading #1e293b` used correctly on Impact).
- `AboutCTA` and `AboutMissionVision` exist but are unused — About is the only major page with no closing CTA.
- AboutTeam social icons are permanently disabled "Coming soon" — looks unfinished.
- Decorative hand-drawn SVGs (leaves/birds/tree) are a good differentiator, but lack `aria-hidden`.
- Hover-lift inconsistent: AboutStats has it, AboutSocieties/AboutValues don't.

### 2.4 Contact Page
- Thinnest page in the site (2 sections) — no map, office hours, or FAQ.
- Hero's "Get in Touch" card duplicates the Email/Phone/Location info shown again in the form section immediately below — redundant.
- ContactFormSection mixes inline styles with Tailwind and wires focus states via JS instead of `focus:` classes.
- No `aria-live` region for the "Message Sent!" success state.

### 2.5 Donate Page — second-priority for conversion work
- DonateHero is the only Hero in the codebase entirely inline-styled (bypasses tokens; `borderRadius: "0.6rem"` vs. token `--radius-md: 0.625rem` — near-miss drift).
- `--shadow-donate` token defined but never used; a hand-rolled blue shadow is used instead.
- Trust badges unsupported by links to registration/80G/annual reports (see §1.8).
- **Critical (flagged, not a style issue):** `DonateQRModal.tsx` placeholder `UPI_ID = "yourupi@okaxis"` — donations cannot complete.
- "Receipt sent" message shown before payment confirmation — misleading copy.
- Cause `<select>` uses acronyms without descriptions; "Other" amount has no upper-bound guardrail.
- DonateFAQ accordion lacks `aria-expanded`.

### 2.6 Get Involved Page
- Best section-spacing consistency of any page (`py-20 px-6` throughout).
- Volunteer signup is modal-gated — adds friction for a conversion-critical action; benefits list is generic, doesn't describe actual roles/time commitment.
- A plain `<a href="/contact">` mixed into an otherwise hash-anchor nav array causes a full page reload instead of client-side routing.
- "Donate" section here largely duplicates DonatePage's pitch.

### 2.7 Impact Page
- Best token adherence in the codebase (correct `--color-heading`, `shadow-card`, `bg-surface`, `border-border` via proper classes) — **use this page's conventions as the reference standard** when fixing other pages.
- Minor: ImpactAreas/Testimonials use hardcoded hex equivalents of the same tokens ImpactNumbers uses correctly.
- Timeline is purely visual (no `<ol>`/`<time>` semantics).

### 2.8 Causes Page
- CauseCard has good token usage and progress-bar styling.
- Category badge colors set via inline `style` from data file, bypassing `--color-cause-*` tokens — possible future drift.
- CauseModal lacks `role="dialog"`/`aria-modal`/focus trap (contrast with DonateQRModal which has both).
- Card images lack `loading="lazy"`.

### 2.9 Stories Page
- Clean, minimal, good card hover/ring styling and `line-clamp-3` to prevent layout shift.
- StoryModal lacks Escape-key handling and dialog semantics (same gap as CauseModal).
- Avatar images lack `loading="lazy"`.

### 2.10 NotFound / Notice Pages
- Both fully inline-styled, bypassing tokens (consistent with other "recently touched" files).
- NoticePage has its own third parallel category-color map, separate from `--color-cause-*` and the program-page cross-link colors.

---

## 3. Prioritized Roadmap

### Phase 1 — Foundation (do first, unlocks everything else)
1. **Color audit & consolidation**: map every off-token hex value found in §1.2 to an existing or newly-formalized `@theme` token. Produce a single canonical palette.
2. **Fix the heading-color split** (`#1a1a4b` → `--color-heading #1e293b`) site-wide.
3. **Standardize section spacing** to `--spacing-section` (5rem/`py-20`), documenting any deliberate exceptions.
4. **Decide the script-font strategy**: formalize `--font-script` (Dancing Script) usage or replace the ad hoc `Georgia, serif` instances with it; remove the stray `font-serif` quote mark.
5. **Fix the Poppins-on-body-text bug** on all 5 program pages.

### Phase 2 — Home Page Redesign (priority implementation target)
6. Rework the Donate section (Home) with stronger visual/trust treatment — card-based, trust signals, possibly surface the QR/UPI flow directly.
7. Add a Donate CTA to the Hero.
8. Apply Phase 1 token fixes to Navbar, Footer, SectionNavigator, Volunteer, NewsletterSubscribe, VideoStories, Donate.
9. Fix Footer contrast and resolve/remove the empty social-links block.
10. Replace Campaigns.tsx Unsplash placeholders with real assets + `loading="lazy"`; add lazy loading to ImageGallery, VideoStories, StoriesOfChange.
11. Normalize h2 heading scale across Home sections.
12. Add keyboard support to the VideoStories progress bar.

### Phase 3 — Shared Program-Page Template
13. Extract `<CauseHero>`, `<CauseMission>`, `<CauseActivities>`, `<CauseCTA>` shared components (use `LacWhatWeDo.tsx`'s visual language as the baseline), parameterized by content + accent color.
14. Fix FSEDS's triple-`<h1>` hero.
15. Consolidate the 5 `*.constants.ts` palettes into the `--color-cause-*` tokens (+ 1-2 new tokens if a genuinely new accent is needed for LAC/FSEDS).
16. Replace LAC's placeholder contact info with real data.
17. Semantic breadcrumbs + `aria-hidden` on decorative icons across all 5 pages.

### Phase 4 — Remaining Pages & Cross-Cutting A11y/Perf
18. Standardize modal pattern (dialog role, aria-modal, focus trap, Escape) across `CauseModal`, `StoryModal`, `DonateQRModal`.
19. Add `loading="lazy"` + width/height to all grid/gallery images site-wide.
20. ContactFormSection / DonateHero / NoticePage: replace JS-driven focus styling with `focus:`/`focus-visible:` Tailwind classes.
21. Add `aria-expanded` to DonateFAQ and NoticePage accordions; `aria-live` for form success states.
22. About Us: integrate or remove `AboutCTA`/`AboutMissionVision`; resolve disabled "Coming soon" social icons.
23. Get Involved: consider inlining the volunteer form and converting the `<a href="/contact">` to a router `<Link>`.

### Flagged separately (not style, but blocks conversion goals)
- `DonateQRModal.tsx` placeholder UPI ID — must be replaced with a real merchant ID before any donation can succeed.
- Misleading "receipt sent" copy in `DonateFormSection.tsx` should be corrected regardless of visual redesign timing.
- DonatePage trust badges need real registration/80G/annual-report links to be credible.

---

## Next Steps
This audit is the basis for Phase 2 (Home page redesign). Once reviewed, implementation will proceed section-by-section on the Home page, applying the Phase 1 token fixes as part of that work where they intersect (colors/spacing used by Home's own components), with the remaining Phase 1/3/4 items tracked for follow-up passes.
