# 📅 MONTH 3 - BACKEND & DATABASE MASTERY (TypeScript Edition)

**Project:** RESTful API Platform with Database (Framework-Free)

---

## 🎯 GOAL

By Day 30:
- ✅ Build production-ready REST APIs **WITHOUT frameworks**
- ✅ Design normalized databases
- ✅ Optimize queries and indexes
- ✅ Implement authentication & authorization
- ✅ Handle errors gracefully
- ✅ Write API tests
- ✅ Understand backend security
- ✅ Master async/await patterns
- ✅ Build HTTP server from scratch

---

## 🧠 CORE FOCUS

- **Node.js http module (raw, NO Express)** ⭐
- HTTP protocol deep dive
- RESTful API design
- **TypeScript for backend** ⭐
- **Database theory & normalization**
- **SQL mastery & query optimization**
- **Indexing strategies**
- **Transaction management**
- **Pagination & filtering** ⭐ NEW
- **Soft deletes & audit trails** ⭐ NEW
- Authentication & sessions
- Authorization patterns
- **API testing**
- **Background jobs basics** ⭐ NEW
- **WebSockets introduction** ⭐ NEW
- Backend security
- Error handling & logging
- **Async/await mastery**

---

## 📚 RESOURCES

**Books:**
- "Node.js Design Patterns" – Mario Casciaro ⭐⭐⭐
- "Programming TypeScript" – Boris Cherny (from Month 2)
- "REST API Design Rulebook" – Mark Masse ⭐
- "Database Design for Mere Mortals" – Michael Hernandez ⭐⭐⭐
- "SQL Performance Explained" – Markus Winand ⭐⭐⭐
- "OWASP Top 10" (web)

**Docs:**
- Node.js Documentation (http, https, stream modules)
- TypeScript Handbook
- PostgreSQL Documentation
- node-postgres (pg) library docs
- OWASP API Security Top 10

**Why NO frameworks this month:**
You're building the HTTP server, router, middleware system, and request parser FROM SCRATCH. This teaches you what Express, Fastify, and NestJS do under the hood.

---

## 🗓 DAILY BREAKDOWN

### **Week 1: Backend Fundamentals + Database Theory**

#### **Day 1: How Backends Actually Work**
**Goal:** Understand the entire request/response flow

**Topics:**
- Client-server architecture
- What happens when you hit an API endpoint
- Stateless vs stateful backends
- Request/response cycle

**Build:**
- Simple Node.js HTTP server (raw http module)
- Handle GET request, return "Hello World"
- Log every request detail

**Resources:**
- Node.js http module docs
- "How does the Internet work?" (MDN)

---

#### **Day 2: HTTP Protocol Deep Dive**
**Goal:** Master HTTP fundamentals

**Topics:**
- HTTP methods (GET, POST, PUT, DELETE, PATCH)
- Status codes (200, 201, 400, 401, 404, 500)
- Headers (Content-Type, Authorization, CORS)
- Request/response anatomy

**Build:**
- HTTP server that responds with different status codes
- Parse request headers manually
- Set response headers

**Exercise:**
- Use curl or Postman to test all HTTP methods

---

#### **Day 3: Request Lifecycle**
**Goal:** Build request parsing from scratch

**Topics:**
- Reading request body (streams)
- Parsing JSON manually
- Query string parsing
- URL parsing

**Build:**
- Request body parser (for JSON)
- Query string parser
- URL path parser

**TypeScript Focus:**
- Type definitions for Request/Response
- Generic types for request handlers

---

#### **Day 4: Routing Foundations**
**Goal:** Build your own router

**Topics:**
- Route matching (exact, parameterized, wildcards)
- HTTP method routing
- Route parameters (/users/:id)

**Build:**
- Custom Router class
- Method-based routing (GET, POST, etc.)
- Route parameter extraction
- 404 handling

**Code Structure:**
```typescript
class Router {
  get(path: string, handler: RouteHandler): void
  post(path: string, handler: RouteHandler): void
  put(path: string, handler: RouteHandler): void
  delete(path: string, handler: RouteHandler): void
  handle(req: IncomingMessage, res: ServerResponse): void
}
```

---

#### **Day 5: Database Theory** ⭐
**Goal:** Understand relational databases fundamentally

**Topics:**
- Relational model basics
- ACID properties (Atomicity, Consistency, Isolation, Durability)
- Normal forms (1NF, 2NF, 3NF, BCNF)
- When to normalize vs denormalize

