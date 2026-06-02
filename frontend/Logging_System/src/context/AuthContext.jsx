import { useState } from "react"
import { AuthContext } from "./AuthContextCreate"
 
// ── Provider ───────────────────────────────────────────────────────────────────
export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    () => localStorage.getItem("lumina_token")
  )
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("lumina_user")
    return stored ? JSON.parse(stored) : null
  })
 
  // Call after a successful /developer/login or /developer/register
  // userInfo = { userName, email }  (whatever you captured from the form)
  const login = (newToken, userInfo) => {
    localStorage.setItem("lumina_token", newToken)
    localStorage.setItem("lumina_user", JSON.stringify(userInfo))
    setToken(newToken)
    setUser(userInfo)
  }
 
  // Clear everything
  const logout = () => {
    localStorage.removeItem("lumina_token")
    localStorage.removeItem("lumina_user")
    setToken(null)
    setUser(null)
  }
 
  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
 
// ── Hook ───────────────────────────────────────────────────────────────────────
// Export moved to useAuthHook.js to comply with React Fast Refresh rules