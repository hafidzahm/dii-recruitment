import type { Table } from "@tanstack/react-table";
import { Input } from "./ui/input";
import type { TableEntity } from "@/types/table";

export default function FilterTableSearch({
  table,
}: {
  table: Table<TableEntity>;
}) {
  return (
    <Input
      placeholder="Cari nama pasien atau NIK..."
      value={table.getState().globalFilter ?? ""}
      onChange={(event) => {
        table.setGlobalFilter(event.target.value);
      }}
      className="max-w-sm"
    />
  );
}
