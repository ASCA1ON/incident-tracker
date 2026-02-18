# Incident Tracker - Full Stack Application

A production-ready incident tracking system built with NestJS, React, PostgreSQL, and Prisma ORM. This application allows engineering teams to create, browse, search, filter, and manage production incidents with a clean, responsive UI.

## 🌐 Live Demo (If Deployed)

**Frontend:**  
https://incident-tracker-gamma.vercel.app/

**Backend API:**  
https://incident-tracker-4ju6.onrender.com/

---  

### 🔐 SSL Configuration Note

To allow connection with Supabase, SSL verification is currently relaxed using:

NODE_TLS_REJECT_UNAUTHORIZED=0


⚠️ This disables TLS certificate verification and is insecure.

This configuration is being used for demonstration purposes only.

---

### ⏳ Render Free Tier Limitation

The backend is deployed on Render (free tier).

Free instances automatically spin down after inactivity.  
If the service has been idle, the first request may take **30–60 seconds** to respond while the instance wakes up.

Subsequent requests will respond normally once the service is active.

---

### 🚧 Production Readiness

This project is built as a full-stack architecture demonstration.

It is not production-ready in its current form.  
The following improvements would be required for production use:

- Proper SSL certificate validation
- Authentication & authorization
- Role-based access control
- Rate limiting
- Logging & monitoring
- Infrastructure hardening

The application is intended for portfolio and technical evaluation purposes.

---

# 📸 Application Screenshots

## 📊 Incident Dashboard

<img src="./screenshots/incident-list.png" width="900"/>

---

## ➕ Create Incident

<img src="./screenshots/create-incident.png" width="900"/>

---

## 📝 Incident Details & Edit

<img src="./screenshots/incident-details.png" width="900"/>

---

## 🎯 Features

### Backend (NestJS)

- ✅ RESTful API with proper validation
- ✅ Server-side pagination with efficient queries
- ✅ Advanced filtering (severity, status, service)
- ✅ Full-text search across multiple fields
- ✅ Column sorting (title, service, severity, status, createdAt)
- ✅ Prisma ORM with optimized database indexes
- ✅ Input validation using class-validator
- ✅ Error handling with proper HTTP status codes
- ✅ CORS enabled for frontend integration

### Frontend (React + Vite)

- ✅ Responsive UI with TailwindCSS
- ✅ Paginated incident table with loading states
- ✅ Debounced search (1s delay)
- ✅ Real-time filtering and sorting
- ✅ Create new incidents with validation
- ✅ View and edit incident details
- ✅ Delete incidents with confirmation
- ✅ React Query for efficient data fetching and caching
- ✅ React Hook Form for form management
- ✅ Clean component architecture

## 🛠 Tech Stack

### Backend

- **Framework**: NestJS (TypeScript)
- **Database**: PostgreSQL (via Supabase free tier)
- **ORM**: Prisma
- **Validation**: class-validator, class-transformer
- **Runtime**: Node.js

### Frontend

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Routing**: React Router v6
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Date Formatting**: date-fns
- **Notifications**: React Hot Toast

## 📋 Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (or free Supabase account)
- Git

## 🚀 Getting Started

### 1. Clone the Repository

### 2. Database Setup (Supabase - Free)

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to Project Settings → Database
4. Copy the connection string (Direct connection)
5. It will look like: `postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT].supabase.co:5432/postgres?pgbouncer=true&sslmode=require"`

### 3. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env and add your database URL
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres?pgbouncer=true&sslmode=require"
# if other that http://localhost:5173 or http://localhost:3000 add below
FRONTEND_URL="http://localhost:5173"


# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Seed database with ~200 sample incidents
npm run prisma:seed

# Start development server
npm run start:dev
```

The backend will start on `http://localhost:3000`

### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file (optional - defaults to localhost:3000)
cp .env.example .env

# Start development server
npm run dev
```

The frontend will start on `http://localhost:5173`

## 📡 API Overview

### Base URL

```
http://localhost:3000/api
```

### Endpoints

#### **GET /api/incidents**