**Study:**
- Read "Database Design for Mere Mortals" Ch 1-3
- Practice normalization exercises

**Exercise:**
- Take a badly designed schema and normalize it
- Document violations of normal forms

---

#### **Day 6: Database Design** ⭐
**Goal:** Design production-ready schemas

**Topics:**
- Entity-Relationship (ER) modeling
- Primary keys & foreign keys
- One-to-many, many-to-many relationships
- Junction tables
- Constraints (UNIQUE, NOT NULL, CHECK)
- Schema design patterns

**Build:**
- Design schema for your API project (e.g., blog, e-commerce, social app)
- Create ER diagram
- Write CREATE TABLE statements

**Tools:**
- Draw.io or Lucidchart for ER diagrams
- PostgreSQL or MySQL

---

#### **Day 7: SQL Fundamentals** ⭐
**Goal:** Write complex SQL queries

**Topics:**
- SELECT, WHERE, ORDER BY, LIMIT
- JOINs (INNER, LEFT, RIGHT, FULL OUTER)
- Aggregations (COUNT, SUM, AVG, GROUP BY, HAVING)
- Subqueries
- Window functions (ROW_NUMBER, RANK, LAG, LEAD)
- CTEs (Common Table Expressions)

**Practice:**
- Write 20+ SQL queries
- Join 3+ tables
- Use window functions

**Resources:**
- SQL exercises (SQLBolt, LeetCode SQL)
- PostgreSQL tutorial

---

### **Week 2: API Development + SQL Mastery**

#### **Day 8: Query Optimization** ⭐
**Goal:** Write fast queries

**Topics:**
- EXPLAIN and EXPLAIN ANALYZE
- Query execution plans
- Index selection by query planner
- Query rewriting techniques
- Avoiding N+1 queries

**Practice:**
- Analyze slow queries with EXPLAIN
- Rewrite queries for performance
- Measure before/after execution time

**Tools:**
- PostgreSQL EXPLAIN
- pg_stat_statements extension

---

#### **Day 9: Indexing Deep Dive** ⭐
**Goal:** Master database indexes

**Topics:**
- B-tree indexes (default)
- When to create indexes
- Composite indexes (multi-column)
- Covering indexes
- Index overhead (write performance)
- UNIQUE indexes

**Practice:**
- Add indexes to your schema
- Measure query performance with/without indexes
- Create composite indexes for common queries

**Rules of Thumb:**
- Index foreign keys
- Index columns in WHERE, JOIN, ORDER BY
- Don't over-index

---

#### **Day 10: Transactions & Locking** ⭐
**Goal:** Ensure data consistency

**Topics:**
- BEGIN, COMMIT, ROLLBACK
- Transaction isolation levels (READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALIZABLE)
- Deadlocks (causes & prevention)
- Optimistic vs pessimistic locking
- Row-level vs table-level locking

**Build:**
- Implement database transactions in your API
- Handle rollback on errors
- Test concurrent writes

**Code Example:**
```typescript
const client = await pool.connect();
try {
  await client.query('BEGIN');
  await client.query('INSERT INTO users...');
  await client.query('INSERT INTO profiles...');
  await client.query('COMMIT');
} catch (e) {
  await client.query('ROLLBACK');
  throw e;
} finally {
  client.release();
}
```

---

#### **Day 11: RESTful API Design**
**Goal:** Design clean, intuitive APIs

**Topics:**
- REST principles (resources, URIs, HTTP methods)
- Resource naming conventions
- Plural vs singular (use plural: /users, /posts)
- Nested resources (/users/:id/posts)
- API versioning strategies (/v1/users)
- HATEOAS (optional/intro)

**Design:**
- Full API specification for your project
- Document all endpoints, methods, request/response formats

**Example:**
```
GET    /api/v1/users          → List all users
POST   /api/v1/users          → Create user
GET    /api/v1/users/:id      → Get user by ID
PUT    /api/v1/users/:id      → Update user
DELETE /api/v1/users/:id      → Delete user
```

---

#### **Day 12: CRUD Operations**
**Goal:** Build full CRUD API

**Build:**
- Implement all CRUD endpoints
- Connect to PostgreSQL (using `pg` library)
- Type-safe database queries with TypeScript
- Proper HTTP status codes

**Code Structure:**
```typescript
// controllers/userController.ts
export const getAllUsers = async (req, res) => { ... }
export const createUser = async (req, res) => { ... }
export const getUserById = async (req, res) => { ... }
export const updateUser = async (req, res) => { ... }
export const deleteUser = async (req, res) => { ... }
```

---

#### **Day 13: Input Validation**
**Goal:** Never trust user input

**Topics:**
- Validation vs sanitization
- Required fields, type checking
- Format validation (email, URL, UUID)
- Length constraints
- Custom validation rules

**Build:**
- Validation middleware (or use Zod/Joi)
- Error messages for validation failures
- Type-safe validation with TypeScript

**Libraries (optional):**
- Zod (runtime type checking)
- Joi (validation library)

**Example:**
```typescript
import { z } from 'zod';

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  age: z.number().min(18).max(120)
});
```

---

#### **Day 14: Error Handling Patterns**
**Goal:** Handle errors gracefully

**Topics:**
- try/catch with async/await
- Error classes (custom errors)
- Error middleware
- Consistent error response format
- Logging errors

**Build:**
- Global error handler
- Custom error classes (NotFoundError, ValidationError, etc.)
- Error logging (to console or file)

**Code Example:**
```typescript
class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

// Global error handler
const errorHandler = (err: AppError, req, res) => {
  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message
  });
};
```

---

### **Week 3: Auth, Security & Testing**

#### **Day 15: Authentication Basics**
**Goal:** Understand authentication fundamentals

**Topics:**
- Authentication vs authorization
- Stateless (JWT) vs stateful (sessions)
- Token-based authentication
- Refresh tokens

**Study:**
- How JWT works
- JWT structure (header, payload, signature)
- When to use sessions vs tokens

---

#### **Day 16: Session Management**
**Goal:** Implement session-based auth

**Topics:**
- Session creation
- Session storage (in-memory, Redis, database)
- Session cookies
- Session expiration

**Build:**
- Session-based login/logout
- Session middleware
- Secure session cookies (httpOnly, secure, sameSite)

**Note:** Build this WITHOUT libraries first. Understand the mechanics.

---

#### **Day 17: Password Hashing (bcrypt)**
**Goal:** Secure password storage

**Topics:**
- Never store plaintext passwords
- Hashing vs encryption
- bcrypt algorithm
- Salt rounds (cost factor)

**Build:**
- User registration with password hashing
- Login with password verification
- Use bcrypt library

**Code Example:**
```typescript
import bcrypt from 'bcrypt';

const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);

// Later, during login:
const match = await bcrypt.compare(password, hashedPassword);
```

---

#### **Day 18: Authorization Patterns (RBAC intro)**
**Goal:** Control access to resources

**Topics:**
- Authorization basics
- Role-Based Access Control (RBAC)
- Permission checking
- Middleware for authorization

**Build:**
- User roles (admin, user, guest)
- Role-based middleware
- Protect routes based on roles

**Example:**
```typescript
const requireRole = (role: string) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
};

// Usage:
router.delete('/users/:id', requireRole('admin'), deleteUser);
```

---

#### **Day 19: API Security** ⭐
**Goal:** Secure your API

**Topics:**
- SQL injection prevention (parameterized queries)
- Input sanitization
- Rate limiting (prevent brute force)
- CORS (Cross-Origin Resource Sharing)
- Helmet.js (security headers)
- Environment variables for secrets

**Build:**
- Rate limiting middleware
- CORS configuration
- Security headers
- Input sanitization

**Tools:**
- Use parameterized queries (ALWAYS)
- dotenv for environment variables

**Code Example:**
```typescript
// ✅ SAFE: Parameterized query
const result = await pool.query(
  'SELECT * FROM users WHERE email = $1',
  [email]
);

// ❌ UNSAFE: SQL injection vulnerability
const result = await pool.query(
  `SELECT * FROM users WHERE email = '${email}'`
);
```

---

#### **Day 20: Backend Testing** ⭐
**Goal:** Test your API endpoints

**Topics:**
- Unit tests vs integration tests
- Testing API endpoints
- Mocking database calls
- Test databases

**Build:**
- Test suite with Vitest or Jest
- Test CRUD endpoints
- Mock database for unit tests
- Use test database for integration tests

**Tools:**
- Vitest or Jest
- Supertest (for HTTP assertions)

**Example:**
```typescript
import request from 'supertest';
import { app } from '../server';

describe('User API', () => {
  it('GET /api/users should return all users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
```

