import React, { useState, useEffect } from "react";

import HeroSection from "../components/HeroSection";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
    const { i18n } = useTranslation();

    return (

        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            <HeroSection />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* This is where you will add your StatsCards, Charts, etc. */}
                <div className="h-32 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-center text-gray-400 text-sm italic">
                    {i18n.language === 'ar' ? 'إحصائيات المزرعة قريباً...' : 'Farm Stats Coming Soon...'}
                </div>
                <div className="h-32 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-center text-gray-400 text-sm italic">
                    {i18n.language === 'ar' ? 'النشاط الأخير قريباً...' : 'Recent Activity Coming Soon...'}
                </div>
                <div className="h-32 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-center text-gray-400 text-sm italic">
                    {i18n.language === 'ar' ? 'حالة الطقس قريباً...' : 'Weather Status Coming Soon...'}
                </div>
            </div>
        </div>

    );
};

export default Dashboard;