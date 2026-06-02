import { C } from "../../constants/colors";

function Btn({
  children,
  onClick,
  variant = "ghost",
  size = "md",
  disabled,
  style: s = {},
  ...rest
}) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    cursor: disabled ? "not-allowed" : "pointer",
    border: "none",
    borderRadius: 8,
    fontFamily: "'JetBrains Mono', monospace",
    fontWeight: 600,
    transition: "all .15s",
    opacity: disabled ? 0.55 : 1,
    padding: size === "sm" ? "5px 12px" : "8px 16px",
    fontSize: size === "sm" ? 12 : 13,
  };

  const variants = {
    primary: {
      background: "linear-gradient(135deg,#8aebff,#22d3ee)",
      color: "#00363e",
      boxShadow: "0 4px 16px rgba(138,235,255,.2)",
    },
    ghost: {
      background: "rgba(34,42,61,.5)",
      color: C.muted,
      border: "1px solid rgba(255,255,255,.08)",
    },
    danger: {
      background: "rgba(255,180,171,.1)",
      color: C.error,
      border: "1px solid rgba(255,180,171,.25)",
    },
  };

  return (
    <button
      {...rest}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...base,
        ...variants[variant],
        ...s,
      }}
    >
      {children}
    </button>
  );
}

export default Btn;