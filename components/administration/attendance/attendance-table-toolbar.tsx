"use client";

import { Table } from "@tanstack/react-table";
import AttendanceCreateForm from "./attendance-create-form";
import { DataTableFacetedFilter } from "@/components/data-table-faceted-filter";
import { statuses } from "@/constants/data";
import { z } from "zod";
import { StudentSchema } from "@/lib/zod";

type Student = z.infer<typeof StudentSchema>;
interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  student: Student;
}

export function AttendanceTableToolbar<TData>({
  table,
  student,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Estado"
            options={statuses}
          />
        )}
      </div>
      <div className="flex space-x-4">
        <AttendanceCreateForm student={student} />
      </div>
    </div>
  );
}
