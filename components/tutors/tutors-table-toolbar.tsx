"use client";

import { Table } from "@tanstack/react-table";
import { z } from "zod";
import TutorCreateForm from "./tutor-create-form";
interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  studentId: string;
  classroomId: string;
}

export function TutorsTableToolbar<TData>({
  table,
  studentId,
  classroomId,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-end">
      <TutorCreateForm studentId={studentId} />
    </div>
  );
}
