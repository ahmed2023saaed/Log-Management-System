// import { useState, useEffect, useCallback, useRef } from "react";
// import {api} from "../services/api"
// import { C } from "../constants/colors";
// import Icon from "../components/common/icons";
// import Btn from "../components/common/btn";
// import "../App.css"

// // ── DASHBOARD PAGE ─────────────────────────────────────────────────────────────
// export default function DashboardPage({ token, onSelectApp }) {
//   const [apps, setApps]     = useState([]);
//   const [loading, setLoading] = useState(true);
 
//   // useEffect(() => {
//   //   api.getApps(token)
//   //     .then(d => setApps(d.applications || d.apps || (Array.isArray(d) ? d : [])))
//   //     .catch(() => {})
//   //     .finally(() => setLoading(false));
//   // }, [token]);

//      useEffect(()=>{
//       api.get("/applications", {
//         headers:{
//           Authorization: `Bearer ${token}`
//         }
//       }).then(res=>{
//         const d = res.data
//         setApps(d.applications || (Array.isArray(d) ? d : []))
//          .catch(() => {})
//          .finally(() => setLoading(false));
//       })
//      },[token])


 
//   const STATS = [
//     { label: "Total Applications", value: loading ? "—" : apps.length, icon: "terminal",  color: C.primary,    trend: null },
//     { label: "Log Ingestion",      value: "1.2M",                       icon: "bar_chart", color: C.indigo,     trend: "↑ 4%" },
//     { label: "Informational",      value: "842K",                       icon: "info",      color: C.primary,    accent: true },
//     { label: "Warnings",           value: "12.4K",                      icon: "warning",   color: C.amber,      accent: true },
//     { label: "Critical Errors",    value: "429",                        icon: "error",     color: C.rose,       accent: true },
//   ];
 
//   const BAR_HEIGHTS = [45, 65, 50, 80, 60, 95, 75, 40];
 
//   return (
//     <div className="fade-up" style={{ padding: "0 24px 40px" }}>
//       <div style={{ padding: "24px 0 20px" }}>
//         <h1 style={{ fontFamily: "Geist", fontSize: 28, fontWeight: 700, color: C.primary, margin: "0 0 4px" }}>Dashboard</h1>
//         <p style={{ color: C.muted, fontSize: 14, margin: 0 }}>System health overview</p>
//       </div>
 
//       {/* Stats row */}
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 18 }}>
//         {STATS.map((s, i) => (
//           <div key={i} className="glass shimmer" style={{ borderRadius: 14, padding: 20, minHeight: 114, display: "flex", flexDirection: "column", justifyContent: "space-between", borderLeft: s.accent ? `3px solid ${s.color}` : undefined }}>
//             <div>
//               <span style={{ fontSize: 10, color: C.muted, fontFamily: "JetBrains Mono", textTransform: "uppercase", letterSpacing: "0.09em", display: "block", marginBottom: 6 }}>{s.label}</span>
//               <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
//                 <span style={{ fontFamily: "Geist", fontSize: 26, fontWeight: 700, color: s.color }}>{s.value}</span>
//                 {s.trend && <span style={{ fontSize: 11, color: C.emerald }}>{s.trend}</span>}
//               </div>
//             </div>
//             <div style={{ display: "flex", justifyContent: "flex-end" }}>
//               <Icon name={s.icon} size={18} color={s.color} style={{ opacity: 0.35 }} />
//             </div>
//           </div>
//         ))}
//       </div>
 
