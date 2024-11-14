"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { RootState } from "@/lib/store";
import { usePathname } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

export default function DinamicBreadcrumb() {
  const pathnameTranslate = useSelector(
    (state: RootState) => state.pathname.value
  );
  const pathSegmentsTranslate = pathnameTranslate.split("/").filter(Boolean);
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathSegments.map((segment, index) => {
          const isFirst = index === 0;
          const isLast = index === pathSegments.length - 1;
          const translatedSegment = pathSegmentsTranslate[index] || segment;
          const hasSpace = translatedSegment.includes(" ");

          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {isFirst || isLast || hasSpace ? (
                  <span className={isLast ? "font-normal text-foreground" : ""}>
                    {translatedSegment}
                  </span>
                ) : (
                  <BreadcrumbLink
                    href={`/${pathSegments.slice(0, index + 1).join("/")}`}
                  >
                    {translatedSegment}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < pathSegments.length - 1 && (
                <BreadcrumbSeparator className="text-primary" />
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
