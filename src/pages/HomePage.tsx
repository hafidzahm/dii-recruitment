import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
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
  type Table as TableType,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
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
import { UseTableContext } from "@/contexts/TableContext";

// ====================================

export default function HomePage() {
  const { table, loading } = UseTableContext();

  return (
    <div className="w-full h-screen">
      <Header table={table} />
      {!loading ? (
        <div className="overflow-hidden rounded-md border max-w-5xl m-auto">
          {/* TABEL */}
          <DataTable table={table} />
          {/*  */}
          {/* PAGINATION */}
          <PaginationButton table={table} />
          {/*  */}
        </div>
      ) : (
        // LOADING
        <LoadingComponent />
      )}
    </div>
  );
}

function Header({ table }: { table: TableType<TableEntity> }) {
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

function LoadingComponent() {
  return (
    <div className="max-w-5xl m-auto text-center pt-5">
      <p>Sedang memperbarui data, harap tunggu...</p>
    </div>
  );
}

function FilterTableSearch({ table }: { table: TableType<TableEntity> }) {
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

function DataTable({ table }: { table: TableType<TableEntity> }) {
  return (
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
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableCell colSpan={columns.length} className="h-24 text-center">
            Hasil tidak ditemukan.
          </TableCell>
        )}
      </TableBody>
    </Table>
  );
}

function PaginationButton({ table }: { table: TableType<TableEntity> }) {
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
