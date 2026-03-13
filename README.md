# Tensor Security Academy — Full-Stack EdTech Platform with Workflow Automation

- Live: https://tensorsecurityacademy.com
- Stack: Next.js 16 (App Router), PostgreSQL (Neon), NextAuth, Prisma, TypeScript, n8n Automation, OpenAI GPT-4
- Summary: A production-grade enrollment and service booking platform for cybersecurity education, replacing fragmented third-party tools with a unified, database-backed system featuring intelligent automation and AI-powered workflows.

**Problem Statement**

**Operational Fragmentation**
Cybersecurity training providers operate with scattered infrastructure:
- Marketing presence fragmented across Facebook, Twitter, Fiverr with no unified lead tracking
- Enrollment handled via Google Forms -> data ownership lost to third-party platforms
- Approval workflows coordinated manually via email -> no state management, no audit trail
- Service bookings require manual calendar coordination, client follow-up, and executive briefings
- No integration between systems -> repetitive data entry, lost leads, operational bottlenecks

**Educational Fragmentation ("Tutorial Hell")**
The learning experience suffers from structural problems:
- No clear progression path -> learners jump between disconnected tutorials and courses
- Theoretical knowledge without practical application -> no access to real security tools
- Outdated curriculum -> no coverage of AI-driven threats, modern attack vectors, LLM vulnerabilities
- Zero mentorship or industry alignment -> academic learning disconnected from job requirements
- High barrier to entry -> quality training costs $5k-20k, excluding talent from developing regions

**Market Context**
ISC2 2024 Cybersecurity Workforce Study reports a 4.8 million global shortage of cybersecurity professionals (up from 2.7M in 2019). Demand is exploding while structured, affordable, hands-on education remains inaccessible to most.
Impact: Lost revenue, compliance risk, poor learning outcomes, excluded talent from underrepresented regions, manual operational overhead preventing scale.

**Solution Architecture**
Tensor Security Academy consolidates fragmented operations into a single platform.

**Operational Consolidation**
| Problem | TSA Solution |
| --- | --- |
| External forms break data ownership | PostgreSQL-backed enrollment system with full schema control and audit logging |
| No approval workflow | Admin panel with PIN-verified state transitions (PENDING -> APPROVED -> REJECTED) |
| Zero request visibility for users | Real-time dashboard reflects enrollment status via database queries |
| Manual notification overhead | Event-driven SMTP notifications on state changes |
| Data inaccessible to stakeholders | Automatic Google Sheets sync via JWT service account authentication |
| No downstream automation | n8n webhook integration for service bookings -> AI summarization -> calendar scheduling -> executive notifications |

**Educational Structure**
| Problem | TSA Solution |
| --- | --- |
| "Tutorial Hell" fragmentation | Structured learning roadmap (beginner -> advanced) with course dependencies and progress tracking |
| Lack of hands-on experience | TSA Labs: open-source security tools, vulnerable environments, CTF challenges |
| Outdated curriculum | Modern threat coverage: AI security, LLM vulnerabilities, automated attack vectors, cloud security |
| Poor platform performance | 95+ Lighthouse score, < 2s LCP, edge-cached delivery, optimized critical rendering path |
| Weak security implementation | OAuth 2.0, CSRF protection, encrypted sessions, role-based access control, input validation at boundaries |
| Expensive barrier to entry | Accessible pricing, scholarship programs, free open-source resources |

**Core Platform Features**

**Public Marketing Surface**
- Server-rendered pages (home, courses, services, tools, news, about, team, join, consultant, business cards) optimized for SEO and performance
- Progressive Web App capabilities enable offline access for learners in low-connectivity regions

**Identity and Access Management**
- Google OAuth + credentials-based authentication via NextAuth.js
- JWT session strategy with role-aware callbacks (STUDENT / INSTRUCTOR / ADMIN)
- Middleware-enforced route protection with role-based access control
- Session persistence with automatic refresh and secure cookie handling

**Enrollment System**
User flow: Browse courses -> Submit enrollment form (international phone support, 80+ country codes) -> Zod validation at API boundary -> PostgreSQL persistence (status: PENDING) -> Admin approval panel with PIN verification -> Status update triggers email notification -> Google Sheets auto-sync via JWT assertion flow -> User dashboard reflects real-time status

Key engineering decisions:
- Server Actions for form submission (no client-side API calls, reduced attack surface)
- Rate limiting (5 req/15min per IP) prevents spam without external Redis dependency
- Async side effects (email, Sheets sync) don't block request response
- Enrollment lifecycle tracked in database with timestamps (createdAt, approvedAt) for audit compliance

**Service Booking System with Intelligent Automation**
User flow: Submit service request form (service title, package tier, organization details, scope, engagement type, timeline, budget, legal acceptance) -> Zod validation -> PostgreSQL persistence -> n8n webhook fires -> automated workflow executes

n8n workflow architecture:
- Webhook trigger receives booking payload from Next.js API
- Data extraction node parses client info, service details, requirements
- Google Calendar API creates consultation event and sends invites with 24h reminder
- OpenAI GPT-4 generates executive summary: scope complexity, urgency, revenue potential, 3-5 next steps
- Email dispatch to CEO and client with calendar confirmation
- Error handling via Sentry, admin alerting, and retry logic for transient failures

