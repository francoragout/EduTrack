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
import { GradeSchema } from "@/lib/zod";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";

import Link from "next/link";
import { CreateGrade } from "@/actions/grade";
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

export default function GradeCreateForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof GradeSchema>>({
    resolver: zodResolver(GradeSchema),
  });

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(setPathname("Administración/Grados/Crear"));
  }, [dispatch]);

  function onSubmit(values: z.infer<typeof GradeSchema>) {
    startTransition(() => {
      CreateGrade(values).then((response) => {
        if (response.success) {
          toast.success(response.message);
          router.push("/administration/grades");
        } else {
          toast.error(response.message);
        }
      });
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crear Grado</CardTitle>
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
                name="grade"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Grado</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                      disabled={isPending}
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
                      value={field.value || ""}
                      disabled={isPending}
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
                      value={field.value || ""}
                      disabled={isPending}
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
                name="preceptorEmail"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Email preceptor</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email preceptor (requerido)"
                        {...field}
                        disabled={isPending}
                        value={field.value || ""}
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
                <Link href="/administration/grades">Cancelar</Link>
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
