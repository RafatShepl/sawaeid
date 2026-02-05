import { MdEdit, MdDelete } from "react-icons/md";
import { Button } from "@/components/ui/button";
import DeleteConfirm from "./DeleteConfirm"; 

const DataActions = ({ onEdit, onDelete }) => {
  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon"
        onClick={onEdit}
        className="h-8 w-8 text-gray-400 hover:text-emerald-600"
      >
        <MdEdit size={18} />
      </Button>

      {/* Wrap ONLY the delete button */}
      <DeleteConfirm onConfirm={onDelete}>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-400 hover:text-red-500"
        >
          <MdDelete size={18} />
        </Button>
      </DeleteConfirm>
    </div>
  );
};
export default  DataActions;