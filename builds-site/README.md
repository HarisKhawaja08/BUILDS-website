# BUILDS Website

Website for BUILDS — Bahria University Islamabad Literary &amp; Debates Society.
Built with React + Vite.

## Run locally

```bash
npm install
npm run dev
```

Then open the URL it prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
```

Output goes to `dist/` — see `DEPLOYMENT.md` for how to put it live.

## Admin login

Go to the "Secretariat" link in the nav and sign in with the admin email +
password you created in the Firebase Console (Authentication → Users).
There's no hardcoded password anymore — access is controlled by who has an
account in your Firebase project.

## Backend setup (required before this works)

This app needs a Firebase project connected before login or any data saving
will work. See `FIREBASE_SETUP.md` for the walkthrough, then paste your
config into `src/firebase.js`.
