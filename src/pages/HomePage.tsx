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

const formSchema = z.object({
  name: z
    .string()
    .min(3, { error: "Field nama diperlukan, isi minimal 3 karakter." }),
  NIK: z
    .string()
    .min(16, { error: "Field NIK diperlukan, isi 16 karakter." })
    .max(16, { error: "Field NIK diperlukan, isi 16 karakter." }),
  diagnosis: z.string().min(5, {
    error: "Field diagnosa masuk diperlukan, isi minimal 5 karakter.",
  }),
  checkin_date: z.date({ error: "Field tanggal masuk diperlukan." }),
  doctor: z.string().min(5, {
    error: "Field dokter penanggung jawab diperlukan, isi minimal 5 karakter.",
  }),
  room: z.string().min(1, { error: "Field ruangan diperlukan." }),
});

export function HealthForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      NIK: "",
      diagnosis: "",
      checkin_date: undefined,
      doctor: "",
      room: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Tambah Pasien Masuk</Button>
      </DialogTrigger>

      <Form {...form}>
        <DialogContent className="sm:max-w-2xl">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Formulir pasien masuk</DialogTitle>
              <DialogDescription>
                Masukkan data-data pasien baru disini. Cek kembali sebelum
                submit.
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-90">
              <div className="grid gap-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Input nama pasien disini..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="NIK"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>NIK</FormLabel>
                      <FormControl>
                        <Input placeholder="320......" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="diagnosis"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Diagnosa Masuk</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Input diagnosa disini..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="checkin_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Tanggal Masuk</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                new Date(field.value).toLocaleDateString(
                                  "id-ID"
                                )
                              ) : (
                                <span>Ambil tanggal</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="doctor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dokter Penanggung Jawab</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Input dokter penanggungjawab disini..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="room"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ruangan</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Input ruangan pasien disini..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </ScrollArea>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Keluar</Button>
              </DialogClose>
              <Button type="submit">Tambahkan data</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  );
}

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
      {/* FORMULIR */}
      <HealthForm />
      {/*  */}

      {!loading ? (
        <div className="overflow-hidden rounded-md border">
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
        <p>loading...</p>
      )}
    </div>
  );
}
