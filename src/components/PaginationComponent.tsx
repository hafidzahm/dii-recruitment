import type { Table } from "@tanstack/react-table";
import { Button } from "./ui/button";
import type { TableEntity } from "@/types/table";

export default function PaginationComponent({
  table,
}: {
  table: Table<TableEntity>;
}) {
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
