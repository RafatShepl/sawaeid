import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MdClose } from "react-icons/md";

const AddExpenseModal = ({
  isOpen,
  onClose,
  onSuccess,
  mode = "add",
  initialData = null,
}) => {
  const { t } = useTranslation();
  const [types, setTypes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialState = {
    amount: "",
    date: new Date().toISOString().split("T")[0],
    type: "",
    reason: "",
  };

  const [formData, setFormData] = useState(initialState);

  // Reset form and close
  const handleClose = () => {
    setFormData(initialState);
    onClose();
  };

  // Prefill when editing
  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && initialData) {
        setFormData({
          amount: initialData.amount,
          date: initialData.date?.split("T")[0],
          type: initialData.type?._id || "",
          reason: initialData.reason,
        });
      } else {
        setFormData(initialState);
      }
    }
  }, [mode, initialData, isOpen]);

  // Fetch Categories
  useEffect(() => {
    if (isOpen) {
      fetch("http://localhost:5000/api/expense-types", { credentials: "include" })
        .then((res) => res.json())
        .then((result) => result.success && setTypes(result.data))
        .catch(console.error);
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = mode === "edit"
          ? `http://localhost:5000/api/expenses/${initialData._id}`
          : "http://localhost:5000/api/expenses";

      const res = await fetch(url, {
        method: mode === "edit" ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (result.success) {
        onSuccess();
        handleClose(); // Resets form and closes modal
      }
    } catch (err) {
      console.error("Submit error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#233829] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none transition-all";
  const labelClass = "block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1.5 ml-1";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-lg bg-white dark:bg-[#1a2e21] rounded-3xl shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center px-8 py-6 border-b dark:border-gray-800">
          <h3 className="text-2xl font-black">
            {mode === "edit" ? t("expenses.table.actions") : t("expenses.add_btn")}
          </h3>
          <button onClick={handleClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <MdClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div>
            <label className={labelClass}>{t("expenses.table.amount")}</label>
            <input type="number" required className={inputClass} placeholder="0.00" value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })} />
          </div>

          <div>
            <label className={labelClass}>{t("expenses.table.date")}</label>
            <input type="date" required className={inputClass} value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
          </div>

          <div>
            <label className={labelClass}>{t("expenses.table.category")}</label>
            <select required className={inputClass} value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
              <option value="">{t("expenses.all_categories")}</option>
              {types.map((t) => <option key={t._id} value={t._id}>{t.name}</option>)}
            </select>
          </div>

          <div>
            <label className={labelClass}>{t("expenses.table.description")}</label>
            <textarea required rows="3" className={inputClass} placeholder={t("expenses.search_placeholder")} value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })} />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={handleClose} className="px-6 py-2.5 font-bold text-gray-500 hover:text-gray-700">{t("Cancel")}</button>
            <button type="submit" disabled={isSubmitting} className="px-8 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-lg disabled:opacity-50">
              {isSubmitting ? "..." : mode === "edit" ? t("expenses.table.actions") : t("expenses.add_btn")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseModal;