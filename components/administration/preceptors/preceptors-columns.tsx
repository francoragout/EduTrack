"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { z } from "zod";
import { PreceptorSchema, UserSchema } from "@/lib/zod";
import { PersonIcon } from "@radix-ui/react-icons";
import { grades, divisions, shifts } from "@/constants/data";

type Preceptor = z.infer<typeof PreceptorSchema>;

export const PreceptorsColumns: ColumnDef<Preceptor>[] = [
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
    accessorKey: "grades",
    header: () => <div className="text-left">Grados</div>,
    cell: ({ row }) => {
      const gradesData = row.getValue("grades") as { division: string; grade: string; shift: string }[];
      return (
        <div>
          {gradesData.map((grade, index) => (
            <div key={index}>
              {grades.find(g => g.value === grade.grade)?.label}{" "}
              {divisions.find(d => d.value === grade.division)?.label}{" "}
              {shifts.find(s => s.value === grade.shift)?.label}
            </div>
          ))}
        </div>
      );
    },
  }
  

//   {
//     id: "actions",
//     cell: ({ row }) => <GradeTableRowActions row={row} />,
//   },
];