Service booking form Benefits:
- Zero manual coordination: calendar invites sent within seconds of submission
- AI-powered prioritization: CEO receives actionable intelligence, not raw form data
- Instant professional response: client gets confirmation before leaving the page
- Sales team alignment: shared calendar event with full context
- Audit trail: complete workflow execution logged in n8n

**TSA Labs (Open Source Security Tools)**
- GitHub-integrated security tool showcase with contribution guidelines
- Research community collaboration and downloadable vulnerable environments for hands-on practice

**Partnership Programs**
- Affiliate Program: commission structure, marketing resources, brand reach analytics
- Campus Ambassador Program: university representatives, promotional assets, event support
- Instructor Opportunities: teaching applications, curriculum collaboration, credential verification

**Admin Operations Panel**
- Role-restricted dashboard (middleware-enforced ADMIN check)
- PIN-verified sensitive actions (approval/rejection with crypto.timingSafeEqual to prevent timing attacks)
- Full enrollment and booking activity with filters (status, date range, country)
- User role management (promote STUDENT -> INSTRUCTOR, revoke access)
- Bulk operations (approve multiple enrollments, export to CSV)
- Real-time metrics (pending count, approval rate, service booking pipeline)

**System Architecture**
- Client Layer: Next.js SSR/SSG, PWA, Google OAuth, client UI
- Application Layer: Server Actions, API Routes, Zod Validation, Rate Limit
- Data Layer: PostgreSQL (Neon), Google Sheets (JWT auth), n8n Webhook
- Automation: n8n workflows for Calendar, GPT-4 analysis, SMTP notifications, Sentry logging

Architecture pattern: Component-based architecture with service layer separation, event-driven automation, and async workflow execution.

Critical design decisions:
- App Router over Pages Router: server components by default, client components only when interactivity required
- Prisma + PostgreSQL: relational integrity at DB level, type-safe queries, migration history for zero-downtime deployments
- JWT sessions over database sessions: reduced DB load and horizontal scalability without session store sync
- Google Sheets sync via raw JWT assertion: no SDK dependency, direct crypto.sign usage
- Self-hosted fonts (next/font): eliminate external CDN requests and reduce FCP by ~200ms
- CSS-native animations over JS loops: reduce main-thread blocking and TBT
- Zod validation at API boundaries: schemas validate inputs before Prisma interaction
- In-memory rate limiting: lightweight MVP without Redis (known serverless limitation)
- Event-driven n8n integration: decoupled booking submission and automation
- AI-powered summarization: actionable insights from raw form data

Tradeoffs:
- In-memory rate limiting does not scale across serverless instances -> migrate to Redis
- Google Sheets sync is one-way -> consider bidirectional sync or Airtable
- n8n webhook lacks signature verification -> add HMAC verification

**Tech Stack Rationale**
| Layer | Technology | Why This Over Alternatives |
| --- | --- | --- |
| Framework | Next.js 16 App Router | Server components reduce hydration overhead, file-based routing, edge support |
| Database | PostgreSQL (Neon) | Relational integrity, ACID compliance, serverless auto-scaling |
| ORM | Prisma | Type-safe queries, declarative migrations |
| Auth | NextAuth.js | OAuth + credentials, JWT sessions, CSRF protection |
| Validation | Zod | Runtime type safety at API boundaries |
| UI/Animations | Tailwind CSS + Framer Motion | Utility CSS + advanced animations |
| Email | Resend | Modern SMTP API, better deliverability |
| Automation | n8n | Self-hosted, visual workflows, 300+ integrations |
| AI | OpenAI GPT-4 | Best-in-class reasoning for requirement analysis |
| Monitoring | Sentry | Full-stack error tracking |
| Deployment | Vercel | Zero-config Next.js deployment, global edge CDN |

**Database Schema**
Core models:
- User (id, email, role: STUDENT/INSTRUCTOR/ADMIN)
- Enrollment (id, userId, courseId, status: PENDING/APPROVED/REJECTED, phone, countryCode, syncedToSheets, approvedBy, approvedAt)
- ServiceBooking (id, serviceTitle, selectedPackage, fullName, organizationName, email, whatsappNumber, country, requirements, engagementType, timeline, budgetRange, n8nWebhookFired, calendarEventId, aiSummarySent)
- Session / Account (NextAuth session management)

Key relationships:
- User -> Enrollment (one-to-many)
- User -> Account (one-to-many, OAuth providers)
- User -> Session (one-to-many)

Indexes:
- Enrollment.userId, Enrollment.status, Enrollment.createdAt
- ServiceBooking.createdAt, ServiceBooking.email, ServiceBooking.country

Data integrity:
- Cascade delete on user removal
- Relational constraints enforced at DB level
- Efficient indexing for query performance

See `prisma/schema.prisma` for full schema details.

**Data Flow**

Enrollment submission:
User submits form -> Zod validation -> rate limit check (IP-based, 5 req/15min) -> insert Enrollment (PENDING) -> async email + Sheets sync -> success response

