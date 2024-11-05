"use client";

import { Table } from "@tanstack/react-table";
import AttendanceCreateForm from "./attendance-create-form";
import { DataTableFacetedFilter } from "@/components/data-table-faceted-filter";
import { statuses } from "@/constants/data";
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
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Estado"
            options={statuses}
          />
        )}
      </div>
      <div className="flex space-x-4">
        <AttendanceCreateForm studentId={studentId} gradeId={gradeId} />
      </div>
    </div>
  );
}
