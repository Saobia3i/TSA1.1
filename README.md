<p align="center">
  <img
    src="https://ik.imagekit.io/ekb0d0it0/logo3.png"
    alt="Tensor Security Academy Logo"
    width="360"
    height="360"
    style="
      border-radius: 28px;
      border: 3px solid #e879f9;
      box-shadow:
        0 0 25px rgba(236, 72, 153, 0.9),
        0 0 45px rgba(59, 130, 246, 0.7),
        0 25px 55px rgba(0, 0, 0, 0.75);
    "
  />
</p>

# 🔐 Tensor Security Academy

> Global EdTech platform revolutionizing cybersecurity and AI education with cutting-edge technology and immersive learning experiences.

[![Next.js](https://img.shields.io/badge/Next.js-16.0.7-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.15.0-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![NextAuth](https://img.shields.io/badge/NextAuth.js-4.24.13-black?style=for-the-badge&logo=auth0&logoColor=white)](https://next-auth.js.org/)
[![Material UI](https://img.shields.io/badge/Material_UI-7.3.5-007FFF?style=for-the-badge&logo=mui&logoColor=white)](https://mui.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.18-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23.24-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

**Live Site:** [tensorsecurityacademy.com](https://tensorsecurityacademy.com)

## <ins>📊 WakaTime (Coding Activity)</ins>
[![wakatime](https://wakatime.com/badge/user/7f0860ba-774e-43d9-8390-34249079bba4/project/14cc4ab8-602c-4fc1-81c7-7f6139131b95.svg)]

---

## 🎯 Overview

Tensor Security Academy is a **global EdTech platform** designed to transform cybersecurity and AI education. Built from the ground up with modern web technologies, this platform offers an immersive, tech-forward learning experience with secure authentication, database-driven course management, and stunning animations that bring the cyber world to life.

**Built in 2025** by a single developer with a vision to make elite cybersecurity education accessible worldwide.

### ✨ Key Features

- 🔐 **Secure Authentication** - Google OAuth via NextAuth.js with PostgreSQL session management
- 🗄️ **Database-Driven** - PostgreSQL + Prisma ORM for scalable data management
- 🎓 **Dynamic Course System** - Real-time enrollment tracking and user dashboard (in development)
- 💼 **Professional Services** - Web application security assessments and consultation
- 🛠️ **Open-Source Security Tools** - Custom-built penetration testing toolkit
- 🎨 **Cyber-Themed UI/UX** - Immersive animations on every page with tech/cyber aesthetic
- ⚡ **Hyper-Optimized** - Critical CSS inlined, images optimized, 95+ Lighthouse score
- 📱 **Fully Responsive** - Seamless experience from mobile to desktop
- 🔍 **SEO Mastery** - Structured data, dynamic sitemap, optimized meta tags
- ✨ **Smooth Scrolling** - Active section highlighting and scroll-triggered animations

---

## 🚀 Tech Stack

### Core Framework
- **[Next.js 16.0.7](https://nextjs.org/)** - Latest App Router with server-side rendering and React Server Components
- **[React 19](https://react.dev/)** - Cutting-edge React with concurrent features
- **[TypeScript](https://www.typescriptlang.org/)** - Full type safety throughout the codebase

### Database & Authentication
- **[PostgreSQL](https://www.postgresql.org/)** - Robust relational database for production
- **[Prisma ORM](https://www.prisma.io/)** - Type-safe database queries and migrations
- **[NextAuth.js](https://next-auth.js.org/)** - Secure authentication with Google OAuth provider
- **Database Schema:** Users, Courses, Enrollments, Services, Sessions

### Styling & Animation
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS with custom optimizations
- **[Framer Motion](https://www.framer.com/motion/)** - Production-grade animations on every page
- **Custom CSS Optimization** - Critical CSS inlined for instant first paint
- **Cyber Aesthetic** - Dark themes, gradient accents, tech-inspired design system

### UI Components & Icons
- **[Material-UI (MUI)](https://mui.com/)** - Comprehensive React component library
- **[Heroicons](https://heroicons.com/)** - Beautiful hand-crafted SVG icons
- **[Lucide React](https://lucide.dev/)** - Modern icon system
- **[Swiper](https://swiperjs.com/)** - Touch slider for carousels
- **Custom Components** - Built from scratch for unique user experiences

### SEO & Performance
- **Next.js Metadata API** - Dynamic meta tags for every route
- **JSON-LD Schema** - Structured data for rich search results
- **Dynamic Sitemap** - Auto-generated sitemap.xml
- **301 Redirects** - Canonical URL management (www → non-www)
- **Image Optimization** - Next.js Image component with ImageKit CDN

### Deployment & Hosting
- **[Vercel](https://vercel.com/)** - Edge deployment with zero-config
- **[ImageKit](https://imagekit.io/)** - CDN for optimized image delivery
- **Custom Domain** - tensorsecurityacademy.com with SSL

---

## 🏗️ Architecture & Design Pattern

### Architecture Style: **Component-Based with Service Layer**

This project follows a **modular, component-driven architecture** with clear separation of concerns:

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│  (React Components + Framer Motion)     │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│          Business Logic Layer           │
│    (Server Actions + API Routes)        │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│          Data Access Layer              │
│         (Prisma ORM + Models)           │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│            Database Layer               │
│          (PostgreSQL)                   │
└─────────────────────────────────────────┘
```

**Key Patterns:**
- ✅ **Component-Based Architecture** - Reusable, composable UI components
- ✅ **Feature-First Organization** - Code organized by feature/domain
- ✅ **Server-Client Separation** - Clear boundaries with Next.js App Router
- ✅ **Type-Safe Data Layer** - Prisma generates TypeScript types from schema
- ✅ **Repository Pattern** - Data access abstracted through Prisma models

**It's MVC inspired** :
- **View:** React components (presentation)
- **Controller:** Server Actions + API routes (business logic)
- **Model:** Prisma schema (data structure)

---

## 📁 Project Structure

```
tensor-security-academy/
├── app/
│   ├── (marketing)/              # Marketing pages route group
│   │   ├── layout.tsx            # Root layout with global metadata
│   │   ├── page.tsx              # Homepage (server component)
│   │   ├── HomePageClient.tsx    # Client component with animations
│   │   ├── globals.css           # Global styles + critical CSS
│   │   ├── about/                # About pages
│   │   ├── courses/              # Course catalog & details
│   │   ├── services/             # Professional services
│   │   ├── tools/                # Security tools showcase
│   │   └── contact/              # Contact page
│   ├── dashboard/                # User dashboard (in development)
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── [...sections]         # Dashboard sections
│   ├── api/
│   │   ├── auth/                 # NextAuth.js API routes
│   │   │   └── [...nextauth]/
│   │   └── [...other]/           # Custom API endpoints
│   ├── sitemap.ts                # Dynamic sitemap generation
│   └── robots.ts                 # robots.txt generation
├── prisma/
│   ├── schema.prisma             # Database schema definition
│   └── migrations/               # Database migrations
│       └── 20251222142232_make_user_oauth_optional/
├── features/
│   └── home/
│       └── components/           # Feature-specific components
│           ├── HeroSection.tsx
│           ├── CoursesPreview.tsx
│           ├── ServicesPreview.tsx
│           └── ToolsPreview.tsx
├── components/
│   └── ui/                       # Reusable UI components
├── lib/
│   ├── auth.ts                   # NextAuth configuration
│   ├── prisma.ts                 # Prisma client singleton
│   └── utils.ts                  # Utility functions
├── public/
│   ├── logo.png                  # Brand assets
│   ├── og-image.png              # Social sharing image
│   └── favicon.ico
├── next.config.js                # Next.js config (redirects, headers)
├── tailwind.config.ts            # Tailwind customization
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies
```

---

## 🗄️ Database Schema

### Core Models:

```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  password      String?
  contact       String?    @unique
  role          String    @default("STUDENT")
  emailVerified DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  accounts      Account[]
  sessions      Session[]
  enrollments   Enrollment[]

  @@index([email])
  @@index([contact])
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

model Enrollment {
  id         String   @id @default(cuid())
  userId     String
  courseId   String
  courseName String
  enrolledAt DateTime @default(now())
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@unique([userId, courseId])
}

```

**Current Status:**
- ✅ Database schema defined
- ✅ Migrations created
- ✅ Prisma client configured
- 🔄 User dashboard (in development)
- 🔄 Admin panel (planned)

**Enrollment Flow:**
- Currently: Google Form → Manual processing
- Upcoming: Direct database enrollment → Auto-update dashboard

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 16+
- PostgreSQL 14+
- npm/yarn/pnpm
- Git

### Clone Repository
```bash
git clone https://github.com/saobia3i/tsa1.1.git
cd web
```

### Install Dependencies
```bash
npm install
# or
yarn install
```



### Database Setup
```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# (Optional) Seed database
npx prisma db seed
```

### Development
```bash
npm run dev
# Open http://localhost:3000
```

### Production Build
```bash
npm run build
npm start
```

---

## 🎨 Design Philosophy

### Cyber Aesthetic
Every page is designed with a **tech-forward, cyber-inspired aesthetic**:


### Animation Strategy
- **Scroll-Triggered** - Elements animate as they enter viewport
- **Micro-Interactions** - Hover effects, button animations
- **Page Transitions** - Smooth navigation between routes
- **Performance-First** - Optimized with Framer Motion's layout animations
- **Accessibility** - Respects `prefers-reduced-motion`

---

## 🔐 Authentication Flow

```
User clicks "Sign In"
        ↓
Google OAuth consent screen
        ↓
User grants permission
        ↓
NextAuth creates session
        ↓
User data stored in PostgreSQL
        ↓
JWT token issued
        ↓
User redirected to dashboard
```

**Security Features:**
- ✅ Secure session management
- ✅ CSRF protection
- ✅ OAuth 2.0 standard
- ✅ Encrypted cookies
- ✅ Database session persistence

---

## ⚡ Performance Optimizations

### Critical CSS Inlining
```typescript
// layout.tsx
<style id="critical-css">{`
  .hero-section { /* critical styles */ }
  .featured-grid { /* critical styles */ }
`}</style>
```

### Image Optimization
- Next.js Image component with lazy loading
- ImageKit CDN for transformations
- WebP format with fallbacks
- Responsive image sizing

### Code Splitting
- Dynamic imports for heavy components
- Route-based splitting with App Router
- Lazy loading for below-fold content

### Bundle Size
- Tree-shaking unused code
- Minification in production
- Gzip compression
- Edge caching via Vercel

**Results:**
- 📊 Lighthouse: 95+ (Performance)
- ⚡ FCP: < 1.5s
- 🎯 LCP: < 2.5s
- 📱 CLS: < 0.1

---





## 🚀 Deployment

### Vercel (Automated)
```bash
# Connect GitHub repo to Vercel
# Auto-deploys on push to main branch

# Environment variables set in Vercel dashboard
```

### Database Migration
```bash
# After deploying
npx prisma migrate deploy
```

### Post-Deployment
- ✅ Verify database connection
- ✅ Test authentication flow
- ✅ Check API routes
- ✅ Validate sitemap generation
- ✅ Test course enrollment

---

## 🛣️ Roadmap

### ✅ Completed (2025)
- [x] Landing page with animations
- [x] Course catalog system
- [x] Services pages
- [x] Security tools showcase
- [x] Authentication (Google OAuth)
- [x] Database schema & migrations
- [x] SEO optimization
- [x] Mobile responsiveness

### 🔄 In Progress
- [ ] User dashboard
- [ ] Direct course enrollment
- [ ] Payment integration
- [ ] Course progress tracking

### 📋 Planned
- [ ] Admin panel
- [ ] Live session booking
- [ ] Certificate generation
- [ ] Community forum
<!-- - [ ] Mobile app (React Native) -->

---

## 📊 Tech Highlights

### Dependencies (Core)
```json
{
  "next": "^16.0.7",
  "react": "^19.2.1",
  "typescript": "^5.0.0",
  "prisma": "^5.22.0",
  "@prisma/client": "^5.15.0",
  "next-auth": "^4.24.13",
  "@mui/material": "^7.3.5",
  "@mui/icons-material": "^7.3.5",
  "framer-motion": "^12.23.24",
  "lucide-react": "^0.553.0",
  "@heroicons/react": "^2.2.0",
  "tailwindcss": "^4.1.18",
  "swiper": "^12.0.3",
  "pg": "^8.16.3",
  "bcrypt": "^6.0.0"
}
```

### File Size
- Total Bundle: ~150KB (gzipped)
- First Load JS: ~85KB
- CSS: ~8KB (critical inlined)

### Browser Support
- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile: iOS 12+, Android 8+

---

## 👨‍💻 Developer

**Saobia Islam**  
Full-Stack Developer & Web Architect

- 📧 Email: islamsaobia@gmail.com
- 💼 LinkedIn: [linkedin.com/in/saobia-islam](https://linkedin.com/in/saobia-islam)
- 🐙 GitHub: [@saobia3i](https://github.com/saobia3i)
- 🌐 Website: [https://islamsaobia.vercel.app/](https://islamsaobia.vercel.app/)

**Role:** Solo developer, designer, and architect  
**Year:** 2025  
**Status:** Active development

---

## 📝 License

This project is proprietary software owned by Tensor Security Academy.  
All rights reserved © 2025 Tensor Security Academy

---

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for seamless deployment
- Prisma for type-safe database access
- NextAuth.js for authentication
- Framer Motion for beautiful animations
- Tailwind Labs for the CSS framework
- PostgreSQL community
<!-- - Open-source community -->

---

## 📞 Contact

**Tensor Security Academy**
- 🌐 Website: [tensorsecurityacademy.com](https://tensorsecurityacademy.com)
- 📧 Email: contact@tensorsecurityacademy.com
- 💬 WhatsApp: [+880 1871719419](https://wa.me/8801871719419)
- 🐦 Twitter: [@Tensor_Security](https://twitter.com/Tensor_Security)
- 💼 LinkedIn: [Tensor Security Academy](https://linkedin.com/company/tensorsecurityacademy)

---

<div align="center">

**Built with love,passion & dedication by Saobia Islam for the global cybersecurity community**

⭐ Star this repo if you find it helpful!

[Website](https://tensorsecurityacademy.com) • [Courses](https://tensorsecurityacademy.com/courses) • [Tools](https://tensorsecurityacademy.com/tools) • [Contact](https://tensorsecurityacademy.com/contact)

</div>