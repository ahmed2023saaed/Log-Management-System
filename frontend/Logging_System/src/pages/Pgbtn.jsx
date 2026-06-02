import { C } from "../../constants/colors"
 
// ── Single numbered / arrow button for pagination strips ───────────────────────
export default function PgBtn({ children, onClick, disabled, active }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={e => {
        if (!disabled && !active) {
          e.currentTarget.style.borderColor = "rgba(138,235,255,.4)"
          e.currentTarget.style.color = C.primary
        }
      }}
      onMouseLeave={e => {
        if (!disabled && !active) {
          e.currentTarget.style.borderColor = "rgba(255,255,255,.07)"
          e.currentTarget.style.color = C.muted
        }
      }}
      style={{
        minWidth: 30, height: 30,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: active ? C.primary : "transparent",
        border: "1px solid rgba(255,255,255,.07)",
        borderRadius: 7,
        color: active ? C.primaryOn : C.muted,
        fontFamily: "JetBrains Mono", fontSize: 12,
        fontWeight: active ? 700 : 400,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.35 : 1,
        transition: "all .14s",
        padding: "0 6px",
      }}
    >
      {children}
    </button>
  )
}