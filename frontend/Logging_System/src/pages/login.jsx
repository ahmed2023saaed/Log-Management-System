// import { useState } from "react";
// import { MdVisibility, MdVisibilityOff, MdTerminal, MdVerifiedUser } from "react-icons/md";
// import { Link , useNavigate} from "react-router-dom";
// import { api } from "../services/api";

// export default function Login() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [showToast, setShowToast] = useState(false);
//   const [email, setEmail]  = useState("")
//   const [password, setPassword]  = useState("")
//   const navigate = useNavigate()
//   const handleLogin = async (e) => {
//     e.preventDefault();

//     const response = await api.post(
//         "/developer/login",
//         {
//             email,
//             password
//         }

//     )


//     setLoading(true);

//     setTimeout(() => {
//       setLoading(false);
//       setShowToast(true);

//       setTimeout(() => {
//         setShowToast(false);
//       }, 3000);
//     }, 1500);

//     navigate("/dashboard")
//   };

//   return (
//     <div className="min-h-screen overflow-hidden bg-slate-950 text-white relative flex items-center justify-center px-4">

//       {/* Animated Background */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>

//         <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>

//         <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-3xl animate-pulse"></div>
//       </div>

//       {/* Toast */}
//       {showToast && (
//         <div className="fixed top-8 right-8 z-50 animate-bounce">
//           <div className="flex items-center gap-3 bg-slate-900/80 backdrop-blur-xl border border-slate-700 px-5 py-4 rounded-xl shadow-2xl">
//             <MdVerifiedUser className="text-cyan-400 text-2xl" />
//             <p className="text-sm text-slate-200">
//               Secure login successful.
//             </p>
//           </div>
//         </div>
//       )}

//       {/* Login Card */}
//       <div className="relative z-10 w-full max-w-md">

//         <div className="bg-slate-900/60 backdrop-blur-2xl border border-slate-800 rounded-3xl p-8 shadow-2xl">

//           {/* Logo */}
//           <div className="text-center mb-8">

//             <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center mb-4">
//               <MdTerminal className="text-cyan-400 text-4xl" />
//             </div>

//             <h1 className="text-3xl font-bold tracking-tight">
//               Lumina Log-Ops
//             </h1>

//             <p className="text-slate-400 mt-2">
//               Observability & Incident Command
//             </p>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleLogin} className="space-y-6">

//             {/* Email */}
//             <div>
//               <label className="block text-sm mb-2 text-slate-300">
//                 Engineer Email
//               </label>

//               <input
//                 type="email"
//                 onChange={(e)=>{
//                     setEmail(e.target.value)
//                 }}
//                 value={email}
//                 placeholder="example@gmail.com"
//                 className="w-full bg-slate-950/50 border border-slate-700 focus:border-cyan-400 outline-none rounded-xl px-4 py-3 transition-all duration-300"
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <label className="block text-sm mb-2 text-slate-300">
//                 Password
//               </label>

//               <div className="relative">

//                 <input
//                 onChange={(e)=>{
//                     setPassword(e.target.value)
//                 }}
//                 value={password}
//                   type={showPassword ? "text" : "password"}
//                   placeholder="••••••••"
//                   className="w-full bg-slate-950/50 border border-slate-700 focus:border-cyan-400 outline-none rounded-xl px-4 py-3 pr-12 transition-all duration-300"
//                 />

//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400 hover:text-cyan-400"
//                 >
//                   {showPassword ? (
//                     <MdVisibilityOff size={22} />
//                   ) : (
//                     <MdVisibility size={22} />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Options */}
//             <div className="flex items-center justify-between text-sm">

//               <label className="flex items-center gap-2 text-slate-400">
//                 <input type="checkbox" className="accent-cyan-400" />
//                 Maintain session
//               </label>

//               <button
//                 type="button"
//                 className="text-cyan-400 hover:text-cyan-300"
//               >
//                 Reset Credentials
//               </button>
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 
//               ${
//                 loading
//                   ? "bg-green-500"
//                   : "bg-gradient-to-r from-cyan-400 to-sky-500 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:scale-[1.02]"
//               }`}
//             >
//               {loading ? "Connected..." : "Establish Connection"}
//             </button>

