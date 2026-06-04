// import axios from "axios"


// export const api = axios.create({

//     baseURL: import.meta.env.VITE_API_URL
// })


import axios from "axios"
console.log("API URL =", import.meta.env.VITE_API_URL);
// Base axios instance — baseURL comes from .env  VITE_API_URL=http://localhost:3001/api
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})
 
// ── Helper: inject Bearer token header into any axios config ───────────────────
// Usage: api.get("/applications", authHeaders(token))
//        api.post("/applications", body, authHeaders(token))
export const authHeaders = (token) => {
  if (!token) {
    throw new Error("No authentication token provided")
  }
  return {
    headers: { Authorization: `Bearer ${token}` },
  }
}

// ── Application API methods ────────────────────────────────────────────────────
api.getApps = async (token) => {
  if (!token) {
    console.error("❌ getApps: No token provided")
    throw new Error("Authentication required: No token found. Please log in.")
  }
  try {
    const response = await api.get("/applications", authHeaders(token))
    return response.data
  } catch (err) {
    console.error("❌ getApps failed:", err.message)
    throw err
  }
}

api.getAppByName = async (name, token) => {
  if (!token) throw new Error("Authentication required")
  const response = await api.get(`/applications/${name}`, authHeaders(token))
  return response.data
}

api.getAppLogs = async (name, token) => {
  if (!token) throw new Error("Authentication required")
  const response = await api.get(`/applications/${name}/logs`, authHeaders(token))
  return response.data
}

api.createApp = async (form, token) => {
  if (!token) throw new Error("Authentication required")
  const response = await api.post("/applications", { name: form.name, description: form.description }, authHeaders(token))
  return response.data
}

api.deleteApp = async (appName, token) => {
  if (!token) throw new Error("Authentication required")
  const response = await api.delete(`/applications/${appName}`, authHeaders(token))
  return response.data
}

// ── Logs API methods ──────────────────────────────────────────────────────────
api.getLogs = async (appName, { level, sort, page, limit, order }, token) => {
  if (!token) throw new Error("Authentication required")
  let url = `/applications/${appName}/logs?sort=${sort || "createdAt"}&page=${page || 1}&limit=${limit || 10}&order=${order || "desc"}`
  if (level) url += `&level=${level}`
  const response = await api.get(url, authHeaders(token))
  return response.data
}
 