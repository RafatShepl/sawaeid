import React from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";
import DataActions from "./DataActions";

const GeneralCard = ({ title, subtitle, value, badge, onEdit, onDelete }) => {
  return (
    <Card className="border-none bg-white dark:bg-[#1a2e21] shadow-sm overflow-hidden m-0">
      {/* !p-3 forces the padding to 12px and overrides shadcn defaults */}
      <CardContent className="!p-3 flex flex-col gap-2"> 
        
        {/* Top Row: Badge and Date */}
        <div className="flex justify-between items-center">
          <Badge className="text-[10px] px-2 py-0 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-none">
            {badge}
          </Badge>
          <span className="text-[10px] text-gray-400 font-medium">{subtitle}</span>
        </div>
        
        {/* Bottom Row: Info and Actions */}
        <div className="flex justify-between items-center">
          <div className="flex-1 min-w-0">
            <h4 className="text-gray-900 dark:text-white font-bold text-sm truncate leading-none">
              {title}
            </h4>
            <p className="text-lg font-black text-emerald-600 dark:text-emerald-400 mt-1 leading-none">
              {value}
            </p>
          </div>
          
          <div className="flex-shrink-0 -mr-2">
             {/* We use a negative margin here to keep the buttons aligned to the edge */}
             <DataActions onEdit={onEdit} onDelete={onDelete} />
          </div>
        </div>

      </CardContent>
    </Card>
  );
};

export default GeneralCard;