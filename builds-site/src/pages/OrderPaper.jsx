import { Calendar, Clock, MapPin, CalendarPlus } from "lucide-react";
import { styles, roman, fmtDate, downloadICS } from "../ui.js";
export default function OrderPaper({ events }) {
  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));
  return (
    <section style={styles.section}>
      <div style={styles.sectionEyebrow}>UPCOMING EVENTS</div>
      <h2 style={styles.h2}>The Order Paper</h2>
      <p style={{ ...styles.bodyText, maxWidth: 640 }}>
        Every session BUILDS convenes is listed here, in the order the House will hear it.
      </p>
      <div style={{ marginTop: 32 }}>
        {sorted.length === 0 && <div style={styles.emptyNote}>No business currently before the House.</div>}
        {sorted.map((ev, i) => (
          <div key={ev.id} className="ev-card order-item" style={styles.orderItem}>
            <div style={styles.orderNumeral}>{roman[i % roman.length]}</div>
            <div style={{ flex: 1 }}>
              <div style={styles.orderMeta}>
                <span><Calendar size={13} style={{ marginRight: 5, position: "relative", top: 2 }} />{fmtDate(ev.date)}</span>
                <span><Clock size={13} style={{ marginRight: 5, position: "relative", top: 2 }} />{ev.time}</span>
                <span><MapPin size={13} style={{ marginRight: 5, position: "relative", top: 2 }} />{ev.venue}</span>
              </div>
              <div style={styles.orderTitle}>{ev.title}</div>
              <div style={styles.orderMotion}>“{ev.motion}”</div>
              <div style={styles.orderDesc}>{ev.description}</div>
              <button className="btn-outline" style={styles.orderCalBtn} onClick={() => downloadICS(ev)}>
                <CalendarPlus size={14} /> Add to calendar
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
