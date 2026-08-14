# AI Travel Planner - Server

Backend API for the AI Travel Planner application, built with Express.js, TypeScript, and Bun.

## 🚀 Quick Start

```bash
# Install dependencies
bun install

# Run development server (with hot reload)
bun run dev

# Run production server
bun run index.ts
```

The server runs at `http://localhost:3000` by default (configure via `PORT` env var).

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server with file watching |
| `bun run index.ts` | Start production server |
| `bun test` | Run tests |

## 🔧 Configuration

Environment variables (create `.env` file):

```env
PORT=3000              # Server port (default: 3000)
NODE_ENV=development   # Environment: development | production
```

## 📡 API Reference

### Health Check
```
GET /api/v1/health
```

**Response:**
```json
{
  "message": "This server is under development"
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
│   └── env.ts        # Environment variables
├── infrastructure/   # Database, external services (planned)
├── modules/          # Feature modules (planned)
├── shared/
│   ├── errors/       # Custom error classes
│   ├── middleware/   # Express middleware (request logger, etc.)
│   ├── types/        # Shared TypeScript types
│   └── utils/        # Utility functions
└── server.ts         # Entry point
```

## 📦 Dependencies

### Production
- `express` ^5.2.1 - Web framework
- `@types/express` ^5.0.6 - TypeScript definitions

### Development
- `@types/bun` - Bun runtime types
- `typescript` ^5 - TypeScript compiler

## 🛠️ Development

### Adding a New Module

1. Create a folder under `src/modules/<feature>/`
2. Add routes, controllers, services
3. Register routes in `src/app/routes.ts`

### Middleware

Shared middleware lives in `src/shared/middleware/`. Currently includes:
- `requestLogger` - Logs incoming requests

## 📝 Notes

- This project uses ES modules (`"type": "module"` in package.json)
- Import extensions (`.ts`) are required in imports
- Built for Bun runtime but compatible with Node.js 18+