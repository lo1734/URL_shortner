# Enterprise-Grade Scalable URL Shortener

A production-ready, highly scalable, and secure **URL Shortener & Real-Time Analytics Platform** built with a modern distributed stack. Designed for sub-5ms redirects, advanced monitoring, asynchronous event logging, and horizontal scaling.

---

## 🚀 Key Features

* **Sub-5ms Redirects:** Distributed caching powered by Redis for ultra-low latency redirection.
* **Asynchronous Event Processing:** Click tracking is handled out-of-band via **BullMQ** and **Redis** to prevent analytics logging from slowing down user redirection.
* **Real-Time Interactive Dashboard:** A custom-crafted Vite + React dashboard featuring dynamic charts, responsive search, status filters (Active vs. Expired), and sorting (Most Recent, Most Clicked, etc.).
* **Surgical Real-Time Refreshing:** Users can click on a specific row's clicks badge to refresh the click count of *only* that link using a background spinner without refreshing the page.
* **Premium Micro-Animations:** Stats cards count up or down smoothly from their *previous* values using a custom hook-driven animation system.
* **Advanced Monitoring & Tracing:** Built-in instrumentation with **OpenTelemetry** for distributed tracing and **Prometheus** for metrics aggregation (exported on `/metrics`).
* **Security First:** Rate limiting (with a Redis store), JWT Authentication, secure pass hashing, and Google reCAPTCHA validation (with development-mode bypasses).

---

## 🏗️ Architecture Design & Data Flow

This platform is structured around a decoupled **MVC/Service Architecture** supported by an asynchronous job worker to guarantee high performance under load.

```mermaid
graph TD
    User([User Client]) -->|1. Shorten / Manage / View| Express[Express Web Server]
    User -->|2. Click Short Link| Express
    
    %% Redis cache & Redirect flow
    Express -->|2a. Query Cache| Redis[(Redis Cache)]
    Redis -->|2b. Cache Hit / Fast Redirect| User
    Redis -->|2c. Cache Miss| PostgreSQL[(PostgreSQL DB)]
    PostgreSQL -->|2d. Update Cache| Redis
    
    %% Asynchronous Queue Flow
    Express -->|3. Push Event Job| AnalyticsQueue[BullMQ: analyticsQueue]
    AnalyticsQueue -->|Redis-backed| RedisQueue[Redis Queue]
    Worker[analyticsWorker.js] -->|4. Pull Job| RedisQueue
    Worker -->|5. Write ClickEvent| PostgreSQL
```

### 1. The Redirection Pipeline (Sub-5ms Cache-First)
1. When a user clicks a shortened link (e.g., `/P`), the request hits `redirectUrl`.
2. The server queries **Redis** first.
3. **On Cache Hit:** The server immediately issues a `302 Redirect` to the original URL.
4. **On Cache Miss:** A mutual exclusion lock (Mutex) is acquired to safely query **PostgreSQL** via **Prisma**, update Redis with a set TTL, and release the lock.
5. In parallel, a job containing client meta-data (IP, User-Agent, Referrer) is dispatched to the **BullMQ** queue.

### 2. Out-of-Band Analytics Logging (BullMQ Worker)
To keep redirection instant, database writes for click tracking are completely decoupled:
* **Producer:** The Express server pushes a `trackClick` payload to the Redis-backed BullMQ `analyticsQueue`.
* **Consumer:** A separate, background worker process (`analyticsWorker.js`) picks up jobs from Redis and registers the event in PostgreSQL.

---

## 🛠️ Technology Stack

| Layer | Technology | Key Capabilities |
| :--- | :--- | :--- |
| **Frontend** | React, Vite, TailwindCSS | Single-page app, CSS variable themes, Recharts, Lucide, custom count-up Hooks |
| **Backend** | Node.js, Express | MVC architecture, REST APIs, custom Middlewares |
| **Database** | PostgreSQL | Relational storage, relational integrity |
| **ORM** | Prisma v7 | Prisma Client with Postgres adapter connection pooling |
| **Caching / Queue**| Redis, BullMQ | IORedis client, memory caching, task queues, rate limit state |
| **Monitoring** | OpenTelemetry, Prometheus | Distributed tracing, instrumentation, performance metrics |
| **Security** | JWT, Recaptcha, Bcryptjs | Protected endpoints, spam prevention, password hashing |

---

## 📊 Database Schema (Prisma)

The data model is optimized for rapid relational lookups, using index constraints and cascade deletions.

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  urls      Url[]
}

model Url {
  id          Int          @id @default(autoincrement())
  shortCode   String       @unique
  originalUrl String
  createdAt   DateTime     @default(now())
  expiresAt   DateTime?
  userId      Int?
  user        User?        @relation(fields: [userId], references: [id])
  clickEvents clickEvent[]
}

model clickEvent {
  id        Int      @id @default(autoincrement())
  shortCode String
  ipAddress String?
  userAgent String?
  referrer  String?
  clickedAt DateTime @default(now())
  urlId     Int
  url       Url      @relation(fields: [urlId], references: [id], onDelete: Cascade)
}
```

---

## 📁 Repository Structure

```text
url_shortner/
├── prisma/                  # Prisma Database schema and migration scripts
├── client/                  # Vite + React SPA Frontend
│   ├── src/
│   │   ├── components/      # Reusable UI (StatsCard, UrlTable, Captcha, Charts)
│   │   ├── pages/           # Route views (Dashboard, Home, Analytics, Auth)
│   │   ├── services/        # API request services (Axios)
│   │   └── index.css        # Custom CSS variables, dark/light theme definitions
├── src/                     # Node.js + Express Backend
│   ├── controllers/         # Request handling and database querying logic
│   ├── services/            # URL lookup and creation service layer
│   ├── queue/               # BullMQ analytics queue and worker processes
│   ├── middleware/          # JWT auth, rate limiting, and CAPTCHA filters
│   ├── db/                  # Prisma client initialization with pg Pool
│   ├── routes/              # Express API route endpoints
│   ├── tracing.js           # OpenTelemetry SDK tracer initialization
│   └── app.js / server.js   # Express setup and entry points
├── prometheus.yml           # Prometheus metrics server configuration
└── docker-compose.yml       # Production-ready multi-container orchestration
```

---

## ⚙️ Configuration & Environment Variables

### Backend Configuration (`url_shortner/.env`)
Create a `.env` file in the root backend directory:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/db_name"
PORT=3000
BASE_URL=http://localhost:3000
JWT_SECRET=your_super_secret_jwt_key
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key_here
```

### Frontend Configuration (`url_shortner/client/.env`)
Create a `.env` file in the client directory:
```env
VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here
```

---

## 🏃 Run the Application Locally

### 1. Database Setup
Start your PostgreSQL and Redis instances. Once ready, run migrations to generate database tables and build the Prisma client:
```bash
npx prisma migrate dev
```

### 2. Start the Backend Server
From the root `/url_shortner` directory, start the Express app:
```bash
npm run dev
```

### 3. Start the Background Worker (Crucial)
To process the asynchronous click tracking events from the Redis queue and save them in PostgreSQL, start the worker in a separate terminal:
```bash
npm run worker
```

### 4. Start the Frontend Client
Navigate into the `/client` directory, install dependencies, and launch Vite:
```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173` in your browser to experience the platform!
```
