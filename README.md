# PostCoach

AI-powered feedback for your Farcaster posts. Analyze your casting patterns, understand what works, and grow your influence.

## Features

- **Post-Level Feedback**: Understand why each post performed the way it did
- **Weekly Brief**: Get a shareable summary with your win, weakness, and experiment to try
- **Theme Analysis**: Discover which topics resonate most with your audience
- **Engagement Metrics**: Track reply rate, repeat repliers, and more

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (Neon/Supabase) with Drizzle ORM
- **AI**: Claude API (Anthropic)
- **Farcaster Data**: Neynar API

## Quick Start

### 1. Clone and install

```bash
cd postcoach
npm install
```

### 2. Set up environment variables

Copy the example env file and fill in your keys:

```bash
cp .env.example .env.local
```

Required environment variables:
- `NEYNAR_API_KEY` - Get from [Neynar](https://neynar.com)
- `ANTHROPIC_API_KEY` - Get from [Anthropic Console](https://console.anthropic.com)
- `DATABASE_URL` (optional) - PostgreSQL connection string from [Neon](https://neon.tech) or [Supabase](https://supabase.com)

### 3. Set up database (optional but recommended)

If you have a DATABASE_URL configured:

```bash
npm run db:push
```

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment to Vercel

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

## API Routes

### `GET /api/analyze`

Analyze a Farcaster user's posts.

**Query Parameters:**
- `fid` (number) - Farcaster ID
- `username` (string) - Farcaster username
- `refresh` (boolean) - Force refresh, bypass cache

**Response:**
```json
{
  "success": true,
  "data": {
    "user": { ... },
    "userMetrics": { ... },
    "themes": [ ... ],
    "topCasts": [ ... ],
    "bottomCasts": [ ... ],
    "weeklyBrief": { ... }
  },
  "cached": false
}
```

### `GET /api/brief`

Get only the weekly brief for a user.

**Query Parameters:**
- `fid` (number) - Farcaster ID
- `username` (string) - Farcaster username

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── analyze/route.ts    # Main analysis endpoint
│   │   └── brief/route.ts      # Weekly brief endpoint
│   └── page.tsx                # Landing page
├── components/
│   ├── ui/                     # Reusable UI components
│   ├── cards/                  # Analysis result cards
│   └── brief/                  # Weekly brief component
├── lib/
│   ├── farcaster/              # Neynar API integration
│   ├── analysis/               # Metrics & clustering
│   ├── llm/                    # Claude API integration
│   └── db/                     # Database & caching
└── types/                      # TypeScript types
```

## Configuration

Engagement scoring weights (configurable in `src/types/index.ts`):
- Replies: 3x
- Likes: 1x
- Recasts: 2x

Analysis defaults:
- Max casts: 100
- Days back: 30
- Top/bottom N: 5 each
- Theme clusters: 7

## License

MIT