Fetch paginated incidents with filtering and sorting

**Query Parameters:**

- `page` (number, default: 1) - Page number
- `limit` (number, default: 10) - Items per page
- `search` (string) - Search in title, service, owner
- `severity` (enum) - Filter by SEV1, SEV2, SEV3, SEV4
- `status` (enum) - Filter by OPEN, MITIGATED, RESOLVED
- `service` (string) - Filter by service name
- `sortBy` (string) - Sort field (title, service, severity, status, createdAt)
- `sortOrder` (string) - Sort direction (asc, desc)

**Response:**

```json
{
  "data": [
    {
      "id": "uuid",
      "title": "High latency detected",
      "service": "Auth Service",
      "severity": "SEV2",
      "status": "OPEN",
      "owner": "john@example.com",
      "summary": "Users experiencing slow login times",
      "createdAt": "2024-02-16T10:30:00Z",
      "updatedAt": "2024-02-16T10:30:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 200,
    "totalPages": 20
  }
}
```

#### **GET /api/incidents/:id**

Get a single incident by ID

**Response:** Single incident object

#### **POST /api/incidents**

Create a new incident

**Request Body:**

```json
{
  "title": "Service outage",
  "service": "Payment Service",
  "severity": "SEV1",
  "status": "OPEN",
  "owner": "sarah@example.com",
  "summary": "Payment processing completely down"
}
```

**Required fields:** `title`, `service`, `severity`

#### **PATCH /api/incidents/:id**

Update an existing incident

**Request Body:** Partial incident object (any field)

#### **DELETE /api/incidents/:id**

Delete an incident

**Response:** 200 OK

## 🏗 Architecture & Design Decisions

### Backend Architecture

**NestJS Framework Choice:**

- Selected NestJS as it's the company's tech stack
- Provides excellent TypeScript support and dependency injection
- Built-in validation, exception handling, and modular architecture
- Follows Angular-like patterns familiar to many developers

**Prisma ORM:**

- Type-safe database queries with auto-generated TypeScript types
- Excellent migration system for database schema changes
- Connection pooling and query optimization out of the box
- Supports multiple databases (easy to switch from PostgreSQL if needed)

**Database Indexes:**

```prisma
@@index([service])
@@index([severity])
@@index([status])
@@index([createdAt])
```

These indexes significantly improve query performance for filtering and sorting operations.

**Pagination Strategy:**

- Offset-based pagination using `skip` and `take`
- Parallel queries for data and count to minimize latency
- Metadata includes total pages for better UX

**Validation:**

- Class-validator decorators on DTOs
- Automatic validation via ValidationPipe
- Whitelist option to strip unknown properties
- Transform option for type coercion

### Frontend Architecture

**Component Structure:**

```
src/
├── api/              # API client and endpoints
├── components/       # Reusable UI components
├── constants/        # Enums and configuration
├── pages/           # Route-level components
└── main.jsx         # App entry point
```

**State Management:**

- React Query for server state (caching, background updates)
- Local state with useState for UI interactions
- No global state needed due to React Query's caching

**Performance Optimizations:**

- Debounced search (1s) to reduce API calls
- Query key invalidation for cache updates
- Parallel API calls where possible
- Lazy loading of routes (could be added)

**Form Management:**

- React Hook Form for performant, uncontrolled forms
- Validation rules co-located with form fields
- Dirty state tracking to prevent unnecessary saves

**Styling Approach:**

- TailwindCSS for utility-first styling
- No component library to keep bundle size small
- Consistent color scheme for severity and status badges
- Responsive design with mobile-first approach

## 🔍 Key Features Explained

### Server-Side Pagination

All pagination logic happens on the backend to handle large datasets efficiently. The frontend only receives 10 items per page.

### Debounced Search

Search input has a 1s debounce to avoid excessive API calls while typing. This provides a smooth UX while being backend-friendly.

### Optimistic UI Updates

React Query handles cache invalidation automatically after mutations, ensuring the UI always shows the latest data.

### Error Handling

- Backend: NestJS exception filters provide consistent error responses
- Frontend: React Query error states trigger user-friendly error messages

