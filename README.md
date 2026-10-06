# Genesys — Frontend

An online learning platform frontend built with **Next.js 15**, **React 19**, **TypeScript**, and **Tailwind CSS**.

## Tech Stack

- **Next.js 15** — React framework with SSR and file-based routing
- **React 19** — UI library
- **TypeScript** — Type-safe JavaScript
- **Tailwind CSS** — Utility-first styling
- **TanStack React Query** — Server state management
- **Zustand** — Client state management
- **React Hook Form + Zod** — Form handling and validation
- **Lucide React** — Icons

## Getting Started

```bash
# Install dependencies
npm install

# Copy env file
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API base URL |
| `API_URL` | Server-side API URL |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Razorpay public key (optional) |
| `NEXT_PUBLIC_CDN_URL` | CDN URL for media (optional) |

## Project Structure

```
src/
├── app/          # Next.js app router pages
├── components/   # Reusable UI components
├── lib/          # Utilities, API clients, helpers
└── types/        # TypeScript type definitions
```