---

#### **Day 21: Integration Testing** ⭐
**Goal:** Test the full stack

**Topics:**
- End-to-end API tests
- Test database setup/teardown
- Test fixtures (seed data)
- Testing authenticated endpoints

**Build:**
- Full integration test suite
- Database migrations for tests
- Test user authentication flow

---

### **Week 4: Production Backend Patterns**

#### **Day 22: Logging & Monitoring**
**Goal:** Observability basics

**Topics:**
- Structured logging (JSON logs)
- Log levels (DEBUG, INFO, WARN, ERROR)
- Request logging
- Error logging

**Build:**
- Logging middleware
- Use Winston or Pino
- Log all requests and errors

**Code Example:**
```typescript
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info'
});

logger.info({ userId: 123 }, 'User created');
logger.error({ err }, 'Database connection failed');
```

---

#### **Day 23: Pagination Strategies** ⭐ NEW
**Goal:** Handle large datasets efficiently

**Topics:**
- Why pagination matters
- Offset-based pagination (LIMIT/OFFSET)
- Cursor-based pagination (keyset pagination)
- Performance implications
- Page size limits

**Build:**
- Offset pagination endpoint
- Cursor pagination endpoint
- Pagination metadata (total, page, hasNext)

**Code Example:**
```typescript
// Offset pagination
GET /api/users?page=2&limit=20

const page = parseInt(req.query.page) || 1;
const limit = parseInt(req.query.limit) || 20;
const offset = (page - 1) * limit;

const users = await pool.query(
  'SELECT * FROM users ORDER BY id LIMIT $1 OFFSET $2',
  [limit, offset]
);

const total = await pool.query('SELECT COUNT(*) FROM users');

res.json({
  data: users.rows,
  pagination: {
    page,
    limit,
    total: parseInt(total.rows[0].count),
    totalPages: Math.ceil(total.rows[0].count / limit)
  }
});

// Cursor pagination (better for large datasets)
GET /api/users?cursor=123&limit=20

const cursor = req.query.cursor;
const limit = parseInt(req.query.limit) || 20;

const users = await pool.query(
  'SELECT * FROM users WHERE id > $1 ORDER BY id LIMIT $2',
  [cursor || 0, limit]
);

res.json({
  data: users.rows,
  nextCursor: users.rows.length > 0 ? users.rows[users.rows.length - 1].id : null
});
```

**Practice:**
- Implement both pagination types
- Measure performance difference on large datasets
- Handle edge cases (empty results, invalid page numbers)

---

#### **Day 24: Filtering & Sorting** ⭐ NEW
**Goal:** Build flexible query APIs

**Topics:**
- Query parameter design
- Dynamic WHERE clauses (safely!)
- Multi-column sorting
- Combining filters (AND/OR logic)
- Search functionality

**Build:**
- Filter by multiple fields
- Sort by multiple columns
- Search across text fields
- Type-safe query builders

**Code Example:**
```typescript
// GET /api/users?status=active&role=admin&sort=-createdAt,name

interface QueryParams {
  status?: string;
  role?: string;
  search?: string;
  sort?: string;
}

const buildQuery = (params: QueryParams) => {
  const conditions: string[] = [];
  const values: any[] = [];
  let paramCount = 1;

  // Filtering
  if (params.status) {
    conditions.push(`status = $${paramCount}`);
    values.push(params.status);
    paramCount++;
  }

  if (params.role) {
    conditions.push(`role = $${paramCount}`);
    values.push(params.role);
    paramCount++;
  }

  if (params.search) {
    conditions.push(`(name ILIKE $${paramCount} OR email ILIKE $${paramCount})`);
    values.push(`%${params.search}%`);
    paramCount++;
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  // Sorting
  let orderClause = 'ORDER BY id DESC'; // default
  if (params.sort) {
    const sortFields = params.sort.split(',').map(field => {
      const desc = field.startsWith('-');
      const column = desc ? field.slice(1) : field;
      // Whitelist allowed columns to prevent SQL injection
      const allowedColumns = ['id', 'name', 'email', 'createdAt'];
      if (!allowedColumns.includes(column)) return null;
      return `${column} ${desc ? 'DESC' : 'ASC'}`;
    }).filter(Boolean);
    
    if (sortFields.length > 0) {
      orderClause = `ORDER BY ${sortFields.join(', ')}`;
    }
  }

  const query = `SELECT * FROM users ${whereClause} ${orderClause}`;
  return { query, values };
};

const { query, values } = buildQuery(req.query);
const result = await pool.query(query, values);
```

