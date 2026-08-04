import { styles } from "../ui.js";
export default function About() {
  return (
    <section style={styles.section}>
      <div style={styles.sectionEyebrow}>BUILDS BSEAS, H-11</div>
      <h2 style={styles.h2}>Constitution &amp; Purpose</h2>
      <div className="two-col" style={styles.twoCol}>
        <p style={styles.bodyText}>
          BUILDS — the Bahria University Islamabad Literary &amp; Debates Society — exists to give
          students a floor: a place to test an argument out loud, to draft a sentence until it holds
          weight, and to be answered by someone who has done the same.
        </p>
        <p style={styles.bodyText}>
          We run weekly debate practice in British Parliamentary format, a literary critique circle,
          and represent Bahria at inter-university tournaments across Islamabad and Rawalpindi.
          Membership is open to all departments and all years; no prior debating or writing
          experience is required, only the willingness to be disagreed with.
        </p>
      </div>
      <div style={styles.ruleThin} />
      <div className="stats-row" style={styles.statsRow}>
        {[["120+", "Active members"], ["10+", "Tournaments attended"], ["8", "Anthologies published"], ["2023", "Founded"]].map(([n, l]) => (
          <div key={l} style={styles.statBlock}>
            <div style={styles.statNum}>{n}</div>
            <div style={styles.statLabel}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
