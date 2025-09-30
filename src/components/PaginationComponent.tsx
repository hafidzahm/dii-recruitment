import { Button } from "./ui/button";
import { UseTableContext } from "@/contexts/TableContext";

export default function PaginationComponent() {
  const { table } = UseTableContext();
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Sebelumnya
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Berikutnya
      </Button>
    </div>
  );
}
