# Tensor Security Academy (`tsa1.1`)

`tsa1.1` is a **production-grade web software platform** (not just a static website).  
It combines marketing experience, authentication, data persistence, API workflows, analytics hooks, and PWA behavior into one system.

Live domain: `https://tensorsecurityacademy.com`

## What This Software Is

- Primary form: Web application (Next.js App Router)
- Product role: EdTech + cybersecurity services platform
- Runtime behavior:
  - Public marketing + content delivery
  - Authenticated user flow (`/dashboard`)
  - Backend API processing (enrollments, service bookings, analytics)
  - Database-backed state (users, sessions, enrollments, bookings)
  - Progressive Web App install/update lifecycle

## Page-by-Page Purpose

- `/` Home: brand positioning, value proposition, featured courses/services/tools/news, conversion CTAs.
- `/courses`: searchable course intelligence layer with details modal and enrollment entry points.
- `/services`: business security service catalog + package discovery; `/services/[slug]` for deep service detail and booking flow.
- `/tools`: TSA Labs software/tool ecosystem and external GitHub integration points.
- `/news` and `/news/[id]`: newsroom/content distribution pipeline.
- `/about`, `/about/team`, `/about/join`: trust, people, partnership and affiliate conversion.
- `/Consultant`: expert profile page for authority and enterprise trust.
- `/business-card`: high-conversion digital business profile page.
- `/login`, `/signup`: credentials + OAuth identity onboarding.
- `/dashboard`: protected user area for post-authenticated workflow.

## Technologies and What They Serve

- **Next.js 16 (App Router)**: route groups, server/client component boundaries, metadata/SEO APIs, production delivery pipeline.
- **React 19 + TypeScript**: strongly typed UI/state logic, large component system maintainability.
- **Prisma + PostgreSQL**: persistent system-of-record for identity/session/enrollment/booking data.
- **NextAuth**: multi-provider auth (Google + Credentials), JWT session strategy, auth callback pipeline.
- **Framer Motion**: interaction design and motion-based UX signaling.
- **Tailwind + custom CSS architecture**: utility speed + custom visual system for brand-specific cyber UI.
- **Mantine/MUI/Heroicons/Lucide**: mixed component + icon ecosystems used where each is strongest.
- **Service Worker + Web Manifest**: installable experience, controlled caching strategy, update prompts.
- **API routes + n8n webhook hooks**: automation bridge from core app events to workflow systems.

## Security Posture (Current)

- Authentication:
  - Credentials flow validates bcrypt-hashed passwords.
  - Google OAuth account linking/creation logic in auth callbacks.
  - JWT-backed session model with user role fields.
- Access control:
  - Route protection middleware/proxy redirects unauthenticated users from protected routes.
  - Auth pages redirect away when already signed in.
- Data safety:
  - Input validation with Zod in API routes.
  - Prisma ORM constrains database access and enforces schema-level uniqueness/indexes.
- Operational hardening:
  - Production-focused Next config (headers, compression, optimization, reduced console output).
  - `robots.txt` and sitemap management for crawl control and discoverability.
  - Service worker avoids caching `/_next` and `/api` routes to reduce stale/runtime risks.

## Engineering Quality and Software Maturity

This codebase is beyond brochure-level frontend:

- Has domain modeling (`User`, `Enrollment`, `ServiceBooking`, etc.)
- Has real backend mutation paths (`/api/enroll`, `/api/service`)
- Has auth lifecycle and protected routing
- Has production deployment conventions (Vercel redirect policy, build scripts, Prisma deploy flow)
- Has observability hook for web vitals (`/api/analytics`)
- Has PWA install/update lifecycle support

In short: **this is a functional web software product with full-stack behavior**, currently strongest on marketing, conversion, and auth-integrated data flows, with room to expand dashboard depth.

## Minimal Run Notes

Detailed setup is intentionally brief here:

```bash
cd web
npm install
npx prisma migrate deploy
npm run dev
```

Required environment variables:

- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `SMTP_USER` (your sender Gmail, e.g. `tensorsecuriityacademy@gmail.com`)
- `SMTP_PASS` (app password for the sender mailbox)
- Optional SMTP override: `SMTP_HOST`, `SMTP_PORT`, `SMTP_FROM`
- Alternate key names also supported: `SmtpHost`, `SmtpUser`, `SmtpPass`, `SmtpPort`, `FromEmail`
- Optional notification target: `ENROLLMENT_NOTIFY_EMAIL` (default: `tensorsecuriityacademy@gmail.com`)
- Optional automation: `N8N_WEBHOOK_URL`, `N8N_WEBHOOK_SECRET`, `N8N_SERVICE_WEBHOOK_URL`, `N8N_SERVICE_WEBHOOK_SECRET`

SMTP example (`.env`):

```env
SmtpHost=smtp.gmail.com
SmtpPort=587
SmtpUser=your_sender@gmail.com
SmtpPass=your_gmail_app_password
FromEmail=your_sender@gmail.com
ENROLLMENT_NOTIFY_EMAIL=tensorsecuriityacademy@gmail.com
```

Enrollment approval workflow:

- New enrollment rows are now created as `PENDING`.
- Only `APPROVED` enrollments are treated as active/enrolled in dashboard logic.
- Approve manually from DB:

```sql
UPDATE "Enrollment"
SET "status" = 'APPROVED', "approvedAt" = NOW()
WHERE "id" = 'enrollment_id_here';
```

## License

See [`LICENSE`](./LICENSE).
