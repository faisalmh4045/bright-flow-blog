# BrightFlow

A modern blogging platform where anyone can read, write, and share ideas. Built with Next.js App Router, Better Auth, Neon Postgres, and Prisma.

🚀 Visit the [Live Demo](https://bright-flow-blog.vercel.app/) to explore the app in action.

---

## Features

- **Public blog feed** with search, category filter, and tag filter
- **Full blog detail page** with markdown rendering and related posts
- **Authentication** via email/password (Better Auth)
- **Write a post** — protected form with category, tags, cover image, and markdown content
- **Manage your posts** — view and delete your own posts from a dashboard table
- **Static generation** for individual blog pages via `generateStaticParams`
- **Server Actions** for all data mutations (create, delete)
- **Responsive UI** across mobile, tablet, and desktop (shadcn/ui + Tailwind CSS)

---

## Tech Stack

| Layer      | Technology                 |
| ---------- | -------------------------- |
| Framework  | Next.js (App Router)       |
| Auth       | Better Auth                |
| Database   | Neon (serverless Postgres) |
| ORM        | Prisma                     |
| UI         | shadcn/ui + Tailwind CSS   |
| Deployment | Vercel                     |

---

## Getting Started

### Prerequisites

- **Node.js** v20.9 or higher
- **PostgreSQL**: Set up a database on [Neon](https://neon.com/)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/faisalmh4045/bright-flow-blog.git
cd bright-flow-blog

# 2. Install dependencies
pnpm install

# 3. Set up environment variables
cp .env.example .env
# Open .env and fill in your values (DATABASE_URL, BETTER_AUTH_SECRET, etc.)

# 4. Generate Prisma client
npx prisma generate

# 5. Push schema to the database
npx prisma db push

# 6. Seed the database (optional but recommended)
npx prisma db seed

# 7. Start the development server
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

```env
# Database (Neon)
DATABASE_URL=your_neon_connection_string

# Better Auth
BETTER_AUTH_SECRET=your_random_secret_here
BETTER_AUTH_URL=http://localhost:3000
```

### Deployment (Vercel)

1. Push your repository to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Add all environment variables from above in the Vercel dashboard
4. Set `BETTER_AUTH_URL` to your production domain (e.g. `https://bright-flow.vercel.app`)
5. Deploy

---

## Routes

| Route           | Access    | Description                                                               |
| --------------- | --------- | ------------------------------------------------------------------------- |
| `/`             | Public    | Landing page — hero, featured posts, categories, testimonials, newsletter |
| `/blogs`        | Public    | All blog posts with search and filters                                    |
| `/blogs/[id]`   | Public    | Full blog post detail with related posts                                  |
| `/about`        | Public    | About the platform                                                        |
| `/login`        | Public    | Sign in with email/password                                               |
| `/signup`       | Public    | Create a new account                                                      |
| `/blogs/create` | Protected | Write and publish a new blog post                                         |
| `/blogs/manage` | Protected | View and delete your own posts                                            |
