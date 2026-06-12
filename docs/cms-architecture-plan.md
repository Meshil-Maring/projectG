# Project Generation — Dynamic CMS Architecture Plan

## 0. Guiding principle

The codebase already has a working CMS pattern: a generic `createListResource(prisma.delegate, schemas)`
factory on the server, paired with a `syncList()` diff-and-save helper and per-area React contexts on the
client (`HomePageContext`, `GroupActivitiesContext`, `TeamContext`, `AboutUsContext`), wired into a tabbed
`AdminDashboard`.

**This plan extends that pattern instead of replacing it.** Every new capability below (page sections,
navigation, media, forms) reuses `createListResource` + `syncList` + the same admin UI primitives
(`FieldGroup`, `Input`, `Textarea`, `SaveBtn`, `ColorPicker`, drag-reorder). New, generic concepts are
introduced only where the current one-model-per-content-type approach doesn't scale (free-form page
sections, navigation trees, media, forms).

---

## 1. Database Schema (additions to `schema.prisma`)

Keep all existing models (`User`, `SiteSettings`, `HomeVideo`, `GalleryPhoto`, `ImpactStat`, `Story`,
`Activity`, `BoardMember`, `TeamMember`) unchanged — they're a good fit for `createListResource` as-is.

Add:

```prisma
enum Role {
  SUPER_ADMIN
  ADMIN
  EDITOR
  CONTENT_MANAGER
}

// ─── Pages & Sections ──────────────────────────────────────────────
model Page {
  id          String    @id @default(cuid())
  slug        String    @unique          // "home", "about-us", "groups/cwg", "contact"
  title       String
  status      PageStatus @default(PUBLISHED)

  // SEO
  metaTitle       String  @default("")
  metaDescription String  @default("")
  metaKeywords    String  @default("")
  ogImage         String  @default("")
  ogTitle         String  @default("")
  ogDescription   String  @default("")
  canonicalUrl    String  @default("")
  schemaMarkup    String  @default("")   // raw JSON-LD, admin-edited

  sections    Section[]
  updatedAt   DateTime  @updatedAt

  @@map("pages")
}

enum PageStatus {
  DRAFT
  PUBLISHED
}

model Section {
  id        Int      @id @default(autoincrement())
  pageId    String
  page      Page     @relation(fields: [pageId], references: [id], onDelete: Cascade)
  type      String   // "hero" | "mission" | "stats" | "cta" | "richtext" | "imageGrid" | ...
  enabled   Boolean  @default(true)
  order     Int      @default(0)
  data      Json     // shape validated per `type` by zod on the server

  @@index([pageId, order])
  @@map("sections")
}

// ─── Navigation ────────────────────────────────────────────────────
model NavigationItem {
  id        Int      @id @default(autoincrement())
  menu      String   // "header" | "footer" | "sidebar"
  label     String
  href      String
  parentId  Int?
  parent    NavigationItem?  @relation("ItemChildren", fields: [parentId], references: [id], onDelete: Cascade)
  children  NavigationItem[] @relation("ItemChildren")
  visible   Boolean  @default(true)
  order     Int      @default(0)

  @@index([menu, parentId, order])
  @@map("navigation_items")
}

// ─── Media Library ─────────────────────────────────────────────────
model MediaAsset {
  id         String   @id @default(cuid())
  url        String
  filename   String
  mimeType   String
  kind       MediaKind
  folder     String   @default("uncategorized")
  alt        String   @default("")
  size       Int      @default(0)
  createdAt  DateTime @default(now())

  @@index([folder, kind])
  @@map("media_assets")
}

enum MediaKind {
  IMAGE
  VIDEO
  ICON
  DOCUMENT
}

// ─── Form Builder ──────────────────────────────────────────────────
model FormDefinition {
  id          String       @id @default(cuid())
  slug        String       @unique   // "contact", "donate", "volunteer"
  title       String
  fields      FormField[]
  submissions FormSubmission[]
  updatedAt   DateTime     @updatedAt

  @@map("form_definitions")
}

model FormField {
  id        Int      @id @default(autoincrement())
  formId    String
  form      FormDefinition @relation(fields: [formId], references: [id], onDelete: Cascade)
  label     String
  name      String   // field key used in submission JSON
  type      String   // "text" | "email" | "phone" | "textarea" | "select" | "checkbox"
  required  Boolean  @default(false)
  options   Json?    // for select/radio
  order     Int      @default(0)

  @@index([formId, order])
  @@map("form_fields")
}

model FormSubmission {
  id        Int      @id @default(autoincrement())
  formId    String
  form      FormDefinition @relation(fields: [formId], references: [id], onDelete: Cascade)
  data      Json
  createdAt DateTime @default(now())

  @@index([formId, createdAt])
  @@map("form_submissions")
}
```

