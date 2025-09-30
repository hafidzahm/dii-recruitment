import { Input } from "./ui/input";
import { UseTableContext } from "@/contexts/TableContext";

export default function FilterTableSearch() {
  const { table } = UseTableContext();
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
