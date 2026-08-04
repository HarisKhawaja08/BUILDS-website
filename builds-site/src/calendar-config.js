/* Google Calendar connection details — the Order Paper is read from here.
   Fill in CALENDAR_API_KEY to go live (the site falls back to seed events until then).

   Setup (one-time, ~5 minutes):
   1. Make your calendar public (read-only):
      Google Calendar → click your calendar's "⋮" → Settings and sharing →
      "Access permissions" → tick "Make available to public".
   2. Enable the Google Calendar API and get an API key:
      go to https://console.cloud.google.com/apis/library/calendar-googleapis.com
      (create a project first if asked), click Enable.
      Then https://console.cloud.google.com/apis/credentials → Create credentials → API key.
   3. Paste the key below. */

export const CALENDAR_ID = "harishere.08@gmail.com";
export const CALENDAR_API_KEY = "";
