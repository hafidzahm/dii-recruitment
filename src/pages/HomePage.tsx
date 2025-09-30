import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DATAS } from "@/datas/datas";
import type { TableEntity } from "@/types/table";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import { useState } from "react";
import { http } from "@/helpers/axios";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowUpDown, CalendarIcon } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useNavigate } from "react-router";
import HealthForm from "@/components/ui/HealthForm/HealthForm";

// ====================================

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

export default function HomePage() {
  const [data, setData] = useState(DATAS);
  const [loading, setLoading] = useState(false);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
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
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="w-full h-screen">
      <div className="max-w-5xl m-auto">
        <div className="p-5">
          <h1 className="text-3xl">Pasien Masuk Rawat Inap</h1>
        </div>
        <div className="p-2">
          <Input
            placeholder="Cari nama pasien atau NIK..."
            value={table.getState().globalFilter ?? ""}
            onChange={(event) => {
              table.setGlobalFilter(event.target.value);
            }}
            className="max-w-sm"
          />
          {/* FORMULIR */}
          <HealthForm />
          {/*  */}
        </div>
      </div>

      {!loading ? (
        <div className="overflow-hidden rounded-md border max-w-5xl m-auto">
          {/* TABEL */}
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
                  Hasil tidak ditemukan.
                </TableCell>
              )}
            </TableBody>
          </Table>
          {/*  */}
          {/* PAGINATION */}
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
          {/*  */}
        </div>
      ) : (
        // LOADING
        <div className="max-w-5xl m-auto text-center pt-5">
          <p>Sedang memperbarui data, harap tunggu...</p>
        </div>
      )}
    </div>
  );
}
