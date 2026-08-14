# AI Travel Planner

An intelligent travel planning application that helps users create personalized itineraries using AI-powered recommendations.

## 🚀 Tech Stack

### Backend
- **Runtime**: [Bun](https://bun.sh/) - Fast JavaScript runtime
- **Framework**: [Express.js](https://expressjs.com/) v5
- **Language**: TypeScript
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
│   │   ├── modules/       # Feature modules (to be implemented)
│   │   └── shared/        # Shared utilities, types, middleware
│   └── package.json
└── README.md              # This file
```

## 🛠️ Getting Started

### Prerequisites
- [Bun](https://bun.sh/) v1.0+ installed
- Node.js 18+ (for compatibility)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd ai-travel-planner

# Install server dependencies
cd server
bun install
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
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/v1/health` | Health check endpoint |

*More endpoints coming as features are implemented.*

## 🏗️ Architecture Overview

The backend follows a modular architecture:

- **`app/`** - Express application setup, middleware, and main router
- **`config/`** - Environment variables and application constants
- **`modules/`** - Feature-based modules (each with its own routes, controllers, services)
- **`shared/`** - Cross-cutting concerns (middleware, types, utilities, error handling)
- **`infrastructure/`** - External integrations (database, AI services, third-party APIs)

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