import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaLeaf, FaRegEye, FaRegEyeSlash } from "react-icons/fa"; 
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { login, loading, error, user } = useAuth();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === "ar";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user, navigate]);

  // --- VALIDATION LOGIC ---
  const isEmailValid = /\S+@\S+\.\S+/.test(email);
  const isPasswordValid = password.length >= 6;
  const canSubmit = isEmailValid && isPasswordValid && !loading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (!isEmailValid) {
      setLocalError(isRTL ? "البريد الإلكتروني غير صالح" : "Please enter a valid email");
      return;
    }
    
    await login({ email, password });
  };

  return (
    <div className="min-h-screen w-full flex bg-white dark:bg-slate-950 transition-colors duration-500">
      
      {/* Container switches direction based on RTL */}
      <div className={`flex w-full min-h-screen ${isRTL ? "flex-col lg:flex-row-reverse" : "flex-col lg:flex-row"}`}>
        
        {/* --- IMAGE SECTION --- */}
        <div className="hidden lg:flex flex-[2] lg:w-1/2 relative overflow-hidden bg-green-600">
          <img
            src="/sawaeidLogin.png"
            alt="Farm"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 to-transparent" />
          <div className="relative z-10 p-16 self-end w-full text-white">
            <h1 className="text-5xl font-black mb-4 tracking-tight">
              {isRTL ? "سواعد" : "Sawaied"}
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              {isRTL ? "نظامك المتكامل لإدارة المزارع الذكية" : "Your gateway to smart farming."}
            </p>
          </div>
        </div>

        {/* --- FORM SECTION --- */}
        <main className="flex-1 flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-[400px] space-y-8">
            
            {/* Logo/Header */}
            <div className={`flex flex-col ${isRTL ? "items-end text-right" : "items-start text-left"}`}>
              <div className="size-14 bg-green-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl shadow-green-500/30 transition-transform hover:scale-110">
                <FaLeaf size={28} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                {isRTL ? "تسجيل الدخول" : "Welcome Back"}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium mt-2">
                {isRTL ? "سعداء برؤيتك مرة أخرى" : "Manage your farm operations easily"}
              </p>
            </div>

            {/* Error Message Display */}
            {(error || localError) && (
              <div className="p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm font-bold animate-in fade-in slide-in-from-top-2">
                {localError || error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 px-1">
                  {isRTL ? "البريد الإلكتروني" : "Email Address"}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="farmer@sawaeid.com"
                  className={`w-full px-5 py-4 rounded-xl border bg-slate-50 dark:bg-slate-900 dark:text-white outline-none transition-all
                    ${email && !isEmailValid ? 'border-red-300 focus:ring-red-100' : 'border-slate-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10'}
                    ${isRTL ? "text-right" : "text-left"}`}
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 px-1">
                  {isRTL ? "كلمة المرور" : "Password"}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full px-5 py-4 rounded-xl border bg-slate-50 dark:bg-slate-900 dark:text-white outline-none transition-all
                      ${password && !isPasswordValid ? 'border-red-300 focus:ring-red-100' : 'border-slate-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10'}
                      ${isRTL ? "text-right" : "text-left"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute top-1/2 -translate-y-1/2 text-slate-400 hover:text-green-600 transition-colors ${isRTL ? "left-4" : "right-4"}`}
                  >
                    {showPassword ? <FaRegEyeSlash size={18} /> : <FaRegEye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit Button with Dynamic Colors */}
              <button
                type="submit"
                disabled={!canSubmit}
                className={`w-full font-black py-4 rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-3 mt-4
                  ${canSubmit 
                    ? "bg-green-600 hover:bg-green-700 text-white shadow-green-500/20" 
                    : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"}
                `}
              >
                {loading ? (
                  <AiOutlineLoading3Quarters className="animate-spin" size={20} />
                ) : (
                  isRTL ? "دخول" : "Sign In"
                )}
              </button>
            </form>

            <div className="pt-8 text-center border-t border-slate-100 dark:border-slate-800">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-bold">
                {isRTL ? "ليس لديك حساب؟" : "New to Sawaied?"}
                <Link to="/register" className="ms-2 text-green-600 hover:underline">
                  {isRTL ? "أنشئ حساب مزرعتك" : "Create your farm profile"}
                </Link>
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;