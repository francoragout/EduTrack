import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { auth } from "@/auth";
import DinamicBreadcrumb from "@/components/dinamic-breadcrumb";

interface AdministratioLayoutProps {
  children: React.ReactNode;
}

export default async function AdministrationLayout({
  children,
}: AdministratioLayoutProps) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN" && session?.user?.role !== "EDITOR") {
    return <div>You are not admin</div>;
  }

  return (
    <SidebarProvider>
      <AppSidebar session={session} />
      <SidebarInset className="overflow-x-auto">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b justify-between">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <DinamicBreadcrumb />
          </div>
        </header>
        <div className="gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
