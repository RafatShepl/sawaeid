import React, { useState, useEffect } from "react";
import Sidebar from "../components/SideBar";
import Header from "../components/Header";
import { useTranslation } from "react-i18next";
import { Routes, Route, Navigate } from "react-router-dom"; // IMPORTED HERE
import Dashboard from "./Dashbord";
import AllExpenses from "./expenses/AllExpenses"; 
import ExpenseTypes from "./expenses/ExpenseTypes";

const Home = () => {
  const { i18n } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isShrunk, setIsShrunk] = useState(false);

  useEffect(() => {
    const lang = i18n.language || "ar";
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [i18n.language]);

  return (
    <div className="flex h-screen w-full bg-[var(--color-background)] dark:bg-gray-950 overflow-hidden font-sans">
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        isShrunk={isShrunk}
        setIsShrunk={setIsShrunk}
      />

      <div className="flex-1 flex flex-col min-w-0 h-full relative overflow-hidden">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <Routes>
            <Route index element={<Dashboard />} />
            
            {/* Expenses Group */}
            <Route path="expenses">
              {/* This is the line that uses Navigate */}
              <Route index element={<Navigate to="all" replace />} />
              <Route path="all" element={<AllExpenses />} />
              <Route path="types" element={<ExpenseTypes />} />
            </Route>
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Home;