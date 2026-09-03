# AI Travel Planner - Server

Backend API for the AI Travel Planner application, built with Express.js, TypeScript, Prisma, Bun, and Vercel AI SDK with Groq for AI-powered itinerary generation.

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
GROQ_API_KEY=                # Groq API key for AI itinerary generation
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

### Trips

All trip endpoints require authentication (Bearer token).

#### List Trips
```
GET /trips?page=1&limit=20
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20, max: 100)

**Response:** `200 OK`
```json
{
  "data": [
    {
      "id": "uuid",
      "destination": "Goa, India",
      "travellers": 2,
      "startDate": "2024-12-20T00:00:00.000Z",
      "endDate": "2024-12-25T00:00:00.000Z",
      "budget": 50000,
      "travelStyle": "RELAXED",
      "interests": ["BEACHES", "FOOD", "NIGHTLIFE"],
      "status": "DRAFT",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 5
  }
}
```

#### Create Trip
```
POST /trips
```

**Request Body:**
```json
{
  "destination": "Goa, India",
  "travellers": 2,
  "startDate": "2024-12-20T00:00:00.000Z",
  "endDate": "2024-12-25T00:00:00.000Z",
  "budget": 50000,
  "travelStyle": "RELAXED",
  "interests": ["BEACHES", "FOOD", "NIGHTLIFE"]
}
```

**Response:** `201 Created`
```json
{
  "message": "Trip created successfully",
  "data": {
    "id": "uuid",
    "destination": "Goa, India",
    "travellers": 2,
    "startDate": "2024-12-20T00:00:00.000Z",
    "endDate": "2024-12-25T00:00:00.000Z",
    "budget": 50000,
    "travelStyle": "RELAXED",
    "interests": ["BEACHES", "FOOD", "NIGHTLIFE"],
    "status": "DRAFT",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Get Trip by ID
```
GET /trips/:id
```

**Response:** `200 OK` (same structure as create)

#### Update Trip
```
PATCH /trips/:id
```

**Request Body:** (all fields optional)
```json
{
  "destination": "Updated destination",
  "travellers": 3,
  "budget": 60000,
  "travelStyle": "ADVENTURE",
  "interests": ["TREKKING", "NATURE"]
}
```

**Response:** `200 OK`

#### Delete Trip
```
DELETE /trips/:id
```

**Response:** `200 OK`
```json
{
  "message": "Trip deleted successfully"
}
```

### Itineraries

All itinerary endpoints require authentication (Bearer token).

#### Get Itinerary
```
GET /itineraries/:tripId
```

**Response:** `200 OK`
```json
{
  "data": {
    "id": "uuid",
    "tripId": "uuid",
    "status": "FINALIZED",
    "days": [
      {
        "id": "uuid",
        "dayNumber": 1,
        "date": "2024-12-20T00:00:00.000Z",
        "activities": [
          {
            "id": "uuid",
            "title": "Morning Beach Walk",
            "description": "Enjoy a peaceful sunrise walk on the beach",
            "category": "SIGHTSEEING",
            "time": "2024-12-20T06:00:00.000Z",
            "travelMode": "WALKING",
            "travelMinutes": 10,
            "travelDistanceKm": 0.5
          }
        ]
      }
    ],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Note:** Returns `data: null` if trip exists but no itinerary generated yet.

#### Generate Itinerary (AI-Powered)
```
POST /itineraries/generate/:tripId
```

**Response:** `200 OK`
```json
{
  "message": "Itinerary generated successfully",
  "data": {
    "id": "uuid",
    "tripId": "uuid",
    "status": "FINALIZED",
    "days": [...],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Process:**
1. Validates trip exists and belongs to user
2. Creates Itinerary record with status `GENERATING`
3. Calls LLM (Groq) with structured prompt based on trip preferences
4. Parses and validates LLM response
5. Fetches location data via Geoapify provider
6. Calculates travel times/distances via Travel Data provider
7. Saves complete itinerary with days and activities
8. Updates status to `FINALIZED`

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
│   ├── users/
│   │   ├── user.controller.ts     # Request handlers
│   │   ├── user.service.ts        # Business logic
│   │   ├── user.repository.ts     # Data access layer
│   │   ├── user.routes.ts         # User routes
│   │   └── user.dependencies.ts   # Dependency injection
│   ├── trip/
│   │   ├── trip.controller.ts     # Request handlers
│   │   ├── trip.service.ts        # Business logic
│   │   ├── trip.repository.ts     # Data access layer
│   │   ├── trip.routes.ts         # Trip routes
│   │   └── trip.dependencies.ts   # Dependency injection
│   └── itinerary/
│       ├── itinerary.controller.ts       # Request handlers
│       ├── itinerary.service.ts          # Business logic (orchestration)
│       ├── itinerary.generator.ts        # Core generation logic
│       ├── itinerary.llm-generator.ts    # LLM prompt/response handling
│       ├── itinerary.repository.ts       # Data access layer
│       ├── itinerary.routes.ts           # Itinerary routes
│       ├── itinerary.dependencies.ts     # Dependency injection
│       └── providers/
│           ├── geoapify.provider.ts      # Location/POI data
│           └── travel-data.provider.ts   # Travel time/distance estimates
├── shared/
│   ├── errors/
│   │   ├── AppError.ts           # Base application error
│   │   ├── BadRequestError.ts    # 400 errors
│   │   └── NotFoundError.ts      # 404 errors
│   ├── middleware/
│   │   ├── authenticate.ts       # JWT access token verification
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
│       ├── itinerary.schema.ts   # Itinerary validation schema
│       ├── test.schema.ts        # Test validation schema
│       ├── trip.schema.ts        # Trip validation schema
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
- `ai` ^7.0.87 - Vercel AI SDK
- `@ai-sdk/groq` ^4.0.35 - Groq provider for AI SDK

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
  trips         Trip[]

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

enum TravelStyle {
  ADVENTURE
  RELAXED
  CULTURAL
  LUXURY
  BUDGET
}

enum Interest {
  FOOD
  HISTORY
  NATURE
  BEACHES
  MOUNTAINS
  NIGHTLIFE
  SHOPPING
  CULTURE
  WILDLIFE
  PHOTOGRAPHY
  TREKKING
  WELLNESS
  SPIRITUAL
  ADVENTURE_SPORTS
}

enum TripStatus {
  DRAFT
  PLANNED
  COMPLETED
  CANCELLED
}

model Trip {
  id            String       @default(uuid()) @id @db.Uuid
  userId        String       @db.Uuid
  destination   String       @db.VarChar(150)
  travellers    Int
  startDate     DateTime     @db.Timestamptz
  endDate       DateTime     @db.Timestamptz
  budget        Int?
  travelStyle   TravelStyle?
  interests     Interest[]
  status        TripStatus   @default(DRAFT)
  itinerary     Itinerary?

  createdAt     DateTime     @default(now()) @db.Timestamptz
  updatedAt     DateTime     @default(now()) @updatedAt @db.Timestamptz
  user          User         @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}

enum ItineraryStatus {
  GENERATING
  DRAFT
  FINALIZED
}

enum ActivityCategory {
  SIGHTSEEING
  MEAL
  TRANSPORT
  ACCOMMODATION
  EXPERIENCE
}

model Itinerary {
  id        String            @id @default(uuid()) @db.Uuid
  tripId    String            @unique @db.Uuid
  status    ItineraryStatus   @default(GENERATING)

  trip      Trip              @relation(fields: [tripId], references: [id], onDelete: Cascade)
  days      ItineraryDay[]

  createdAt DateTime          @default(now()) @db.Timestamptz
  updatedAt DateTime          @updatedAt @db.Timestamptz
}

model ItineraryDay {
  id            String      @id @default(uuid()) @db.Uuid
  itineraryId   String      @db.Uuid
  dayNumber     Int
  date          DateTime    @db.Timestamptz

  itinerary     Itinerary   @relation(fields: [itineraryId], references: [id], onDelete: Cascade)
  activities    Activity[]

  createdAt     DateTime    @default(now()) @db.Timestamptz
  updatedAt     DateTime    @updatedAt @db.Timestamptz

  @@unique([itineraryId, dayNumber])
  @@index([itineraryId])
}

model Activity {
  id                 String            @id @default(uuid()) @db.Uuid
  itineraryDayId     String            @db.Uuid
  title              String
  description        String
  category           ActivityCategory
  time               DateTime          @db.Timestamptz
  travelMode         String?
  travelMinutes      Int?
  travelDistanceKm   Float?

  itineraryDay       ItineraryDay      @relation(fields: [itineraryDayId], references: [id], onDelete: Cascade)

  createdAt          DateTime          @default(now()) @db.Timestamptz
  updatedAt          DateTime          @updatedAt @db.Timestamptz

  @@index([itineraryDayId])
}
```

### Middleware

Shared middleware lives in `src/shared/middleware/`:
- `authenticate` - JWT access token verification (sets `req.user`)
- `requestLogger` - Logs incoming requests
- `validate` - Zod schema validation (body, query, params)
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
- `trip.schema.ts` - Trip CRUD validation (with enum refinement)
- `itinerary.schema.ts` - Itinerary params validation
- `test.schema.ts` - Example validation

Use `validate(schema)` middleware in routes.

### Itinerary Generation Architecture

The itinerary generation is the core AI feature:

1. **Orchestration** (`itinerary.service.ts`) - Coordinates the generation flow
2. **Core Logic** (`itinerary.generator.ts`) - Builds prompt, calls LLM, parses response
3. **LLM Integration** (`itinerary.llm-generator.ts`) - Uses Vercel AI SDK with Groq
4. **Data Providers** - External APIs for enriching activities:
   - `geoapify.provider.ts` - Place search, POI details, geocoding
   - `travel-data.provider.ts` - Travel time/distance estimation
5. **Persistence** (`itinerary.repository.ts`) - Transactional save of itinerary + days + activities

**Prompt Strategy:**
- Structured prompt with trip context (destination, dates, style, interests, travellers)
- JSON schema output format for reliable parsing
- Few-shot examples for consistent formatting
- Post-processing to validate and enrich with real location data

## 📝 Notes

- This project uses ES modules (`"type": "module"` in package.json)
- Import extensions (`.ts`) are required in imports
- Built for Bun runtime but compatible with Node.js 18+
- Uses Zod for request validation
- Prisma ORM with PostgreSQL for database
- Passwords are hashed using bcrypt (via `shared/security/password.ts`)
- JWT tokens handled via `jose` library (Web Crypto API compatible)
- Dependency injection pattern for module wiring
- AI itinerary generation uses Groq via Vercel AI SDK for fast inference