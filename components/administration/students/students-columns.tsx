"use client";

import { ColumnDef } from "@tanstack/react-table";
// import { Badge } from "@/components/ui/badge"
// import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { DataTableRowActions } from "./student-table-row-actions";
import { z } from "zod";
import { StudentSchema } from "@/lib/zod";

type Student = z.infer<typeof StudentSchema>;

export const StudentsColumns: ColumnDef<Student>[] = [
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Apellido" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("lastName")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "dateOfBirth",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nacimiento" />
    ),
    cell: ({ row }) => {
      const dateOfBirth = row.getValue("dateOfBirth") as Date;
      return (
        <div className="font-medium">
          {dateOfBirth.toLocaleDateString("es-AR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      );
    }
  },
  {
    accessorKey: "attendance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Asistencia" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