`User.role` becomes `Role` with 4 values; existing `ADMIN`/`EDITOR` rows migrate unchanged
(`SUPER_ADMIN`/`CONTENT_MANAGER` are additive).

---

## 2. Permissions model

No new `Permission` table — a static capability matrix in code keeps this auditable and avoids an
extra DB round-trip on every request:

```ts
// server/src/common/constants/permissions.ts
export const PERMISSIONS = {
  SUPER_ADMIN:      ['*'],
  ADMIN:            ['content:*', 'pages:*', 'nav:*', 'media:*', 'forms:*', 'users:read'],
  EDITOR:           ['content:write', 'pages:write', 'media:read', 'media:write', 'forms:read'],
  CONTENT_MANAGER:  ['content:write', 'pages:write', 'media:read', 'media:write'],
} as const;
```

`requireRole()` becomes `requirePermission('pages:write')`, resolved against the matrix. This is a
~20-line change to `rbac.middleware.ts` and is backwards compatible (old `requireRole(ROLES.ADMIN, ...)`
calls map to permission checks).

---

## 3. API Architecture

All routes stay under `/api/v1`, following the existing module-per-resource convention in
`server/src/api/v1/`:

```
content/
  content.routes.ts        (existing resources, unchanged)
  listResource.ts           (existing, reused everywhere below)

pages/
  pages.routes.ts           GET /pages, GET /pages/:slug, PATCH /pages/:slug (SEO fields)
  sections.routes.ts        createListResource(prisma.section, ...) scoped by ?pageId=
                             + PATCH /sections/:id/duplicate
                             + PATCH /sections/:id  (toggle `enabled`, edit `data`)

navigation/
  navigation.routes.ts      createListResource(prisma.navigationItem, ...) scoped by ?menu=

media/
  media.routes.ts           POST /media (multipart upload), GET /media?folder=&kind=&q=,
                             DELETE /media/:id, PATCH /media/:id (replace/rename)

forms/
  forms.routes.ts           CRUD on FormDefinition + nested FormField (createListResource)
  submissions.routes.ts     GET /forms/:slug/submissions, POST /forms/:slug/submit (public)

seo/
  sitemap.routes.ts         GET /sitemap.xml — generated from Page table (public, cached)
```

Public read endpoints (`GET /pages/:slug`, `GET /navigation`, `GET /sitemap.xml`, form `submit`)
stay unauthenticated; everything else reuses `authenticate` + `requirePermission` exactly like
`listResource.ts` does today.

---

## 4. Dynamic Content Strategy

Two content shapes, used deliberately:

1. **Typed repeating lists** (existing pattern) — `HomeVideo`, `GalleryPhoto`, `ImpactStat`, `Story`,
   `Activity`, `BoardMember`, `TeamMember`, and new `FormField`/`MediaAsset`/`NavigationItem`. Strongly
   typed columns, validated by zod, edited via list-style admin UI (add/edit/delete/reorder cards).

2. **Free-form sections** (`Section.data: Json`) — for the long tail of one-off content blocks: group
   page heroes/missions/CTAs, About Us mission & vision, Contact info blocks, Donate impact copy, etc.
   Each `Section.type` has a **section schema** (zod, server-side) and a matching **admin field
   renderer** (client-side) — see §6.

A page's full content = `Page` row (SEO) + ordered, enabled `Section[]`, each rendered by a
`SectionRenderer` that maps `type` → React component.

---

## 5. Reusable Component Strategy

Frontend, per section `type`, one **display component** + one **field schema**:

```
client/src/components/sections/
  HeroSection.tsx         + heroSection.fields.ts   (title, subtitle, image, buttons[])
  RichTextSection.tsx     + richText.fields.ts      (heading, body html/markdown)
  StatsSection.tsx        + stats.fields.ts         (reuses ImpactStat-style list)
  CTASection.tsx          + cta.fields.ts           (heading, body, button, bgColor)
  ImageGridSection.tsx    + imageGrid.fields.ts     (images[] from media library)
  CommunitiesSection.tsx  + communities.fields.ts   (group-specific card list)
  SectionRenderer.tsx     — maps Section.type -> component, skips disabled sections
```

Each `*.fields.ts` exports a small declarative field list (`{ key, label, kind: 'text'|'textarea'|
'image'|'color'|'buttonList'|'list' }`) consumed by **one** generic admin component:

