# AI Travel Planner

An intelligent travel planning application that helps users create personalized itineraries using AI-powered recommendations.

## 🚀 Tech Stack

### Backend
- **Runtime**: [Bun](https://bun.sh/) - Fast JavaScript runtime
- **Framework**: [Express.js](https://expressjs.com/) v5
- **Language**: TypeScript
- **Database**: PostgreSQL with [Prisma ORM](https://www.prisma.io/)
- **Validation**: [Zod](https://zod.dev/)
- **Architecture**: Modular structure with clean separation of concerns

### Frontend
- *Coming soon* - Planned React/Next.js application

## 📁 Project Structure

```
ai-travel-planner/
├── client/                 # Frontend application (planned)
├── server/                 # Backend API
│   ├── src/
│   │   ├── app/           # Express app configuration & routes
│   │   ├── config/        # Configuration files (env, constants)
│   │   ├── infrastructure/# Database, external services
│   │   │   └── database/  # Prisma client & connection
│   │   ├── modules/       # Feature modules
│   │   │   └── users/     # User management module
│   │   └── shared/        # Shared utilities, types, middleware
│   │       ├── errors/    # Custom error classes
│   │       ├── middleware/# Express middleware
│   │       ├── types/     # Shared TypeScript types
│   │       ├── utils/     # Utility functions
│   │       └── validation/# Zod validation schemas
│   ├── package.json
│   ├── prisma/
│   │   └── schema.prisma  # Database schema
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
```

### Development

```bash
# From the server directory
bun run dev
```

The server will start at `http://localhost:3000` (or the PORT defined in your environment).

### Environment Variables

Create a `.env` file in the `server` directory:

```env
PORT=3000
NODE_ENV=development
DATABASE_URL="postgresql://user:password@localhost:5432/ai_travel_planner?schema=public"
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/v1/health` | Health check endpoint |
| POST   | `/api/v1/test-validation` | Test Zod validation |
| POST   | `/api/v1/users` | Create a new user |

*More endpoints coming as features are implemented.*

## 🏗️ Architecture Overview

The backend follows a modular architecture:

- **`app/`** - Express application setup, middleware, and main router
- **`config/`** - Environment variables and application constants
- **`modules/`** - Feature-based modules (each with routes, controllers, services, repository)
- **`shared/`** - Cross-cutting concerns (middleware, types, utilities, error handling, validation)
- **`infrastructure/`** - External integrations (database, AI services, third-party APIs)

### Module Structure (e.g., `users`)
```
modules/users/
├── user.routes.ts        # Route definitions
├── user.controller.ts    # Request handlers
├── user.service.ts       # Business logic
├── user.repository.ts    # Data access (Prisma)
└── user.dependencies.ts  # Dependency injection
```

## 🧪 Testing

```bash
# From the server directory
bun test
```

## 📦 Build

```bash
# From the server directory
bun build
```

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