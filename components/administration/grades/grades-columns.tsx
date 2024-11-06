"use client";

import { ColumnDef } from "@tanstack/react-table";
// import { Badge } from "@/components/ui/badge"
// import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { z } from "zod";
import { GradeSchema } from "@/lib/zod";
import { GradeTableRowActions } from "./grade-table-row-actions";
import { divisions, grades, shifts } from "@/constants/data";

type Grade = z.infer<typeof GradeSchema>;

export const GradesColumns: ColumnDef<Grade>[] = [
  {
    accessorKey: "grade",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Grado" />
    ),
    cell: ({ row }) => {
      const grade = grades.find(
        (grade) => grade.value === row.getValue("grade")
      );

      if (!grade) {
        return null;
      }

      return (
        <div className="flex items-center">
          <span>{grade.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "division",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="División" />
    ),
    cell: ({ row }) => {
      const division = divisions.find(
        (division) => division.value === row.getValue("division")
      );

      if (!division) {
        return null;
      }

      return (
        <div className="flex items-center">
          <span>{division.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "shift",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Turno" />
    ),
    cell: ({ row }) => {
      const shift = shifts.find(
        (shift) => shift.value === row.getValue("shift")
      );

      if (!shift) {
        return null;
      }

      return (
        <div className="flex items-center">
          <span>{shift.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "students",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Alumnos" />
    ),
    cell: ({ row }) => {
      const students = row.getValue("students") as Array<any>;
      return (
        <div className="flex items-center">
          <span>{students.length}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "preceptor",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Preceptor" />
    ),
    cell: ({ row }) => {
      const preceptor = row.getValue("preceptor") as any;
      return (
        <div className="flex items-center">
          <span>{preceptor?.name}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <GradeTableRowActions row={row} />,
  },
];