//       {/* Charts row */}
//       <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14, marginBottom: 18 }}>
//         {/* Activity bar chart */}
//         <div className="glass" style={{ borderRadius: 14, padding: 24 }}>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
//             <div>
//               <h3 style={{ fontFamily: "Geist", fontSize: 17, fontWeight: 700, margin: "0 0 3px", display: "flex", alignItems: "center", gap: 8 }}>
//                 Activity Monitor
//                 <span style={{ background: "rgba(52,211,153,.1)", color: C.emerald, border: "1px solid rgba(52,211,153,.2)", borderRadius: 20, padding: "1px 8px", fontSize: 9, fontFamily: "JetBrains Mono", fontWeight: 700, letterSpacing: "0.06em" }}>LIVE</span>
//               </h3>
//               <p style={{ color: C.muted, fontSize: 12, margin: 0 }}>Request throughput (24 h period)</p>
//             </div>
//             <div style={{ display: "flex", background: "rgba(34,42,61,.5)", borderRadius: 9, padding: 3, border: "1px solid rgba(255,255,255,.06)" }}>
//               {["24h", "7d", "30d"].map((t, i) => (
//                 <button key={t} style={{ padding: "4px 13px", borderRadius: 7, border: "none", cursor: "pointer", background: i === 0 ? C.primary : "transparent", color: i === 0 ? C.primaryOn : C.muted, fontFamily: "JetBrains Mono", fontSize: 11, fontWeight: i === 0 ? 700 : 400 }}>{t}</button>
//               ))}
//             </div>
//           </div>
//           <div style={{ height: 170, display: "flex", alignItems: "flex-end", gap: 9, padding: "0 2px", marginBottom: 10 }}>
//             {BAR_HEIGHTS.map((h, i) => (
//               <div key={i} style={{ flex: 1, height: `${h}%`, background: `rgba(138,235,255,${0.1 + h / 400})`, borderRadius: "3px 3px 0 0", cursor: "pointer", position: "relative", transition: "background .2s" }}
//                 onMouseEnter={e => { e.currentTarget.style.background = `rgba(138,235,255,${0.22 + h / 300})`; }}
//                 onMouseLeave={e => { e.currentTarget.style.background = `rgba(138,235,255,${0.1 + h / 400})`; }}>
//                 <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: C.primary, boxShadow: `0 0 10px ${C.primary}`, opacity: 0, transition: "opacity .2s", borderRadius: 2 }} />
//               </div>
//             ))}
//           </div>
//           <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: C.muted, fontFamily: "JetBrains Mono", borderTop: "1px solid rgba(255,255,255,.04)", paddingTop: 8 }}>
//             {["Yesterday", "06:00", "12:00", "18:00"].map(t => <span key={t}>{t}</span>)}
//             <span style={{ color: C.primary, fontWeight: 700 }}>Now</span>
//           </div>
//         </div>
 
//         {/* Health donut */}
//         <div className="glass" style={{ borderRadius: 14, padding: 24, display: "flex", flexDirection: "column" }}>
//           <h3 style={{ fontFamily: "Geist", fontSize: 17, fontWeight: 700, margin: "0 0 16px" }}>Health Distribution</h3>
//           <div style={{ display: "flex", justifyContent: "center", flex: 1, marginBottom: 16 }}>
//             <div style={{ position: "relative", width: 160, height: 160 }}>
//               <svg viewBox="0 0 36 36" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
//                 <circle cx="18" cy="18" r="15.915" fill="transparent" stroke={C.primaryDim} strokeWidth="3" strokeDasharray="276" strokeDashoffset="40" />
//                 <circle cx="18" cy="18" r="15.915" fill="transparent" stroke={C.amber}      strokeWidth="3" strokeDasharray="276" strokeDashoffset="250" />
//                 <circle cx="18" cy="18" r="15.915" fill="transparent" stroke={C.rose}       strokeWidth="3" strokeDasharray="276" strokeDashoffset="200" />
//               </svg>
//               <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
//                 <span style={{ fontFamily: "Geist", fontSize: 24, fontWeight: 700 }}>98.4%</span>
//                 <span style={{ fontSize: 9, color: C.muted, fontFamily: "JetBrains Mono", textTransform: "uppercase" }}>Uptime</span>
//               </div>
//             </div>
//           </div>
//           {[["Healthy", C.primaryDim, "84%"], ["Struggling", C.amber, "12%"], ["Degraded", C.rose, "4%"]].map(([label, color, pct]) => (
//             <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
//               <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
//                 <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, boxShadow: `0 0 5px ${color}` }} />
//                 <span style={{ fontSize: 13, color: C.text }}>{label}</span>
//               </div>
//               <span style={{ fontFamily: "JetBrains Mono", fontSize: 12, color: C.muted }}>{pct}</span>
//             </div>
//           ))}
//         </div>
//       </div>
 
