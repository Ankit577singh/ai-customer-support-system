# AI-Powered Customer Support System  
 

---

##  Overview

This project is an AI-powered customer support system built using a multi-agent architecture.  
A Router Agent analyzes incoming user messages and delegates them to specialized sub-agents:

- Support Agent
- Order Agent
- Billing Agent

The system maintains conversational context and persists all conversations and messages in the database.

---

##  Architecture

The backend follows a **Controller-Service pattern** with clean separation of concerns.

### Structure

backend/
│
├── src/
│   ├── agents/          # Router + Sub-agents
│   ├── controllers/     # API Controllers
│   ├── services/        # Business Logic
│   ├── repositories/    # Database Access Layer
│   ├── routes/          # API Routes
│   ├── middleware/      # Error handling middleware
│   ├── db.ts            # Prisma client
│   └── app.ts           # Server entry
│
├── prisma/
│   ├── schema.prisma
│   └── seed.ts

---

##  Multi-Agent System

###  Router Agent
- Analyzes incoming message
- Classifies intent (order / billing / support)
- Delegates to appropriate sub-agent
- Handles fallback

###  Support Agent
Handles:
- General support
- FAQs
- Troubleshooting

Tool Access:
- Conversation history

---

### Order Agent
Handles:
- Order status
- Tracking
- Cancellations
- Modifications

Tool Access:
- Fetch order details
- Delivery status

---

###  Billing Agent
Handles:
- Payment issues
- Refunds
- Invoice queries

Tool Access:
- Invoice details
- Refund status

---

## Agent Tools

Each sub-agent uses tools that query real data from the database.

Mock data is seeded using Prisma.

Database includes:
- Users
- Conversations
- Messages
- Orders
- Payments

---

##  Database

- PostgreSQL
- Prisma ORM
- Seeded with sample users, orders, payments, conversations

---

##  API Endpoints

Base Route: `/api`

### Chat

| Method | Endpoint | Description |
|--------|----------|------------|
| POST | /chat/messages | Send new message |
| GET | /chat/conversations/:id | Get conversation history |
| GET | /chat/conversations | List conversations |
| DELETE | /chat/conversations/:id | Delete conversation |

---

### Agents

| Method | Endpoint | Description |
|--------|----------|------------|
| GET | /agents | List available agents |
| GET | /agents/:type/capabilities | Agent capabilities |

---



---

##  Frontend

- React + Vite
- Basic chat UI
- Typing indicator
- Message history
- API integration with proxy

---

##  Conversation Context

- Each message is persisted in the database
- Context is fetched per conversation
- Agents use previous conversation history when responding

---

##  Tech Stack

Frontend:
- React (Vite)
- TailwindCSS

Backend:
- Hono.dev
- Controller-Service Pattern
- Error Middleware

Database:
- PostgreSQL
- Prisma ORM

AI:
- Rule-based routing (for assignment version)

---


