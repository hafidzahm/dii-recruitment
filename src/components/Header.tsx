import type { Table } from "@tanstack/react-table";
import FilterTableSearch from "./FilterTableSearch";
import HealthForm from "./ui/HealthForm/HealthForm";
import type { TableEntity } from "@/types/table";

export default function Header({ table }: { table: Table<TableEntity> }) {
  return (
    <div className="max-w-5xl m-auto">
      <div className="p-5">
        <h1 className="text-3xl">Pasien Masuk Rawat Inap</h1>
      </div>
      <div className="p-2">
        {/* Search Form */}
        <FilterTableSearch table={table} />
        {/* FORMULIR */}
        <HealthForm />
        {/*  */}
      </div>
    </div>
  );
}
