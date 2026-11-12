# The Volunteer Nations — Product Requirements Document (PRD)

**Document type:** Working document (living)
**Product:** The Volunteer Nations (TVN) — nonprofit volunteer platform & marketing website
**Prepared from the perspective of:** Client + UI/UX engineer + website developer
**Status:** Draft v1.0 — reflects current implementation + proposed improvements
**Last updated:** 2026-10-13

---

## 1. Document Purpose

This PRD captures what The Volunteer Nations web application **is today**, what it is **meant to do**, and what we **should do next**. It is written as a shared source of truth for stakeholders (the client/org leadership), designers, and developers.

It is based on a direct analysis of the codebase, not assumptions. Where the live implementation diverges from the original design specs, that is called out explicitly in [Section 12](#12-known-gaps--spec-drift).

> How to use this doc: Sections 1–6 are for everyone (vision, users, scope). Sections 7–11 are for design/engineering (IA, data model, functional requirements, NFRs). Section 12 onward tracks gaps, risks, and the roadmap.

---

## 2. Product Overview

The Volunteer Nations is a Nigeria-based (Lagos & Abuja) nonprofit that connects skilled, passionate volunteers with NGOs, nonprofits, and community organizations. The platform exists to make volunteer engagement **structured, reliable, and measurable** rather than ad-hoc.

The product has two distinct surfaces:

1. **Public marketing site** — tells TVN's story, showcases services and impact, publishes a blog, and captures two kinds of leads: volunteer sign-ups and partner (organization) inquiries.
2. **Admin dashboard (CMS)** — a password-protected area where staff manage all site content (hero, services, stats, testimonials, blog, CTA, about) and review the volunteer and partner submissions that come in.

### 2.1 Value proposition
- **For volunteers:** a clear, low-friction way to offer their skills to causes that matter.
- **For partner organizations:** a trustworthy channel to recruit, train, and manage vetted volunteers.
- **For TVN staff:** a self-service CMS to keep the site current without touching code, plus a lightweight CRM for incoming leads.

---

## 3. Goals & Success Metrics

### 3.1 Business goals
| # | Goal | Why it matters |
|---|------|----------------|
| G1 | Grow volunteer sign-ups | Volunteers are the core supply of the platform |
| G2 | Grow qualified partner inquiries | Partners create the demand/placements |
| G3 | Communicate credibility & impact | Trust drives both sides of the marketplace |
| G4 | Let staff self-manage content | Reduce dev dependency, keep content fresh |

### 3.2 Success metrics (proposed — not yet instrumented)
- **Conversion:** % of visitors who complete the volunteer form; % who complete the partner form.
- **Lead volume:** volunteer submissions / month, partner submissions / month.
- **Content freshness:** # of blog posts published / month; days since last hero or blog update.
- **Engagement:** blog article views, avg. time on page, bounce rate on `/volunteer` and `/partner`.
- **Quality/health:** Lighthouse scores (Performance, Accessibility ≥ 90, Best Practices, SEO).

> ⚠️ There is currently **no analytics instrumentation** in the codebase. Capturing G1–G3 requires adding analytics (see [Roadmap](#14-proposed-roadmap)).

---

## 4. Target Users & Personas

| Persona | Description | Primary needs | Key pages |
|---------|-------------|---------------|-----------|
| **Prospective Volunteer** | Individual wanting to donate time/skills | Understand how to help; quick sign-up | `/`, `/services`, `/about`, `/volunteer` |
| **Partner Organization Rep** | NGO / nonprofit / community leader | Confidence in TVN; submit an inquiry | `/`, `/services`, `/partner`, `/about` |
| **Reader / Supporter** | Browsing impact content | Compelling stories, easy navigation | `/blog`, `/blog/[slug]` |
| **Content Editor (Staff)** | TVN team member maintaining the site | Edit content safely, review leads | `/admin/**` |

---

## 5. Scope

### 5.1 In scope (current product)
- Public pages: Home, About, Services, Blog list, Blog detail, Contact, Volunteer, Partner.
- Lead capture: Volunteer form and Partner form (persisted to database).
- Admin CMS: manage Hero (carousel), Services, Stats, Testimonials, Blog (full CRUD), CTA, About; view Volunteer & Partner submissions.
- Admin authentication, protected routes, image upload.

### 5.2 Out of scope (today)
- Public user accounts / volunteer login portal.
- Automated volunteer↔partner matching workflow.
- Email notifications / autoresponders on form submission.
- Payments / donations.
- Multi-language / i18n.
- Analytics & reporting dashboards.

---

## 6. Current State Summary (as built)

A production-oriented **Next.js 16 (App Router)** application.

| Area | Technology |
|------|------------|
| Framework | Next.js **16.2.6** (App Router), React **19.2.4**, TypeScript 5 |
| Styling | Tailwind CSS **4** |
| Icons | lucide-react |
| Database | **MongoDB 7.5** (via `mongodb` driver) |
| Auth | **NextAuth 4** (Credentials provider, JWT sessions, 24h), **bcryptjs** for password hashing |
| Validation | **Zod 4** |
| Image handling | Upload → stored as **base64 in MongoDB** (`uploads` collection), served via `/api/images/[filename]` |
| Route protection | `proxy.ts` (Next 16's middleware equivalent) with `matcher: ["/admin/:path*"]` |
| Dev/test tooling | `mongodb-memory-server`, `fast-check` (property-based testing) |

> **Platform note (from `AGENTS.md`):** This is Next.js 16, which has breaking changes vs. older versions. Notably, route-protection middleware lives in `proxy.ts` exporting a `proxy()` function (not `middleware.ts`). Any future work must consult `node_modules/next/dist/docs/` before relying on older Next.js conventions.

---

## 7. Information Architecture & Navigation

### 7.1 Public routes
| Route | Rendering | Purpose |
|-------|-----------|---------|
| `/` | dynamic (`force-dynamic`) | Home: Hero carousel, Trusted orgs, Services, Impact stats, Testimonials, Blog preview, CTA |
| `/about` | dynamic | Mission, vision, approach, values |
| `/services` | dynamic | Service grid + "A Closer Look" expanded descriptions + CTA |
| `/blog` | dynamic | Grid of blog cards |
| `/blog/[slug]` | dynamic | Full article; `notFound()` for unknown slug; per-post metadata |
| `/contact` | static | Email, phone, location (Nigeria), social links. **No contact form.** |
| `/volunteer` | client form | Volunteer sign-up |
| `/partner` | client form + partner marquee | Partner inquiry |

**Primary nav (Navbar):** Home · Services · About · Blog · Contact · **Get Involved** dropdown (Volunteer, Partner) · **"Become a Volunteer"** CTA button. Sticky, backdrop-blur, mobile hamburger + accordion.

**Footer:** contact bar (Lagos & Abuja), brand + social icons (Facebook, LinkedIn, Instagram), Quick Links, Contact details, copyright.

### 7.2 Admin routes (protected)
| Route | Purpose |
|-------|---------|
| `/admin/login` | Credential login (public) |
| `/admin` | Dashboard: count cards + quick links |
| `/admin/hero` | Edit hero + carousel extra slides |
| `/admin/services` | Manage services collection |
| `/admin/stats` | Manage impact stats |
| `/admin/testimonials` | Manage testimonials |
| `/admin/blog`, `/admin/blog/new`, `/admin/blog/[slug]` | Blog CRUD |
| `/admin/cta` | Edit homepage CTA block |
| `/admin/about` | Edit about-page content |
| `/admin/volunteers`, `/admin/volunteers/[id]` | View volunteer submissions (read-only) |
| `/admin/partners`, `/admin/partners/[id]` | View partner submissions (read-only) |

### 7.3 API routes
| Route | Method | Purpose |
|-------|--------|---------|
| `/api/auth/[...nextauth]` | GET/POST | NextAuth handler |
| `/api/upload` | POST | Admin image upload (auth required, ≤5MB, image MIME only) |
| `/api/images/[filename]` | GET | Serve uploaded image from DB (1-year immutable cache) |

---

## 8. Data Model

Storage is **MongoDB**. Singletons (`hero`, `cta`, `about`) are stored as a single doc keyed `_key: "singleton"`. Collections (`services`, `stats`, `testimonials`, `blog`) are stored as documents and **auto-seeded** from `lib/data.ts` defaults on first read.

| Entity | Key fields | Notes |
|--------|-----------|-------|
| **HeroContent** | badge, headingLine1/Highlight/Line2, description, primaryCta/secondaryCta `{label, href}`, heroImage, `extraSlides[]` | Drives the hero **carousel**; up to 4 extra slides |
| **ServiceItem** | id, title, description, icon (lucide name), expanded? | Max 6 |
| **StatItem** | id, value, label | Max 4 |
| **TestimonialItem** | id, name, role, quote | Max 6 |
| **BlogPostItem** | slug, title, category, image (https), excerpt, body, createdAt, updatedAt | Full CRUD; slug auto-generated & deduped |
| **CtaContent** | heading, description, primaryCta, secondaryCta | Singleton |
| **AboutContent** | hero, mission, vision, approach{description, items[]}, values[] | Singleton |
| **AdminUser** | id, username, passwordHash, createdAt | `admins` collection |
| **VolunteerSubmission** | id, fullName, email, phone, areaOfInterest, motivation, submittedAt | From public form |
| **PartnerSubmission** | id, organizationName, contactName, email, organizationType, volunteerNeeds, submittedAt | From public form |

**Validation (Zod, `lib/schemas.ts`):** field length limits enforced (e.g., badge ≤60, headings ≤40, descriptions ≤300, blog body ≤10000); hrefs must start with `/` or `https://`; icons must match a lucide-react export; blog slug matches `^[a-z0-9]+(?:-[a-z0-9]+)*$`.

---

## 9. Functional Requirements

Requirements use **SHALL** for mandatory behavior. "Current" = already implemented; "Proposed" = recommended addition.

### 9.1 Public site — content
- **FR-1 (Current):** The site SHALL render all home sections from live DB content: Hero carousel, Trusted, Services, Impact, Testimonials, Blog preview, CTA.
- **FR-2 (Current):** All images SHALL use `next/image`; all internal links SHALL use `next/link`.
- **FR-3 (Current):** The hero SHALL present an auto-advancing carousel (5s) with crossfade, dot/arrow/play-pause controls, touch swipe, `prefers-reduced-motion` support, and an ARIA live region.
- **FR-4 (Current):** `/blog/[slug]` SHALL render the full post and SHALL return a not-found state for unknown slugs.

### 9.2 Lead capture
- **FR-5 (Current):** The Volunteer form SHALL collect full name, email, phone, area of interest, and motivation; SHALL validate required fields and email format client- and server-side; SHALL persist on success and show a confirmation.
- **FR-6 (Current):** The Partner form SHALL collect organization name, contact name, email, organization type, and volunteer needs; same validation and persistence behavior.
- **FR-7 (Proposed):** On successful submission, the system SHALL send a confirmation email to the submitter and a notification email to TVN staff.
- **FR-8 (Proposed):** The public `/contact` page SHALL offer a general contact form (today it only lists contact details).

### 9.3 Admin — authentication
- **FR-9 (Current):** Unauthenticated requests to `/admin/**` (except `/admin/login`, `/api/auth`) SHALL be redirected to `/admin/login` by `proxy.ts`.
- **FR-10 (Current):** Login SHALL verify username + bcrypt-hashed password against the `admins` collection and issue a JWT session (24h max age).
- **FR-11 (Current):** On invalid credentials, the UI SHALL show a generic error (no field disclosure).
- **FR-12 (Current, with caveat):** After 5 failed attempts in 15 min, the UI SHALL lock further attempts for 5 min. **Caveat:** this is enforced **client-side only** and resets on page reload — see [Risks](#13-risks--security-considerations).
- **FR-13 (Current):** Sessions older than 24h SHALL be invalidated and the user redirected to login.

### 9.4 Admin — content management
- **FR-14 (Current):** Each content section SHALL present a form pre-filled with current values and SHALL persist changes via authenticated server actions, then revalidate the affected public path(s).
- **FR-15 (Current):** Server actions SHALL verify an active session before any write and SHALL validate all input against the Zod schema, returning field-level errors on failure.
- **FR-16 (Current):** Blog create SHALL auto-generate a unique URL-safe slug and set `createdAt`/`updatedAt`; update SHALL preserve `slug`/`createdAt` and bump `updatedAt`; delete SHALL revalidate list and detail paths.
- **FR-17 (Current):** The sidebar SHALL link to all sections and SHALL highlight the active section.

### 9.5 Admin — submissions (CRM)
- **FR-18 (Current):** Admin SHALL list Volunteer and Partner submissions (newest first) with detail views.
- **FR-19 (Proposed):** Admin SHALL be able to update submission **status** (e.g., New / Contacted / Matched / Archived) and add internal notes.
- **FR-20 (Proposed):** Admin SHALL be able to export submissions to CSV.

### 9.6 Media
- **FR-21 (Current):** Authenticated admins SHALL upload images (JPEG/PNG/WebP/GIF/SVG, ≤5MB); files SHALL be stored and served via the image API.

---

## 10. UX / Design Requirements

### 10.1 Brand & visual system
Observed palette in code:
- **Primary blue** `#1565C0` (brand, CTAs, links) with hover `#0D47A1`
- **Deep navy** `#0D1B3E` (footer, hero overlays)
- **Accent orange** `#F57C00` (primary hero CTA, highlights)
- **Accent pink** `#E91E63`, **green** `#4CAF50` (secondary accents / carousel swatches)
- Neutrals: Tailwind `slate` / `gray` scales

**Typography:** Inter (via `next/font`). Headings are bold/black, uppercase in hero.

> 🎨 **UX recommendation:** Document these tokens formally (design tokens / Tailwind theme) so the brand stays consistent as the site grows. Right now colors are hardcoded as hex literals across components.

### 10.2 Experience principles
1. **Clarity over cleverness** — every page funnels to one of two actions: *Become a Volunteer* or *Partner With Us*.
2. **Trust signals** — stats, testimonials, partner logos, and real contact info build credibility.
3. **Low-friction conversion** — forms are short; validation is inline and specific.
4. **Motion with restraint** — the hero carousel respects `prefers-reduced-motion`.

### 10.3 Responsiveness
- Mobile-first; Navbar collapses to a hamburger + accordion below `md` (768px).
- Hero, grids, and footer are already responsive. New components SHALL maintain parity across mobile/tablet/desktop.

### 10.4 Content consistency issues to fix (UX polish)
These are small but visible and worth tracking:
- **Brand name inconsistency:** Navbar wordmark reads "The Volunteer's Nation", metadata/footer read "The Volunteer Nations", repo is "the-volunteer-nation". **Pick one canonical name and apply everywhere.**
- **Contact email mismatch:** Footer uses `hello@thevolunteernations.org`; `/contact` shows `thevolunteernations.org` as the email with a `mailto:thevolunteernations.org` (not a valid address). **Standardize.**
- **Partner logos & Trusted section** appear to be hardcoded placeholders; confirm whether these are real partners (legal/brand approval needed).

---

## 11. Non-Functional Requirements

| Category | Requirement |
|----------|-------------|
| **Accessibility** | Semantic HTML, descriptive `alt` text, keyboard navigability, visible focus states, ARIA on carousel/menus. Target Lighthouse Accessibility ≥ 90. Full WCAG conformance requires manual assistive-tech testing + expert review. |
| **Performance** | Use `next/image`, lazy-load non-critical images, dynamic rendering only where needed. Target Lighthouse Performance ≥ 90 on home. |
| **SEO** | Per-page metadata (present on blog detail, services, contact). **Proposed:** sitemap, `robots.txt`, Open Graph/Twitter cards, structured data for articles. |
| **Security** | See [Section 13](#13-risks--security-considerations). |
| **Reliability** | Content reads fail soft (admin dashboard counts fall back to 0; content layer seeds defaults). DB connection uses 5s timeouts. |
| **Maintainability** | Typed models, Zod validation, property-based tests available (`fast-check`). |
| **Browser support** | Modern evergreen browsers (Chrome, Edge, Firefox, Safari), mobile Safari & Chrome. |

---

## 12. Known Gaps & Spec Drift

The `.kiro/specs` describe an earlier design that the live code has moved past. Trackers below so docs and reality stay aligned.

1. **Storage migrated JSON files → MongoDB.** The `admin-dashboard` spec describes JSON-file storage with atomic temp-file writes, 2-space serialization, and path-traversal protection (Req 4 & 7). These no longer apply as written; `content/*.json` are legacy seed artifacts.
2. **Admin credentials source.** `.env.example` documents `ADMIN_USERNAME`/`ADMIN_PASSWORD_HASH`, but live auth reads admins from the `admins` MongoDB collection (seeded via `content/admins.json`). Decide on one source of truth and update docs.
3. **Blog rendering.** Original spec called for `generateStaticParams` (static generation). Live blog uses dynamic rendering + DB.
4. **Admin scope expanded** beyond the spec's 7 content sections to include **Volunteers** and **Partners** submission management.
5. **Image upload/storage** (base64 in MongoDB) is implemented but not described in either spec.
6. **Login rate limiting is client-side only** — weaker than the spec implies.

---

## 13. Risks & Security Considerations

| # | Risk | Severity | Recommendation |
|---|------|----------|----------------|
| R1 | **Client-side-only login rate limiting** resets on reload; no server-side brute-force protection | High | Add server-side attempt tracking / IP throttling |
| R2 | **Images stored as base64 in MongoDB** inflate document/storage size and memory on serve | Medium | Move to object storage (S3/Vercel Blob) or GridFS; keep API shape |
| R3 | **`next.config.ts` allows remote images from any https host (`**`)** | Medium | Restrict to known hosts once uploads are self-hosted |
| R4 | **No email/notification on new submissions** — leads can be missed | Medium | Add transactional email (FR-7) |
| R5 | **No analytics** — can't measure goals G1–G3 | Medium | Add privacy-respecting analytics |
| R6 | **Single admin role** — no granular permissions/audit log | Low–Med | Add roles + audit trail if staff grows |
| R7 | **Brand/contact inconsistencies** erode trust | Low | Fix per §10.4 |
| R8 | **No automated spam protection** on public forms | Medium | Add honeypot/CAPTCHA + server rate limiting |

---

## 14. Proposed Roadmap

**Phase 1 — Polish & trust (quick wins)**
- Fix brand name + contact email inconsistencies (§10.4).
- Add email notifications on volunteer/partner submissions (FR-7).
- Add spam protection to public forms (R8).
- Add SEO essentials: sitemap, robots.txt, Open Graph/Twitter cards.

**Phase 2 — Measurement & lead handling**
- Add analytics + conversion tracking for G1–G3.
- Submission status + internal notes + CSV export (FR-19, FR-20).
- Server-side login rate limiting (R1).

**Phase 3 — Scale & architecture**
- Move image storage off MongoDB; restrict remote image hosts (R2, R3).
- General `/contact` form (FR-8).
- Admin roles + audit log (R6).

**Phase 4 — Platform (strategic)**
- Volunteer accounts & portal.
- Volunteer↔partner matching workflow.
- Impact reporting dashboard.

---

## 15. Open Questions (for the client)

1. What is the **canonical organization name** and primary **contact email**?
2. Are the **partner logos / "trusted by" organizations** real and approved for display?
3. Do you want **automated email** to volunteers/partners on submission, and to which staff inbox?
4. Priority between **growing volunteers (G1)** vs **growing partners (G2)** — this shapes homepage emphasis.
5. Any **data-retention / privacy** requirements for stored submissions (relevant to Nigerian NDPR / general privacy expectations)?
6. Expected **content update cadence** and number of staff editors (informs roles/audit needs)?

---

## 16. Appendix — Repository Reference

| Concern | Location |
|---------|----------|
| Public pages | `app/*/page.tsx` |
| Admin UI | `app/admin/**` |
| Server actions | `app/admin/actions/*.ts` |
| Content data layer | `lib/content.ts` (MongoDB), seeds in `lib/data.ts` |
| Submissions | `lib/submissions.ts` |
| Auth | `lib/auth.ts`, route guard `proxy.ts` |
| Validation schemas | `lib/schemas.ts` |
| Types / data models | `types/index.ts` |
| Reusable components | `components/**` (Navbar, Footer, HeroCarousel, BlogCard, forms, section components) |
| Image upload/serve | `app/api/upload/route.ts`, `app/api/images/[filename]/route.ts` |
| Existing specs | `.kiro/specs/volunteer-nations-nextjs`, `.kiro/specs/admin-dashboard` |