**Security:**
- ALWAYS whitelist sortable/filterable columns
- Use parameterized queries
- Validate input types

---

#### **Day 25: Soft Deletes & Audit Trails** ⭐ NEW
**Goal:** Track data changes and enable recovery

**Topics:**
- Soft delete pattern (deleted_at)
- Hard delete vs soft delete
- Restore functionality
- Audit log tables
- Who/when/what tracking
- Compliance requirements

**Build:**
- Soft delete implementation
- Restore deleted records
- Audit trail system
- Change history

**Schema Design:**
```sql
-- Add to your tables
ALTER TABLE users ADD COLUMN deleted_at TIMESTAMP NULL;
ALTER TABLE users ADD COLUMN updated_by INTEGER REFERENCES users(id);

-- Audit log table
CREATE TABLE audit_logs (
  id SERIAL PRIMARY KEY,
  table_name VARCHAR(50) NOT NULL,
  record_id INTEGER NOT NULL,
  action VARCHAR(20) NOT NULL, -- INSERT, UPDATE, DELETE
  old_values JSONB,
  new_values JSONB,
  changed_by INTEGER REFERENCES users(id),
  changed_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_table_record ON audit_logs(table_name, record_id);
```

**Code Example:**
```typescript
// Soft delete
const softDelete = async (userId: number) => {
  const result = await pool.query(
    'UPDATE users SET deleted_at = NOW() WHERE id = $1 AND deleted_at IS NULL RETURNING *',
    [userId]
  );
  
  if (result.rows.length === 0) {
    throw new Error('User not found or already deleted');
  }
  
  // Log the deletion
  await logAudit('users', userId, 'DELETE', result.rows[0], null, currentUserId);
  
  return result.rows[0];
};

// Restore
const restore = async (userId: number) => {
  const result = await pool.query(
    'UPDATE users SET deleted_at = NULL WHERE id = $1 AND deleted_at IS NOT NULL RETURNING *',
    [userId]
  );
  
  await logAudit('users', userId, 'RESTORE', null, result.rows[0], currentUserId);
  
  return result.rows[0];
};

// Get active users only
const getActiveUsers = async () => {
  return await pool.query(
    'SELECT * FROM users WHERE deleted_at IS NULL'
  );
};

// Audit logging
const logAudit = async (
  tableName: string,
  recordId: number,
  action: 'INSERT' | 'UPDATE' | 'DELETE' | 'RESTORE',
  oldValues: any,
  newValues: any,
  changedBy: number
) => {
  await pool.query(
    `INSERT INTO audit_logs (table_name, record_id, action, old_values, new_values, changed_by)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [tableName, recordId, action, JSON.stringify(oldValues), JSON.stringify(newValues), changedBy]
  );
};

// Get change history
const getChangeHistory = async (tableName: string, recordId: number) => {
  return await pool.query(
    `SELECT * FROM audit_logs 
     WHERE table_name = $1 AND record_id = $2 
     ORDER BY changed_at DESC`,
    [tableName, recordId]
  );
};
```

**Use Cases:**
- Compliance (GDPR, SOX)
- Debugging data issues
- User mistake recovery
- Security investigations

---

#### **Day 26: Database Performance Tuning** ⭐
**Goal:** Optimize database performance

**Topics:**
- Connection pooling
- Query caching
- Profiling slow queries
- Database monitoring
- N+1 query solutions

**Build:**
- Configure connection pool (pg.Pool)
- Identify slow queries
- Optimize with indexes
- Solve N+1 problems

**Code Example:**
```typescript
import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 20, // max clients in pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Solve N+1 problem with JOIN instead of multiple queries
// ❌ BAD: N+1 queries
const posts = await pool.query('SELECT * FROM posts');
for (const post of posts.rows) {
  const author = await pool.query('SELECT * FROM users WHERE id = $1', [post.author_id]);
  post.author = author.rows[0];
}

// ✅ GOOD: Single query with JOIN
const postsWithAuthors = await pool.query(`
  SELECT posts.*, users.name as author_name, users.email as author_email
  FROM posts
  LEFT JOIN users ON posts.author_id = users.id
`);
```

---

#### **Day 27: Background Jobs Introduction** ⭐ ENHANCED
**Goal:** Handle async tasks properly

**Topics:**
- When to use background jobs
- Job queue pattern
- Job status tracking
- Error handling & retries
- Simple worker implementation

**Build:**
- In-memory job queue (basic)
- Job status endpoints
- Worker process
- Retry logic

**Code Example:**
```typescript
interface Job {
  id: string;
  type: string;
  data: any;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  attempts: number;
  createdAt: Date;
  completedAt?: Date;
  error?: string;
}

class JobQueue {
  private jobs: Map<string, Job> = new Map();
  private queue: string[] = [];

  addJob(type: string, data: any): string {
    const id = crypto.randomUUID();
    const job: Job = {
      id,
      type,
      data,
      status: 'pending',
      attempts: 0,
      createdAt: new Date()
    };
    
    this.jobs.set(id, job);
    this.queue.push(id);
    
    return id;
  }

  async processNext() {
    const jobId = this.queue.shift();
    if (!jobId) return null;

    const job = this.jobs.get(jobId);
    if (!job) return null;

    job.status = 'processing';
    job.attempts++;

    try {
      // Execute job based on type
      await this.executeJob(job);
      
      job.status = 'completed';
      job.completedAt = new Date();
    } catch (error) {
      job.status = 'failed';
      job.error = error.message;
      
      // Retry logic
      if (job.attempts < 3) {
        job.status = 'pending';
        this.queue.push(jobId); // Re-queue
      }
    }

    return job;
  }

  private async executeJob(job: Job) {
    switch (job.type) {
      case 'send-email':
        await sendEmail(job.data.to, job.data.subject, job.data.body);
        break;
      case 'generate-report':
        await generateReport(job.data.userId, job.data.reportType);
        break;
      default:
        throw new Error(`Unknown job type: ${job.type}`);
    }
  }

  getJob(id: string): Job | undefined {
    return this.jobs.get(id);
  }
}

const jobQueue = new JobQueue();

// API endpoints
router.post('/jobs', (req, res) => {
  const { type, data } = req.body;
  const jobId = jobQueue.addJob(type, data);
  
  res.status(202).json({ jobId, status: 'accepted' });
});

router.get('/jobs/:id', (req, res) => {
  const job = jobQueue.getJob(req.params.id);
  
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }
  
  res.json(job);
});

// Worker process (run separately or in setInterval)
setInterval(async () => {
  await jobQueue.processNext();
}, 1000);
```

**When to use background jobs:**
- Sending emails
- Generating reports
- Processing images/videos
- Data imports/exports
- Webhooks/notifications

**Note:** In production, use Redis + Bull or BullMQ (covered in Month 7)

---

#### **Day 28: API Documentation & Versioning**
**Goal:** Document and version your API

**Topics:**
- OpenAPI/Swagger basics
- API versioning strategies
- Documentation best practices

**Build:**
- API documentation
- Versioned endpoints

**Example:**
```typescript
// Versioning
app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);
```

---

#### **Day 29: WebSockets Basics (Real-time Communication)** ⭐ NEW
**Goal:** Understand real-time communication

**Topics:**
- When to use WebSockets
- WebSocket handshake
- Bi-directional communication
- WebSockets vs polling vs Server-Sent Events

**Build:**
- Simple WebSocket server
- Chat example
- Real-time notifications

**Code Example:**
```typescript
import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

const clients = new Set<WebSocket>();

