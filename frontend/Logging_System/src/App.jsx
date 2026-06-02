
// import './App.css'
// import "./index.css"
// import DashboardPage from './pages/dashboard'
// import Login from './pages/login'
// import Register from './pages/register'
// import {BrowserRouter, Routes, Route} from "react-router-dom"

// function App() {

//   return (
//     <>
//     <BrowserRouter>
//       <Routes>
//         <Route path='/' element={<Login/>}/>
//         <Route path='/register' element={<Register/>}/>
//         <Route path='/dashboard' element={<DashboardPage/>}/>
//       </Routes>
//     </BrowserRouter>


//     </>
//   )
// }

// export default App



import "./App.css"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { useAuth } from "./context/useAuthHook"
import Toast from "./components/common/Toast"
import DashboardLayout from "./components/layout/DashboardLayout"
import Login from "./pages/login"
import Register from "./pages/register"
import Dashboard from "./pages/dashboard"
import Applications from "./pages/application"
import LogExplorer from "./pages/logExplorer"
import Account from "./pages/Account"
 
// ── Wraps any route that requires a valid token ────────────────────────────────
function ProtectedRoute({ children }) {
  const { token } = useAuth()
  return token ? children : <Navigate to="/" replace />
}
 
// ── Route tree ─────────────────────────────────────────────────────────────────
function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/"         element={<Login />} />
      <Route path="/register" element={<Register />} />
 
      {/* Protected — all share the sidebar + topbar layout via <Outlet /> */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard"           element={<Dashboard />} />
        <Route path="/applications"        element={<Applications />} />
        <Route path="/applications/:name"  element={<LogExplorer />} />
        <Route path="/account"             element={<Account />} />
      </Route>
 
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
 
export default function App() {
  return (
    <AuthProvider>
      <Toast />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}
 