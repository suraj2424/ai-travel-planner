# AI Travel Planner

An intelligent travel planning application that helps users create personalized itineraries using AI-powered recommendations.

## 🚀 Tech Stack

### Backend
- **Runtime**: [Bun](https://bun.sh/) - Fast JavaScript runtime
- **Framework**: [Express.js](https://expressjs.com/) v5
- **Language**: TypeScript
- **Database**: PostgreSQL with [Prisma ORM](https://www.prisma.io/)
- **Authentication**: JWT with access/refresh tokens (jose)
- **Validation**: [Zod](https://zod.dev/)
- **AI Integration**: [Vercel AI SDK](https://sdk.vercel.ai/docs) with Groq
- **Architecture**: Modular structure with clean separation of concerns

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) 16 (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) with RTK Query
- **UI Components**: Custom components with [Lucide React](https://lucide.dev/) icons
- **Forms**: React Hook Form with Zod validation
- **Animations**: [Motion](https://motion.dev/) (Framer Motion)

## 📁 Project Structure

```
ai-travel-planner/
├── client/                 # Frontend application (Next.js)
│   ├── app/               # Next.js App Router pages
│   │   ├── auth/          # Authentication pages (signin, signup)
│   │   ├── trips/         # Trip management pages
│   │   │   ├── [tripId]/  # Trip detail & itinerary view
│   │   │   └── new/       # Create new trip page
│   │   ├── globals.css    # Global styles with Tailwind
│   │   ├── layout.tsx     # Root layout with providers
│   │   └── page.tsx       # Landing page
│   ├── components/        # Reusable UI components
│   │   ├── auth/          # Auth-related components (ProtectedRoute, AuthInitializer)
│   │   ├── landing/       # Landing page sections (Hero, CTA, Proof, Demo, Header, Footer)
│   │   ├── trips/         # Trip-related components (TripCard, TripList, CreateTripForm, ItineraryView, etc.)
│   │   ├── ui/            # Base UI components (Button, Input, Select, Dropdown, etc.)
│   │   ├── theme-provider.tsx
│   │   └── theme-toggle.tsx
│   ├── lib/               # Core libraries and utilities
│   │   └── redux/         # Redux store, provider, and features
│   │       ├── features/
│   │       │   └── auth/  # Auth slice (tokens, user state)
│   │       ├── provider.tsx
│   │       └── store.ts
│   ├── services/          # API services (RTK Query)
│   │   └── api.ts         # API endpoints with auto-refresh
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.ts
│   └── README.md          # Client documentation
├── server/                # Backend API (Express + Bun)
│   ├── src/
│   │   ├── app/           # Express app configuration & routes
│   │   ├── config/        # Configuration files (env, constants)
│   │   ├── infrastructure/ # Database, external services
│   │   │   └── database/  # Prisma client & connection
│   │   ├── modules/       # Feature modules
│   │   │   ├── auth/      # Authentication module (login, register, refresh)
│   │   │   ├── users/     # User management module
│   │   │   ├── trip/      # Trip CRUD operations
│   │   │   └── itinerary/ # AI-powered itinerary generation
│   │   └── shared/        # Shared utilities, types, middleware
│   │       ├── errors/    # Custom error classes
│   │       ├── middleware/# Express middleware
│   │       ├── security/  # Security utilities (password hashing)
│   │       ├── types/     # Shared TypeScript types
│   │       ├── utils/     # Utility functions
│   │       └── validation/# Zod validation schemas
│   ├── prisma/
│   │   └── schema.prisma  # Database schema (User, Session, Trip, Itinerary models)
│   ├── package.json
│   └── README.md          # Server documentation
└── README.md              # This file
```

## 🛠️ Getting Started

### Prerequisites
- [Bun](https://bun.sh/) v1.0+ installed
- Node.js 18+ (for compatibility)
- PostgreSQL database (local or cloud)
- Groq API key (for AI itinerary generation)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd ai-travel-planner

# Install server dependencies
cd server
bun install

# Set up environment variables
cp .env.example .env  # Create .env with your DATABASE_URL, JWT secrets, and GROQ_API_KEY

# Set up database
bunx prisma generate
bunx prisma migrate dev

# Install client dependencies
cd ../client
npm install  # or bun install

# Set up client environment
cp .env.example .env.local  # Add NEXT_PUBLIC_API_URL
```

### Development

**Start the backend server:**
```bash
# From the server directory
bun run dev
```
Server runs at `http://localhost:3000` (or the PORT defined in your environment).

**Start the frontend:**
```bash
# From the client directory
npm run dev  # or bun dev
```
Frontend runs at `http://localhost:3000` (Next.js default).

### Environment Variables

**Server (`server/.env`):**
```env
PORT=3000
NODE_ENV=development
DATABASE_URL="postgresql://user:password@localhost:5432/ai_travel_planner?schema=public"
JWT_SECRET="your-super-secret-jwt-key"
JWT_REFRESH_SECRET="your-super-secret-refresh-key"
GROQ_API_KEY="your-groq-api-key"  # For AI itinerary generation
```

**Client (`client/.env.local`):**
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
```

## 📡 API Endpoints

All endpoints are prefixed with `/api/v1`.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/health` | Health check endpoint |
| POST   | `/test-validation` | Test Zod validation |
| POST   | `/auth/login` | User login (returns access + refresh tokens) |
| POST   | `/auth/refresh` | Refresh access token |
| POST   | `/auth/logout` | User logout (invalidates refresh token) |
| POST   | `/users` | Create a new user (registration) |
| GET    | `/users/:id` | Get user by ID |
| GET    | `/users` | Get all users (paginated) |

### Trips
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/trips` | List user's trips (paginated) |
| POST   | `/trips` | Create a new trip |
| GET    | `/trips/:id` | Get trip by ID |
| PATCH  | `/trips/:id` | Update a trip |
| DELETE | `/trips/:id` | Delete a trip |

### Itineraries
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/itineraries/:tripId` | Get itinerary for a trip |
| POST   | `/itineraries/generate/:tripId` | Generate AI-powered itinerary |

*More endpoints coming as features are implemented.*

## 🏗️ Architecture Overview

### Backend (Modular Architecture)

The backend follows a modular architecture with clear separation of concerns:

- **`app/`** - Express application setup, middleware, and main router
- **`config/`** - Environment variables and application constants
- **`modules/`** - Feature-based modules (each with routes, controllers, services, repository)
- **`shared/`** - Cross-cutting concerns (middleware, types, utilities, error handling, validation, security)
- **`infrastructure/`** - External integrations (database, AI services, third-party APIs)

#### Module Structure (e.g., `trip`)
```
modules/trip/
├── trip.routes.ts        # Route definitions
├── trip.controller.ts    # Request handlers
├── trip.service.ts       # Business logic
├── trip.repository.ts    # Data access (Prisma)
└── trip.dependencies.ts  # Dependency injection
```

#### Itinerary Module Structure
```
modules/itinerary/
├── itinerary.routes.ts       # Route definitions
├── itinerary.controller.ts   # Request handlers
├── itinerary.service.ts      # Business logic (orchestrates generation)
├── itinerary.generator.ts    # Core generation logic
├── itinerary.llm-generator.ts # LLM prompt & response handling
├── itinerary.repository.ts   # Data access
├── itinerary.dependencies.ts # Dependency injection
└── providers/                # External data providers
    ├── geoapify.provider.ts  # Location/POI data
    └── travel-data.provider.ts # Travel time/distance estimates
```

### Frontend (Next.js App Router)

- **App Router** - File-based routing with Server Components by default
- **Redux Toolkit + RTK Query** - Global state management and API caching
- **Authentication Flow** - Automatic token refresh on 401, secure cookie storage
- **Component Structure** - Reusable UI components in `components/ui/`, feature components in `components/trips/`, `components/auth/`, `components/landing/`
- **Theme Support** - Dark/light mode with `next-themes`
- **Protected Routes** - `ProtectedRoute` component for auth-gated pages

## 🗄️ Database Commands

```bash
# From the server directory

# Generate Prisma client
bunx prisma generate

# Run migrations
bunx prisma migrate dev

# Open Prisma Studio (GUI)
bunx prisma studio

# Reset database
bunx prisma migrate reset
```

### Database Schema

- **User** - id, email, firstName, lastName, passwordHash, role, status, timestamps
- **Session** - id, userId, refreshTokenHash, expiresAt, createdAt
- **Trip** - id, userId, destination, travellers, startDate, endDate, budget, travelStyle, interests[], status, timestamps
- **Itinerary** - id, tripId, status, timestamps
- **ItineraryDay** - id, itineraryId, dayNumber, date, timestamps
- **Activity** - id, itineraryDayId, title, description, category, time, travelMode, travelMinutes, travelDistanceKm, timestamps

### Enums
- **TravelStyle**: ADVENTURE, RELAXED, CULTURAL, LUXURY, BUDGET
- **Interest**: FOOD, HISTORY, NATURE, BEACHES, MOUNTAINS, NIGHTLIFE, SHOPPING, CULTURE, WILDLIFE, PHOTOGRAPHY, TREKKING, WELLNESS, SPIRITUAL, ADVENTURE_SPORTS
- **TripStatus**: DRAFT, PLANNED, COMPLETED, CANCELLED
- **ItineraryStatus**: GENERATING, DRAFT, FINALIZED
- **ActivityCategory**: SIGHTSEEING, MEAL, TRANSPORT, ACCOMMODATION, EXPERIENCE

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Bun](https://bun.sh/) for speed
- Express.js for the web framework
- TypeScript for type safety
- Prisma for database ORM
- Zod for schema validation
- Next.js for the frontend framework
- Redux Toolkit for state management
- Tailwind CSS for styling
- Vercel AI SDK for AI integration
- Groq for fast LLM inference