import { useState } from "react";
import { Search, ChevronRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { styles, fmtDate, urduStyle } from "../ui.js";
export function Blog({ posts }) {
  const [q, setQ] = useState("");
  const term = q.trim().toLowerCase();
  const filtered = term
    ? posts.filter((p) => [p.title, p.excerpt, p.content, p.author].join(" ").toLowerCase().includes(term))
    : posts;
  return (
    <section style={styles.section}>
      <div style={styles.sectionEyebrow}>FROM THE SOCIETY</div>
      <h2 style={styles.h2}>Dispatches</h2>
      <div style={styles.searchRow}>
        <Search size={16} style={styles.searchIcon} />
        <input
          type="search"
          placeholder="Search dispatches…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={styles.searchInput}
          aria-label="Search dispatches"
        />
      </div>
      <div className="post-grid" style={styles.postGrid}>
        {filtered.map((p) => (
          <Link key={p.id} to={`/blog/${p.id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <div className="ev-card" style={styles.postCard}>
              <div style={styles.postMeta}>{fmtDate(p.date)} · {p.author}</div>
              <div style={{ ...styles.postTitle, ...urduStyle(p.title) }}>{p.title}</div>
              <div style={{ ...styles.postExcerpt, ...urduStyle(p.excerpt) }}>{p.excerpt}</div>
              <div style={styles.readMore}>Read dispatch <ChevronRight size={14} /></div>
            </div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <div style={styles.emptyNote}>
            {term ? `No dispatches match “${q.trim()}”.` : "No dispatches published yet."}
          </div>
        )}
      </div>
    </section>
  );
}

export function BlogPost({ posts }) {
  const { id } = useParams();
  const active = posts.find((p) => p.id === id);
  if (!active) {
    return (
      <section style={styles.section}>
        <Link to="/blog" style={styles.backLink}>← All dispatches</Link>
        <div style={styles.emptyNote}>Dispatch not found.</div>
      </section>
    );
  }
  return (
    <section style={{ ...styles.section, maxWidth: 720 }}>
      <Link to="/blog" style={styles.backLink}>← All dispatches</Link>
      <div style={styles.sectionEyebrow}>{fmtDate(active.date)} · {active.author}</div>
      <h2 style={{ ...styles.h2, ...urduStyle(active.title) }}>{active.title}</h2>
      <p style={{ ...styles.bodyText, fontSize: 18, lineHeight: 1.8, ...urduStyle(active.content) }}>{active.content}</p>
    </section>
  );
}
