import { useNavigate, useLocation } from "react-router-dom"
import { C } from "../constants/colors"
import Icon from "../components/common/icons"
import { useAuth } from "../context/useAuthHook"
 
const NAV_ITEMS = [
  { path: "/dashboard",    icon: "dashboard",  label: "Dashboard"     },
  { path: "/applications", icon: "storage",    label: "Applications"  },
  { path: "/account",      icon: "vpn_key",    label: "Account & Key" },
]
 
export default function Sidebar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { user, logout } = useAuth()
 
  const handleLogout = () => {
    logout()
    navigate("/")
  }
 
  return (
    <aside style={{
      position: "fixed", left: 0, top: 0, bottom: 0, width: 280, zIndex: 50,
      background: "rgba(6,14,32,.93)", backdropFilter: "blur(20px)",
      borderRight: "1px solid rgba(255,255,255,.05)",
      display: "flex", flexDirection: "column", padding: "24px 0",
    }}>
      {/* ── Brand ── */}
      <div style={{ padding: "0 24px", marginBottom: 36 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <div style={{ width: 36, height: 36, background: C.primary, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="monitoring" size={20} color={C.primaryOn} />
          </div>
          <span style={{ fontFamily: "Geist", fontSize: 20, fontWeight: 900, color: C.primary, letterSpacing: "-0.02em" }}>
            Lumina
          </span>
        </div>
        <p style={{ color: C.muted, fontSize: 11, fontFamily: "JetBrains Mono", textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>
          Production Cluster
        </p>
      </div>
 
      {/* ── Nav links ── */}
      <nav style={{ flex: 1, padding: "0 8px", display: "flex", flexDirection: "column", gap: 2 }}>
        {NAV_ITEMS.map(({ path, icon, label }) => {
          // Applications is active for both /applications and /applications/:name
          const active =
            pathname === path ||
            (path === "/applications" && pathname.startsWith("/applications"))
 
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              onMouseEnter={e => {
                if (!active) {
                  e.currentTarget.style.background = "rgba(255,255,255,.04)"
                  e.currentTarget.style.color = C.text
                }
              }}
              onMouseLeave={e => {
                if (!active) {
                  e.currentTarget.style.background = "transparent"
                  e.currentTarget.style.color = C.muted
                }
              }}
              style={{
                display: "flex", alignItems: "center", gap: 13,
                padding: "9px 16px",
                borderRadius: active ? "0 8px 8px 0" : 8,
                border: "none", cursor: "pointer",
                background: active ? "rgba(138,235,255,.1)" : "transparent",
                color: active ? C.primary : C.muted,
                fontFamily: "JetBrains Mono", fontSize: 13,
                fontWeight: active ? 600 : 400,
                borderLeft: `2px solid ${active ? C.primary : "transparent"}`,
                transition: "all .18s", textAlign: "left", width: "100%",
              }}
            >
              <Icon name={icon} size={20} />
              {label}
            </button>
          )
        })}
      </nav>
 
      {/* ── User chip + logout ── */}
      <div style={{ padding: "16px 12px 0", borderTop: "1px solid rgba(255,255,255,.05)" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 10, padding: "8px 10px",
          background: "rgba(255,255,255,.03)", borderRadius: 10, marginBottom: 6,
          border: "1px solid rgba(255,255,255,.05)",
        }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(138,235,255,.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icon name="person" size={18} color={C.primary} />
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontFamily: "JetBrains Mono", fontSize: 12, fontWeight: 600, color: C.text, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {user?.userName || user?.email?.split("@")[0] || "Developer"}
            </p>
            <p style={{ fontSize: 10, color: C.muted, margin: 0, textTransform: "uppercase", letterSpacing: "0.06em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {user?.email || ""}
            </p>
          </div>
        </div>
 
        <button
          onClick={handleLogout}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.04)"; e.currentTarget.style.color = C.text }}
          onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = C.muted }}
          style={{
            display: "flex", alignItems: "center", gap: 10, padding: "7px 10px",
            background: "none", border: "none", cursor: "pointer", color: C.muted,
            fontFamily: "JetBrains Mono", fontSize: 12, width: "100%",
            borderRadius: 8, transition: "all .15s",
          }}
        >
          <Icon name="logout" size={17} />
          Sign Out
        </button>
      </div>
    </aside>
  )
}