"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateStudent } from "@/actions/student";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setPathname } from "@/lib/features/pathname/pathnameSlice";
import { divisions, grades, shifts } from "@/constants/data";
import { ClassroomSchema, StudentSchema } from "@/lib/zod";

type Classroom = z.infer<typeof ClassroomSchema>;

interface StudentCreateFormProps {
  classroom: Classroom;
}

export default function StudentCreateForm({
  classroom,
}: StudentCreateFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof StudentSchema>>({
    resolver: zodResolver(StudentSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  const classroomName =
    grades.find((g) => g.value === classroom.grade)?.label +
    " " +
    divisions.find((d) => d.value === classroom.division)?.label +
    " " +
    shifts.find((s) => s.value === classroom.shift)?.label;

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(
      setPathname(`Administración/Grados/${classroomName}/Alumnos/Crear`)
    );
  }, [dispatch, classroomName]);

  function onSubmit(values: z.infer<typeof StudentSchema>) {
    startTransition(() => {
      CreateStudent(values, classroom.id || "").then((response) => {
        if (response.success) {
          toast.success(response.message);
          router.push(`/administration/classrooms/${classroom.id}/students`);
        } else {
          toast.error(response.message);
        }
      });
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crear Alumno</CardTitle>
        <CardDescription>
          Utilice Tabs para navegar más rápido entre los campos.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nombre (requerido)"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Apellido</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Apellido (requerido)"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end space-x-4 mt-8">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="h-8"
                disabled={isPending}
              >
                <Link
                  href={`/administration/classrooms/${classroom.id}/students`}
                >
                  Cancelar
                </Link>
              </Button>
              <Button
                type="submit"
                size="sm"
                className="h-8"
                disabled={isPending}
              >
                Guardar
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
