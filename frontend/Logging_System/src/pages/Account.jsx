import { useState } from "react"
import { C } from "../constants/colors"
import { useAuth } from "../context/useAuthHook"
import Icon from "../components/common/icons"

export default function Account() {
  const { user, token, logout } = useAuth()
  const [copied, setCopied] = useState(false)

  const handleCopyToken = async () => {
    if (!token) return
    await navigator.clipboard.writeText(token)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2200)
  }

  return (
    <div style={{ padding: "30px 36px", maxWidth: 980, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 26 }}>
        <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(138,235,255,.12)", display: "grid", placeItems: "center" }}>
          <Icon name="account_circle" size={26} color={C.primary} />
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: C.text }}>Account</h1>
          <p style={{ margin: "6px 0 0", color: C.muted, fontSize: 14 }}>View your profile details and developer settings.</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 22 }}>
        <section className="glass" style={{ borderRadius: 18, padding: 24, background: "rgba(11,19,38,.9)", border: "1px solid rgba(255,255,255,.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: C.primary }}>Profile</h2>
          </div>

          <div style={{ display: "grid", gap: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
              <div>
                <p style={{ margin: 0, color: C.muted, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>Developer</p>
                <p style={{ margin: "6px 0 0", color: C.text, fontSize: 16, fontWeight: 600 }}>{user?.userName ?? "Developer"}</p>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
              <div>
                <p style={{ margin: 0, color: C.muted, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>Email</p>
                <p style={{ margin: "6px 0 0", color: C.text, fontSize: 16, fontWeight: 600 }}>{user?.email ?? "Not available"}</p>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
              <div>
                <p style={{ margin: 0, color: C.muted, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>API Token</p>
                <pre style={{ margin: "8px 0 0", padding: "12px 14px", borderRadius: 12, background: "rgba(255,255,255,.04)", color: C.surfaceTop, overflowX: "auto", fontFamily: "JetBrains Mono", fontSize: 14, lineHeight: 1.5 }}>
                  {token || "No token available"}
                </pre>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopyToken}
              style={{
                padding: "11px 18px",
                borderRadius: 12,
                border: "1px solid rgba(138,235,255,.25)",
                background: "rgba(138,235,255,.08)",
                color: C.primary,
                cursor: token ? "pointer" : "not-allowed",
                fontWeight: 700,
              }}
              disabled={!token}
            >
              {copied ? "Token copied" : "Copy API token"}
            </button>
          </div>
        </section>

        <aside className="glass" style={{ borderRadius: 18, padding: 24, background: "rgba(11,19,38,.9)", border: "1px solid rgba(255,255,255,.06)" }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: C.primary }}>Developer tools</h2>
          <p style={{ color: C.muted, marginTop: 10, fontSize: 14, lineHeight: 1.6 }}>
            Your account page gives you quick access to your profile and API token. Keep this token private, and use it only in trusted applications.
          </p>

          <div style={{ marginTop: 22, display: "grid", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 14, borderRadius: 14, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.05)" }}>
              <Icon name="shield" size={20} color={C.primary} />
              <div>
                <p style={{ margin: 0, fontSize: 13, color: C.text, fontWeight: 700 }}>Secure access</p>
                <p style={{ margin: "4px 0 0", color: C.muted, fontSize: 12 }}>Use this token for your monitoring and log ingestion scripts.</p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 14, borderRadius: 14, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.05)" }}>
              <Icon name="info" size={20} color={C.primary} />
              <div>
                <p style={{ margin: 0, fontSize: 13, color: C.text, fontWeight: 700 }}>Support</p>
                <p style={{ margin: "4px 0 0", color: C.muted, fontSize: 12 }}>Contact your admin if you need to rotate the token or change your account settings.</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={logout}
            style={{
              marginTop: 24,
              width: "100%",
              padding: "12px 16px",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,.08)",
              background: "rgba(220,38,38,.12)",
              color: C.error,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Sign out
          </button>
        </aside>
      </div>
    </div>
  )
}
