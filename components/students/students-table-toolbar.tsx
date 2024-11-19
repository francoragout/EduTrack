"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { CalendarX2, ClockAlert, PlusCircle, Trash } from "lucide-react";
import { z } from "zod";
import { CreateAbsent } from "@/actions/attendance";
import { toast } from "sonner";
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

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  classroomId: string;
}

export function StudentsTableToolbar<TData>({
  table,
  classroomId,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const isSomeRowsSelected =
    table.getIsSomeRowsSelected() || table.getIsAllPageRowsSelected();

  const handleAbsentSelected = () => {
    const selectedRows = table.getSelectedRowModel().rows;
    const studentIds = selectedRows.map(
      (row) => (row.original as { id: string }).id
    );
    CreateAbsent(studentIds, classroomId).then((response) => {
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    });
  };

  const handleLateSelected = () => {
    const selectedRows = table.getSelectedRowModel().rows;

    console.log("Selected rows to delete:", selectedRows);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filtrar alumnos..."
          value={
            (table.getColumn("lastName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("lastName")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reiniciar
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex space-x-4">
        {isSomeRowsSelected && (
          <>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 flex">
                  <CalendarX2 className="flex h-4 w-4" />
                  <span className="hidden sm:flex">Ausente</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Confirmar ausencia de los siguientes alumnos:
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    <div className="flex flex-col">
                      {table.getSelectedRowModel().rows.map((row) => (
                        <span key={row.id}>
                          {
                            (
                              row.original as {
                                firstName: string;
                                lastName: string;
                              }
                            ).firstName
                          }{" "}
                          {
                            (
                              row.original as {
                                firstName: string;
                                lastName: string;
                              }
                            ).lastName
                          }
                        </span>
                      ))}
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleAbsentSelected}>
                    Continuar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button
              variant="outline"
              size="sm"
              className="h-8 flex"
              onClick={handleLateSelected}
            >
              <ClockAlert className="flex h-4 w-4" />
              <span className="hidden sm:flex">Tarde</span>
            </Button>
          </>
        )}
        <Button size="sm" className="h-8 flex" asChild>
          <Link
            href={`/administration/classrooms/${classroomId}/students/create`}
          >
            <PlusCircle className="flex sm:hidden h-4 w-4" />
            <span className="hidden sm:flex">Nuevo alumno</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
