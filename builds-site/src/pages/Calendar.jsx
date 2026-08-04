import { Calendar as CalendarIcon, Clock, MapPin, CalendarPlus } from "lucide-react";
import { styles, fmtDate, downloadICS } from "../ui.js";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function Calendar({ events }) {
  const year = new Date().getFullYear();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const byMonth = Array.from({ length: 12 }, () => []);
  [...events]
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
    .forEach((ev) => {
      const mo = parseInt((ev.date || "").split("-")[1], 10) - 1;
      if (mo >= 0 && mo <= 11) byMonth[mo].push(ev);
    });

  return (
    <section style={styles.section}>
      <div style={styles.sectionEyebrow}>THE SESSION · {year}</div>
      <h2 style={styles.h2}>BUILDS Calendar</h2>
      <p style={{ ...styles.bodyText, maxWidth: 640 }}>
        Every sitting and social of the {year} session — past and yet to come.
        Past events are shown in muted type.
      </p>
      <div style={{ marginTop: 32 }}>
        {events.length === 0 && <div style={styles.emptyNote}>No business currently before the House.</div>}
        {MONTHS.map((name, m) => {
          const list = byMonth[m];
          return (
            <div key={name} style={styles.calMonth}>
              <div style={styles.calMonthHead}>
                {name} <span style={styles.calMonthYear}>{year}</span>
              </div>
              {list.length === 0 && (
                <div style={styles.emptyNote}>No sittings this month.</div>
              )}
              {list.map((ev) => {
                const isPast = new Date(ev.date + "T00:00:00") < today;
                return (
                  <div key={ev.id} className="ev-card" style={{ ...styles.calEvent, opacity: isPast ? 0.6 : 1 }}>
                    <div style={{ flex: 1 }}>
                      <div style={styles.calEventDate}>
                        <CalendarIcon size={13} />
                        {fmtDate(ev.date)}
                        {isPast && <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: 1, color: "var(--ink-faint)", fontWeight: 600 }}>PAST</span>}
                      </div>
                      <div style={styles.calEventTitle}>{ev.title}</div>
                      {ev.motion && <div style={styles.calEventMotion}>“{ev.motion}”</div>}
                      <div style={styles.calEventMeta}>
                        <span><Clock size={13} style={{ marginRight: 5, position: "relative", top: 2 }} />{ev.time || "All day"}</span>
                        {ev.venue && <span><MapPin size={13} style={{ marginRight: 5, position: "relative", top: 2 }} />{ev.venue}</span>}
                      </div>
                      {ev.description && <div style={styles.orderDesc}>{ev.description}</div>}
                      <button className="btn-outline" style={styles.orderCalBtn} onClick={() => downloadICS(ev)}>
                        <CalendarPlus size={14} /> Add to calendar
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
}
