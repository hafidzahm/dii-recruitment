import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
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
import Header from "@/components/Header";
import LoadingComponent from "@/components/LoadingComponent";
import DataTable from "@/components/DataTable";
import PaginationComponent from "@/components/PaginationComponent";

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
          <PaginationComponent table={table} />
          {/*  */}
        </div>
      ) : (
        // LOADING
        <LoadingComponent />
      )}
    </div>
  );
}
