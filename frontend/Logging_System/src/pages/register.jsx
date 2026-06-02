// import { useState, useNavigate } from "react";
// import {
//   MdTerminal,
//   MdVisibility,
//   MdVisibilityOff,
//   MdCheckCircle,
// } from "react-icons/md";
// import { Link } from "react-router-dom";
// import { api } from "../services/api";


// export default function Register() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate()

//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     terms: false,
//   });

//   const passwordsMatch =
//     formData.password === formData.confirmPassword;

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const response = await api.post(
//       "/developer/register",
//       {

//         userName:formData.username,
//         email:formData.email,
//         password:formData.password
//       }
      
//     )

//     if (!passwordsMatch) return;

//     setLoading(true);

//     setTimeout(() => {
//       setLoading(false);
//     }, 2500);

//     navigate("/dashboard")
//   };

//   return (
//     <div className="min-h-screen overflow-hidden bg-[#0b1326] relative text-white">

//       {/* Animated Background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-[#0b1326] via-[#131b2e] to-[#00363e]" />

//       {/* Blur Effects */}
//       <div className="absolute top-10 right-10 w-72 h-72 bg-cyan-400/10 blur-[120px] rounded-full"></div>

//       <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-400/10 blur-[120px] rounded-full"></div>

//       {/* Grid Overlay */}
//       <div
//         className="absolute inset-0 opacity-10"
//         style={{
//           backgroundImage:
//             "radial-gradient(circle at 2px 2px, #8aebff 1px, transparent 0)",
//           backgroundSize: "40px 40px",
//         }}
//       />

//       {/* Main */}
//       <main className="relative z-10 flex items-center justify-center min-h-screen p-4">

//         <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-2xl border border-slate-800 rounded-3xl p-8 shadow-2xl">

//           {/* Logo */}
//           <div className="text-center mb-8">

//             <div className="flex justify-center items-center gap-3 mb-3">

//               <MdTerminal className="text-cyan-400 text-5xl" />

//               <h1 className="text-3xl font-bold tracking-tight">
//                 Lumina Log-Ops
//               </h1>
//             </div>

//             <p className="text-slate-400 text-sm">
//               Enterprise Observability Engine
//             </p>
//           </div>

//           {/* Header */}
//           <div className="text-center mb-8">

//             <h2 className="text-2xl font-semibold">
//               Create Account
//             </h2>

//             <p className="text-slate-400 text-sm mt-2">
//               Provision your developer credentials
//             </p>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-5">

//             {/* Username */}
//             <div className="relative">

//               <input
//                 type="text"
//                 name="username"
//                 required
//                 value={formData.username}
//                 onChange={handleChange}
//                 placeholder="Username"
//                 className="w-full bg-slate-950/60 border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-4 outline-none transition-all"
//               />

//               {formData.username && (
//                 <MdCheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-400 text-xl" />
//               )}
//             </div>

//             {/* Email */}
//             <div>

//               <input
//                 type="email"
//                 name="email"
//                 required
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Work Email"
//                 className="w-full bg-slate-950/60 border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-4 outline-none transition-all"
//               />
//             </div>

//             {/* Password */}
//             <div className="relative">

//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 required
//                 minLength={8}
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Password"
//                 className="w-full bg-slate-950/60 border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-4 pr-12 outline-none transition-all"
//               />

//               <button
//                 type="button"
//                 onClick={() =>
//                   setShowPassword(!showPassword)
//                 }
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400"
//               >
//                 {showPassword ? (
//                   <MdVisibilityOff size={22} />
//                 ) : (
//                   <MdVisibility size={22} />
//                 )}
//               </button>
//             </div>

//             {/* Confirm Password */}
//             <div className="relative">

//               <input
//                 type={
//                   showConfirmPassword ? "text" : "password"
//                 }
//                 name="confirmPassword"
//                 required
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 placeholder="Confirm Password"
//                 className={`w-full bg-slate-950/60 border rounded-xl px-4 py-4 pr-12 outline-none transition-all
//                 ${
//                   formData.confirmPassword &&
//                   !passwordsMatch
//                     ? "border-red-500"
//                     : "border-slate-700 focus:border-cyan-400"
//                 }`}
//               />

//               <button
//                 type="button"
//                 onClick={() =>
//                   setShowConfirmPassword(
//                     !showConfirmPassword
//                   )
//                 }
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400"
//               >
//                 {showConfirmPassword ? (
//                   <MdVisibilityOff size={22} />
//                 ) : (
//                   <MdVisibility size={22} />
//                 )}
//               </button>

//               {formData.confirmPassword &&
//                 !passwordsMatch && (
//                   <p className="text-red-400 text-xs mt-2">
//                     Passwords do not match
//                   </p>
//                 )}
//             </div>

//             {/* Terms */}
//             <div className="flex items-start gap-3">

//               <input
//                 type="checkbox"
//                 name="terms"
//                 required
//                 checked={formData.terms}
//                 onChange={handleChange}
//                 className="mt-1 accent-cyan-400"
//               />

//               <p className="text-sm text-slate-400 leading-relaxed">

//                 I agree to the{" "}

//                 <span className="text-cyan-400 hover:underline cursor-pointer">
//                   Terms of Service
//                 </span>

//                 {" "}and{" "}

//                 <span className="text-cyan-400 hover:underline cursor-pointer">
//                   Privacy Policy
//                 </span>
//               </p>
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full py-4 rounded-xl font-bold transition-all duration-300
//               ${
//                 loading
//                   ? "bg-green-500"
//                   : "bg-gradient-to-r from-cyan-400 to-sky-500 hover:shadow-[0_0_25px_rgba(34,211,238,0.35)] hover:scale-[1.01]"
//               }`}
//             >
//               {loading
//                 ? "Provisioning..."
//                 : "Register"}
//             </button>
//           </form>

//           {/* Footer */}
//           <div className="text-center mt-6 text-sm text-slate-400">

//             Already have an account?

//             <Link to={"/"} className="text-cyan-400 hover:underline cursor-pointer ml-1">
//               Login here
//             </Link>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }






import { useState } from "react"
// ⚠ Original bug: useNavigate was imported from "react" — it lives in react-router-dom
import { Link, useNavigate } from "react-router-dom"
import { MdTerminal, MdVisibility, MdVisibilityOff, MdCheckCircle } from "react-icons/md"
import { api } from "../services/api"
import { ShowToast } from "../components/common/Toast"
 
export default function Register() {
  const [showPassword,        setShowPassword]        = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState("")
  const navigate = useNavigate()
 
  const [form, setForm] = useState({
    username:        "",
    email:           "",
    password:        "",
    confirmPassword: "",
    terms:           false,
  })
 
  const passwordsMatch = form.password === form.confirmPassword
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }))
  }
 
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
 
    // Client-side guard — run BEFORE the API call
    if (!passwordsMatch) {
      setError("Passwords do not match.")
      return
    }
 
    setLoading(true)
    try {
      // POST /api/developer/register  →  { message }
      await api.post("/developer/register", {
        userName: form.username,
        email:    form.email,
        password: form.password,
      })
 
      ShowToast("Account created! Please sign in.", "success")
      navigate("/")
    } catch (err) {
      const msg = err.response?.data?.message ?? "Registration failed. Try again."
      setError(msg)
    } finally {
      setLoading(false)
    }
  }
 
  return (
    <div className="min-h-screen overflow-hidden bg-[#0b1326] relative text-white">
 
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b1326] via-[#131b2e] to-[#00363e]" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-cyan-400/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-400/10 blur-[120px] rounded-full" />
      <div
        className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #8aebff 1px, transparent 0)", backgroundSize: "40px 40px" }}
      />
 
      <main className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-2xl border border-slate-800 rounded-3xl p-8 shadow-2xl">
 
          {/* Logo */}
          <div className="text-center mb-6">
            <div className="flex justify-center items-center gap-3 mb-3">
              <MdTerminal className="text-cyan-400 text-5xl" />
              <h1 className="text-3xl font-bold tracking-tight">Lumina Log-Ops</h1>
            </div>
            <p className="text-slate-400 text-sm">Enterprise Observability Engine</p>
          </div>
 
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold">Create Account</h2>
            <p className="text-slate-400 text-sm mt-1">Provision your developer credentials</p>
          </div>
 
          {/* Error banner */}
          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}
 
          <form onSubmit={handleSubmit} className="space-y-4">
 
            {/* Username */}
            <div className="relative">
              <input
                type="text" name="username" required
                value={form.username} onChange={handleChange}
                placeholder="Username"
                className="w-full bg-slate-950/60 border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-4 outline-none transition-all"
              />
              {form.username && (
                <MdCheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-400 text-xl" />
              )}
            </div>
 
            {/* Email */}
            <input
              type="email" name="email" required
              value={form.email} onChange={handleChange}
              placeholder="Work Email"
              className="w-full bg-slate-950/60 border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-4 outline-none transition-all"
            />
 
            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password" required minLength={8}
                value={form.password} onChange={handleChange}
                placeholder="Password (min. 8 chars)"
                className="w-full bg-slate-950/60 border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-4 pr-12 outline-none transition-all"
              />
              <button type="button" onClick={() => setShowPassword(s => !s)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400">
                {showPassword ? <MdVisibilityOff size={22} /> : <MdVisibility size={22} />}
              </button>
            </div>
 
            {/* Confirm password */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword" required
                value={form.confirmPassword} onChange={handleChange}
                placeholder="Confirm Password"
                className={`w-full bg-slate-950/60 rounded-xl px-4 py-4 pr-12 outline-none transition-all border
                  ${form.confirmPassword && !passwordsMatch ? "border-red-500" : "border-slate-700 focus:border-cyan-400"}`}
              />
              <button type="button" onClick={() => setShowConfirmPassword(s => !s)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400">
                {showConfirmPassword ? <MdVisibilityOff size={22} /> : <MdVisibility size={22} />}
              </button>
              {form.confirmPassword && !passwordsMatch && (
                <p className="text-red-400 text-xs mt-1">Passwords do not match</p>
              )}
            </div>
 
            {/* Terms */}
            <div className="flex items-start gap-3">
              <input type="checkbox" name="terms" required checked={form.terms} onChange={handleChange} className="mt-1 accent-cyan-400" />
              <p className="text-sm text-slate-400 leading-relaxed">
                I agree to the{" "}
                <span className="text-cyan-400 hover:underline cursor-pointer">Terms of Service</span>
                {" "}and{" "}
                <span className="text-cyan-400 hover:underline cursor-pointer">Privacy Policy</span>
              </p>
            </div>
 
            {/* Submit */}
            <button
              type="submit" disabled={loading}
              className={`w-full py-4 rounded-xl font-bold transition-all duration-300 text-slate-900
                ${loading ? "bg-emerald-500 cursor-not-allowed" : "bg-gradient-to-r from-cyan-400 to-sky-500 hover:shadow-[0_0_25px_rgba(34,211,238,0.35)] hover:scale-[1.01]"}`}
            >
              {loading ? "Provisioning…" : "Create Account"}
            </button>
          </form>
 
          <div className="text-center mt-6 text-sm text-slate-400">
            Already have an account?{" "}
            <Link to="/" className="text-cyan-400 hover:underline ml-1">Sign in here</Link>
          </div>
        </div>
      </main>
    </div>
  )
}