import { Button } from "@/components/ui/button";
import { DATAS } from "@/datas/datas";
import { http } from "@/helpers/axios";
import type { TableEntity } from "@/types/table";
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
  type Table,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { createContext, useContext, useEffect, useState } from "react";
type ValueProps = {
  loading: boolean;
  table: Table<TableEntity>;
};
const TableContext = createContext<ValueProps | undefined>(undefined);

export function TableContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState(DATAS);
  const [loading, setLoading] = useState(false);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);

      const response = await http.get("/datas");
      console.log(response.data);
      setData(response.data);

      setTimeout(() => setLoading(false), 2000);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const columnHelper = createColumnHelper<TableEntity>();

  const columns = [
    columnHelper.accessor("name", {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nama
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("NIK", {
      header: () => "NIK",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("diagnosis", {
      header: () => "Diagnosa Masuk",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("checkin_date", {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tanggal Masuk
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: (info) => new Date(info.getValue()).toLocaleDateString("id-ID"),
    }),
    columnHelper.accessor("doctor", {
      header: () => "Dokter Penanggung Jawab",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("room", {
      header: () => "Ruangan",
      cell: (info) => info.getValue(),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const value: ValueProps = {
    loading,
    table,
  };
  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
}

export function UseTableContext() {
  const context = useContext(TableContext);
  if (context === undefined) {
    throw new Error(
      "UseTableContext must be used within a TableContext.Provider"
    );
  }
  return context;
}
