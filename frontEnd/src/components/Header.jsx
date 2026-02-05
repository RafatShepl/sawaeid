import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import { MdNotifications, MdSearch, MdClose, MdMenu, MdLanguage, MdKeyboardArrowDown } from "react-icons/md";
import { FaSun, FaMoon, FaCheck } from "react-icons/fa";

const Header = ({ onMenuClick }) => {
  const { user } = useAuth();
  const { t, i18n } = useTranslation();

  // Initialize theme from localStorage
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const [openLangMenu, setOpenLangMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const menuRef = useRef(null);

  // --- REFINED THEME & RTL SYNC ---
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Toggle the .dark class on the <html> tag
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);

    // Sync Language Direction
    const currentLang = i18n.language || 'ar';
    root.dir = currentLang === "ar" ? "rtl" : "ltr";
    root.lang = currentLang;
  }, [theme, i18n.language]);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenProfileMenu(false);
        setOpenLangMenu(false);
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));

  return (
    /* We use bg-[var(--color-background)] to match your CSS variables perfectly */
    <header className="h-20 border-b border-gray-100 dark:border-gray-800 bg-[var(--color-background)]/90 backdrop-blur-md sticky top-0 z-40 w-full transition-colors duration-300">
      <div className="h-full px-4 sm:px-8 flex items-center justify-between gap-4" ref={menuRef}>
        
        {/* --- LEFT: SIDEBAR TOGGLE & BRANDING --- */}
        <div className="flex items-center gap-2">
          <button onClick={onMenuClick} className="lg:hidden p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <MdMenu className="text-2xl" />
          </button>
          <h2 className="lg:hidden font-black text-primary text-xl tracking-tight">Sawaied</h2>
        </div>

        {/* --- CENTER: SEARCH --- */}
        <div className="hidden md:block flex-1 max-w-md">
          <div className="relative group">
            <span className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
              <MdSearch className="text-xl" />
            </span>
            <input
              type="text"
              placeholder={t("header.search") || "Search everything..."}
              className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl ps-11 pe-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none text-[var(--color-text)] transition-all"
            />
          </div>
        </div>

        {/* --- RIGHT: ACTIONS --- */}
        <div className="flex items-center gap-1 sm:gap-3">
          
          <button className="md:hidden p-2.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full" onClick={() => setShowMobileSearch(!showMobileSearch)}>
            {showMobileSearch ? <MdClose className="text-xl" /> : <MdSearch className="text-xl" />}
          </button>

          <div className="hidden sm:flex items-center gap-1">
            {/* Custom Language Dropdown */}
            <div className="relative">
              <button onClick={() => setOpenLangMenu(!openLangMenu)} className="flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-bold text-gray-500 dark:text-gray-400 transition-colors">
                <MdLanguage size={18} />
                <span className="uppercase">{i18n.language}</span>
                <MdKeyboardArrowDown className={`transition-transform ${openLangMenu ? 'rotate-180' : ''}`} />
              </button>
              {openLangMenu && (
                <div className="absolute top-full mt-2 end-0 w-32 form-glass border border-gray-100 dark:border-gray-700 rounded-xl shadow-xl z-50 overflow-hidden">
                  <button onClick={() => { i18n.changeLanguage('ar'); setOpenLangMenu(false); }} className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-[var(--color-text)] hover:bg-gray-50 dark:hover:bg-gray-700">
                    AR {i18n.language === 'ar' && <FaCheck className="text-[10px] text-primary" />}
                  </button>
                  <button onClick={() => { i18n.changeLanguage('en'); setOpenLangMenu(false); }} className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-[var(--color-text)] hover:bg-gray-50 dark:hover:bg-gray-700">
                    EN {i18n.language === 'en' && <FaCheck className="text-[10px] text-primary" />}
                  </button>
                </div>
              )}
            </div>

            <button onClick={toggleTheme} className="p-2.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all">
              {theme === "light" ?<FaSun className="text-yellow-400" /> : <FaMoon /> }
            </button>

            {/* Notifications */}
            <div className="relative">
              <button onClick={() => setShowNotifications(!showNotifications)} className="p-2.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full relative">
                <MdNotifications className="text-2xl" />
                <span className="absolute top-2.5 end-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
              </button>
              {showNotifications && (
                <div className="absolute top-14 end-0 w-72 form-glass border border-gray-100 dark:border-gray-700 rounded-2xl shadow-2xl z-50 p-4">
                  <h4 className="font-bold text-sm mb-2 text-[var(--color-text)]">{t("header.notifications")}</h4>
                  <p className="text-xs text-gray-400 text-center py-4">{t("header.noNotifications")}</p>
                </div>
              )}
            </div>
          </div>

          <div className="hidden sm:block h-8 w-px bg-gray-100 dark:bg-gray-800 mx-2"></div>

          {/* --- USER PROFILE SECTION --- */}
          <div 
            onClick={() => setOpenProfileMenu(!openProfileMenu)}
            className="flex items-center gap-3 p-1 rounded-xl cursor-pointer relative"
          >
            <div className="text-end hidden md:block">
              <p className="text-sm font-bold text-[var(--color-text)] leading-none mb-1">{user?.name || "User Name"}</p>
              <p className="text-[11px] font-bold text-primary uppercase tracking-tighter">{user?.role || "Administrator"}</p>
            </div>

            <div className="relative">
              <img src={user?.avatar || "https://ui-avatars.com/api/?name=User&background=143a2f&color=fff"} alt="Profile" className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl object-cover border-2 border-[var(--color-background)] shadow-sm" />
              <span className="absolute -bottom-0.5 -end-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-[var(--color-background)] rounded-full"></span>
            </div>

            {/* Avatar Dropdown Screen */}
            {openProfileMenu && (
              <div className="absolute top-full mt-2 end-0 w-56 form-glass border border-gray-100 dark:border-gray-700 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                <div className="p-4 bg-gray-50/50 dark:bg-gray-900/50">
                  <p className="text-sm font-bold text-[var(--color-text)]">{user?.name || "User Name"}</p>
                  <p className="text-xs text-gray-500">{user?.role || "Administrator"}</p>
                </div>
                <div className="p-2 space-y-1">
                  <button onClick={toggleTheme} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-[var(--color-text)] hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                    {theme === "light" ?<FaSun />  : <FaMoon />} {t("header.toggleTheme")}
                  </button>
                  <div className="px-3 py-2 flex items-center justify-between border-t border-gray-100 dark:border-gray-800 mt-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Language</span>
                    <div className="flex gap-2">
                      <button onClick={() => { i18n.changeLanguage('ar'); setOpenProfileMenu(false); }} className={`text-xs p-1 ${i18n.language === 'ar' ? 'text-primary font-bold' : 'text-gray-400'}`}>AR</button>
                      <button onClick={() => { i18n.changeLanguage('en'); setOpenProfileMenu(false); }} className={`text-xs p-1 ${i18n.language === 'en' ? 'text-primary font-bold' : 'text-gray-400'}`}>EN</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;