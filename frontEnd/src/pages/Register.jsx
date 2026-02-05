import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaLeaf, FaRegEye, FaRegEyeSlash } from "react-icons/fa"; 
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Register = () => {
  const { register, loading, error, message, user } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user, navigate]);

  // --- VALIDATION LOGIC ---
  const isNameValid = name.trim().length >= 3;
  const isEmailValid = /\S+@\S+\.\S+/.test(email);
  const isPasswordValid = password.length >= 6;
  const canSubmit = isNameValid && isEmailValid && isPasswordValid && !loading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (!isNameValid) {
      setLocalError("الاسم يجب أن يكون 3 أحرف على الأقل");
      return;
    }
    if (!isEmailValid) {
      setLocalError("البريد الإلكتروني غير صحيح");
      return;
    }
    if (!isPasswordValid) {
      setLocalError("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      return;
    }

    await register({ name, email, password });
  };

  return (
    <div className="min-h-screen w-full flex bg-white dark:bg-slate-950 transition-colors duration-500 overflow-hidden">
      
      {/* FIXED LTR LAYOUT: Image on Left (flex-2), Form on Right (flex-1) */}
      <div className="flex w-full min-h-screen flex-row">
        
        {/* --- LEFT IMAGE SECTION (BIG) --- */}
        <div className="hidden lg:flex flex-[2] relative overflow-hidden bg-green-700 border-r border-slate-100 dark:border-slate-800">
          <img
            src="/sawaeidRegistee.png" 
            alt="Join Sawaied"
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-green-900/80 via-green-900/20 to-transparent" />
          
          <div className="relative z-10 p-20 self-center w-full text-white text-left">
            <div className="size-20 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mb-10 border border-white/20">
               <FaLeaf size={40} className="text-white" />
            </div>
            <h1 className="text-6xl font-black mb-6 tracking-tight leading-tight max-w-2xl">
              انضم إلى مستقبل الزراعة الذكية
            </h1>
            <p className="text-2xl text-white/80 max-w-lg font-medium leading-relaxed">
              قم بإنشاء حسابك الآن للبدء في إدارة مزرعتك بشكل مستدام واحترافي مع نظام سواعد.
            </p>
          </div>
        </div>

        {/* --- RIGHT FORM SECTION --- */}
        <main className="flex-1 flex items-center justify-center p-8 lg:p-16 bg-white dark:bg-slate-900">
          <div className="w-full max-w-[400px] space-y-10">
            
            {/* Header (Arabic text, but left-aligned as per LTR layout) */}
            <div className="flex flex-col items-start text-left">
              <h2 className="text-4xl font-black text-slate-900 dark:text-white">
                إنشاء حساب
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-bold mt-3">
                أهلاً بك في مجتمع سواعد الزراعي
              </p>
            </div>

            {/* Error/Success Feedback */}
            {(error || localError || message) && (
              <div className={`p-4 rounded-2xl border font-bold text-sm text-right ${
                message ? "bg-green-50 border-green-200 text-green-600" : "bg-red-50 border-red-200 text-red-600"
              }`}>
                {localError || error || message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 px-1 block text-left">
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="أدخل اسمك الثلاثي"
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 dark:text-white outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-600 transition-all font-medium text-right"
                />
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 px-1 block text-left">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@farm.com"
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 dark:text-white outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-600 transition-all font-medium text-right"
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 px-1 block text-left">
                  كلمة المرور
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 dark:text-white outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-600 transition-all font-medium text-right"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-green-600 transition-colors"
                  >
                    {showPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!canSubmit}
                className={`w-full font-black py-4 rounded-xl shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-3 mt-6
                  ${canSubmit 
                    ? "bg-green-600 hover:bg-green-700 text-white shadow-green-500/20" 
                    : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"}
                `}
              >
                {loading ? (
                  <AiOutlineLoading3Quarters className="animate-spin" size={22} />
                ) : (
                  "إنشاء حساب جديد"
                )}
              </button>
            </form>

            <div className="pt-8 text-center border-t border-slate-100 dark:border-slate-800">
              <p className="text-slate-500 dark:text-slate-400 font-bold text-sm">
                هل لديك حساب بالفعل؟ 
                <Link to="/login" className="ml-2 text-green-600 hover:underline underline-offset-4">
                  سجل دخولك هنا
                </Link>
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Register;