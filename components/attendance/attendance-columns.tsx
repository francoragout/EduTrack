"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { z } from "zod";
import { AttendanceSchema } from "@/lib/zod";
import { AttendanceTableRowActions } from "./attendance-table-row-actions";
import { statuses } from "@/constants/data";

type Attendance = z.infer<typeof AttendanceSchema>;

export const AttendanceColumns: ColumnDef<Attendance>[] = [
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha" />
    ),
    cell: ({ row }) => {
        const date = row.getValue("createdAt") as Date;
        return (
            <div>
            {date.toLocaleDateString("es-AR", {
                year: "numeric",
                month: "long",
                day: "numeric",
            })}
            </div>
        );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estado" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return <div className="flex items-center">{status.label}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    id: "actions",
    cell: ({ row }) => <AttendanceTableRowActions row={row} />,
  },
];
