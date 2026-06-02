
import { useState, useEffect } from "react";
import { C } from "../constants/colors";
import Icon from "../components/common/icons";
import Btn from "../components/common/btn";
import "../App.css"
import {api} from "../services/api"
import { ShowToast } from "../components/common/Toast"
import { useAuth } from "../context/useAuthHook"



// ── APPLICATIONS PAGE ──────────────────────────────────────────────────────────
const SERVICE_ICONS = ["payments", "shield_person", "inventory_2", "campaign", "database", "hub", "email", "cloud", "api", "rocket_launch", "code", "settings"];
 
function ApplicationsPage({ onSelectApp }) {
  const { token } = useAuth()
  const [apps,     setApps]     = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form,     setForm]     = useState({ name: "", description: "" });
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState(null);

  // Load applications from server
  const loadApps = async () => {
    setLoading(true);
    try { 
      setApps(await api.getApps(token).then(d => d.applications || d.apps || (Array.isArray(d) ? d : [])));
    } catch (e) { 
      ShowToast(e.message, "error");
    } finally { 
      setLoading(false);
    }
  };

  useEffect(() => { 
    (async () => {
      setLoading(true);
      try { 
        setApps(await api.getApps(token).then(d => d.applications || d.apps || (Array.isArray(d) ? d : [])));
      } catch (e) { 
        ShowToast(e.message, "error");
      } finally { 
        setLoading(false);
      }
    })();
  }, [token]);
 
  const create = async () => {
    if (!form.name.trim()) return;
    setCreating(true);
    try { 
      await api.createApp(form, token);
      ShowToast("Application created!", "success");
      setShowForm(false);
      setForm({ name: "", description: "" });
      loadApps();
    } catch (e) { 
      ShowToast(e.message, "error");
    } finally { 
      setCreating(false);
    }
  };
 
  const del = async (appName, e) => {
    e.stopPropagation();
    if (!window.confirm("Delete this application and all its logs?")) return;
    setDeleting(appName);
    try { 
      await api.deleteApp(appName, token);
      ShowToast("Application deleted", "success");
      loadApps();
    } catch (e) { 
      ShowToast(e.message, "error");
    } finally { 
      setDeleting(null);
    }
  };
 
  return (
    <div className="fade-up" style={{ padding: "0 24px 40px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "24px 0 20px" }}>
        <div>
          <h1 style={{ fontFamily: "Geist", fontSize: 28, fontWeight: 700, color: C.primary, margin: "0 0 4px" }}>Microservices Fleet</h1>
          <p style={{ color: C.muted, fontSize: 14, margin: 0 }}>Managing {apps.length} active application{apps.length !== 1 ? "s" : ""}</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn onClick={() => {}} style={{ gap: 6 }}><Icon name="filter_list" size={16} />Filters</Btn>
          <Btn variant="primary" onClick={() => setShowForm(s => !s)} style={{ gap: 6 }}>
            <Icon name="add_circle" fill={1} size={17} />
            Create Application
          </Btn>
        </div>
      </div>
 
      {/* Create form */}
      {showForm && (
        <div className="glass fade-up" style={{ borderRadius: 14, padding: 24, marginBottom: 20, maxWidth: 460 }}>
          <p style={{ fontFamily: "Geist", fontSize: 15, fontWeight: 700, marginBottom: 16, marginTop: 0 }}>New Application</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Application name *"
              style={{ width: "100%", padding: "9px 12px", borderRadius: 8, fontSize: 13 }} onKeyDown={e => e.key === "Enter" && create()} />
            <input value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Description (optional)"
              style={{ width: "100%", padding: "9px 12px", borderRadius: 8, fontSize: 13 }} />
            <div style={{ display: "flex", gap: 8 }}>
              <Btn variant="primary" onClick={create} disabled={creating || !form.name.trim()}>{creating ? "Creating…" : "Create"}</Btn>
              <Btn onClick={() => setShowForm(false)}>Cancel</Btn>
            </div>
          </div>
        </div>
      )}
 
      {/* Cards grid */}
      {loading ? (
        <div style={{ textAlign: "center", padding: 60, color: C.muted }}>Loading applications…</div>
      ) : apps.length === 0 ? (
        <div style={{ textAlign: "center", padding: 60 }}>
          <Icon name="inbox" size={44} color={C.surfaceTop} style={{ display: "block", margin: "0 auto 12px" }} />
          <p style={{ fontFamily: "Geist", fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 6 }}>No applications yet</p>
          <p style={{ color: C.muted, fontSize: 14 }}>Click "Create Application" to get started.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(272px, 1fr))", gap: 18 }}>
          {apps.map((app, idx) => {
            const id = app.id || app._id;
            return (
              <div key={id} className="glass glass-hover" style={{ borderRadius: 16, padding: 22, cursor: "pointer", position: "relative", overflow: "hidden" }}
                onClick={() => onSelectApp(app)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                  <div style={{ width: 46, height: 46, background: "rgba(138,235,255,.1)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(138,235,255,.18)" }}>
                    <Icon name={SERVICE_ICONS[idx % SERVICE_ICONS.length]} size={26} color={C.primary} />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(52,211,153,.1)", border: "1px solid rgba(52,211,153,.18)", borderRadius: 20, padding: "3px 9px" }}>
                    <div className="pulse" style={{ width: 6, height: 6, borderRadius: "50%", background: C.emerald }} />
                    <span style={{ fontSize: 10, color: C.emerald, fontFamily: "JetBrains Mono", fontWeight: 700 }}>Healthy</span>
                  </div>
                </div>
 
                <h3 style={{ fontFamily: "Geist", fontSize: 17, fontWeight: 800, margin: "0 0 3px", letterSpacing: "-0.01em" }}>{app.name}</h3>
                {app.description && <p style={{ fontSize: 12, color: C.muted, margin: "0 0 10px" }}>{app.description}</p>}
                <p style={{ fontSize: 10, color: C.surfaceTop, fontFamily: "JetBrains Mono", margin: "0 0 14px" }}>ID: {id}</p>
 
                <div style={{ height: 3, background: "rgba(255,255,255,.05)", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${30 + (idx * 17) % 60}%`, background: C.primary, boxShadow: `0 0 8px ${C.primary}40` }} />
                </div>
 
                {/* Hover overlay */}
                <div style={{ position: "absolute", inset: 0, background: "rgba(34,42,61,.93)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", gap: 14, opacity: 0, transition: "opacity .2s", borderRadius: 16 }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "1"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "0"}
                  onClick={e => e.stopPropagation()}>
                  <button onClick={() => onSelectApp(app)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, padding: 14, background: "rgba(138,235,255,.1)", border: "1px solid rgba(138,235,255,.2)", borderRadius: 12, cursor: "pointer", color: C.primary }}>
                    <Icon name="settings_applications" size={24} />
                    <span style={{ fontFamily: "JetBrains Mono", fontSize: 11 }}>Manage</span>
                  </button>
                  <button onClick={e => del(app.name, e)} disabled={deleting === app.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, padding: 14, background: "rgba(255,180,171,.1)", border: "1px solid rgba(255,180,171,.2)", borderRadius: 12, cursor: "pointer", color: C.error }}>
                    <Icon name="delete_forever" size={24} />
                    <span style={{ fontFamily: "JetBrains Mono", fontSize: 11 }}>{deleting === app.name ? "…" : "Delete"}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
 
      {/* Footer stats */}
      {apps.length > 0 && (
        <div className="glass" style={{ borderRadius: 14, padding: 18, marginTop: 22, display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 18 }}>
            {[[apps.length, C.emerald, "Stable"], [0, C.error, "Alerting"], [0, "rgba(255,255,255,.3)", "Idle"]].map(([n, c, l]) => (
              <div key={l} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <div style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />
                <span style={{ fontFamily: "JetBrains Mono", fontSize: 12, color: C.muted }}>{n} {l}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "JetBrains Mono", fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>Global Uptime (24h)</span>
            <span style={{ fontFamily: "Geist", fontSize: 20, fontWeight: 700, color: C.primary }}>99.998%</span>
            <Icon name="trending_up" size={16} color={C.emerald} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ApplicationsPage;
 