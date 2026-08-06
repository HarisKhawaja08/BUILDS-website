import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Mirrors the Netlify `[[redirects]]` for /calendar.ics so local dev/preview
// (`npm run dev`, `npm run preview`) fetch the private Google Calendar feed
// first-party — no third-party CORS proxy needed.
const calendarProxy = {
  "/calendar.ics": {
    target: "https://calendar.google.com",
    changeOrigin: true,
    rewrite: () =>
      "/calendar/ical/b88e4510c95ae24a868da6c54313ea0824024364f0a24c96a8a9a44fc2071589%40group.calendar.google.com/private-c6305a6b8865f08b0c22f9c051363671/basic.ics",
  },
};

export default defineConfig({
  plugins: [react()],
  server: { proxy: calendarProxy },
  preview: { proxy: calendarProxy },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          firebase: ["firebase/app", "firebase/auth", "firebase/firestore"],
          icons: ["lucide-react"],
        },
      },
    },
  },
});
