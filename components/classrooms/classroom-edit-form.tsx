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

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { UpdateClassroom } from "@/actions/classroom";
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
import { ClassroomSchema, UserSchema } from "@/lib/zod";
import { Pencil } from "lucide-react";
import { useState, useEffect, useTransition } from "react";
import { GetPreceptors } from "@/actions/preceptor";
import { useSession } from "next-auth/react";

type Classroom = z.infer<typeof ClassroomSchema>;
type Preceptor = z.infer<typeof UserSchema>;

interface ClassroomEditFormProps {
  classroom: Classroom;
}

export default function ClassroomEditForm({
  classroom,
}: ClassroomEditFormProps) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [preceptors, setPreceptors] = useState<Preceptor[]>([]);
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof ClassroomSchema>>({
    resolver: zodResolver(ClassroomSchema),
    defaultValues: {
      grade: classroom.grade,
      division: classroom.division,
      shift: classroom.shift,
      userId: classroom.userId,
    },
  });

  function onSubmit(values: z.infer<typeof ClassroomSchema>) {
    startTransition(() => {
      setOpen(false);
      UpdateClassroom(values, classroom.id ?? "").then((response) => {
        if (response.success) {
          toast.success(response.message);
          form.reset();
        } else {
          toast.error(response.message);
        }
      });
    });
  }

  useEffect(() => {
    const fetchPreceptors = async () => {
      const preceptors = await GetPreceptors();
      setPreceptors(preceptors);
    };

    fetchPreceptors();
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex justify-start pl-2 w-full"
          disabled={session?.user?.role !== "ADMIN"}
        >
          <Pencil className="mr-2 h-4 w-4" />
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Aula</DialogTitle>
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
                  <Select
                    onValueChange={field.onChange}
                    disabled={isPending}
                    value={field.value || ""}
                  >
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
                  <Select
                    onValueChange={field.onChange}
                    disabled={isPending}
                    value={field.value || ""}
                  >
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
                  <Select
                    onValueChange={field.onChange}
                    disabled={isPending}
                    value={field.value || ""}
                  >
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
                  <Select
                    onValueChange={field.onChange}
                    disabled={isPending}
                    defaultValue={field.value || ""}
                  >
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
