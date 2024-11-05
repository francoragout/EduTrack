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
import { usePathname } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

interface AdministratioLayoutProps {
  children: React.ReactNode;
}

export default function AdministratioLayout({
  children,
}: AdministratioLayoutProps) {
  const pathnameTranslate = useSelector(
    (state: RootState) => state.pathname.value
  );
  const pathSegmentsTranslate = pathnameTranslate.split("/").filter(Boolean);
  const pathname = usePathname();
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
                  const translatedSegment =
                    pathSegmentsTranslate[index] || segment;
                  const hasSpace = translatedSegment.includes(" ");

                  return (
                    <React.Fragment key={index}>
                      <BreadcrumbItem>
                        {isFirst || isLast || hasSpace ? (
                          <span
                            className={
                              isLast ? "font-normal text-foreground" : ""
                            }
                          >
                            {translatedSegment}
                          </span>
                        ) : (
                          <BreadcrumbLink
                            href={`/${pathSegments
                              .slice(0, index + 1)
                              .join("/")}`}
                          >
                            {translatedSegment}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {index < pathSegments.length - 1 && (
                        <BreadcrumbSeparator />
                      )}
                    </React.Fragment>
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
