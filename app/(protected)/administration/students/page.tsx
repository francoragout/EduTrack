
import { StudentsColumns } from "@/components/administration/students/students-columns";
import { StudentsTable } from "@/components/administration/students/students-table";
import { db } from "@/lib/db";
import { StudentSchema } from "@/lib/zod";
import { z } from "zod";

type Student = z.infer<typeof StudentSchema>;

async function getData(): Promise<Student[]> {
  const students = await db.student.findMany({
    include: {
      attendance: true,
    },
  });

  return students.map((student) => StudentSchema.parse(student));
}

export default async function StudentsPage() {
  const data = await getData();

  return <StudentsTable columns={StudentsColumns} data={data} />;
}