wss.on('connection', (ws: WebSocket) => {
  console.log('Client connected');
  clients.add(ws);

  ws.on('message', (message: string) => {
    console.log('Received:', message);
    
    // Broadcast to all clients
    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    clients.delete(ws);
  });

  // Send welcome message
  ws.send(JSON.stringify({ type: 'welcome', message: 'Connected!' }));
});
```

**Use Cases:**
- Chat applications
- Live notifications
- Real-time dashboards
- Collaborative editing
- Gaming

**When NOT to use WebSockets:**
- Simple request/response (use REST)
- One-way server push (use Server-Sent Events)
- Infrequent updates (use polling)

---

#### **Day 30: Final Testing & Deployment**
**Goal:** Ship production-ready API

**Checklist:**
- ✅ All CRUD endpoints working
- ✅ Authentication & authorization implemented
- ✅ Input validation on all endpoints
- ✅ Error handling consistent
- ✅ Tests passing (unit + integration)
- ✅ Database optimized (indexes, queries)
- ✅ API documented
- ✅ Security measures in place
- ✅ Logging implemented
- ✅ Ready for deployment

**Deploy:**
- Deploy to a platform (Railway, Render, DigitalOcean, AWS)
- Test in production
- Monitor logs

---

## ✅ DELIVERABLES

**By Day 30, you must have:**

1. **RESTful API Platform** (TypeScript + Node.js, NO frameworks)
   - Built with raw Node.js http module
   - Custom router, middleware system
   - Full CRUD operations

2. **Normalized Database Schema**
   - PostgreSQL or MySQL
   - Properly normalized (3NF)
   - ER diagram documented

3. **Authentication System**
   - Registration & login
   - Password hashing (bcrypt)
   - Session or JWT-based auth

4. **API Test Suite**
   - Unit tests
   - Integration tests
   - 70%+ code coverage

5. **Performance Optimization Report**
   - Database indexes documented
   - Query optimization examples
   - EXPLAIN analysis of slow queries

6. **API Documentation**
   - All endpoints documented
   - Request/response examples
   - Error codes explained

7. **Deployed Backend**
   - Live API endpoint
   - Database hosted
   - Health check endpoint

8. **Security Measures**
   - SQL injection prevention
   - Rate limiting
   - CORS configured
   - Secrets in environment variables

9. **Production API Patterns** ⭐ NEW
   - Pagination (offset & cursor)
   - Filtering & sorting
   - Soft deletes implemented
   - Audit trail system
   - Background job queue
   - WebSocket endpoint (basic)

---

## 🛠 TECH STACK

**Core:**
- **Runtime:** Node.js (v18+)
- **Language:** TypeScript
- **HTTP Server:** Node.js http module (NO Express)
- **Database:** PostgreSQL (or MySQL)
- **Database Client:** pg (node-postgres)

**Testing:**
- **Framework:** Vitest or Jest
- **HTTP Testing:** Supertest

**Utilities:**
- **Validation:** Zod (optional)
- **Password Hashing:** bcrypt
- **Logging:** Pino or Winston
- **Environment Variables:** dotenv

**NO FRAMEWORKS THIS MONTH.**
You build everything yourself.

---

## 📊 PROJECT IDEA EXAMPLES

Choose one (or create your own):

1. **Blog API**
   - Users, posts, comments
   - Authentication, authorization (authors can edit own posts)
   - Tagging system

2. **E-commerce API**
   - Products, categories, cart, orders
   - User authentication
   - Inventory management

3. **Task Management API**
   - Users, projects, tasks
   - Role-based access (project owners, members)
   - Task assignments, due dates

4. **Social Media API**
   - Users, posts, likes, follows
   - Feed generation
   - User profiles

---

## 🎯 SUCCESS CRITERIA

By the end of Month 3, you should be able to:

- ✅ Build HTTP servers from scratch (no frameworks)
- ✅ Parse HTTP requests manually
- ✅ Design normalized database schemas
- ✅ Write optimized SQL queries
- ✅ Implement authentication & authorization
- ✅ Secure APIs against common vulnerabilities
- ✅ Test backend code comprehensively
- ✅ Deploy production-ready APIs
- ✅ Debug backend issues confidently
- ✅ Understand what Express/Fastify/NestJS do under the hood

---

## 💡 PHILOSOPHY

**Why no frameworks?**

When you learn Laravel, Express, or NestJS later, you'll **understand** instead of **memorize**.

You'll know:
- How routing actually works
- What middleware is doing
- Why ORMs exist
- How request parsing happens
- What frameworks abstract away

**This month is about understanding the fundamentals. Frameworks come later.**

---

## 📈 WHAT'S NEXT?

After Month 3, you'll move to:

**Month 4: DevOps & Observability**
- Dockerize your API
- CI/CD pipelines
- Monitoring with Prometheus
- Deployment automation

By then, you'll have a rock-solid backend that you built from scratch.

---

## 🔥 FINAL NOTES

**This month will be hard.** You're not using Express, Laravel, or any framework magic.

But when it clicks, you'll become a **backend engineer who understands systems**, not just someone who knows how to use a framework.

**Stick with it. Build from scratch. Understand everything.**

Then in Month 12.5+, when you learn NestJS or Laravel, it'll be **easy** because you've already built what they abstract.

---

**NOW START DAY 1. BUILD YOUR HTTP SERVER.** 🚀
