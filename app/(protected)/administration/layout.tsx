import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/theme-toggle-button";
import { Separator } from "@/components/ui/separator";
import React from "react";
import Notifications from "@/components/notifications";
import { auth } from "@/auth";
import DinamicBreadcrumb from "@/components/dinamic-breadcrumb";

interface AdministratioLayoutProps {
  children: React.ReactNode;
}

export default async function AdministratioLayout({
  children,
}: AdministratioLayoutProps) {
  const session = await auth();
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
