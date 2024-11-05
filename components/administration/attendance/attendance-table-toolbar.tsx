"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import AttendanceCreateForm from "./attendance-create-form";
// import { DataTableFacetedFilter } from "@/components/data-table-faceted-filter"

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  studentId: string;
  gradeId: string;
}

export function AttendanceTableToolbar<TData>({
  table,
  studentId,
  gradeId,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
      </div>
      <div className="flex space-x-4">
        <AttendanceCreateForm studentId={studentId} gradeId={gradeId}/>
      </div>
    </div>
  );
}
