# TV Landing Template

A white-label TV show landing page template with a built-in CMS admin panel and one-click site cloning.

## What this builds

- A pixel-accurate landing page (clone of mompreneurstv.com/tvmp-main)
- Password-protected `/admin` panel for editing all content with live preview
- One-click site cloning: spin up a new site for a client in ~60 seconds

## Prerequisites

1. **Node.js 18+**
2. **GitHub account** — you'll need a Personal Access Token
3. **Vercel account** — you'll need a Vercel API token

---

## One-Time Setup

### 1. Create GitHub Personal Access Token

1. Go to https://github.com/settings/tokens/new
2. Note: "TV Landing Template"
3. Expiration: No expiration (or set to 1 year)
4. Scopes: check **repo** (full control of private repositories)
5. Click "Generate token" — copy the token immediately, you won't see it again

### 2. Create Vercel API Token

1. Go to https://vercel.com/account/settings/tokens
2. Name: "TV Landing Template"
3. Scope: Full Account (or your team)
4. Click "Create" — copy the token

### 3. Mark this repo as a GitHub Template Repository

1. Go to your GitHub repo → Settings
2. Check "Template repository"
3. Save

This allows the clone system to fork this repo for each new client site.

---

## Initial Deployment

### Local development

```bash
# Copy env file
cp .env.example .env.local

# Edit .env.local with your values:
# ADMIN_PASSWORD=your-secret-password
# GITHUB_TOKEN=ghp_xxxx
# GITHUB_OWNER=your-username
# GITHUB_REPO=tv-landing-template
# DEPLOY_VERCEL_TOKEN=xxxx
# IS_TEMPLATE=true

# Install and run
npm install
npm run dev
```

Visit http://localhost:3000 — landing page.
Visit http://localhost:3000/admin — login with your ADMIN_PASSWORD.

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard:
# Project Settings → Environment Variables → add all vars from .env.example
```

Or deploy via Vercel dashboard:
1. Import this GitHub repo at https://vercel.com/new
2. Add all environment variables from `.env.example`
3. Deploy

---

## Creating a Clone (New Client Site)

1. Open your deployed template at `https://your-template.vercel.app/admin`
2. Navigate to **Sites** tab
3. Click **New Site**
4. Enter:
   - Site name (slug): e.g. `client-sarah-tv` → becomes `client-sarah-tv.vercel.app`
   - Admin password for this client's site
5. Click **Create Site**
6. Wait ~60 seconds

The system will:
1. Fork this GitHub repo → creates `github.com/your-username/client-sarah-tv`
2. Reset `content.json` to blank template in the new repo
3. Create a Vercel project linked to the new repo
4. Set all environment variables on the new project
5. Trigger the first deployment

Your client receives:
- **Live site:** `https://client-sarah-tv.vercel.app`
- **Admin panel:** `https://client-sarah-tv.vercel.app/admin` (with their own password)
- **GitHub repo:** backup + version history of all their content

---

## Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `ADMIN_PASSWORD` | Yes | Password to access /admin |
| `GITHUB_TOKEN` | Yes | GitHub PAT with `repo` scope |
| `GITHUB_OWNER` | Yes | GitHub username or org |
| `GITHUB_REPO` | Yes | This repo's name |
| `DEPLOY_VERCEL_TOKEN` | Template only | Vercel API token for creating clones (VERCEL_ prefix is reserved by Vercel) |
| `DEPLOY_VERCEL_TEAM_ID` | Optional | Vercel team ID (blank for personal) |
| `IS_TEMPLATE` | Yes | `"true"` on template, `"false"` on clones |

---

## Editing Content

1. Go to `/admin` → log in
2. Select a section from the left sidebar
3. Edit text fields, upload images, add/remove list items
4. Click **Save & Deploy** (Ukrainian: "Зберегти і Деплоїти")
5. Changes go live in ~30 seconds via Vercel auto-deploy