//             {/* Footer */}
//             <div className="text-center text-sm text-slate-400 pt-4">

//               New deployment?

//               <Link
//                 to={"./register"}
//                 type="button"
//                 className="ml-1 text-cyan-400 hover:text-indigo-200"
//               >
//                 Create organization account
//               </Link>
//             </div>

//           </form>
//         </div>

//         {/* Bottom Footer */}
//         <div className="flex justify-between items-center mt-6 text-sm text-slate-500">

//           <div className="flex items-center gap-2">
//             <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
//             All Systems Operational
//           </div>

//           <div className="flex gap-4">
//             <button className="hover:text-white">Privacy</button>
//             <button className="hover:text-white">Security</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






import { useState } from "react"
import { MdVisibility, MdVisibilityOff, MdTerminal } from "react-icons/md"
import { Link, useNavigate } from "react-router-dom"
import { api } from "../services/api"
import { useAuth } from "../context/useAuthHook"
import { ShowToast } from "../components/common/Toast"
 
export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading]           = useState(false)
  const [email, setEmail]               = useState("")
  const [password, setPassword]         = useState("")
  const [error, setError]               = useState("")
 
  const navigate   = useNavigate()
  const { login }  = useAuth()
 
  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
 
    try {
      // POST /api/developer/login  →  { message, token }
      const { data } = await api.post("/developer/login", { email, password })
 
      // Persist token + whatever user info we have (email from the form;
      // userName is not returned by the login endpoint — a /me route would
      // be needed to fetch it from the server).
      login(data.token, { email })

      ShowToast("Welcome to Lumina!", "success")
      navigate("/dashboard")
    } catch (err) {
      const msg = err.response?.data?.message ?? "Login failed. Check your credentials."
      setError(msg)
    } finally {
      setLoading(false)
    }
  }
 
  return (
    <div className="min-h-screen overflow-hidden bg-slate-950 text-white relative flex items-center justify-center px-4">
 
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-3xl animate-pulse" />
      </div>
 
      {/* Login card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-slate-900/60 backdrop-blur-2xl border border-slate-800 rounded-3xl p-8 shadow-2xl">
 
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center mb-4">
              <MdTerminal className="text-cyan-400 text-4xl" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Lumina Log-Ops</h1>
            <p className="text-slate-400 mt-2">Observability &amp; Incident Command</p>
          </div>
 
          {/* Error banner */}
          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}
 
          <form onSubmit={handleLogin} className="space-y-6">
 
            {/* Email */}
            <div>
              <label className="block text-sm mb-2 text-slate-300">Engineer Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-slate-950/50 border border-slate-700 focus:border-cyan-400 outline-none rounded-xl px-4 py-3 transition-all duration-300"
              />
            </div>
 
            {/* Password */}
            <div>
              <label className="block text-sm mb-2 text-slate-300">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950/50 border border-slate-700 focus:border-cyan-400 outline-none rounded-xl px-4 py-3 pr-12 transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400 hover:text-cyan-400"
                >
                  {showPassword ? <MdVisibilityOff size={22} /> : <MdVisibility size={22} />}
                </button>
              </div>
            </div>
 
            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 text-slate-900
                ${loading
                  ? "bg-emerald-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-cyan-400 to-sky-500 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:scale-[1.02]"
                }`}
            >
              {loading ? "Connecting…" : "Establish Connection"}
            </button>
 
            {/* Footer link */}
            <div className="text-center text-sm text-slate-400 pt-2">
              New deployment?{" "}
              <Link to="/register" className="text-cyan-400 hover:text-indigo-300 ml-1">
                Create organisation account
              </Link>
            </div>
          </form>
        </div>
 
        {/* Status bar */}
        <div className="flex justify-between items-center mt-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            All Systems Operational
          </div>
          <div className="flex gap-4">
            <button className="hover:text-white">Privacy</button>
            <button className="hover:text-white">Security</button>
          </div>
        </div>
      </div>
    </div>
  )
}
 