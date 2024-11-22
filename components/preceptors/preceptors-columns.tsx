"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { z } from "zod";
import { PersonIcon } from "@radix-ui/react-icons";
import { grades, divisions, shifts } from "@/constants/data";
import { PreceptorTableRowActions } from "./preceptor-table-row-actions";
import { UserSchema } from "@/lib/zod";

type User = z.infer<typeof UserSchema>;

export const PreceptorsColumns: ColumnDef<User>[] = [
  {
    accessorKey: "image",
    header: () => <div className="sr-only">Image</div>,
    cell: ({ row }) => {
      const image = row.getValue("image") as string;
      return (
        <Avatar>
          <AvatarImage src={image} alt="avatar" />
          <AvatarFallback className="bg-secondary">
            <PersonIcon />
          </AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
    cell: ({ row }) => <div>{row.getValue("firstName")}</div>,
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Apellido" />
    ),
    cell: ({ row }) => <div>{row.getValue("lastName")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Teléfono" />
    ),
    cell: ({ row }) => <div>{row.getValue("phone")}</div>,
  },
  {
    accessorKey: "classrooms",
    header: () => <div className="text-left">Aulas</div>,
    cell: ({ row }) => {
      const classroomsData = row.getValue("classrooms") as {
        division: string;
        grade: string;
        shift: string;
      }[];
      return (
        <div>
          {classroomsData.map((classroom, index) => (
            <div key={index}>
              {grades.find((g) => g.value === classroom.grade)?.label}{" "}
              {divisions.find((d) => d.value === classroom.division)?.label}{" "}
              {shifts.find((s) => s.value === classroom.shift)?.label}
            </div>
          ))}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <PreceptorTableRowActions row={row} />,
  },
];
