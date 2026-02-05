import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const DataTable = ({ 
  columns, 
  data, 
  loading, 
  renderCard, // A function to render the mobile card view
  renderRow   // A function to render the desktop table row
}) => {
  const { t } = useTranslation();

  // 1. Loading State
  if (loading) {
    return (
      <div className="w-full py-24 flex flex-col items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
        <p className="mt-4 text-gray-500 font-medium">{t("common.loading")}</p>
      </div>
    );
  }

  // 2. Empty State
  if (!data || data.length === 0) {
    return (
      <div className="w-full py-24 text-center text-gray-400 font-medium">
        {t("common.no_records")}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* MOBILE VIEW (Cards) - Hidden on Medium Screens and up */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {data.map((item, index) => (
          <Card key={item._id || index} className="overflow-hidden border-gray-100 dark:border-gray-800">
            <CardContent className="p-0">
              {renderCard(item)}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* DESKTOP VIEW (Table) - Hidden on Mobile */}
      <div className="hidden md:block rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1a2e21] overflow-hidden">
        <Table className="table-fixed w-full">
          <TableHeader className="bg-gray-50 dark:bg-[#233829]">
            <TableRow>
              {columns.map((col, idx) => (
                <TableHead 
                  key={idx} 
                  className={`font-bold text-gray-600 dark:text-gray-300 uppercase text-xs tracking-wider ${col.className}`}
                >
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-50 dark:divide-gray-800">
            {data.map((item, index) => (
              <TableRow key={item._id || index} className="hover:bg-gray-50/50 dark:hover:bg-white/5 border-none">
                {renderRow(item)}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;