## 🚧 Improvements with More Time

### Backend

1. **Authentication & Authorization**
   - JWT-based auth
   - Role-based access control (admin, engineer, viewer)
   - Owner-only edit permissions

2. **Advanced Features**
   - Incident timeline/activity log
   - File attachments (using S3)
   - Email notifications on status changes
   - Slack integration for critical incidents
   - Export to CSV/PDF

3. **Performance**
   - Redis caching for frequently accessed incidents
   - Cursor-based pagination for better performance
   - Full-text search with Elasticsearch
   - GraphQL API option for flexible queries

4. **Testing**
   - Unit tests with Jest
   - Integration tests for API endpoints
   - E2E tests with Supertest
   - Database tests with test containers

5. **DevOps**
   - Docker containerization
   - CI/CD pipeline (GitHub Actions)
   - Production/staging environments
   - Database backup automation
   - Monitoring with Datadog/NewRelic

### Frontend

1. **UX Enhancements**
   - Infinite scroll option
   - Bulk operations (delete, update status)
   - Advanced filters (date range, owner search)
   - Saved filter presets
   - Keyboard shortcuts
   - Dark mode

2. **Features**
   - Dashboard with charts (incidents over time, by severity)
   - Real-time updates with WebSockets
   - Drag-and-drop file upload
   - Rich text editor for summary
   - Comment threads on incidents

3. **Performance**
   - Virtual scrolling for large lists
   - Image optimization
   - Code splitting by route
   - Service worker for offline support

4. **Testing**
   - Component tests with React Testing Library
   - E2E tests with Playwright
   - Visual regression tests
   - Accessibility testing

5. **Developer Experience**
   - Storybook for component development
   - TypeScript for type safety
   - ESLint and Prettier configuration
   - Husky for pre-commit hooks

## 📝 Development Notes

### Database Migrations

```bash
# Create a new migration
npx prisma migrate dev --name description

# Apply migrations
npx prisma migrate deploy

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

### Prisma Studio

View and edit data with Prisma's GUI:

```bash
npx prisma studio
```

### Build for Production

```bash
# Backend
cd backend
npm run build
npm run start:prod

# Frontend
cd frontend
npm run build
npm run preview
```

## 🐛 Troubleshooting

**Database connection errors:**

- Verify DATABASE_URL in .env
- Check if Supabase project is active
- Ensure IP is whitelisted in Supabase (default: allow all)

**Port already in use:**

- Backend: Change PORT in .env
- Frontend: Vite will auto-increment to 5174

**CORS errors:**

- Check backend CORS configuration in main.ts
- Ensure frontend API_URL matches backend URL

# ⚠️ SSL Configuration Warning (PostgreSQL / Supabase)

When running the backend, you may see the following warning:

Warning: SECURITY WARNING: The SSL modes 'prefer', 'require', and 'verify-ca' are treated as aliases for 'verify-full'.

Warning: Setting the NODE_TLS_REJECT_UNAUTHORIZED environment variable to '0' makes TLS connections and HTTPS requests insecure by disabling certificate verification.

## Why This Happens

Supabase requires SSL connections.  
In some local development setups, the connection fails unless SSL verification is relaxed.

To make the database connection work locally, the following may have been used:

NODE_TLS_REJECT_UNAUTHORIZED=0

⚠️ **This disables TLS certificate verification and is NOT secure.**

---

## ✅ Recommended Fix (Safer Configuration)

Instead of disabling TLS verification, update your database connection string.

### Option 1 – Use `verify-full` (Recommended)

```

sslmode=verify-full

```

### Option 2 – Use libpq compatibility mode

```

uselibpqcompat=true&sslmode=require

```

Refer to official PostgreSQL SSL documentation:  
https://www.postgresql.org/docs/current/libpq-ssl.html

---

## 🚨 Important Notes

- `NODE_TLS_REJECT_UNAUTHORIZED=0` should only be used for local development.
- Never use it in production.
- Production deployments must enforce proper SSL certificate validation.

```



## 👤 Author
Akash
```
