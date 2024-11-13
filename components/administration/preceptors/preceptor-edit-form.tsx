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
import { PreceptorSchema } from "@/lib/zod";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { divisions, grades, shifts } from "@/constants/data";

import { useDispatch } from "react-redux";
import { setPathname } from "@/lib/features/pathname/pathnameSlice";
import { Input } from "@/components/ui/input";
import { UpdatePreceptor } from "@/actions/preceptor";

type Preceptor = z.infer<typeof PreceptorSchema>;

export default function PreceptorEditForm({
  preceptor,
}: {
  preceptor: Preceptor;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof PreceptorSchema>>({
    resolver: zodResolver(PreceptorSchema),
    defaultValues: {
      name: preceptor.name,
      lastName: preceptor.lastName,
      email: preceptor.email,
    },
  });

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(
      setPathname(
        `/Administración/Preceptores/${preceptor.name} ${preceptor.lastName}/Editar`
      )
    );
  }, [dispatch, preceptor.name, preceptor.lastName]);

  function onSubmit(values: z.infer<typeof PreceptorSchema>) {
    startTransition(() => {
      UpdatePreceptor(preceptor.id || "", values).then((response) => {
        if (response.success) {
          toast.success(response.message);
          router.push("/administration/preceptors");
        } else {
          toast.error(response.message);
        }
      });
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Editar Preceptor</CardTitle>
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

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email (requerido)"
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
                <Link href="/administration/preceptors">Cancelar</Link>
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
