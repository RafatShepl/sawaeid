import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/authContext";
import { MdAddCircle, MdClose, MdSettingsSuggest } from "react-icons/md";
import ExpenseTypeCard from "../../components/ExpenseTypeCard";

// Custom Logic & Hooks
import { useHttp } from "../../hooks/useHttp";

const ExpenseType = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const { setMessage } = useAuth();
  
  // Custom HTTP hook replaces manual fetch
  const { loading, get, post, put, del } = useHttp();
  
  const [types, setTypes] = useState([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editingType, setEditingType] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "", icon: "eco" });

  // ===================== API ACTIONS =====================
  const fetchTypes = useCallback(async () => {
    const res = await get("/expense-types");
    if (res?.success) setTypes(res.data || []);
  }, [get]);

  useEffect(() => { fetchTypes(); }, [fetchTypes]);

  const handleSave = async () => {
    if (!formData.name) return;
    
    const url = editingType 
      ? `/expense-types/${editingType._id}`
      : "/expense-types";
    
    const res = editingType 
      ? await put(url, formData) 
      : await post(url, formData);

    if (res?.success) {
      setMessage(t("expense_types.save_success"));
      fetchTypes();
      closePanel();
    }
  };

  const handleDelete = async (id) => {
    const res = await del(`/expense-types/${id}`);
    if (res?.success) {
      setMessage(t("expense_types.delete_success"));
      fetchTypes();
    }
  };

  const closePanel = () => {
    setIsPanelOpen(false);
    setEditingType(null);
    setFormData({ name: "", description: "", icon: "eco" });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" dir={isRtl ? "rtl" : "ltr"}>
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* SIDEBAR */}
        <aside className="w-full lg:w-64 shrink-0">
          <nav className="flex flex-col gap-1">
            <div className="flex items-center gap-3 rounded-lg bg-emerald-500/10 dark:bg-primary/10 px-4 py-3 text-emerald-600 dark:text-primary font-bold">
              <MdSettingsSuggest size={20} />
              <span className="text-sm">{t("expense_types.sidebar_title")}</span>
            </div>
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                {t("expense_types.title")}
              </h1>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                {t("expense_types.subtitle")}
              </p>
            </div>

            {/* LIGHT MODE OPTIMIZED BUTTON */}
            <button 
              onClick={() => setIsPanelOpen(true)} 
              className="flex items-center gap-2 rounded-xl bg-emerald-500 dark:bg-primary px-6 py-3 text-sm font-bold text-white dark:text-slate-900 shadow-lg shadow-emerald-500/20 active:scale-95 transition-transform"
            >
              <MdAddCircle size={20} /> {t("expense_types.add_btn")}
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {loading && types.length === 0 ? (
              [1, 2, 3].map(n => (
                <div key={n} className="h-44 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
              ))
            ) : (
              types.map((type) => (
                <ExpenseTypeCard 
                  key={type._id} 
                  type={type} 
                  onEdit={(t) => { setEditingType(t); setFormData(t); setIsPanelOpen(true); }}
                  onDelete={() => handleDelete(type._id)} 
                />
              ))
            )}
          </div>
        </main>
      </div>

      {/* DRAWER PANEL */}
      {isPanelOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={closePanel}></div>
          <div className={`fixed inset-y-0 flex max-w-full ${isRtl ? "left-0" : "right-0"}`}>
            <div className="w-screen max-w-md bg-white dark:bg-[#0d1b11] shadow-2xl">
              <div className="flex h-full flex-col">
                <div className="px-6 py-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                    {editingType ? t("expense_types.edit_title") : t("expense_types.add_title")}
                  </h2>
                  <button onClick={closePanel} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                    <MdClose size={24} />
                  </button>
                </div>

                <div className="flex-1 px-6 py-8 space-y-6 overflow-y-auto">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                      {t("expense_types.form_name")}
                    </label>
                    <input 
                      value={formData.name} 
                      onChange={(e) => setFormData({...formData, name: e.target.value})} 
                      className="w-full rounded-xl border border-slate-200 p-4 focus:ring-2 focus:ring-emerald-500 outline-none dark:bg-slate-900 dark:border-slate-800 dark:text-white transition-all" 
                      placeholder="e.g. Health & Fitness"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                      {t("expense_types.form_description")}
                    </label>
                    <textarea 
                      value={formData.description} 
                      onChange={(e) => setFormData({...formData, description: e.target.value})} 
                      rows="4" 
                      className="w-full rounded-xl border border-slate-200 p-4 focus:ring-2 focus:ring-emerald-500 outline-none dark:bg-slate-900 dark:border-slate-800 dark:text-white transition-all" 
                      placeholder="Briefly describe this category..."
                    />
                  </div>
                </div>

                <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex gap-3 bg-slate-50/50 dark:bg-transparent">
                  <button 
                    onClick={closePanel} 
                    className="flex-1 py-4 border border-slate-200 rounded-xl font-bold text-slate-600 dark:text-white hover:bg-white dark:hover:bg-slate-800 transition-colors"
                  >
                    {t("expense_types.cancel")}
                  </button>
                  <button 
                    onClick={handleSave} 
                    className="flex-1 py-4 bg-emerald-500 dark:bg-primary font-bold rounded-xl text-white dark:text-slate-900 shadow-lg shadow-emerald-500/20 active:scale-95 transition-transform"
                  >
                    {t("expense_types.save")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseType;