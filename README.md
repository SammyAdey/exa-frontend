# EXA Frontend

Public-facing web app for EXA built with Next.js App Router.

## What This App Does

- Landing page and general marketing pages.
- Public RSVP flow for events.
- Links users to the dashboard for authentication and admin workflows.

## Tech Stack

- Next.js `16`
- React `19`
- TypeScript
- Tailwind CSS

## Project Structure

- `src/app` - App Router pages (`/`, `/contact`, `/rsvp/[eventId]`)
- `src/components` - Shared UI blocks like navbar and footer

## Environment Variables

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_DASHBOARD_URL=http://localhost:3001
```

- `NEXT_PUBLIC_API_BASE_URL`: Backend API base URL.
- `NEXT_PUBLIC_DASHBOARD_URL`: Dashboard URL used in navbar auth links.

## Run Locally

```bash
cd frontend
npm install
npm run dev
```

The app runs on [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` - Start development server on port `3000`
- `npm run build` - Production build
- `npm run start` - Run production build
- `npm run lint` - Lint source files
