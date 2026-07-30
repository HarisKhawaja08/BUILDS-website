# Deploying the BUILDS website

This is a normal React + Vite project — no special server needed, just static hosting.

## 1. Push it to GitHub

**Easiest way (no terminal, no git installed):**
1. Go to https://github.com/new, name the repo `builds-website` (or whatever you like), keep it Public, don't add a README (you already have one).
2. Click **"uploading an existing file"** on the next screen.
3. Drag in every file/folder from this project **except** `node_modules` and `dist` (they're regenerated automatically — don't upload them).
4. Commit.

**If you have git installed:**
```bash
cd builds-site
git init
git add .
git commit -m "Initial BUILDS website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/builds-website.git
git push -u origin main
```

## 2. Deploy it live (free) — Vercel

1. Go to https://vercel.com and sign up/log in **with your GitHub account**.
2. Click **"Add New → Project"**, pick the `builds-website` repo you just pushed.
3. Vercel auto-detects it's a Vite project — leave the defaults (Build command `npm run build`, Output directory `dist`).
4. Click **Deploy**. In under a minute you'll get a live URL like `builds-website.vercel.app`.

(Netlify works the same way if you'd rather use that — "Import from GitHub", same build/output settings.)

Every time you push a change to GitHub afterward, Vercel automatically rebuilds and redeploys — no extra steps.

## 3. Custom domain (optional)

If Bahria or the society ever gets a domain (e.g. `buildsbahria.com`), add it under
Vercel → your project → Settings → Domains, and point your domain's DNS at Vercel
following the instructions it shows you.

## 4. Backend setup — do this before the site actually works

The Admin panel (events, blog posts, gallery photos, join applications)
needs a Firebase project connected to save and share data. Without it,
`src/firebase.js` still has placeholder values and login/saving will fail.

See **`FIREBASE_SETUP.md`** for the full walkthrough — it takes about
5 minutes and is entirely free (no credit card).

Once connected, data is genuinely shared: something the admin adds shows
up for every visitor on every device, and admin access is controlled by
real login (Firebase Authentication), not a password sitting in the code.
