# miniBase

A clean full-stack student directory app with live search by enrollment number and name.

miniBase is designed to demonstrate practical software engineering fundamentals: API design, database integration, frontend UX, and clear project structure.

## Why This Project Stands Out

- Built end-to-end: Next.js frontend + FastAPI backend + SQLite database.
- Real user value: instant match suggestions while typing.
- Professional fundamentals: separated frontend/backend, REST endpoints, CORS handling, reproducible local setup.
- Learning-ready codebase: small, readable, and easy to extend.

## Key Features

- Search students by enrollment ID.
- Search students by full or partial name.
- Live autocomplete suggestions as users type.
- Fast API responses with SQLite-backed data.

## Tech Stack

- Frontend: Next.js, React, Tailwind CSS
- Backend: FastAPI, SQLAlchemy, Uvicorn
- Database: SQLite

## Quick Start

### 1) Backend

From project root:

```powershell
.\.venv\Scripts\python.exe backend\init_db.py
.\.venv\Scripts\python.exe -m uvicorn main:app --reload --app-dir backend
```

Backend runs at: http://127.0.0.1:8000

### 2) Frontend

In a new terminal:

```powershell
cd frontend
npm install
npm run dev
```

Frontend runs at: http://localhost:3000

## API Endpoints

- GET /students/{enroll}
  - Returns one student by exact enrollment number.
- GET /students?q=<query>&limit=<number>
  - Returns matching students for autocomplete.

## Project Structure

```text
miniBase/
  backend/    # FastAPI app, DB init script, dataset
  frontend/   # Next.js app (UI + search interactions)
```

## Impact

For teachers: demonstrates clear understanding of full-stack application flow and database-driven features.

For recruiters and companies: shows practical product thinking, API integration skills, and ability to deliver polished, user-facing functionality.

---

If you want, I can also add a short resume-ready "Project Highlights" section with measurable bullets (latency, scope, and engineering decisions).
