"use client";

import { usePathname } from "next/navigation";
import { Skeleton } from "./ui/skeleton";

export function TableSkeleton() {
  const pathname = usePathname();
  return (
    <div className="flex flex-col w-full space-y-4">
      {pathname === "/administration/admins" && (
        <div className="flex justify-between">
          <Skeleton className="h-[32px] w-[150px] lg:w-[250px]" />
          <Skeleton className="h-[32px] w-[40px] md:w-[176px]" />
        </div>
      )}
      {pathname === "/administration/preceptors" && (
        <div className="flex justify-between">
          <Skeleton className="h-[32px] w-[150px] lg:w-[250px]" />
          <Skeleton className="h-[32px] w-[40px] md:w-[147px]" />
        </div>
      )}
      {pathname === "/administration/classrooms" && (
        <div className="flex justify-between">
          <Skeleton className="h-[32px] w-[150px] lg:w-[327px]" />
          <Skeleton className="h-[32px] w-[40px] md:w-[111px]" />
        </div>
      )}
      <div className="space-y-2">
        <Skeleton className="h-[48px]" />
        <Skeleton className="h-[57px]" />
        <Skeleton className="h-[57px]" />
        <Skeleton className="h-[57px]" />
        <Skeleton className="h-[57px]" />
        <Skeleton className="h-[57px]" />
        <Skeleton className="h-[57px]" />
        <Skeleton className="h-[57px]" />
        <Skeleton className="h-[57px]" />
        <Skeleton className="h-[57px]" />
        <Skeleton className="h-[57px]" />
      </div>
      <div className="flex justify-end">
        <Skeleton className="h-[32px] w-[493px]" />
      </div>
    </div>
  );
}
