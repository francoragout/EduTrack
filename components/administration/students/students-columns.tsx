"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { StudentsTableRowActions } from "./student-table-row-actions";
import { z } from "zod";
import { StudentSchema } from "@/lib/zod";

type Student = z.infer<typeof StudentSchema>;

export const StudentsColumns: ColumnDef<Student>[] = [
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Apellido" />
    ),
    cell: ({ row }) => <div>{row.getValue("lastName")}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "attendance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Asistencia" />
    ),
    cell: ({ row }) => {
      const attendance = row.original.attendance ?? [];
      const absent = attendance.filter((a) => a.status === "ABSENT").length;
      const late = attendance.filter((a) => a.status === "LATE").length / 2;
      const totalAbsences = absent + late;
      const totalAllowedAbsences = 15;
      const attendancePercentage =
        100 - (totalAbsences / totalAllowedAbsences) * 100;

      return <div>{attendancePercentage.toFixed(1)}%</div>;
    },
  },
  {
    accessorKey: "absent",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ausente" />
    ),
    cell: ({ row }) => {
      const attendance = row.original.attendance ?? [];
      const absent = attendance.filter((a) => a.status === "ABSENT").length;

      return <div>{absent}</div>;
    },
  },
  {
    accessorKey: "late",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tarde" />
    ),
    cell: ({ row }) => {
      const attendance = row.original.attendance ?? [];
      const late = attendance.filter((a) => a.status === "LATE").length;
      return <div>{late}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <StudentsTableRowActions row={row} />,
  },
];