```
client/src/components/admin/SectionEditor.tsx
```

`SectionEditor` renders the right input for each field kind (reusing existing `Input`, `Textarea`,
`ColorPicker`, plus new `ImagePicker` backed by the media library and `ButtonListEditor`). This is the
key piece that avoids writing a bespoke admin tab per page — **one editor, driven by data**.

Migrating `cwg.constants.ts` (and the hrds/fseds/lac/whg/about-us/contact/donate equivalents) means:
turning each hardcoded section into a `Section` row with `type` + `data` matching its fields file, and
swapping the hardcoded component for `SectionRenderer`.

---

## 6. Page Builder Architecture (Admin)

```
Admin Dashboard
├── Pages                         <- new top-level nav item
│   ├── [Page list: Home, About Us, Groups/CWG, Groups/FSEDS, ... Contact, Donate, ...]
│   └── Page Editor (per page)
│       ├── Sections panel
│       │   ├── drag-and-drop reorder (dnd-kit, writes via /sections/reorder)
│       │   ├── enable/disable toggle per section
│       │   ├── duplicate / delete per section
│       │   └── "Add section" -> pick a type -> SectionEditor opens
│       ├── SectionEditor (generic, field-driven, §5)
│       └── SEO tab (metaTitle, description, OG, canonical, schema JSON)
├── Navigation                    <- header / footer / sidebar menu manager
├── Media Library                 <- folders, search, upload, replace, delete
├── Forms                         <- form builder + submissions viewer
├── Existing tabs (kept as-is, they already work well):
│   Hero Image / Watch Our Story / Moments of Change / Our Impact /
│   Stories of Change / Group Activities / Meet Our Team
└── Users & Roles                 <- manage SUPER_ADMIN/ADMIN/EDITOR/CONTENT_MANAGER
```

Drag-and-drop reorder reuses the same `/reorder` PATCH endpoint pattern already implemented in
`listResource.ts`, applied to `Section` and `NavigationItem`.

---

## 7. Folder Structure (new additions only)

```
server/src/api/v1/
  pages/
    pages.routes.ts
    pages.validation.ts
    sections.routes.ts
    section-schemas/           # one zod schema per Section.type
      hero.schema.ts
      richText.schema.ts
      stats.schema.ts
      cta.schema.ts
      imageGrid.schema.ts
      communities.schema.ts
  navigation/
    navigation.routes.ts
    navigation.validation.ts
  media/
    media.routes.ts
    upload.middleware.ts       # multer + storage adapter (local/S3)
  forms/
    forms.routes.ts
    submissions.routes.ts
  seo/
    sitemap.routes.ts

client/src/
  context/
    PageContext.tsx             # fetches Page+Sections for a slug, generic
    NavigationContext.tsx
    MediaContext.tsx
  components/
    sections/                   # display components, §5
    admin/
      SectionEditor.tsx
      ImagePicker.tsx
      ButtonListEditor.tsx
      MediaLibrary.tsx
      NavigationManager.tsx
      FormBuilder.tsx
      PageEditor.tsx
  pages/
    users/DynamicPage.tsx       # generic <SectionRenderer> page used by slugs not given a bespoke page
```

---

## 8. Performance & Scalability

- **Caching**: `GET /pages/:slug`, `GET /navigation`, `GET /sitemap.xml` are public + cacheable —
  add an in-memory TTL cache (or Redis if deployed multi-instance) keyed by slug, invalidated on
  the corresponding PATCH/POST/DELETE.
- **Indexing**: `@@index([pageId, order])` on `Section`, `@@index([menu, parentId, order])` on
  `NavigationItem`, `@@index([formId, createdAt])` on `FormSubmission` (added above).
- **Image optimization**: media upload pipeline runs uploads through `sharp` to generate
  responsive sizes/webp; `MediaAsset` could store a `variants: Json` map. Out of scope for v1 but
  the `MediaAsset` schema leaves room for it.
- **Lazy loading**: already in place via `React.lazy` per page (`App.tsx`); `SectionRenderer`
  should lazy-import heavier section components (image grids, video embeds) the same way.
- **SSR**: not currently used (Vite SPA). Given this is a content/marketing site, the highest-value
  SSR/pre-render win is generating static HTML for SEO via a build-time prerender step (e.g.
  `vite-plugin-ssr` or a simple Puppeteer prerender of public routes) — flagged as a later phase,
  not a blocker for the CMS itself.

---

## 9. Security Recommendations

- Public GET endpoints (`/pages/:slug`, `/navigation`, `/media` thumbnails, `/sitemap.xml`,
  form `submit`) must never leak `DRAFT` pages or disabled sections — filter `status: PUBLISHED`
  and `enabled: true` server-side, not client-side.
