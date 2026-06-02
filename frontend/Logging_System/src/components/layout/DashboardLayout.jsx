import { Outlet } from "react-router-dom"
import Sidebar from "../../pages/Sidebar"
import TopBar from "../../pages/Topbar"
import { C } from "../../constants/colors"
 
// All protected pages are rendered as <Outlet /> children inside this shell.
export default function DashboardLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.bg }}>
      <Sidebar />
      <div style={{ marginLeft: 280, flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <TopBar />
        <main style={{ flex: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
 