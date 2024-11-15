"use client";

import { Table } from "@tanstack/react-table";
import { z } from "zod";
import { StudentSchema } from "@/lib/zod";
import TutorCreateForm from "./tutor-create-form";

type Student = z.infer<typeof StudentSchema>;
interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  student: Student;
}

export function TutorsTableToolbar<TData>({
  table,
  student,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-end">
        <TutorCreateForm student={student} />
    </div>
  );
}