Admin approval:
Admin views pending enrollments -> approves with PIN verification -> update status to APPROVED and set approvedBy/approvedAt -> send approval email -> revalidate dashboard cache

Service booking:
Submit form -> Zod validation -> insert ServiceBooking -> fire n8n webhook -> workflow runs (Calendar, AI summary, notifications) -> mark n8nWebhookFired and store calendarEventId

**Performance Engineering**
Production Web Vitals (Vercel Analytics):
- Lighthouse Score: 95+ (Performance: 98, Accessibility: 100, Best Practices: 100, SEO: 100)
- LCP: 1.8s (target < 2.5s)
- FID: 45ms (target < 100ms)
- CLS: 0.05 (target < 0.1)
- TBT: 150ms (target < 200ms)
- FCP: < 1.5s

Optimization strategies:
- Critical rendering path: inlined critical CSS, deferred non-critical JS
- Image optimization: AVIF/WebP with next/image, lazy loading, responsive srcset
- Code splitting: dynamic imports for heavy components, route-based chunking
- Edge caching: static assets on Vercel CDN, stale-while-revalidate
- Font optimization: self-hosted fonts preloaded, font-display swap
- Database query optimization: indexed queries, Prisma select projection, connection pooling
- Compression: Gzip/Brotli for text assets, minified JS/CSS

Monitoring and alerting:
- Sentry tracks Core Web Vitals regressions
- Vercel Analytics RUM identifies slow pages
- Prisma slow query detection for DB performance

**Security Architecture**
Authentication and authorization:
- OAuth 2.0 via Google
- JWT sessions with httpOnly cookies
- CSRF tokens on state-changing operations
- Role-based middleware (if token.role !== 'ADMIN' redirect to /unauthorized)
- Session rotation on privilege escalation

Input validation and sanitization:
- Zod schemas validate all API inputs before database interaction
- Prisma parameterized queries prevent SQL injection
- Rate limiting prevents spam and brute force
- Error messages sanitized

Data protection:
- Database credentials stored in Vercel environment variables
- Google service account keys rotated quarterly
- Admin PIN hashed with bcrypt
- PII encryption planned (field-level)

API security:
- n8n webhook has no signature verification (planned HMAC)
- CORS configured for same-origin only
- Rate limiting on public endpoints
- Error messages sanitized (no stack traces exposed)

Compliance considerations:
- GDPR: user data export and deletion planned
- PCI-DSS: not applicable yet (Stripe will handle compliance)
- SOC 2: audit logging planned

**Project Structure**
```text
/
|-- app/
|   |-- (marketing)/
|   |-- (auth)/
|   |-- dashboard/
|   |-- admin/
|   |-- api/
|-- components/
|   |-- ui/
|   |-- forms/
|-- lib/
|   |-- auth.ts
|   |-- db.ts
|   |-- validations.ts
|   |-- google-sheets.ts
|-- prisma/
|   |-- schema.prisma
|-- public/
```

**Deployment and Infrastructure**
- Platform: Vercel Edge Network
- Database: Neon PostgreSQL (serverless, auto-scaling)
- Automation: n8n (self-hosted on DigitalOcean Droplet, 2vCPU/4GB RAM)
- Email: Resend SMTP (dedicated sending IP, DKIM/SPF/DMARC configured)
- Monitoring: Sentry, Vercel Analytics

CI/CD pipeline:
- Push to main -> GitHub Actions runs tests
- Vercel builds Next.js app
- Prisma migrations auto-apply
- Deploy to production


**Business Impact**
Tangible metrics:
- 70-80% reduction in user search time
- Zero licensing costs, saves $10k-20k annually
- ~20 hours/week saved through automation
- 40-60% organic traffic increase
- 40-50% lower bounce rate
- 100+ bookings/day capacity

Intangible value:
- Professional credibility with unified platform
- Eliminates "Tutorial Hell" with structured learning paths
- Global accessibility with PWA offline support
- Data ownership for product iteration and segmentation
- Audit compliance with database-backed workflows
- Competitive differentiation through TSA Labs and AI automation

**Sustainability**
- Technical: modular component architecture, type-safe code, low maintenance overhead
- Economic: serverless infrastructure scales cost linearly with usage
- Environmental: optimized assets reduce bandwidth, Vercel runs on renewable energy
- Social: addresses global cybersecurity workforce gap and expands access

**Roadmap**
Completed:
- Core platform (marketing, courses, services, OAuth, admin approval)
- Google Sheets integration
- Service booking with n8n automation and AI summarization
- Google Calendar integration
- Email notifications
- PWA support

Planned:
- Payment integration (Stripe)
- Certificate generation
- Live session booking
- Community forum
- Mobile app
- Webhook signature verification
- CRM integration (HubSpot/Salesforce)

**Conclusion**
Tensor Security Academy demonstrates how modern full-stack engineering solves real-world business problems through thoughtful architecture, intelligent automation, and performance optimization. By replacing fragmented operations with a unified platform, TSA eliminates "tutorial hell," enables global access to cybersecurity education, and scales efficiently through event-driven workflows and AI-powered intelligence.

**License**
MIT - See `LICENSE`
