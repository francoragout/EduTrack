"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { z } from "zod";
import { TutorSchema } from "@/lib/zod";
import { TutorTableRowActions } from "./tutor-table-row-actions";

type Tutor = z.infer<typeof TutorSchema>;

export const TutorsColumns: ColumnDef<Tutor>[] = [
  // {
  //   accessorKey: "image",
  //   header: () => <div className="sr-only">Image</div>,
  //   cell: ({ row }) => {
  //     const image = row.getValue("image") as string;
  //     return (
  //       <Avatar>
  //         <AvatarImage src={image} alt="avatar" />
  //         <AvatarFallback className="bg-secondary">
  //           <PersonIcon />
  //         </AvatarFallback>
  //       </Avatar>
  //     );
  //   },
  // },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
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
    id: "actions",
    cell: ({ row }) => <TutorTableRowActions row={row} />,
  },
];
