import { CALENDAR_ID, CALENDAR_API_KEY } from "./calendar-config.js";

/* Reads upcoming events from a public Google Calendar via the Calendar API
   and maps them to the shape the Order Paper expects:
     { id, title, date, time, venue, motion, description }
   Convention: the FIRST LINE of the event description is shown as the motion
   (the italic line in quotes); any following lines become the description. */

function formatTime(hhmm) {
  const [hStr, minStr] = hhmm.split(":");
  let h = parseInt(hStr, 10);
  const min = minStr || "00";
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${min} ${ampm}`;
}

function toEvent(item) {
  const start = item.start || {};
  let date = "";
  let time = "";
  if (start.date) {
    date = start.date;
  } else if (start.dateTime) {
    const m = /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})/.exec(start.dateTime);
    if (m) {
      date = m[1];
      time = formatTime(m[2]);
    } else {
      date = new Date(start.dateTime).toISOString().slice(0, 10);
    }
  }

  const lines = (item.description || "").split("\n").map((l) => l.trim()).filter(Boolean);
  const motion = lines[0] || "";
  const description = lines.slice(1).join(" ");

  return {
    id: item.id,
    title: (item.summary || "").trim() || "Untitled event",
    date,
    time,
    venue: (item.location || "").trim(),
    motion,
    description,
  };
}

/* Shared fetch: returns event objects sorted by date, or null when the
   calendar is not configured yet (no API key) so callers can fall back to
   seed events. Throws if the API call fails (calendar not public, bad key). */
async function getEvents({ timeMin, timeMax, maxResults }) {
  if (!CALENDAR_API_KEY) return null;

  const params = new URLSearchParams({
    key: CALENDAR_API_KEY,
    singleEvents: "true",
    orderBy: "startTime",
    maxResults: String(maxResults),
    timeMin,
  });
  if (timeMax) params.set("timeMax", timeMax);
  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?${params.toString()}`;

  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Google Calendar API ${res.status}: ${body.slice(0, 160)}`);
  }
  const data = await res.json();
  const items = Array.isArray(data.items) ? data.items : [];
  return items
    .filter((i) => i.status !== "cancelled" && (i.start?.dateTime || i.start?.date))
    .map(toEvent)
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
}

/* Upcoming events only — powers the Order Paper and the home-page card. */
export function fetchCalendarEvents() {
  return getEvents({ timeMin: new Date().toISOString(), maxResults: 250 });
}

/* The whole current session year (Jan 1 → Dec 31) — powers the BUILDS Calendar. */
export function fetchYearEvents() {
  const now = new Date();
  return getEvents({
    timeMin: new Date(now.getFullYear(), 0, 1).toISOString(),
    timeMax: new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999).toISOString(),
    maxResults: 2500,
  });
}
