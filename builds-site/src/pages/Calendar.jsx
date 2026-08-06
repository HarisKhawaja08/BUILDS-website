import { useState } from "react";
import { Calendar as CalendarIcon, ChevronDown, ChevronRight, Clock, MapPin, CalendarPlus } from "lucide-react";
import { styles, fmtDate, downloadICS } from "../ui.js";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function daysInMonth(y, m) {
  return new Date(y, m + 1, 0).getDate();
}

function monthKey(m) {
  return `${new Date().getFullYear()}-${String(m + 1).padStart(2, "0")}`;
}

function buildCells(year, m, byMonth) {
  const byDay = {};
  for (const ev of byMonth[monthKey(m)] || []) {
    const d = parseInt((ev.date || "").split("-")[2], 10);
    if (!byDay[d]) byDay[d] = [];
    byDay[d].push(ev);
  }
  const lead = (new Date(year, m, 1).getDay() + 6) % 7;
  const cells = [];
  for (let i = 0; i < lead; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth(year, m); d++) cells.push({ month: m, d, events: byDay[d] || [] });
  return cells;
}

function DayCell({ cell, year, today, selected, onSelect }) {
  const dateObj = new Date(year, cell.month, cell.d);
  const isPast = dateObj < today;
  const isToday = dateObj.getTime() === today.getTime();
  return (
    <div className="cal-day-cell" style={{ ...styles.calDay, ...(isPast ? styles.calDayPast : {}) }}>
      <div style={isToday ? styles.calDayNumToday : styles.calDayNum}>{cell.d}</div>
      {cell.events.map((ev) => {
        const sel = selected && selected.id === ev.id;
        return (
          <div
            key={ev.id}
            className="cal-chip"
            style={{ ...styles.calEventChip, ...(sel ? styles.calEventChipSelected : {}) }}
            onClick={() => onSelect(sel ? null : ev)}
            title={`${ev.title} · ${fmtDate(ev.date)}${ev.time ? " · " + ev.time : ""}`}
          >
            {ev.title}
          </div>
        );
      })}
    </div>
  );
}

export default function Calendar({ events }) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const year = now.getFullYear();
  const [active, setActive] = useState(now.getMonth());
  const [selected, setSelected] = useState(null);

  const byMonth = {};
  for (const ev of events) {
    const k = (ev.date || "").slice(0, 7);
    if (!byMonth[k]) byMonth[k] = [];
    byMonth[k].push(ev);
  }

  const open = (m) => {
    setActive(m);
    setSelected(null);
  };

  return (
    <section style={styles.section}>
      <div style={styles.sectionEyebrow}>THE SESSION · {year}</div>
      <h2 style={styles.h2}>BUILDS Calendar</h2>
      <p style={{ ...styles.bodyText, maxWidth: 640 }}>
        The {year} session, month by month. The current month is open — select any other month and the page turns to it.
        Today is marked, past dates are muted, and clicking an event opens its full notice.
      </p>
      <div style={{ marginTop: 32 }}>
        {MONTHS.map((name, m) => {
          const monthEvents = byMonth[monthKey(m)] || [];
          const isOpen = active === m;
          const isCurrent = m === now.getMonth();
          return (
            <div key={name} style={styles.calMonth}>
              <div
                className="cal-month-head"
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                onClick={() => open(m)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(m); } }}
                style={{ ...styles.calMonthHead, ...(isOpen ? styles.calMonthHeadOpen : {}) }}
              >
                <div style={styles.calMonthTitle}>
                  {name}
                  <span style={styles.calMonthYear}>{year}</span>
                  {isCurrent && <span style={styles.calNowBadge}>THIS MONTH</span>}
                </div>
                <div style={styles.calMonthRight}>
                  <span style={styles.calMonthCount}>
                    {monthEvents.length === 0 ? "No sittings" : `${monthEvents.length} ${monthEvents.length === 1 ? "sitting" : "sittings"}`}
                  </span>
                  {isOpen ? <ChevronDown size={18} style={styles.calMonthChevron} /> : <ChevronRight size={18} style={styles.calMonthChevron} />}
                </div>
              </div>
              <div style={{ ...styles.expandWrap, ...(isOpen ? styles.expandWrapOpen : {}) }}>
                <div style={{ ...styles.expandInner, display: "block", alignItems: "unset" }}>
                  {isOpen && (
                    <>
                      <div style={styles.calGridHead}>
                        {WEEKDAYS.map((d) => <div key={d} style={styles.calGridHeadCell}>{d}</div>)}
                      </div>
                      <div style={styles.calGrid}>
                        {buildCells(year, m, byMonth).map((cell, i) =>
                          cell === null
                            ? <div key={`b${i}`} className="cal-day-cell" style={styles.calDayBlank} />
                            : <DayCell key={`${m}-${cell.d}`} cell={cell} year={year} today={today} selected={selected} onSelect={setSelected} />
                        )}
                      </div>
                      {selected && (
                        <div style={styles.calDetail}>
                          <div style={{ flex: 1 }}>
                            <div style={styles.calDetailMeta}>
                              <span><CalendarIcon size={13} style={{ marginRight: 5, position: "relative", top: 2 }} />{fmtDate(selected.date)}</span>
                              <span><Clock size={13} style={{ marginRight: 5, position: "relative", top: 2 }} />{selected.time || "All day"}</span>
                              {selected.venue && <span><MapPin size={13} style={{ marginRight: 5, position: "relative", top: 2 }} />{selected.venue}</span>}
                            </div>
                            <div style={styles.calDetailTitle}>{selected.title}</div>
                            {selected.motion && <div style={styles.calDetailMotion}>“{selected.motion}”</div>}
                            {selected.description && <div style={styles.orderDesc}>{selected.description}</div>}
                          </div>
                          <button className="btn-outline" style={styles.orderCalBtn} onClick={() => downloadICS(selected)}>
                            <CalendarPlus size={14} /> Add to calendar
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
