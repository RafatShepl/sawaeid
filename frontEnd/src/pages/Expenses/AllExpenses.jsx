import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { 
  MdAdd, 
  MdSearch, 
  MdFilterList, 
  MdCalendarToday 
} from "react-icons/md";

// Shadcn UI Components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

// Custom General Components
import DataTable from "../../components/common/DataTable";
import GeneralCard from "../../components/common/GeneralCard";
import Pagination from "../../components/common/Pagination";
import DataActions from "../../components/common/DataActions";
import AddExpenseModal from "../../components/AddExpenseModal";

// Logic & Hooks
import { useHttp } from "../../hooks/useHttp";

const AllExpenses = () => {
  const { t } = useTranslation();
  const { loading, get, del } = useHttp();

  // ===================== STATE =====================
  const [expenses, setExpenses] = useState([]);
  const [types, setTypes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const [filters, setFilters] = useState({ 
    page: 1, 
    limit: 10, 
    type: "", 
    startDate: "", 
    endDate: "",
    search: "" 
  });
  
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });

  // ===================== API ACTIONS =====================
  const fetchExpenses = async () => {
    try {
      const res = await get("/expenses", filters);
      if (res?.success) {
        setExpenses(res.data || []);
        setPagination({ total: res.total, totalPages: res.totalPages });
      }
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  const fetchTypes = async () => {
    const res = await get("/expense-types");
    if (res?.success) setTypes(res.data || []);
  };

  useEffect(() => { fetchExpenses(); }, [filters]);
  useEffect(() => { fetchTypes(); }, []);

  const handleDelete = async (id) => {
    try {
      await del(`/expenses/${id}`);
      fetchExpenses();
    } catch (err) { }
  };

 // ===================== TABLE CONFIG (Balanced) =====================
const columns = [
  // We use narrow widths for everything except the description
  { header: t("expenses.table.date"), className: "w-[20%] text-left" },
  { header: t("expenses.table.category"), className: "w-[20%]  text-left" },
  { header: t("expenses.table.description"), className: " w-[20%] text-left" }, 
  { header: t("expenses.table.amount"), className: "w-[20%]  text-left" },
  { header: t("expenses.table.actions"), className: " w-[20%]  text-center" },
];

const renderRow = (item) => (
  <>
    {/* Date Column: Fixed & Narrow */}
    <TableCell className="w-[20%]  text-left py-4 whitespace-nowrap text-gray-500">
      {new Date(item.date).toLocaleDateString("en-GB", { day: '2-digit', month: 'short' })}
    </TableCell>

    {/* Category Column: Fixed & Narrow */}
    <TableCell className="w-[20%]  text-left py-4">
      <span className="px-3 py-1 rounded-lg text-[10px] font-bold uppercase bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
        {item.type?.name}
      </span>
    </TableCell>

    {/* Description Column: FLEXIBLE (This closes the gap) */}
    <TableCell className=" w-[20%] text-left py-4 font-medium overflow-hidden">
      <p className="truncate text-gray-900 dark:text-white">
        {item.reason}
      </p>
    </TableCell>

    {/* Amount Column: Fixed */}
    <TableCell className="w-[20%]  text-left py-4 font-black">
      ${Number(item.amount).toLocaleString()}
    </TableCell>

    {/* Actions Column: Fixed */}
    <TableCell className=" w-[15%] px-20 text-center py-4">
      <DataActions 
        onEdit={() => { setEditingExpense(item); setIsModalOpen(true); }} 
        onDelete={() => handleDelete(item._id)} 
      />
    </TableCell>
  </>
);
  const renderCard = (item) => (
    <GeneralCard
      title={item.reason}
      subtitle={new Date(item.date).toLocaleDateString("en-GB")}
      value={`$${Number(item.amount).toLocaleString()}`}
      badge={item.type?.name}
      onEdit={() => { setEditingExpense(item); setIsModalOpen(true); }}
      onDelete={() => handleDelete(item._id)}
    />
  );

  return (
    <div className="w-full max-w-[1250px] px-4 md:px-6 py-6 md:py-10 flex flex-col gap-6 md:gap-8 mx-auto antialiased">
      
      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-gray-900 dark:text-white text-3xl md:text-4xl font-black tracking-tight">{t("expenses.title")}</h1>
          <p className="text-gray-500 mt-1 font-medium">{t("expenses.subtitle")}</p>
        </div>
        <Button 
          onClick={() => { setEditingExpense(null); setIsModalOpen(true); }} 
          className="w-full bg-green-400 md:w-auto h-12 rounded-xl font-bold gap-2 shadow-emerald-500/20 shadow-lg active:scale-95 transition-transform"
        >
          <MdAdd size={24} /> {t("expenses.add_btn")}
        </Button>
      </div>

      {/* 2. RESPONSIVE FILTER BAR */}
      <div className="bg-white dark:bg-[#1a2e21] p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative md:col-span-2">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <Input 
              placeholder={t("expenses.search_placeholder")} 
              className="pl-10 h-11 bg-gray-50 dark:bg-[#233829] border-none rounded-xl focus-visible:ring-1 focus-visible:ring-emerald-500"
              onChange={(e) => setFilters(p => ({ ...p, search: e.target.value, page: 1 }))}
            />
          </div>

          {/* Category */}
          <Select onValueChange={(val) => setFilters(p => ({ ...p, type: val === "all" ? "" : val, page: 1 }))}>
            <SelectTrigger className="h-11 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-none font-bold rounded-xl">
              <div className="flex items-center gap-2"><MdFilterList size={18} /><SelectValue placeholder={t("expenses.all_categories")} /></div>
            </SelectTrigger>
            <SelectContent className="rounded-xl border-gray-100 dark:border-gray-800">
              <SelectItem value="all">{t("expenses.all_categories")}</SelectItem>
              {types.map(t => <SelectItem key={t._id} value={t._id}>{t.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Date Grid Fix */}
        <div className="grid grid-cols-2 md:flex items-center gap-2 bg-gray-50 dark:bg-[#233829] p-2 rounded-xl border border-transparent focus-within:border-emerald-500/50 transition-colors">
          <div className="flex items-center gap-2 px-2 border-r border-gray-200 dark:border-gray-700 md:border-none">
            <MdCalendarToday size={16} className="text-gray-400" />
            <input type="date" className="bg-transparent text-[11px] md:text-sm outline-none w-full dark:color-scheme-dark text-gray-600 dark:text-gray-300" 
              onChange={(e) => setFilters(p => ({ ...p, startDate: e.target.value, page: 1 }))} />
          </div>
          <div className="flex items-center gap-2 px-2">
            <span className="hidden md:inline text-gray-300 mr-2">|</span>
            <input type="date" className="bg-transparent text-[11px] md:text-sm outline-none w-full dark:color-scheme-dark text-gray-600 dark:text-gray-300" 
              onChange={(e) => setFilters(p => ({ ...p, endDate: e.target.value, page: 1 }))} />
          </div>
        </div>
      </div>

      {/* 3. DATA AREA (Table & Cards inside) */}
      <div className="flex flex-col gap-6">
        <DataTable 
          columns={columns} 
          data={expenses} 
          loading={loading} 
          renderRow={renderRow} 
          renderCard={renderCard} 
        />

        {/* 4. PAGINATION (Always at bottom of data) */}
        <div className="flex justify-center md:justify-end pb-10">
          <Pagination 
            totalPages={pagination.totalPages} 
            currentPage={filters.page} 
            onPageChange={(p) => setFilters(prev => ({ ...prev, page: p }))} 
          />
        </div>
      </div>

      <AddExpenseModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingExpense(null); }}
        onSuccess={fetchExpenses}
        mode={editingExpense ? "edit" : "add"}
        initialData={editingExpense}
      />
    </div>
  );
};

export default AllExpenses;