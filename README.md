# Tensor Security Academy 

`tsa1.1` is a full-stack software product for cybersecurity education and security service delivery.  
It is designed to convert visitors into enrolled learners or service clients while preserving operational control for admins.

Live domain: `https://tensorsecurityacademy.com`

## What This Project Serves

- Builds trust and authority for Tensor Security Academy through a high-quality public platform.
- Converts traffic into paid learning and consulting demand.
- Manages enrollment and service booking as real backend data, not external form links.
- Gives admins control to approve course enrollments and monitor requests.
- Provides users a personalized dashboard to track their own activity and status.

## Problem -> Solution

- Problem: Marketing websites can attract leads but fail to operationalize them.
  - Solution: This system combines marketing + authentication + database + admin workflow in one product.
- Problem: External forms (e.g., third-party tools) break ownership and visibility.
  - Solution: Enrollment/service flows are handled by internal APIs and stored in PostgreSQL.
- Problem: Admin teams need controlled approval, users need clear status.
  - Solution: Enrollment lifecycle supports pending and approval states with dashboard visibility.
- Problem: Teams need real notifications for actions.
  - Solution: SMTP-based email notifications and optional automation hooks are integrated into backend routes.

## Core Product Modules

- Public Experience:
  - Home, courses, services, tools, news, about/team/join, consultant, business-card pages.
- Identity & Access:
  - Login/signup with credentials and Google OAuth.
  - Role-aware access (student/admin/instructor logic in auth/session callbacks).
- Enrollment System:
  - In-app course enrollment requests.
  - Pending approval workflow with admin actions.
  - User-side dashboard status reflection after approval.
- Service Booking System:
  - Structured service request intake with package and engagement details.
  - Persisted booking records for internal follow-up and operations.
- Admin Operations:
  - Admin-only approval panel for course enrollments.
  - Admin verification layer for sensitive actions.
  - Admin-side visibility into booking activity and requester identity.
- Notification Layer:
  - SMTP email notifications for enrollment events.
  - Optional n8n/webhook integration paths for workflow automation.

## Technology Stack and Why It Exists

- **Next.js 16 (App Router)**:
  - Server/client component boundaries, route groups, API routes, SEO metadata.
- **React 19 + TypeScript**:
  - Typed UI and predictable state transitions for long-term maintainability.
- **Prisma + PostgreSQL**:
  - Source-of-truth persistence for users, sessions, enrollments, and service bookings.
- **NextAuth**:
  - Unified auth lifecycle, OAuth + credentials support, JWT-backed sessions.
- **Zod**:
  - Runtime schema validation for API payload integrity.
- **Framer Motion + CSS system**:
  - Brand-consistent, high-impact interaction layer.
- **PWA stack (manifest + service worker)**:
  - Installability and improved repeat-visit UX.

## System Behavior (High-Level)

- Visitor enters through marketing surfaces.
- Interested user authenticates.
- User submits enrollment/service request.
- Backend validates and stores request in database.
- Admin reviews and approves enrollments where needed.
- Approved outcomes become visible in user dashboard state.
- Notification channels (email/automation) inform operations.

## Current Outcome

This repository represents a production-oriented software system, not a static brochure site.  
It combines conversion UX, secured identity, data persistence, admin workflow, and operational signaling in one deployable platform.

## License

See [`LICENSE`](./LICENSE).
