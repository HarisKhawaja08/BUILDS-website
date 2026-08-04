import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { styles } from "../ui.js";
const ORG_DEPARTMENTS = [
  {
    id: "literature",
    label: "Literature",
    director: { role: "Director of Literature", name: "To be announced", photo: "/team/director-literature.jpg" },
    dd: { role: "Deputy Director", name: "To be announced", photo: "/team/dd-literature.jpg" },
    coordinators: [
      { role: "Coordinator, Books Club", name: "To be announced", photo: "/team/coordinator-books-club.jpg" },
    ],
  },
  {
    id: "debates",
    label: "Debates",
    director: { role: "Director of Debates", name: "To be announced", photo: "/team/director-debates.jpg" },
    dd: { role: "Deputy Director", name: "To be announced", photo: "/team/dd-debates.jpg" },
    coordinators: [
      { role: "Coordinator, MUNs", name: "To be announced", photo: "/team/coordinator-muns.jpg" },
      { role: "Coordinator, Debates", name: "To be announced", photo: "/team/coordinator-debates.jpg" },
    ],
  },
  {
    id: "operations",
    label: "Operations",
    director: { role: "Director of Operations", name: "To be announced", photo: "/team/director-operations.jpg" },
    dd: { role: "Deputy Director", name: "To be announced", photo: "/team/dd-operations.jpg" },
    coordinators: [
      { role: "Media & IT", name: "To be announced", photo: "/team/coordinator-media-it.jpg" },
      { role: "Marketing", name: "To be announced", photo: "/team/coordinator-marketing.jpg" },
      { role: "Logistics", name: "To be announced", photo: "/team/coordinator-logistics.jpg" },
    ],
  },
];

function OrgAvatar({ label, photo, size = 48 }) {
  const [errored, setErrored] = useState(false);
  if (photo && !errored) {
    return (
      <img
        src={photo}
        alt={label}
        onError={() => setErrored(true)}
        style={{ width: size, height: size, borderRadius: 6, objectFit: "cover", margin: "0 auto 12px", display: "block", border: "1px solid #E2E6EF" }}
      />
    );
  }
  return (
    <div style={{ ...styles.orgAvatar, width: size, height: size, fontSize: size * 0.34 }}>
      {label.charAt(0)}
    </div>
  );
}

function OrgCard({ role, name, photo }) {
  return (
    <div style={styles.orgCardBig}>
      <OrgAvatar label={name} photo={photo} size={128} />
      <div style={styles.orgRoleBig}>{role}</div>
      <div style={styles.orgNameBig}>{name}</div>
    </div>
  );
}

export default function TheHouse() {
  const [openDept, setOpenDept] = useState(null);
  const toggle = (id) => setOpenDept((cur) => (cur === id ? null : id));
  const activeDept = ORG_DEPARTMENTS.find((d) => d.id === openDept) || null;

  return (
    <section style={styles.section}>
      <div style={styles.sectionEyebrow}>THE HOUSE</div>
      <h2 style={styles.h2}>Cabinet &amp; Wings</h2>
      <p style={{ ...styles.bodyText, maxWidth: 640, marginBottom: 12 }}>
        The Society's structure, top to bottom. Tap a department to see its directorate —
        opening one closes the others.
      </p>

      <div style={styles.orgChart}>
        {/* President */}
        <OrgCard role="President" name="To be announced" photo="/team/president.jpg" big />
        <div style={styles.orgStem} />
        <div style={styles.orgBar} />

        {/* VP + GS */}
        <div className="org-row-2" style={styles.orgRow2}>
          {/* VP branch — departments live here */}
          <div style={styles.orgCol}>
            <div style={styles.orgStemShort} />
            <OrgCard role="Vice President" name="To be announced" photo="/team/vice-president.jpg" />
            <div style={styles.orgStemShort} />
            <div style={styles.orgBar} />

            {/* Level 3: department buttons — always in an equal-width grid so all three stay level, whichever is expanded */}
            <div className="org-row-3" style={styles.orgRow3}>
              {ORG_DEPARTMENTS.map((dept) => {
                const isOpen = openDept === dept.id;
                return (
                  <div key={dept.id} style={styles.deptCol}>
                    <div style={styles.orgStemShort} />
                    <button
                      style={{ ...styles.deptButton, ...(isOpen ? styles.deptButtonOpen : {}) }}
                      onClick={() => toggle(dept.id)}
                      aria-expanded={isOpen}
                    >
                      <span>{dept.label}</span>
                      <ChevronDown
                        size={16}
                        style={{ transition: "transform 300ms ease", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}
                      />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Expanded directorate — one shared full-width panel, so it never fights the button grid for width, and level 5 coordinators can sit in a true horizontal row */}
            <div style={{ ...styles.expandWrap, ...(activeDept ? styles.expandWrapOpen : {}) }}>
              <div style={styles.expandInner}>
                {activeDept && (
                  <>
                    <div style={styles.orgStemShort} />
                    {/* Level 4: Deputy Director */}
                    <OrgCard role={activeDept.director.role} name={activeDept.director.name} photo={activeDept.director.photo} />
                    <div style={styles.orgStemShort} />
                    <OrgCard role={activeDept.dd.role} name={activeDept.dd.name} photo={activeDept.dd.photo} />
                    <div style={styles.orgStemShort} />
                    {activeDept.coordinators.length > 1 && <div style={styles.orgBarSmall} />}
                    {/* Level 5: Coordinators — equal width, side by side */}
                    <div style={styles.coordRow}>
                      {activeDept.coordinators.map((c) => (
                        <div key={c.role} style={styles.coordCol}>
                          {activeDept.coordinators.length > 1 && <div style={styles.orgStemTiny} />}
                          <OrgCard role={c.role} name={c.name} photo={c.photo} />
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* GS branch — no departments here */}
          <div style={styles.orgCol}>
            <div style={styles.orgStemShort} />
            <OrgCard role="General Secretary" name="To be announced" photo="/team/general-secretary.jpg" />
            <div style={styles.orgStemShort} />
            <div style={styles.orgCardStatic}>
              <OrgAvatar label="Board of Directors" size={40} />
              <div style={styles.orgRole}>Board of Directors</div>
            </div>
          </div>
        </div>
      </div>

      <p style={{ fontSize: 12, color: "var(--ink-faint)", marginTop: 28, lineHeight: 1.6 }}>
        Placeholder names and photos above — send me the real cabinet and I'll drop them in
        (and can wire this section to the Admin panel so you can edit it yourselves).
      </p>
    </section>
  );
}
