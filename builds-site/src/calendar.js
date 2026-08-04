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

/* Returns:
     null  — not configured yet (no API key); callers fall back to seed events
     []    — configured, calendar is public, but no upcoming events
   Throws if the API call fails (e.g. calendar not public, bad key). */
export async function fetchCalendarEvents() {
  if (!CALENDAR_API_KEY) return null;

  const params = new URLSearchParams({
    key: CALENDAR_API_KEY,
    singleEvents: "true",
    orderBy: "startTime",
    maxResults: "250",
    timeMin: new Date().toISOString(),
  });
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
