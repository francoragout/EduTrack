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
import Link from "next/link";
import { Pencil, Trash, User, Users } from "lucide-react";
import { grades, shifts } from "@/constants/data";
import { toast } from "sonner";
import { ClassroomSchema } from "@/lib/zod";
import { DeleteClassroom } from "@/actions/classroom";
import { useSession } from "next-auth/react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function ClassroomTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const classroom = ClassroomSchema.parse(row.original);
  const { data: session } = useSession();

  const handleDelete = async () => {
    DeleteClassroom(classroom.id || "").then((response) => {
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    });
  };

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
            <Link href={`/administration/classrooms/${classroom.id}/students`}>
              <Users className="mr-2 h-4 w-4" />
              <span>Alumnos</span>
            </Link>
          </Button>

          {session?.user?.role === "ADMIN" ? (
            <Button
              asChild
              variant="ghost"
              className="flex justify-start pl-2"
              size="sm"
            >
              <Link
                href={`/administration/classrooms/${classroom.id}/edit`}
              >
                <Pencil className="mr-2 h-4 w-4" />
                <span>Editar</span>
              </Link>
            </Button>
          ) : (
            <Button
              variant="ghost"
              className="flex justify-start pl-2"
              size="sm"
              disabled
            >
              <Pencil className="mr-2 h-4 w-4" />
              <span>Editar</span>
            </Button>
          )}

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex justify-start pl-2 w-full"
                disabled={session?.user?.role !== "ADMIN"}
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
                  permanentemente el aula:
                  {
                    <span className="text-primary">
                      {" "}
                      &apos;
                      {
                        grades.find((g) => g.value === classroom.grade)?.label
                      }{" "}
                      {classroom.division}{" "}
                      {shifts.find((s) => s.value === classroom.shift)?.label}
                      &apos;
                    </span>
                  }{" "}
                  y todos los datos asociados de nuestros servidores.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Continuar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
