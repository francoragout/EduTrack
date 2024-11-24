"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { CreateClassroom } from "@/actions/classroom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { divisions, grades, shifts } from "@/constants/data";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { setPathname } from "@/lib/features/pathname/pathnameSlice";
import { ClassroomSchema, UserSchema } from "@/lib/zod";
import { PlusCircle } from "lucide-react";
import { useSession } from "next-auth/react";

type Preceptors = z.infer<typeof UserSchema>;

export default function ClassroomCreateForm({
  preceptors,
}: {
  preceptors: Preceptors[];
}) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof ClassroomSchema>>({
    resolver: zodResolver(ClassroomSchema),
  });

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(setPathname("Administración/Aulas/Crear"));
  }, [dispatch]);

  function onSubmit(values: z.infer<typeof ClassroomSchema>) {
    startTransition(() => {
      setOpen(false);
      CreateClassroom(values).then((response) => {
        if (response.success) {
          toast.success(response.message);
          form.reset();
        } else {
          toast.error(response.message);
        }
      });
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="h-8"
          size="sm"
          disabled={session?.user?.role !== "ADMIN"}
        >
          <PlusCircle className="flex sm:hidden h-4 w-4" />
          <span className="hidden sm:flex">Agregar Aula</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Aula</DialogTitle>
          <DialogDescription>
            Utilice Tabs para navegar más rápido entre los campos.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="grade"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Grado</FormLabel>
                  <Select onValueChange={field.onChange} disabled={isPending}>
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <SelectValue placeholder="Seleccionar grado (requerido)" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {grades.map((grade) => (
                          <SelectItem key={grade.value} value={grade.value}>
                            {grade.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="division"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>División</FormLabel>
                  <Select onValueChange={field.onChange} disabled={isPending}>
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <SelectValue placeholder="Seleccionar división (requrido)" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {divisions.map((division) => (
                          <SelectItem
                            key={division.value}
                            value={division.value}
                          >
                            {division.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shift"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Turno</FormLabel>
                  <Select onValueChange={field.onChange} disabled={isPending}>
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <SelectValue placeholder="Seleccionar turno (requerido)" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {shifts.map((shift) => (
                          <SelectItem key={shift.value} value={shift.value}>
                            {shift.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Preceptor</FormLabel>
                  <Select onValueChange={field.onChange} disabled={isPending}>
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <SelectValue placeholder="Preceptor (opcional)" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {preceptors.map((preceptor) => (
                          <SelectItem
                            key={preceptor.id}
                            value={preceptor.id || ""}
                          >
                            {preceptor.email}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-4 pt-2 sm:space-x-0">
              <DialogClose asChild>
                <Button
                  className="h-8"
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => form.reset()}
                  disabled={isPending}
                >
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                type="submit"
                size="sm"
                className="h-8"
                disabled={isPending}
              >
                Guardar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
