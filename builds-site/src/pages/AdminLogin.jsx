import { Lock } from "lucide-react";
import { styles } from "../ui.js";
export default function AdminLogin({ emailInput, setEmailInput, pwInput, setPwInput, handleLogin, loginError }) {
  return (
    <section style={{ ...styles.section, maxWidth: 420 }}>
      <div style={styles.sectionEyebrow}>SECRETARIAT ACCESS</div>
      <h2 style={styles.h2}>Admin Login</h2>
      <p style={{ ...styles.bodyText, fontSize: 15 }}>
        For office-bearers only, to post events, dispatches, and review membership applications.
      </p>
      <div style={styles.form}>
        <label style={styles.label}>Email</label>
        <input
          type="email" style={styles.input} value={emailInput} autoComplete="username"
          onChange={(e) => setEmailInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />
        <label style={styles.label}>Password</label>
        <input
          type="password" style={styles.input} value={pwInput} autoComplete="current-password"
          onChange={(e) => setPwInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />
        {loginError && <div style={styles.errorNote}>{loginError}</div>}
        <button className="btn-maroon" style={{ ...styles.btnPrimary, marginTop: 8, alignSelf: "flex-start" }} onClick={handleLogin}>
          <Lock size={16} /> Enter
        </button>
      </div>
      <p style={{ fontSize: 12, color: "var(--ink-faint)", marginTop: 20, lineHeight: 1.6 }}>
        This signs in against the society's Firebase account — only office-bearers whose
        email was added in the Firebase console can get in.
      </p>
    </section>
  );
}
