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
import { GradeSchema, StudentSchema } from "@/lib/zod";
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

type Grade = z.infer<typeof GradeSchema>;

interface StudentCreateFormProps {
  gradeId: string;
  grade: Grade;
}

export default function StudentCreateForm({
  gradeId,
  grade,
}: StudentCreateFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof StudentSchema>>({
    resolver: zodResolver(StudentSchema),
    defaultValues: {
      name: "",
      lastName: "",
    },
  });

  const gradeName =
    grades.find((g) => g.value === grade.grade)?.label +
    " " +
    divisions.find((d) => d.value === grade.division)?.label +
    " " +
    shifts.find((s) => s.value === grade.shift)?.label;

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(
      setPathname(`Administración/Grados/${gradeName}/Estudiantes/Crear`)
    );
  }, [dispatch, gradeName]);

  function onSubmit(values: z.infer<typeof StudentSchema>) {
    startTransition(() => {
      CreateStudent(values, gradeId).then((response) => {
        if (response.success) {
          toast.success(response.message);
          router.push(`/administration/grades/${gradeId}/students`);
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
                name="name"
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
                <Link href={`/administration/grades/${gradeId}/students`}>
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
