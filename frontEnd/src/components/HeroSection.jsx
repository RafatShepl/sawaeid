import React from "react";
import { MdMap, MdAddCircle } from "react-icons/md";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <section
      className="relative rounded-[32px] overflow-hidden min-h-[320px] flex items-end p-6 sm:p-10 transition-all duration-500 shadow-2xl shadow-green-900/10 group"
    >
      {/* --- BACKGROUND IMAGE & OVERLAY --- */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/farm-hero.jpg" // Ensure you have a nice farm image here
          alt="Farm Background"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80'; }}
        />
        {/* Stronger gradient at the bottom for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
      </div>

      {/* --- CONTENT --- */}
      <div className={`relative z-10 w-full max-w-2xl animate-in fade-in slide-in-from-bottom-6 duration-700 ${isRTL ? "text-right" : "text-left"}`}>
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
            {t("hero.welcome") || "Welcome to Sawaied"}
          </h1>
          <p className="text-base sm:text-xl text-white/80 font-medium max-w-xl">
            {t("hero.subtitle") || "Cultivate efficiency and manage your farm with ease."}
          </p>
        </div>

        <div className={`flex flex-wrap gap-4 mt-8 ${isRTL ? "justify-start flex-row-reverse" : "justify-start"}`}>
          {/* Primary Action */}
          <button className="bg-green-600 hover:bg-green-500 text-white font-black px-6 py-4 rounded-2xl flex items-center gap-3 transition-all duration-300 shadow-lg shadow-green-600/20 active:scale-95">
            <MdMap size={24} />
            <span className="text-[15px]">{t("hero.viewFarm") || "View Farm Map"}</span>
          </button>

          {/* Secondary Action */}
          <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 font-black px-6 py-4 rounded-2xl flex items-center gap-3 transition-all duration-300 active:scale-95">
            <MdAddCircle size={24} />
            <span className="text-[15px]">{t("hero.logHarvest") || "Log Daily Harvest"}</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;