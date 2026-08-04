import { Users, BookOpen, Calendar, Scale, ChevronRight, Quote } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { styles, fmtDate, nextUpcomingEvent } from "../ui.js";
export default function Home({ events }) {
  const navigate = useNavigate();
  const next = nextUpcomingEvent(events);
  return (
    <div>
      <section className="hero-section" style={styles.hero}>
        <div style={styles.heroEyebrow}>ESTABLISHED · BAHRIA SCHOOL OF ENGINEERING AND APPLIED SCIENCES</div>
        <h1 style={styles.heroTitle}>
          The House<br />believes in<br /><em style={{ color: "var(--accent)", fontStyle: "italic" }}>the argument, well made.</em>
        </h1>
        <p style={styles.heroLede}>
          BUILDS trains speakers, publishes writers, and hosts the tournaments where
          Bahria's sharpest arguments and finest sentences are put to the floor.
        </p>
        <div style={styles.heroBtnRow}>
          <button className="btn-maroon" style={styles.btnPrimary} onClick={() => navigate("/join")}>
            Join the Society <ChevronRight size={16} />
          </button>
          <button className="btn-outline" style={styles.btnOutline} onClick={() => navigate("/events")}>
            View Order Paper
          </button>
        </div>
      </section>

      <div style={styles.rule} />

      {next && (
        <section style={styles.section}>
          <div style={styles.sectionEyebrow}>NEXT ON THE FLOOR</div>
          <div style={styles.nextEventCard}>
            <div>
              <div style={styles.nextEventDate}>{fmtDate(next.date)} · {next.time}</div>
              <div style={styles.nextEventTitle}>{next.title}</div>
              <div style={styles.nextEventMotion}><Quote size={14} style={{ marginRight: 6 }} />{next.motion}</div>
            </div>
            <button className="btn-outline" style={styles.btnOutlineSmall} onClick={() => navigate("/events")}>
              Full Order Paper
            </button>
          </div>
        </section>
      )}

      <div style={styles.rule} />

      <section style={styles.section}>
        <div style={styles.sectionEyebrow}>THREE WINGS, ONE FLOOR</div>
        <div className="pillars-grid" style={styles.pillarsGrid}>
          {[
            { icon: <Users size={20} />, title: "Directorate of Debate ", body: "British Parliamentary and Asian formats. Weekly practice rounds, adjudicator training, tournament delegations." },
            { icon: <BookOpen size={20} />, title: "Directorate of Literature", body: "Poetry, prose, and critique circles. A quarterly anthology drawn from member submissions." },
            { icon: <Calendar size={20} />, title: "Operations Department", body: "Events management,social media and graphics, IT, logistics, marketing & security." },
            { icon: <Scale size={20} />, title: "Board of directors", body: "Making the core decissions , from selection of new hierarchy to maintaining law and order." },
          ].map((p) => (
            <div key={p.title} style={styles.pillarCard}>
              <div style={styles.pillarIcon}>{p.icon}</div>
              <div style={styles.pillarTitle}>{p.title}</div>
              <div style={styles.pillarBody}>{p.body}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
