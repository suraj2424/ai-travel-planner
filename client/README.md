# AI Travel Planner - Client

Frontend application for the AI Travel Planner, built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, Redux Toolkit, and RTK Query.

## 🚀 Quick Start

```bash
# Install dependencies
npm install
# or
bun install

# Run development server
npm run dev
# or
bun dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

The app runs at `http://localhost:3000` by default.

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## 🔧 Configuration

Environment variables (create `.env.local` file in client directory):

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
```

## 📁 Project Structure

```
client/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   │   ├── signin/        # Login page
│   │   │   ├── page.tsx   # Sign in page
│   │   │   └── LoginForm.tsx  # Login form component
│   │   └── signup/        # Registration page
│   │       ├── page.tsx   # Sign up page
│   │       └── SignupForm.tsx # Signup form component
│   ├── globals.css        # Global styles (Tailwind imports)
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Landing page
├── components/            # Reusable UI components
│   ├── ui/                # Base UI components
│   │   ├── auth-layout.tsx   # Auth page layout wrapper
│   │   ├── barcode.tsx       # Barcode display component
│   │   ├── button.tsx        # Button component
│   │   ├── featureCard.tsx   # Feature card component
│   │   ├── input.tsx         # Input component
│   │   └── password-input.tsx # Password input with toggle
│   ├── theme-provider.tsx    # Theme provider wrapper
│   └── theme-toggle.tsx      # Dark/light mode toggle
├── lib/                   # Core libraries
│   └── redux/             # Redux store and configuration
│       ├── features/      # Redux feature slices
│       │   └── auth/      # Authentication state
│       │       └── authSlice.ts  # Auth slice (tokens, user)
│       ├── provider.tsx   # Redux Provider component
│       └── store.ts       # Redux store configuration
├── services/              # API services
│   └── api.ts             # RTK Query API with auto-refresh
├── public/                # Static assets
├── .gitignore
├── AGENTS.md
├── CLAUDE.md
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── README.md              # This file
└── tsconfig.json
```

## 🔐 Authentication Flow

The client implements a complete authentication flow with:

1. **Login** (`/auth/signin`) - Email/password authentication
2. **Register** (`/auth/signup`) - New user registration
3. **Token Management** - Automatic access/refresh token handling
4. **Auto-refresh** - RTK Query automatically refreshes tokens on 401
5. **Protected Routes** - Ready for route protection implementation

### API Integration (RTK Query)

The `services/api.ts` provides:
- `useLoginMutation` - User login
- `useRegisterMutation` - User registration
- `useRefreshMutation` - Manual token refresh
- Automatic token refresh on 401 responses
- Authorization header injection
- Secure cookie handling (`credentials: "include"`)

### Redux State (Auth Slice)

The `lib/redux/features/auth/authSlice.ts` manages:
- `accessToken` - Short-lived JWT access token
- `user` - User profile data
- `setCredentials` - Store tokens after login/refresh
- `logout` - Clear authentication state

## 🎨 UI Components

### Base Components (`components/ui/`)
- **Button** - Multiple variants (primary, secondary, outline, ghost)
- **Input** - Form input with label and error states
- **PasswordInput** - Password field with show/hide toggle
- **AuthLayout** - Consistent auth page layout
- **FeatureCard** - Feature showcase card
- **Barcode** - Barcode/QR code display

### Theme Support
- **ThemeProvider** - Wraps app for dark/light mode
- **ThemeToggle** - Button to switch themes
- Uses `next-themes` for SSR-safe theme switching

## 📦 Dependencies

### Production
- `next` ^16.3.1 - React framework
- `react` ^19.2.8 - UI library
- `react-dom` ^19.2.8
- `@reduxjs/toolkit` ^2.12.0 - State management
- `react-redux` ^9.3.0 - React bindings
- `lucide-react` ^1.31.0 - Icons

### Development
- `typescript` ^5 - Type checking
- `tailwindcss` ^4 - Utility-first CSS
- `@tailwindcss/postcss` ^4 - PostCSS plugin
- `eslint` ^9 - Linting
- `eslint-config-next` ^16.3.1 - Next.js ESLint config
- `@types/node` ^20 - Node.js types
- `@types/react` ^19 - React types
- `@types/react-dom` ^19 - React DOM types

## 🛠️ Development

### Adding a New Page
1. Create a folder under `app/` (e.g., `app/dashboard/`)
2. Add `page.tsx` with your component
3. Use `layout.tsx` for shared layouts

### Adding a New UI Component
1. Create component in `components/ui/`
2. Export from component file
3. Import and use in pages

### API Calls
Use RTK Query hooks from `services/api.ts`:
```tsx
const [login, { isLoading }] = useLoginMutation();

const handleLogin = async (email: string, password: string) => {
  try {
    await login({ email, password }).unwrap();
    // Redirect or update UI
  } catch (error) {
    // Handle error
  }
};
```

### Styling
- Uses Tailwind CSS v4 (CSS-first configuration)
- Global styles in `app/globals.css`
- Component-scoped styles via className

## 📝 Notes

- This project uses the **App Router** (Next.js 13+)
- **Server Components** by default, use `'use client'` for client components
- **TypeScript** strict mode enabled
- **ES Modules** (`"type": "module"` not needed for Next.js)
- Path aliases configured: `@/*` maps to root
- Redux Provider wraps the app in `app/layout.tsx`
- API base URL from `NEXT_PUBLIC_API_URL` env var