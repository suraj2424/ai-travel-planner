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
- **Architecture**: Modular structure with clean separation of concerns

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) 16 (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) with RTK Query
- **UI Components**: Custom components with [Lucide React](https://lucide.dev/) icons
- **Forms**: React Hook Form with Zod validation

## 📁 Project Structure

```
ai-travel-planner/
├── client/                 # Frontend application (Next.js)
│   ├── app/               # Next.js App Router pages
│   │   ├── auth/          # Authentication pages (signin, signup)
│   │   ├── globals.css    # Global styles with Tailwind
│   │   ├── layout.tsx     # Root layout with providers
│   │   └── page.tsx       # Landing page
│   ├── components/        # Reusable UI components
│   │   ├── ui/            # Base UI components (Button, Input, etc.)
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
│   │   │   └── users/     # User management module
│   │   └── shared/        # Shared utilities, types, middleware
│   │       ├── errors/    # Custom error classes
│   │       ├── middleware/# Express middleware
│   │       ├── security/  # Security utilities (password hashing)
│   │       ├── types/     # Shared TypeScript types
│   │       ├── utils/     # Utility functions
│   │       └── validation/# Zod validation schemas
│   ├── prisma/
│   │   └── schema.prisma  # Database schema (User, Session models)
│   ├── package.json
│   └── README.md          # Server documentation
└── README.md              # This file
```

## 🛠️ Getting Started

### Prerequisites
- [Bun](https://bun.sh/) v1.0+ installed
- Node.js 18+ (for compatibility)
- PostgreSQL database (local or cloud)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd ai-travel-planner

# Install server dependencies
cd server
bun install

# Set up environment variables
cp .env.example .env  # Create .env with your DATABASE_URL

# Set up database
bunx prisma generate
bunx prisma migrate dev

# Install client dependencies
cd ../client
npm install  # or bun install
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

*More endpoints coming as features are implemented (trips, itineraries, AI recommendations).*

## 🏗️ Architecture Overview

### Backend (Modular Architecture)

The backend follows a modular architecture with clear separation of concerns:

- **`app/`** - Express application setup, middleware, and main router
- **`config/`** - Environment variables and application constants
- **`modules/`** - Feature-based modules (each with routes, controllers, services, repository)
- **`shared/`** - Cross-cutting concerns (middleware, types, utilities, error handling, validation, security)
- **`infrastructure/`** - External integrations (database, AI services, third-party APIs)

#### Module Structure (e.g., `users`)
```
modules/users/
├── user.routes.ts        # Route definitions
├── user.controller.ts    # Request handlers
├── user.service.ts       # Business logic
├── user.repository.ts    # Data access (Prisma)
└── user.dependencies.ts  # Dependency injection
```

#### Auth Module Structure
```
modules/auth/
├── auth.routes.ts        # Route definitions (login, register, refresh, logout)
├── auth.controller.ts    # Request handlers
├── auth.service.ts       # Business logic (JWT tokens, password verification)
└── auth.dependencies.ts  # Dependency injection
```

### Frontend (Next.js App Router)

- **App Router** - File-based routing with Server Components by default
- **Redux Toolkit + RTK Query** - Global state management and API caching
- **Authentication Flow** - Automatic token refresh on 401, secure cookie storage
- **Component Structure** - Reusable UI components in `components/ui/`
- **Theme Support** - Dark/light mode with `next-themes`

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