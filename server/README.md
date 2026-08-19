# AI Travel Planner - Server

Backend API for the AI Travel Planner application, built with Express.js, TypeScript, Prisma, and Bun.

## 🚀 Quick Start

```bash
# Install dependencies
bun install

# Run development server (with hot reload)
bun run dev

# Run production server
bun run src/server.ts
```

The server runs at `http://localhost:3000` by default (configure via `PORT` env var).

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server with file watching |
| `bun run src/server.ts` | Start production server |

## 🔧 Configuration

Environment variables (create `.env` file in server directory):

```env
PORT=3000                    # Server port (default: 3000)
NODE_ENV=development         # Environment: development | production
DATABASE_URL=                # PostgreSQL connection string (required for Prisma)
JWT_SECRET=                  # Secret for access tokens
JWT_REFRESH_SECRET=          # Secret for refresh tokens
```

## 📡 API Reference

All endpoints are prefixed with `/api/v1`.

### Health Check
```
GET /health
```

**Response:**
```json
{
  "message": "This server is under development"
}
```

### Test Validation
```
POST /test-validation
```

**Request Body:**
```json
{
  "name": "string",
  "age": "number"
}
```

**Response:**
```json
{
  "message": "Validation passed",
  "data": { "name": "string", "age": "number" }
}
```

### Authentication

#### Login
```
POST /auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:** `200 OK`
```json
{
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe"
    }
  }
}
```

**Cookies Set:**
- `accessToken` - HTTP-only, secure, same-site strict (short-lived)
- `refreshToken` - HTTP-only, secure, same-site strict (longer-lived)

#### Refresh Token
```
POST /auth/refresh
```

**Response:** `200 OK`
```json
{
  "message": "Token refreshed",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### Logout
```
POST /auth/logout
```

**Response:** `200 OK`
```json
{
  "message": "Logged out successfully"
}
```

**Cookies Cleared:** `accessToken`, `refreshToken`

### Users

#### Create User (Register)
```
POST /users
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "password": "securepassword"
}
```

**Response:** `201 Created`
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "user",
  "status": "active",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### Get User by ID
```
GET /users/:id
```

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "user",
  "status": "active",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### Get All Users
```
GET /users?page=1&limit=10
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:** `200 OK`
```json
{
  "data": [...],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```

## 🏗️ Project Structure

```
src/
├── app/
│   ├── app.ts      # Express app setup & middleware
│   └── routes.ts   # Main router with API routes
├── config/
│   ├── constants.ts  # API_VERSION, API_PREFIX
│   └── env.ts        # Environment variables with validation
├── infrastructure/
│   └── database/
│       ├── prisma.ts         # Prisma client singleton
│       └── testConnection.ts # DB connection test script
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts     # Request handlers
│   │   ├── auth.service.ts        # Business logic (JWT, passwords)
│   │   ├── auth.routes.ts         # Auth routes
│   │   └── auth.dependencies.ts   # Dependency injection
│   └── users/
│       ├── user.controller.ts     # Request handlers
│       ├── user.service.ts        # Business logic
│       ├── user.repository.ts     # Data access layer
│       ├── user.routes.ts         # User routes
│       └── user.dependencies.ts   # Dependency injection
├── shared/
│   ├── errors/
│   │   ├── AppError.ts           # Base application error
│   │   ├── BadRequestError.ts    # 400 errors
│   │   └── NotFoundError.ts      # 404 errors
│   ├── middleware/
│   │   ├── errorHandler.ts       # Global error handler
│   │   ├── notFound.ts           # 404 handler
│   │   ├── requestLogger.ts      # Request logging
│   │   └── validate.ts           # Zod validation middleware
│   ├── security/
│   │   └── password.ts           # Password hashing & verification
│   ├── types/                    # Shared TypeScript types
│   ├── utils/                    # Utility functions
│   └── validation/
│       ├── auth.schema.ts        # Auth validation schema
│       ├── test.schema.ts        # Test validation schema
│       └── user.schema.ts        # User validation schema
└── server.ts         # Entry point
```

## 📦 Dependencies

### Production
- `express` ^5.2.1 - Web framework
- `@types/express` ^5.0.6 - TypeScript definitions
- `@prisma/client` ^7.9.1 - Prisma ORM client
- `@prisma/adapter-pg` ^7.9.1 - PostgreSQL adapter
- `zod` ^4.4.3 - Schema validation
- `cookie-parser` ^1.4.7 - Cookie parsing
- `cors` ^2.8.6 - CORS middleware
- `jose` ^6.2.9 - JWT handling (sign/verify)

### Development
- `@types/bun` - Bun runtime types
- `@types/cookie-parser` ^1.4.10 - Cookie parser types
- `@types/cors` ^2.8.19 - CORS types
- `typescript` ^5 - TypeScript compiler
- `prisma` ^7.9.1 - Prisma CLI

## 🛠️ Development

### Adding a New Module

1. Create a folder under `src/modules/<feature>/`
2. Add routes, controllers, services, repository
3. Create validation schema in `src/shared/validation/`
4. Register routes in `src/app/routes.ts`

### Database (Prisma)

```bash
# Generate Prisma client after schema changes
bunx prisma generate

# Run migrations
bunx prisma migrate dev

# Open Prisma Studio
bunx prisma studio

# Reset database
bunx prisma migrate reset
```

### Database Schema

```prisma
model User {
  id            String    @id @default(uuid()) @db.Uuid
  email         String    @unique
  firstName     String
  lastName      String
  passwordHash  String
  role          String    @default("user")
  status        String    @default("active")
  sessions      Session[]
  createdAt     DateTime  @default(now()) @db.Timestamptz
  updatedAt     DateTime  @default(now()) @updatedAt @db.Timestamptz
}

model Session {
  id               String   @id @default(uuid()) @db.Uuid
  userId           String   @db.Uuid
  refreshTokenHash String   @unique
  expiresAt        DateTime @db.Timestamptz
  createdAt        DateTime @default(now()) @db.Timestamptz
  user             User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

### Middleware

Shared middleware lives in `src/shared/middleware/`:
- `requestLogger` - Logs incoming requests
- `validate` - Zod schema validation
- `errorHandler` - Global error handling
- `notFound` - 404 handler for unmatched routes

### Authentication Implementation

- **Access Tokens** - Short-lived (15min), JWT signed with `JWT_SECRET`
- **Refresh Tokens** - Longer-lived (7 days), stored hashed in database
- **Token Rotation** - New refresh token issued on each refresh
- **Secure Cookies** - HTTP-only, Secure, SameSite=Strict
- **Logout** - Invalidates refresh token in database

### Validation

Zod schemas in `src/shared/validation/`:
- `auth.schema.ts` - Login, register, refresh validation
- `user.schema.ts` - User CRUD validation
- `test.schema.ts` - Example validation

Use `validate(schema)` middleware in routes.

## 📝 Notes

- This project uses ES modules (`"type": "module"` in package.json)
- Import extensions (`.ts`) are required in imports
- Built for Bun runtime but compatible with Node.js 18+
- Uses Zod for request validation
- Prisma ORM with PostgreSQL for database
- Passwords are hashed using bcrypt (via `shared/security/password.ts`)
- JWT tokens handled via `jose` library (Web Crypto API compatible)
- Dependency injection pattern for module wiring