"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { z } from "zod";
import { UserSchema } from "@/lib/zod";
import { PersonIcon } from "@radix-ui/react-icons";

type User = z.infer<typeof UserSchema>;

export const AdminsColumns: ColumnDef<User>[] = [
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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },

//   {
//     id: "actions",
//     cell: ({ row }) => <GradeTableRowActions row={row} />,
//   },
];
