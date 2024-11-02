"use client";

import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AttendanceSchema } from "@/lib/zod";
import { MoreHorizontal, Trash } from "lucide-react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function AttendanceTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const attendance = AttendanceSchema.parse(row.original);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex flex-col">
          {/* <TaskEditForm task={task} /> */}
          <Button
            variant="ghost"
            className="flex justify-start pl-2"
            // onClick={handleDelete}
            size="sm"
          >
            <Trash className="mr-2 h-4 w-4" />
            <span>Eliminar</span>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
