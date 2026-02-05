import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useTranslation } from "react-i18next";

const DeleteConfirm = ({ children, onConfirm }) => {
  const { t } = useTranslation();

  return (
    <AlertDialog>
      {/* The trigger is the trash icon button from DataActions */}
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      
      <AlertDialogContent className="rounded-2xl border-none dark:bg-[#1a2e21]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold dark:text-white">
            {t("common.are_you_sure")}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-500 dark:text-gray-400">
            {t("common.delete_warning")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel className="rounded-xl border-gray-200 dark:border-gray-700 dark:text-white">
            {t("common.cancel")}
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="rounded-xl bg-red-500 hover:bg-red-600 text-white border-none"
          >
            {t("common.delete")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirm;