"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { RootState } from "@/lib/store";
import React from "react";
import { useSelector } from "react-redux";

interface AdministratioLayoutProps {
  children: React.ReactNode;
}

export default function AdministratioLayout({
  children,
}: AdministratioLayoutProps) {
  const pathname = useSelector((state: RootState) => state.pathname.value);

  const translations: { [key: string]: string } = {
    administration: "Administración",
    grades: "Grados",
    students: "Alumnos",
    create: "Crear",
    edit: "Editar",
    attendance: "Asistencia",
  };

  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-x-auto">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {pathSegments.map((segment, index) => {
                  const isFirst = index === 0;
                  const isLast = index === pathSegments.length - 1;
                  const hasSpace = segment.includes(" ");

                  return (
                    <BreadcrumbItem key={index}>
                      {isLast ? (
                        <span className="font-normal text-foreground">
                          {translations[segment] || segment}
                        </span>
                      ) : (
                        <BreadcrumbLink
                          href={
                            !isFirst && !hasSpace
                              ? `/${pathSegments.slice(0, index + 1).join("/")}`
                              : undefined
                          }
                        >
                          {translations[segment] || segment}
                        </BreadcrumbLink>
                      )}
                      {!isLast && <BreadcrumbSeparator />}
                    </BreadcrumbItem>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