- `Section.data` and `Page.schemaMarkup` are admin-authored JSON/HTML — sanitize on render
  (e.g. `DOMPurify`) since rich-text fields can contain HTML.
- Media upload: validate MIME type + extension allowlist, cap file size, store outside the web
  root or behind a CDN with randomized filenames to avoid path traversal / executable uploads.
- Form submissions: rate-limit `POST /forms/:slug/submit` (the existing `rateLimiter.middleware.ts`
  already covers this pattern), and validate against the form's own `FormField` definitions
  server-side (not just client-side).
- RBAC: `requirePermission` checks must run on every mutating route, including new `/sections`,
  `/navigation`, `/media`, `/forms` routes — follow the exact `authenticate` + role-check ordering
  already used in `listResource.ts`.
- Audit trail: consider an `updatedBy`/`updatedAt` pair on `Page`, `Section`, `NavigationItem` for
  accountability across multiple admin roles.

---

## 10. Step-by-Step Implementation Plan

**Phase 1 — Page/Section core (foundation for everything else)**
1. Add `Page`, `Section`, `PageStatus` to schema; migrate; seed one `Page` row per existing route
   (home, about-us, groups/cwg, groups/fseds, groups/hrds, groups/lac, groups/whg, contact, donate,
   get-involved, impact, causes, stories).
2. Build `pages.routes.ts` + `sections.routes.ts` (reuse `createListResource` for sections, scoped
   by `pageId`), plus duplicate/enable-toggle endpoints.
3. Build `SectionRenderer` + the first 3-4 section types (hero, richText, stats, cta) and their
   `*.fields.ts`.
4. Build `SectionEditor` (generic admin component) + add "Pages" tab to `AdminDashboard`.

**Phase 2 — Migrate hardcoded group pages**
5. For each of WHG/HRDS/CWG/FSEDS/LAC: convert `*.constants.ts` content into `Section` rows
   (mission, stats, communities, CTA), replace bespoke components with `SectionRenderer` output.
   `Activity` data (already dynamic) becomes one section type that reads from the existing
   `/content/activities?group=` endpoint.
6. Repeat for About Us (mission/vision/objectives/values/societies — Team/Stats already dynamic),
   Contact, Donate, Get Involved, Impact, Causes/Stories pages.

**Phase 3 — Navigation management**
7. Add `NavigationItem` model + routes; seed from current `Navbar`/`Footer` hardcoded arrays.
8. Build `NavigationManager` admin UI (drag-reorder, visibility toggle, dropdown nesting via
   `parentId`); update `Navbar`/`Footer` to fetch from `/navigation?menu=header|footer`.

**Phase 4 — Media library**
9. Add `MediaAsset` model + upload route (local disk first, swappable storage adapter).
10. Build `MediaLibrary` admin UI (folders, search, upload, delete, replace) and `ImagePicker`
    used by `SectionEditor` for any `image`-kind field.

**Phase 5 — Form builder**
11. Add `FormDefinition`/`FormField`/`FormSubmission` models + routes.
12. Convert the existing Contact and Donate forms into `FormDefinition` records; build
    `FormBuilder` admin UI + submissions table.

**Phase 6 — SEO**
13. Add SEO fields to `Page` (already in schema above); add SEO tab to `PageEditor`; build
    `/sitemap.xml` route generated from published `Page` rows; wire `<head>` tags per page from
    `Page` data on the client.

**Phase 7 — RBAC expansion**
14. Extend `Role` enum, add permission matrix (§2), update `rbac.middleware.ts` and all routes
    from `requireRole` to `requirePermission`. Add a "Users & Roles" admin tab.

**Phase 8 — Audit & cleanup**
15. Sweep for duplicate components (e.g. near-identical `*Hero.tsx`/`*Mission.tsx`/`*Stats.tsx`
    across whg/hrds/cwg/fseds/lac — these should collapse into the shared section components from
    Phase 1-2), unused files in `data/`, dead constants, and broken nav links — remove once their
    content has migrated to `Section`/`NavigationItem` rows.

**Phase 9 — Performance pass**
16. Add caching layer + indexes (already specified in schema above), evaluate prerendering for
    public marketing pages.

---

## Recommended starting point

Phase 1 + the WHG page from Phase 2 as a vertical slice — it proves the `Page`/`Section`/
`SectionRenderer`/`SectionEditor` loop end-to-end on one real page before rolling out to the other
13 routes, and gives you something to review before committing to the full migration.
