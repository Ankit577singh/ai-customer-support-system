# AI Customer Support System (Full Stack)

A full-stack AI-powered customer support system built using:

- Frontend: React + Vite + Tailwind CSS
- Backend: Hono + TypeScript
- Database: PostgreSQL (Prisma ORM)
- Deployment: Vercel (Frontend) + Render (Backend & DB)

The system uses a multi-agent routing architecture to classify and delegate user queries dynamically.

---

# 🚀 Live Demo

Frontend: https://ai-customer-support-system-nine.vercel.app/ 
Backend API: https://ai-customer-support-system-8ijp.onrender.com  

---

#  Architecture Overview

User → Frontend (React)  
↓  
Backend (Hono API)  
↓  
Router Agent (Intent Classification)  
↓  
Specialized Agents (Order / Billing / Support)  
↓  
PostgreSQL (via Prisma ORM)

---

#  Project Structure

root/
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── hooks/
│ │ ├── services/
│ │ └── main.tsx
│ ├── index.html
│ ├── vite.config.ts
│ └── package.json
│
├── backend/
│ ├── prisma/
│ │ └── schema.prisma
│ │
│ ├── src/
│ │ ├── routes/
│ │ ├── services/
│ │ │ ├── router.service.ts
│ │ │ ├── order.service.ts
│ │ │ ├── billing.service.ts
│ │ │ └── support.service.ts
│ │ ├── repositories/
│ │ ├── lib/
│ │ └── index.ts
│ │
│ ├── package.json
│ ├── tsconfig.json
│ └── .env
│
└── README.md



---

#  Multi-Agent Routing Logic

The system uses a router agent as the entry point for all user messages.

1. The router analyzes the user message.
2. It classifies the intent (order, billing, or support).
3. Based on the classification, it delegates the request to a specialized agent.
4. Each agent interacts with the database using Prisma.
5. The final response is returned to the frontend.

This modular architecture ensures scalability and separation of concerns.

---

#  Environment Variables

## Backend (.env)

DATABASE_URL=database_url
API_KEY=ai_api_key
PORT=3000


## Frontend (.env)

VITE_API_URL=backend_url

⚠ In production, these are configured in Vercel and Render dashboards.

---

# 🛠 Backend Setup Instructions

1️. Navigate to backend: cd backend

2️. Install dependencies: npm install

3️. Setup database:   npx prisma migrate dev , npx prisma generate

4️. Run development server: npm run dev


Server runs at: http://localhost:3000


---

# 🛠 Frontend Setup Instructions

1️. Navigate to frontend: cd frontend

2️. Install dependencies: npm install

3. Run development server: npm run dev

Frontend runs at: http://localhost:5173

---















