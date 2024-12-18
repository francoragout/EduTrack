"use client";

import { DataTableFacetedFilter } from "@/components/data-table-faceted-filter";
import { Button } from "@/components/ui/button";
import { divisions, grades, shifts } from "@/constants/data";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import ClassroomCreateForm from "./classroom-create-form";
import { UserSchema } from "@/lib/zod";
import { z } from "zod";

type Preceptors = z.infer<typeof UserSchema>;
interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  preceptors: Preceptors[];
}

export function ClassroomsTableToolbar<TData>({
  table,
  preceptors,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-4">
        {table.getColumn("grade") && (
          <DataTableFacetedFilter
            column={table.getColumn("grade")}
            title="Grado"
            options={grades}
          />
        )}
        {table.getColumn("division") && (
          <DataTableFacetedFilter
            column={table.getColumn("division")}
            title="División"
            options={divisions}
          />
        )}
        {table.getColumn("shift") && (
          <DataTableFacetedFilter
            column={table.getColumn("shift")}
            title="Turno"
            options={shifts}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reiniciar
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex">
        <ClassroomCreateForm preceptors={preceptors}/>
      </div>
    </div>
  );
}
