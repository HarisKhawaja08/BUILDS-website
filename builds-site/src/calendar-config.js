/* BUILDS calendar connection — the Order Paper and BUILDS Calendar page are
   read from the Google Calendar iCal feed below. The feed works while the
   calendar is private (secret link), so the site falls back to seed events
   only if CALENDAR_ICS_URL is left empty.

   calendar.google.com feeds don't send CORS headers, so the browser routes
   the request through CALENDAR_ICS_PROXY. You can point CALENDAR_ICS_URL at a
   same-origin path (e.g. "/calendar.ics" proxied by Netlify) to avoid the
   third-party proxy. */

export const CALENDAR_ID = "b88e4510c95ae24a868da6c54313ea0824024364f0a24c96a8a9a44fc2071589@group.calendar.google.com";
export const CALENDAR_API_KEY = "";
export const CALENDAR_ICS_URL = "https://calendar.google.com/calendar/ical/b88e4510c95ae24a868da6c54313ea0824024364f0a24c96a8a9a44fc2071589%40group.calendar.google.com/private-c6305a6b8865f08b0c22f9c051363671/basic.ics";
export const CALENDAR_ICS_PROXY = "https://api.allorigins.win/raw?url=";
export const CALENDAR_ICS_LOCAL_PATH = "/calendar.ics";
