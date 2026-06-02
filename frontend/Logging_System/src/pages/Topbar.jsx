import { C } from "../constants/colors"
import Icon from "../components/common/icons"
import { useAuth } from "../context/useAuthHook"
 
export default function TopBar() {
  const { user } = useAuth()
 
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 40, height: 64,
      background: "rgba(6,14,32,.88)", backdropFilter: "blur(14px)",
      borderBottom: "1px solid rgba(255,255,255,.05)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 24px",
    }}>
      {/* Search */}
      <div style={{ position: "relative" }}>
        <Icon
          name="search" size={17} color={C.muted}
          style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}
        />
        <input
          placeholder="Quick search (⌘K)"
          style={{
            paddingLeft: 32, paddingRight: 14, paddingTop: 8, paddingBottom: 8,
            borderRadius: 10, fontSize: 13, width: 260,
            background: "rgba(23,31,51,.7)", border: "1px solid rgba(255,255,255,.08)",
            color: C.text, outline: "none", fontFamily: "JetBrains Mono",
          }}
        />
      </div>
 
      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {/* Icon actions */}
        <div style={{ display: "flex", gap: 3, borderRight: "1px solid rgba(255,255,255,.06)", paddingRight: 16 }}>
          {["notifications", "help_outline"].map(iconName => (
            <button
              key={iconName}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.06)"; e.currentTarget.style.color = C.primary }}
              onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = C.muted }}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 7, borderRadius: 8, color: C.muted, transition: "all .15s", display: "flex" }}
            >
              <Icon name={iconName} size={22} />
            </button>
          ))}
        </div>
 
        {/* User label */}
        <div style={{ textAlign: "right" }}>
          <p style={{ fontFamily: "JetBrains Mono", fontSize: 12, fontWeight: 600, margin: 0, color: C.text }}>
            {user?.userName || user?.email?.split("@")[0] || "Developer"}
          </p>
          <p style={{ fontSize: 10, color: C.muted, margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            App Developer
          </p>
        </div>
 
        {/* Avatar */}
        <div style={{ width: 34, height: 34, borderRadius: 9, background: "rgba(138,235,255,.15)", border: "1px solid rgba(138,235,255,.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name="person" size={18} color={C.primary} />
        </div>
      </div>
    </header>
  )
}