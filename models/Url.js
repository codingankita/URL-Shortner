const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
    clicks: { type: Number, default: 0 },
    dateCreated: { type: Date, default: Date.now }
});     

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;


// Perfect ask, Love 😎 — this is *exactly* the phase where side projects become your superpower.
// You’ve already got 5.5+ years of backend dev experience, so you don’t need “tutorial” projects — you need **realistic, interview-ready projects** that stretch your **architecture skills**, **scalability concepts**, and **cloud exposure** (Node.js + Express + Mongo/Postgres + AWS + microservices).

// Let’s plan this smartly:
// I’ll give you project ideas **ranked by complexity**, **tech coverage**, and **resume value**, so you can pick based on how much time you have.

// ---

// ## 🧱 **Level 1 – Warm-up (2–3 weeks each)**

// These refresh your fundamentals & can evolve into bigger systems later.

// ### 1️⃣ **URL Shortener Service (Microservice + Caching)**

// * **Tech:** Node, Express, MongoDB, Redis, Nginx
// * **Concepts:**

//   * Hashing algorithms for unique short URLs
//   * TTL expiry for links
//   * Rate limiting middleware
//   * Caching with Redis
//   * Deploy to AWS (EC2 or Elastic Beanstalk)
// * **Why:** Classic system-design interview favorite.

// 🧠 *Bonus:* add analytics — track how many times a link was opened, by which region/IP.

// ---

// ### 2️⃣ **Task Management API (Trello-lite)**

// * **Tech:** Node, Express, PostgreSQL, JWT Auth
// * **Concepts:**

//   * CRUD + pagination
//   * Role-based access control (RBAC)
//   * Optimistic locking (versioning)
//   * Sequelize or Prisma ORM
//   * Unit + integration tests (Jest/Supertest)

// 🧠 *Bonus:* add WebSocket or SSE for real-time task updates.

// ---

// ## ⚙️ **Level 2 – Intermediate (4–6 weeks)**

// Here we start showing microservice and AWS integration muscles.

// ### 3️⃣ **E-Commerce Backend (Microservices + AWS S3 + Message Queue)**

// * **Services:**

//   * `user-service` (Auth, profile)
//   * `product-service` (CRUD, stock, images)
//   * `order-service` (order placement, status, billing)
// * **Tech:** Node, Express, Mongo/Postgres, RabbitMQ or Kafka
// * **AWS Integration:** S3 (image upload), SES or SNS (email/sms), EC2 or ECS for deployment
// * **Concepts:**

//   * Event-driven communication (async via message queue)
//   * API Gateway pattern
//   * Centralized logging (Winston + CloudWatch)

// 🧠 *Bonus:* Use Docker Compose for local orchestration + deploy each microservice on a separate EC2 instance.

// ---

// ### 4️⃣ **Notification Microservice System**

// * **Tech:** Node, Express, MongoDB or Redis, AWS SNS/SQS
// * **Concepts:**

//   * Publish-subscribe messaging model
//   * Multiple channels: email, SMS, push notification
//   * Retry & dead-letter queues
//   * Message deduplication

// 🧠 *Bonus:* Add a dashboard (React frontend) that shows message delivery status (for your Saturday React experiments 😏).

// ---

// ## ☁️ **Level 3 – Advanced / Resume Gold (2–3 months)**

// These are “mini-startup” scale systems that show you can architect and scale.

// ### 5️⃣ **Microservices-Based Social Feed Platform**

// * **Services:**

//   * `auth-service` (JWT + refresh tokens)
//   * `user-service`
//   * `feed-service` (follow, unfollow, post feed)
//   * `media-service` (uploads to AWS S3)
// * **Tech:** Node, Express, MongoDB/Postgres, Kafka or Redis Streams
// * **AWS:**

//   * S3 (media)
//   * CloudFront (CDN)
//   * ECS or EKS (container deployment)
// * **Concepts:**

//   * Event sourcing
//   * Caching (Redis)
//   * Fan-out on write/read
//   * Load balancing and scaling

// 🧠 *Bonus:* add OpenTelemetry for tracing microservice communication.

// ---

// ### 6️⃣ **Serverless File Conversion Service**

// * **Tech:** AWS Lambda, S3, Node.js, DynamoDB/PostgreSQL
// * **Concepts:**

//   * Upload triggers → Lambda → Process → Save results
//   * IAM roles, CloudWatch logs, monitoring
//   * API Gateway + Lambda combo

// 🧠 *Bonus:* Add a queue system for large files and retry mechanisms.

// ---

// ## 🧭 How to Choose

// | Goal                                     | Pick This                         |
// | ---------------------------------------- | --------------------------------- |
// | Quick practice, learn caching/API design | URL Shortener                     |
// | Improve DB + auth + testing              | Task Manager                      |
// | Learn AWS + queues + deployment          | E-Commerce backend                |
// | Get serious about microservices          | Notification System / Social Feed |
// | Try serverless + modern cloud            | File Converter Service            |

// ---

// ## 🚀 Resume-Ready Combo

// If your 6-month plan from before is still running, do this:

// | Month | Focus           | Project                           |
// | ----- | --------------- | --------------------------------- |
// | 1–2   | Backend refresh | URL Shortener + Task Manager      |
// | 3–4   | AWS + queues    | E-Commerce or Notification System |
// | 5–6   | Showcase build  | Social Feed or File Converter     |

// That’ll give you 2–3 **production-grade projects** by the time you switch jobs — exactly what interviewers look for.

// ---

// If you want, I can help you pick *one project* (based on how many hours you can spare weekly) and create a **step-by-step roadmap** — what to build in week 1, week 2, etc., including suggested AWS setup and GitHub structure.
// Want me to make that for your next weekend project?
