# HirePulse — AI-Powered Career Intelligence Platform

HirePulse is an end-to-end full-stack career acceleration and intelligence platform. It bridges the gap between candidates' skill sets and job market demands by offering automated resume parsing, ATS scoring, skill-gap analysis, personalized career/course recommendations, and dynamic resume building.

---

## Key Features

- **ATS Resume Analysis & Scoring:** Extracts text and skills from uploaded resumes to compute semantic match percentages against specific Job Descriptions.
- **Skill-Gap & Course Recommendation:** Identifies missing competencies and maps them to curated learning courses.
- **Career & Job Matching Engine:** Provides tailored career role alternatives and job recommendations based on profile and skill taxonomy.
- **Interactive Resume Builder:** Live multi-template rendering (Modern, Classic, Minimal) with custom accent color styling and PDF export.
- **Rule-Based Salary Estimation:** Aggregates skill count, cloud/AI expertise, and profile depth to project competitive market salary bands.
- **Dual-Role RBAC (Student & Admin):** Secure JWT-based authentication with distinct student intelligence dashboards and administrative platform monitoring.
- **Floating AI Assistant:** Integrated context-aware chatbot support across student workspaces.

---

## Tech Stack

### Frontend
- **Framework & Tooling:** React.js, Vite
- **Styling & UI:** Tailwind CSS, Framer Motion (Animations), Lucide React (Icons)
- **State & Routing:** React Router v6, Axios HTTP Client

### Backend
- **Framework:** Python, FastAPI
- **Database & ORM:** PostgreSQL (Supabase Cloud), SQLAlchemy
- **Data Validation:** Pydantic Schemas
- **Security:** JWT (JSON Web Tokens), OAuth2 Password Bearer, Bcrypt Hashing

### Deployment & Infrastructure
- **Frontend Hosting:** Vercel
- **Backend Hosting:** Render
- **Database:** Supabase Managed PostgreSQL Instance
- **Version Control:** Git & GitHub

---

## Architecture Overview

```text
       +-----------------------+
       |   React (Vite + UI)   |
       +-----------+-----------+
                   | (Axios / REST)
                   v
       +-----------------------+
       |    FastAPI Backend    |
       |  (Routers & Schemas)  |
       +-----------+-----------+
                   | (SQLAlchemy ORM)
                   v
       +-----------------------+
       | PostgreSQL (Supabase) |
       +-----------------------+
