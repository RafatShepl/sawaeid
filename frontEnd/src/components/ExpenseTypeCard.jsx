import React from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
import DeleteConfirm from './common/DeleteConfirm';

const ExpenseTypeCard = ({ type, onEdit, onDelete }) => {
  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-primary/50 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex h-12 w-fit items-center justify-center rounded-lg bg-primary/10 text-primary">
            <span className="material-symbols-outlined text-2xl">{type.icon || 'category'}</span>
          </div>
          <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            <button 
              onClick={() => onEdit(type)}
              className="p-1.5 text-slate-400 hover:text-primary transition-colors"
            >
              <MdEdit size={20} />
            </button>

            <DeleteConfirm onConfirm={onDelete}>
            <button 
             
              className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
            >
              <MdDelete size={20} />
            </button>
            </DeleteConfirm>
          </div>
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{type.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          {type.description}
        </p>
      </div>
      <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {type.itemCount || 0} items tagged
        </span>
      </div>
    </div>
  );
};

export default ExpenseTypeCard;