//       {/* Recent apps table */}
//       <div className="glass" style={{ borderRadius: 14, overflow: "hidden" }}>
//         <div style={{ padding: "14px 22px", borderBottom: "1px solid rgba(255,255,255,.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//           <h3 style={{ fontFamily: "Geist", fontSize: 17, fontWeight: 700, margin: 0 }}>Recent Applications</h3>
//           <span style={{ color: C.primary, fontSize: 12, fontFamily: "JetBrains Mono", cursor: "pointer" }}>View All →</span>
//         </div>
//         {loading ? (
//           <div style={{ textAlign: "center", padding: 36, color: C.muted }}>Loading…</div>
//         ) : (
//           <table style={{ width: "100%", borderCollapse: "collapse" }}>
//             <thead>
//               <tr style={{ background: "rgba(34,42,61,.25)" }}>
//                 {["Application", "ID", "Status", ""].map(h => (
//                   <th key={h} style={{ padding: "9px 22px", textAlign: "left", fontSize: 10, color: C.muted, fontFamily: "JetBrains Mono", textTransform: "uppercase", letterSpacing: "0.09em" }}>{h}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {apps.slice(0, 6).map(app => (
//                 <tr key={app.id || app._id} style={{ borderBottom: "1px solid rgba(255,255,255,.03)", cursor: "pointer", transition: "background .15s" }}
//                   onMouseEnter={e => e.currentTarget.style.background = "rgba(138,235,255,.03)"}
//                   onMouseLeave={e => e.currentTarget.style.background = "transparent"}
//                   onClick={() => onSelectApp(app)}>
//                   <td style={{ padding: "12px 22px", fontFamily: "Geist", fontWeight: 600, fontSize: 14 }}>{app.name}</td>
//                   <td style={{ padding: "12px 22px", fontFamily: "JetBrains Mono", fontSize: 11, color: C.primary }}>{String(app.id || app._id).slice(0, 10)}…</td>
//                   <td style={{ padding: "12px 22px" }}>
//                     <span style={{ background: "rgba(52,211,153,.1)", color: C.emerald, border: "1px solid rgba(52,211,153,.2)", borderRadius: 20, padding: "2px 9px", fontSize: 10, fontFamily: "JetBrains Mono", fontWeight: 700 }}>Healthy</span>
//                   </td>
//                   <td style={{ padding: "12px 22px" }}>
//                     <Btn size="sm" onClick={e => { e.stopPropagation(); onSelectApp(app); }} style={{ border: "1px solid rgba(138,235,255,.2)", background: "rgba(138,235,255,.07)", color: C.primary }}>
//                       <Icon name="terminal" size={13} />
//                       View Logs
//                     </Btn>
//                   </td>
//                 </tr>
//               ))}
//               {apps.length === 0 && (
//                 <tr><td colSpan={4} style={{ textAlign: "center", padding: 36, color: C.muted, fontFamily: "JetBrains Mono", fontSize: 13 }}>No applications yet. Create one to start collecting logs.</td></tr>
//               )}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }





import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { api, authHeaders } from "../services/api"
import { useAuth } from "../context/useAuthHook"
import { ShowToast } from "../components/common/Toast"
import { C } from "../constants/colors"
import Icon from "../components/common/icons"
import Btn from "../components/common/btn"
import "../App.css"
 
export default function Dashboard() {
  const [apps,    setApps]    = useState([])
  const [loading, setLoading] = useState(true)
  const { token }  = useAuth()
  const navigate   = useNavigate()
 
  useEffect(() => {
    const fetchApps = async () => {
      try {
        // GET /api/applications  →  array of application objects
        const { data } = await api.get("/applications", authHeaders(token))
        setApps(Array.isArray(data) ? data : (data.applications ?? []))
      } catch (err) {
        ShowToast(err.response?.data?.message ?? "Failed to load applications", "error")
      } finally {
        setLoading(false)
      }
    }
    fetchApps()
  }, [token])
 
  const STATS = [
    { label: "Total Applications", value: loading ? "—" : apps.length, icon: "terminal",  color: C.primary, trend: null },
    { label: "Log Ingestion",      value: "1.2M",   icon: "bar_chart", color: C.indigo,  trend: "↑ 4%" },
    { label: "Informational",      value: "842K",   icon: "info",      color: C.primary, accent: true   },
    { label: "Warnings",           value: "12.4K",  icon: "warning",   color: C.amber,   accent: true   },
    { label: "Critical Errors",    value: "429",    icon: "error",     color: C.rose,    accent: true   },
  ]
 
  const BAR_HEIGHTS = [45, 65, 50, 80, 60, 95, 75, 40]
 
  return (
    <div className="fade-up" style={{ padding: "0 24px 40px" }}>
 
      {/* Page title */}
      <div style={{ padding: "24px 0 20px" }}>
        <h1 style={{ fontFamily: "Geist", fontSize: 28, fontWeight: 700, color: C.primary, margin: "0 0 4px" }}>Dashboard</h1>
        <p style={{ color: C.muted, fontSize: 14, margin: 0 }}>System health overview</p>
      </div>
 
      {/* ── Stat cards ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 18 }}>
        {STATS.map((s, i) => (
          <div
            key={i}
            className="glass shimmer"
            style={{ borderRadius: 14, padding: 20, minHeight: 114, display: "flex", flexDirection: "column", justifyContent: "space-between", borderLeft: s.accent ? `3px solid ${s.color}` : undefined }}
          >
            <div>
              <span style={{ fontSize: 10, color: C.muted, fontFamily: "JetBrains Mono", textTransform: "uppercase", letterSpacing: "0.09em", display: "block", marginBottom: 6 }}>
                {s.label}
              </span>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <span style={{ fontFamily: "Geist", fontSize: 26, fontWeight: 700, color: s.color }}>{s.value}</span>
                {s.trend && <span style={{ fontSize: 11, color: C.emerald }}>{s.trend}</span>}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Icon name={s.icon} size={18} color={s.color} style={{ opacity: 0.35 }} />
            </div>
          </div>
        ))}
      </div>
 
      {/* ── Charts row ── */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14, marginBottom: 18 }}>
 
        {/* Activity bar chart */}
        <div className="glass" style={{ borderRadius: 14, padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
            <div>
              <h3 style={{ fontFamily: "Geist", fontSize: 17, fontWeight: 700, margin: "0 0 3px", display: "flex", alignItems: "center", gap: 8 }}>
                Activity Monitor
                <span style={{ background: "rgba(52,211,153,.1)", color: C.emerald, border: "1px solid rgba(52,211,153,.2)", borderRadius: 20, padding: "1px 8px", fontSize: 9, fontFamily: "JetBrains Mono", fontWeight: 700, letterSpacing: "0.06em" }}>
                  LIVE
                </span>
              </h3>
              <p style={{ color: C.muted, fontSize: 12, margin: 0 }}>Request throughput (24 h period)</p>
            </div>
            <div style={{ display: "flex", background: "rgba(34,42,61,.5)", borderRadius: 9, padding: 3, border: "1px solid rgba(255,255,255,.06)" }}>
              {["24h", "7d", "30d"].map((t, i) => (
                <button key={t} style={{ padding: "4px 13px", borderRadius: 7, border: "none", cursor: "pointer", background: i === 0 ? C.primary : "transparent", color: i === 0 ? C.primaryOn : C.muted, fontFamily: "JetBrains Mono", fontSize: 11, fontWeight: i === 0 ? 700 : 400 }}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div style={{ height: 170, display: "flex", alignItems: "flex-end", gap: 9, padding: "0 2px", marginBottom: 10 }}>
            {BAR_HEIGHTS.map((h, i) => (
              <div
                key={i}
                style={{ flex: 1, height: `${h}%`, background: `rgba(138,235,255,${0.1 + h / 400})`, borderRadius: "3px 3px 0 0", cursor: "pointer", position: "relative", transition: "background .2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = `rgba(138,235,255,${0.22 + h / 300})` }}
                onMouseLeave={e => { e.currentTarget.style.background = `rgba(138,235,255,${0.1 + h / 400})` }}
              />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: C.muted, fontFamily: "JetBrains Mono", borderTop: "1px solid rgba(255,255,255,.04)", paddingTop: 8 }}>
            {["Yesterday", "06:00", "12:00", "18:00"].map(t => <span key={t}>{t}</span>)}
            <span style={{ color: C.primary, fontWeight: 700 }}>Now</span>
          </div>
        </div>
 
        {/* Health donut */}
        <div className="glass" style={{ borderRadius: 14, padding: 24, display: "flex", flexDirection: "column" }}>
          <h3 style={{ fontFamily: "Geist", fontSize: 17, fontWeight: 700, margin: "0 0 16px" }}>Health Distribution</h3>
          <div style={{ display: "flex", justifyContent: "center", flex: 1, marginBottom: 16 }}>
            <div style={{ position: "relative", width: 160, height: 160 }}>
              <svg viewBox="0 0 36 36" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke={C.primaryDim} strokeWidth="3" strokeDasharray="276" strokeDashoffset="40" />
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke={C.amber}      strokeWidth="3" strokeDasharray="276" strokeDashoffset="250" />
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke={C.rose}       strokeWidth="3" strokeDasharray="276" strokeDashoffset="200" />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "Geist", fontSize: 24, fontWeight: 700 }}>98.4%</span>
                <span style={{ fontSize: 9, color: C.muted, fontFamily: "JetBrains Mono", textTransform: "uppercase" }}>Uptime</span>
              </div>
            </div>
          </div>
          {[["Healthy", C.primaryDim, "84%"], ["Struggling", C.amber, "12%"], ["Degraded", C.rose, "4%"]].map(([label, color, pct]) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, boxShadow: `0 0 5px ${color}` }} />
                <span style={{ fontSize: 13, color: C.text }}>{label}</span>
              </div>
              <span style={{ fontFamily: "JetBrains Mono", fontSize: 12, color: C.muted }}>{pct}</span>
            </div>
          ))}
        </div>
      </div>
 
      {/* ── Recent applications table ── */}
      <div className="glass" style={{ borderRadius: 14, overflow: "hidden" }}>
        <div style={{ padding: "14px 22px", borderBottom: "1px solid rgba(255,255,255,.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontFamily: "Geist", fontSize: 17, fontWeight: 700, margin: 0 }}>Recent Applications</h3>
          <span
            onClick={() => navigate("/applications")}
            style={{ color: C.primary, fontSize: 12, fontFamily: "JetBrains Mono", cursor: "pointer" }}
          >
            View All →
          </span>
        </div>
 
        {loading ? (
          <div style={{ textAlign: "center", padding: 36, color: C.muted }}>Loading…</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "rgba(34,42,61,.25)" }}>
                {["Application", "ID", "Status", ""].map(h => (
                  <th key={h} style={{ padding: "9px 22px", textAlign: "left", fontSize: 10, color: C.muted, fontFamily: "JetBrains Mono", textTransform: "uppercase", letterSpacing: "0.09em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {apps.slice(0, 6).map(app => (
                <tr
                  key={app._id}
                  style={{ borderBottom: "1px solid rgba(255,255,255,.03)", cursor: "pointer", transition: "background .15s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(138,235,255,.03)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  onClick={() => navigate(`/applications/${app.name}`)}
                >
                  <td style={{ padding: "12px 22px", fontFamily: "Geist", fontWeight: 600, fontSize: 14 }}>{app.name}</td>
                  <td style={{ padding: "12px 22px", fontFamily: "JetBrains Mono", fontSize: 11, color: C.primary }}>{String(app._id).slice(0, 10)}…</td>
                  <td style={{ padding: "12px 22px" }}>
                    <span style={{ background: "rgba(52,211,153,.1)", color: C.emerald, border: "1px solid rgba(52,211,153,.2)", borderRadius: 20, padding: "2px 9px", fontSize: 10, fontFamily: "JetBrains Mono", fontWeight: 700 }}>Healthy</span>
                  </td>
                  <td style={{ padding: "12px 22px" }}>
                    <Btn
                      size="sm"
                      onClick={e => { e.stopPropagation(); navigate(`/applications/${app.name}`) }}
                      style={{ border: "1px solid rgba(138,235,255,.2)", background: "rgba(138,235,255,.07)", color: C.primary }}
                    >
                      <Icon name="terminal" size={13} />
                      View Logs
                    </Btn>
                  </td>
                </tr>
              ))}
              {apps.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center", padding: 36, color: C.muted, fontFamily: "JetBrains Mono", fontSize: 13 }}>
                    No applications yet. Create one to start collecting logs.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}