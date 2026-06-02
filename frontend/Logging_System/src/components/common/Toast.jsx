import { useState, useEffect } from "react"
import { C } from "../../constants/colors"
 
// Singleton setter — assigned once when the component mounts
let _setToast = null
 
// ── Callable from any module ───────────────────────────────────────────────────
// showToast("Application created!", "success")
// types: "success" | "error" | "info" | "warn"
export const ShowToast = (msg, type = "info") => {
  if (_setToast) {
    _setToast({ msg, type })
    setTimeout(() => _setToast(null), 3400)
  }
}
 
// ── Render once inside <App /> ─────────────────────────────────────────────────
export default function Toast() {
  const [t, setT] = useState(null)
 
  useEffect(() => {
    _setToast = setT
    return () => { _setToast = null }
  }, [])
 
  if (!t) return null
 
  const colorMap = {
    success: C.emerald,
    error:   C.error,
    warn:    C.amber,
    info:    C.primary,
  }
  const col = colorMap[t.type] ?? C.primary
 
  return (
    <div
      style={{
        position: "fixed", top: 20, left: "50%",
        transform: "translateX(-50%)", zIndex: 9999,
        background: "rgba(19,27,46,0.96)",
        border: `1px solid ${col}`,
        borderRadius: 10, padding: "10px 20px",
        color: col, fontSize: 13,
        fontFamily: "JetBrains Mono",
        backdropFilter: "blur(16px)",
        boxShadow: "0 8px 32px rgba(0,0,0,.45)",
        maxWidth: 360, pointerEvents: "none",
        animation: "fadeUp .2s ease",
      }}
    >
      {t.msg}
    </div>
  )
}