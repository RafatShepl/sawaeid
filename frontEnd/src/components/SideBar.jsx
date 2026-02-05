import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import {
  FaUsers, FaSeedling, FaMoneyBillWave, FaChartLine,
  FaMap, FaSignOutAlt, FaTachometerAlt, FaChevronDown,
  FaChevronLeft, FaChevronRight, FaLeaf
} from "react-icons/fa";

const Sidebar = ({ isOpen, setIsOpen, isShrunk, setIsShrunk }) => {
  const { logout } = useAuth();
  const { t, i18n } = useTranslation();
  const [expandedMenus, setExpandedMenus] = useState({});
  const isRTL = i18n.language === "ar";

  const toggleSubMenu = (label) => {
    if (isShrunk) setIsShrunk(false);
    setExpandedMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const menuItems = [
    { icon: <FaTachometerAlt />, label: t("sidebar.dashboard") || "Dashboard", path: "/", end: true },
    { icon: <FaUsers />, label: t("sidebar.workers") || "Workers", path: "/workers" },
    { icon: <FaSeedling />, label: t("sidebar.crops") || "Crops", path: "/crops" },
    {
  icon: <FaMoneyBillWave />,
  label: t("sidebar.expenses") || "Expenses",
  path: "/expenses", // The parent path
  subMenu: [
    { 
      label: t("sidebar.allExpenses") || "All Expenses", 
      path: "/expenses/all" 
    },
    { 
      label: t("sidebar.addExpenseType") || "Add Expense Type", 
      path: "/expenses/types" 
    }
  ]
},
    { icon: <FaChartLine />, label: t("sidebar.reports") || "Reports", path: "/reports" },
    { icon: <FaMap />, label: t("sidebar.farmMap") || "Map", path: "/farm-map" },
  ];

  return (
    <>
      {/* --- MOBILE OVERLAY --- */}
      <div
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] lg:hidden transition-all duration-500 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={() => setIsOpen(false)}
      />

      {/* --- SIDEBAR ASIDE --- */}
      <aside
        className={`
          flex flex-col bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800
          transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) h-screen z-[70] shrink-0
          
          /* DESKTOP BEHAVIOR */
          lg:static lg:translate-x-0 border-e shadow-sm
          ${isShrunk ? "lg:w-[88px]" : "lg:w-[280px]"}

          /* MOBILE BEHAVIOR */
          fixed inset-y-0 start-0
          ${isOpen ? "translate-x-0 w-[280px]" : (isRTL ? "translate-x-full" : "-translate-x-full")}
        `}
      >
        {/* --- FLOATING TOGGLE BUTTON --- */}
        <button
          onClick={() => setIsShrunk(!isShrunk)}
          className={`
            hidden lg:flex absolute top-[50%]  z-[80]
            w-10 h-10 items-center justify-center  rounded-full
            bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700
            text-slate-500 hover:text-primary shadow-xl hover:scale-110 transition-all

            ${isRTL ? "-left-4" : "-right-4"}
          `}
        >
          {isShrunk ? (isRTL ? <FaChevronLeft size={17} /> : <FaChevronRight size={17} />)
            : (isRTL ? <FaChevronRight size={17} /> : <FaChevronLeft size={17} />)}
        </button>

        {/* --- LOGO SECTION --- */}
        <div className="p-6 h-24 flex items-center shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-green-600 text-white rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
              <FaLeaf size={20} />
            </div>
            {!isShrunk && (
              <div className="flex flex-col animate-in fade-in slide-in-from-start-4 duration-500">
                <span className="text-2xl font-black dark:text-white tracking-tight leading-none">
                  Sawaied
                </span>
                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mt-1">
                  Agri-Systems
                </span>
              </div>
            )}
          </div>
        </div>

        {/* --- NAVIGATION --- */}
        <nav className="flex-1 px-4 py-2 space-y-1.5 overflow-y-auto custom-scrollbar overflow-x-hidden">
          {menuItems.map((item, i) => (
            <div key={i}>
              <NavLink
                to={item.subMenu ? "#" : item.path}
                end={item.end} // This ensures "/" is only active when you are actually on the home page
                onClick={(e) => {
                  if (item.subMenu) {
                    e.preventDefault();
                    toggleSubMenu(item.label);
                  } else if (window.innerWidth < 1024) {
                    setIsOpen(false);
                  }
                }}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-3.5 py-3 rounded-2xl transition-all duration-300 group ${isActive && !item.subMenu
                    ? "bg-green-400  shadow-lg shadow-primary/20"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-primary"
                  }`
                }
              >
                <span className="text-xl shrink-0 transition-transform group-hover:scale-110 duration-300">
                  {item.icon}
                </span>
                {!isShrunk && (
                  <span className="text-[14px] font-bold flex-1 truncate">
                    {item.label}
                  </span>
                )}
              </NavLink>

              {/* Submenu with slide animation */}
              {!isShrunk && item.subMenu && expandedMenus[item.label] && (
                <div className="mt-1 ms-6 space-y-1 border-s-2 border-slate-100 dark:border-slate-800 animate-in slide-in-from-top-2 duration-300">
                  {item.subMenu.map((sub, si) => (
                    <Link
                      key={si}
                      to={sub.path}
                      className="block py-2 ps-6 text-xs font-bold text-slate-400 hover:text-primary transition-colors relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-[2px] before:bg-slate-100 dark:before:bg-slate-800"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* --- FOOTER / LOGOUT --- */}
        <div className="p-4 mt-auto">
          <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded-3xl">
            <button
              onClick={logout}
              className="flex items-center gap-4 px-4 py-3.5 rounded-2xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 w-full transition-all group"
            >
              <FaSignOutAlt className="text-xl shrink-0 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform" />
              {!isShrunk && <span className="text-sm font-black uppercase tracking-wider">{t("sidebar.logout") || "Logout"}</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;