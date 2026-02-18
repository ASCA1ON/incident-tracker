# 🚀 Quick Start Guide

## Prerequisites
- Node.js 18+ installed
- Free Supabase account (or any PostgreSQL database)

## 5-Minute Setup

### 1. Get Database (Supabase - Free)
1. Go to https://supabase.com → Sign up
2. Create new project
3. Settings → Database → Copy "Direct connection" string
4. Should look like: `postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres`

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env - paste your database URL

npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run start:dev
```

Backend runs on: http://localhost:3000

### 3. Frontend Setup (New Terminal)
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: http://localhost:5173

### 4. Test It!
- Open http://localhost:5173
- You should see 200 seeded incidents
- Try creating a new incident
- Test filtering, sorting, search
- Click on an incident to edit it

## What You Should See

**Main List Page:**
- Table with 10 incidents per page
- Search bar (try typing "login")
- Severity filter (SEV1-SEV4)
- Status filter (OPEN/MITIGATED/RESOLVED)
- Service filter
- Click column headers to sort
- Pagination controls at bottom

**Create Page:**
- Form with all fields
- Validation (title and service required)
- Creates incident and redirects to detail page

**Detail Page:**
- Edit any field
- Save changes
- Delete incident

## Quick Tests

1. **Search**: Type "high latency" in search box
2. **Filter**: Select "SEV1" from severity dropdown
3. **Sort**: Click "Created At" column header twice
4. **Create**: Click "New Incident" button
5. **Edit**: Click any incident title → Change status → Save
6. **Delete**: Click incident → Delete button → Confirm

## Troubleshooting

**"Connection refused" error?**
→ Make sure backend is running on port 3000

**"Database connection failed"?**
→ Check your .env DATABASE_URL is correct

**Port 3000 already in use?**
→ Edit backend/.env and change PORT=3000 to PORT=3001
→ Also update frontend/.env to VITE_API_URL=http://localhost:3001

**CORS errors?**
→ Backend CORS is configured for localhost:5173. If you change frontend port, update backend/src/main.ts

## API Testing (Optional)

Test the API directly:

```bash
# Get all incidents
curl http://localhost:3000/api/incidents?page=1&limit=10

# Create incident
curl -X POST http://localhost:3000/api/incidents \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Incident",
    "service": "Test Service",
    "severity": "SEV3"
  }'

# Get single incident
curl http://localhost:3000/api/incidents/[INCIDENT_ID]
```

## Next Steps

Read the main README.md for:
- Full API documentation
- Architecture decisions
- Improvement ideas
- Production deployment tips

Happy coding! 🎉
