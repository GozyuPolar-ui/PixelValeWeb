# PixelVale

> An indie game distribution platform built with Next.js and Supabase.

![Status](https://img.shields.io/badge/status-sold-success)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ecf8e)

## Project Status: Sold

PixelVale has been **sold to a private client who has asked to remain anonymous**. This repository is kept as a portfolio showcase of the work I built, covering the architecture, features, and technical decisions behind the platform.

## About

PixelVale is a home for indie games. It gives developers and players a single place to discover games, read news, talk with the community, and get help when something goes wrong. The platform launched with **The Mist of Dawn** by ExceedOG as its featured title.

I designed and built the whole project solo, from the database and authentication to the user interface and the AI support assistant.

## Features

### Game pages
Every game gets its own dynamic page generated from data, so adding a new title does not require writing a new page by hand.

### News and articles
A built-in article system for announcements, devlogs, and updates, so the platform can publish content without relying on an external CMS.

### Community forum
A discussion area where players can post and reply. Counters and related data are kept consistent by **PostgreSQL triggers** inside Supabase, so the logic lives close to the data instead of being repeated in the frontend.

### Help Center with AI support
A support section with an assistant powered by **Google Gemini**. Players can ask questions in natural language and get answers without waiting for a human.

### Authentication
- Email sign-up and login
- Social login with **Google, Discord, and GitHub**
- Forgot-password and reset flow

### Support and policy pages
Dedicated pages for support, terms, and privacy-related content.

## Tech Stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Animation | Framer Motion |
| Backend / Auth / Database | Supabase (PostgreSQL) |
| AI | Google Gemini |
| Hosting | Vercel |
| Automation | GitHub Actions |

## Architecture Overview

- **Frontend**: Next.js 14 with the App Router and TypeScript. Game and article pages use dynamic routes.
- **Backend**: Supabase handles the database, authentication, and row-level security, so there is no separate custom server to maintain.
- **Database logic**: forum behavior is driven by PostgreSQL triggers.
- **AI layer**: the Help Center sends user questions to the Gemini API and returns the response in the interface.
- **Deployment**: hosted on Vercel, with a scheduled GitHub Actions workflow keeping the Supabase project active.

## Getting Started

### Prerequisites

- Node.js 18 or newer
- A Supabase project
- A Gemini API key (for the Help Center)

### Installation

```bash
git clone https://github.com/GozyuPolar-ui/PixelValeWeb.git
cd PixelValeWeb
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-or-publishable-key>
GEMINI_API_KEY=<your-gemini-api-key>
```

Adjust the variable names to match the ones used in the code.

### Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Authentication Setup

Social login runs through Supabase Auth.

1. In the Supabase dashboard, go to **Authentication → Providers** and enable Google, Discord, and GitHub with their Client ID and Secret.
2. In each provider's developer console, set the redirect URI to:
   ```
   https://<your-project-ref>.supabase.co/auth/v1/callback
   ```
3. In **Authentication → URL Configuration**, set the Site URL to the production URL and add these Redirect URLs:
   ```
   https://<your-domain>/auth/callback
   http://localhost:3000/auth/callback
   ```

## Keeping Supabase Awake

Supabase free-tier projects are paused after about a week of inactivity. A GitHub Actions workflow (`.github/workflows/supabase-keepalive.yml`) pings the database every 3 days to prevent that.

Add these repository secrets under **Settings → Secrets and variables → Actions**:

| Secret | Value |
| --- | --- |
| `SUPABASE_URL` | `https://<your-project-ref>.supabase.co` |
| `SUPABASE_ANON_KEY` | Your anon / publishable key |

The workflow can also be triggered manually from the **Actions** tab with **Run workflow**.

## Lessons Learned

- Use `||` instead of `??` when an empty string should fall back to a default value.
- Supabase's free tier limits auth emails, so password reset emails can be rate limited during testing.
- Restart the dev server after adding new dynamic routes.
- A paused Supabase project shows up as `DNS_PROBE_FINISHED_NXDOMAIN` on login, which looks like a code bug but is not.

## Author

Built by **Raymond** ([@GozyuPolar-ui](https://github.com/GozyuPolar-ui)), a self-taught developer from Indonesia.
