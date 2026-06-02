import { useEffect, useMemo, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { api } from "../services/api"
import { useAuth } from "../context/useAuthHook"
import { C } from "../constants/colors"
import Icon from "../components/common/icons"
import Btn from "../components/common/btn"
import { ShowToast } from "../components/common/Toast"

const LEVELS = [
  { value: "", label: "All Levels", color: C.primary },
  { value: "info", label: "Info", color: C.primary },
  { value: "warn", label: "Warning", color: C.amber },
  { value: "error", label: "Error", color: C.error },
  { value: "debug", label: "Debug", color: C.indigo },
]

const levelColor = {
  info: C.primary,
  warn: C.amber,
  warning: C.amber,
  error: C.error,
  debug: C.indigo,
}

export default function LogExplorer() {
  const { name } = useParams()
  const navigate = useNavigate()
  const { token } = useAuth()

  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterLevel, setFilterLevel] = useState("")
  const [sortBy] = useState("createdAt")
  const [sortOrder] = useState("desc")
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [search, setSearch] = useState("")
  const [selectedLog, setSelectedLog] = useState(null)

  useEffect(() => {
    if (!token || !name) return

    const loadLogs = async () => {
      setLoading(true)
      try {
        const result = await api.getLogs(
          name,
          { level: filterLevel, sort: sortBy, page, limit, order: sortOrder },
          token
        )
        setLogs(Array.isArray(result) ? result : result.logs || [])
      } catch (err) {
        ShowToast(err.response?.data?.message || err.message || "Failed to load logs", "error")
        setLogs([])
      } finally {
        setLoading(false)
      }
    }

    loadLogs()
  }, [name, token, filterLevel, sortBy, sortOrder, page, limit])

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesSearch = !search || JSON.stringify(log).toLowerCase().includes(search.toLowerCase())
      return matchesSearch
    })
  }, [logs, search])

  const selected = selectedLog || filteredLogs[0] || null

  return (
    <div style={{ padding: "30px 24px 40px", maxWidth: 1180, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
        <div>
          <button
            type="button"
            onClick={() => navigate("/applications")}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "transparent", border: "1px solid rgba(138,235,255,.2)",
              color: C.primary, padding: "10px 14px", borderRadius: 12, cursor: "pointer",
            }}
          >
            <Icon name="arrow_back" size={16} />
            Back to applications
          </button>
          <h1 style={{ margin: "18px 0 4px", fontSize: 28, fontWeight: 800, color: C.text }}>{name}</h1>
          <p style={{ margin: 0, color: C.muted, fontSize: 14 }}>Browse recent logs for this application.</p>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.04)", borderRadius: 12, padding: "10px 14px" }}>
            <Icon name="search" size={16} color={C.primary} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search logs..."
              style={{ width: 260, background: "transparent", border: "none", outline: "none", color: C.text, fontFamily: "JetBrains Mono", fontSize: 13 }}
            />
          </div>
          {LEVELS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => { setFilterLevel(value); setPage(1) }}
              style={{
                borderRadius: 999, border: "none", padding: "10px 16px",
                background: filterLevel === value ? "rgba(138,235,255,.14)" : "rgba(255,255,255,.05)",
                color: filterLevel === value ? C.primary : C.muted,
                cursor: "pointer",
                fontFamily: "JetBrains Mono",
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.1fr) 420px", gap: 18 }}>
        <section className="glass" style={{ borderRadius: 18, padding: 24, minHeight: 520, overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: C.primary }}>Application logs</h2>
              <p style={{ margin: "8px 0 0", color: C.muted, fontSize: 13 }}>{filteredLogs.length} log entries found</p>
            </div>
            <Btn variant="primary" onClick={() => { setPage(1); window.location.reload() }}>
              <Icon name="refresh" size={14} />
              Refresh
            </Btn>
          </div>

          {loading ? (
            <div style={{ padding: 60, textAlign: "center", color: C.muted }}>Loading logs…</div>
          ) : filteredLogs.length === 0 ? (
            <div style={{ padding: 48, textAlign: "center", color: C.muted }}>
              <Icon name="inbox" size={38} color={C.surfaceTop} style={{ marginBottom: 14 }} />
              <div style={{ fontSize: 15, color: C.text, fontWeight: 700, marginBottom: 8 }}>No logs found</div>
              <div style={{ fontSize: 13 }}>Try a different filter, or generate traffic for this application.</div>
            </div>
          ) : (
            <div style={{ maxHeight: 520, overflow: "auto" }}>
              {filteredLogs.map((log, idx) => {
                const level = String(log.level || "info").toLowerCase()
                const color = levelColor[level] || C.primary
                const message = log.message || "No message"
                const timestamp = log.createdAt ? new Date(log.createdAt).toLocaleString() : "Unknown"

                return (
                  <button
                    key={log._id || idx}
                    type="button"
                    onClick={() => setSelectedLog(log)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      display: "grid",
                      gridTemplateColumns: "1fr auto",
                      gap: 12,
                      padding: "16px 18px",
                      marginBottom: 10,
                      borderRadius: 16,
                      background: selectedLog === log ? "rgba(138,235,255,.1)" : "rgba(255,255,255,.03)",
                      border: selectedLog === log ? `1px solid ${C.primary}` : "1px solid transparent",
                      color: C.text,
                      cursor: "pointer",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color }}>{level.toUpperCase()}</span>
                        <span style={{ fontSize: 12, color: C.muted }}>{timestamp}</span>
                      </div>
                      <div style={{ fontSize: 14, color: C.surfaceTop, fontWeight: 600, lineHeight: 1.4 }}>{message}</div>
                    </div>
                    <span style={{ alignSelf: "center", color, fontFamily: "JetBrains Mono", fontSize: 11, background: "rgba(255,255,255,.06)", borderRadius: 999, padding: "4px 10px" }}>×{log.count || 1}</span>
                  </button>
                )
              })}
            </div>
          )}
        </section>

        <aside className="glass" style={{ borderRadius: 18, padding: 24, minHeight: 520, background: "rgba(13,20,34,.92)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: C.primary }}>Log details</h2>
              <p style={{ margin: "8px 0 0", color: C.muted, fontSize: 13 }}>Inspect the selected entry in full detail.</p>
            </div>
            <Btn onClick={() => setSelectedLog(null)} size="sm">Clear</Btn>
          </div>

          {!selected ? (
            <div style={{ padding: 24, color: C.muted, textAlign: "center" }}>
              Select a log to inspect its details.
            </div>
          ) : (
            <div style={{ display: "grid", gap: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                <div>
                  <p style={{ margin: 0, color: C.muted, fontSize: 12 }}>Level</p>
                  <p style={{ margin: "6px 0 0", color: C.text, fontSize: 15, fontWeight: 700 }}>{String(selected.level || "info").toUpperCase()}</p>
                </div>
                <div>
                  <p style={{ margin: 0, color: C.muted, fontSize: 12 }}>Count</p>
                  <p style={{ margin: "6px 0 0", color: C.text, fontSize: 15, fontWeight: 700 }}>{selected.count || 1}</p>
                </div>
                <div>
                  <p style={{ margin: 0, color: C.muted, fontSize: 12 }}>Timestamp</p>
                  <p style={{ margin: "6px 0 0", color: C.text, fontSize: 15, fontWeight: 700 }}>{selected.createdAt ? new Date(selected.createdAt).toLocaleString() : "Unknown"}</p>
                </div>
              </div>

              <div>
                <p style={{ margin: 0, color: C.muted, fontSize: 12, marginBottom: 8 }}>Message</p>
                <div style={{ background: "rgba(255,255,255,.04)", borderRadius: 14, padding: 16, overflowX: "auto" }}>
                  <pre style={{ margin: 0, fontFamily: "JetBrains Mono", fontSize: 12, color: C.surfaceTop, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
{selected.message || "No message"}
                  </pre>
                </div>
              </div>

              <div style={{ background: "rgba(255,255,255,.04)", borderRadius: 14, padding: 16, overflowX: "auto" }}>
                <p style={{ margin: "0 0 8px 0", color: C.muted, fontSize: 12 }}>Full Data</p>
                <pre style={{ margin: 0, fontFamily: "JetBrains Mono", fontSize: 12, color: C.surfaceTop, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
{JSON.stringify(selected, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
