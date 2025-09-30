import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DATAS } from "@/datas/datas";
import type { TableEntity } from "@/types/table";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import { useState } from "react";
import { http } from "@/helpers/axios";
import { Input } from "@/components/ui/input";

const columnHelper = createColumnHelper<TableEntity>();

const columns = [
  columnHelper.accessor("name", {
    header: () => "Nama",
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
    header: () => "Tanggal Masuk",
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

export default function HomePage() {
  const [data, setData] = useState(DATAS);
  const [loading, setLoading] = useState(false);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  useState(() => {
    fetchData();
  });

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
  const table = useReactTable({
    data,
    columns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  return (
    <div>
      <h1>data table here</h1>
      <Input
        placeholder="Cari nama pasien atau NIK..."
        value={table.getState().globalFilter ?? ""}
        onChange={(event) => {
          table.setGlobalFilter(event.target.value);
        }}
        className="max-w-sm"
      />
      {!loading ? (
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              )}
            </TableBody>
          </Table>
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previoustable
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}
