"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { GradeSchema } from "@/lib/zod";
import Link from "next/link";
import { Pencil, Trash, Users } from "lucide-react";
import { grades, shifts } from "@/constants/data";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function GradeTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const grade = GradeSchema.parse(row.original);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex flex-col">
          <Button
            asChild
            variant="ghost"
            className="flex justify-start pl-2"
            size="sm"
          >
            <Link href={`/administration/grades/${grade.id}/students`}>
              <Users className="mr-2 h-4 w-4" />
              <span>Alumnos</span>
            </Link>
          </Button>

          <Button
            asChild
            variant="ghost"
            className="flex justify-start pl-2"
            size="sm"
          >
            <Link href={`/administration/grades/${grade.id}/edit`}>
              <Pencil className="mr-2 h-4 w-4" />
              <span>Editar</span>
            </Link>
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex justify-start pl-2 w-full"
              >
                <Trash className="mr-2 h-4 w-4" />
                Eliminar
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  ¿Estas completamente seguro?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción no se puede deshacer. Esto eliminará
                  permanentemente el grado
                  {
                    <span className="text-primary">
                      {" "}
                      &apos;{
                        grades.find((g) => g.value === grade.grade)?.label
                      }{" "}
                      {grade.division}, turno{" "}
                      {shifts.find((s) => s.value === grade.shift)?.label}
                      &apos;
                    </span>
                  }{" "}
                  y todos los datos asociados de nuestros servidores.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction>Continuar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}