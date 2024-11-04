import { StudentsColumns } from "@/components/administration/students/students-columns";
import { StudentsTable } from "@/components/administration/students/students-table";
import { db } from "@/lib/db";
import { StudentSchema } from "@/lib/zod";
import { z } from "zod";

type Student = z.infer<typeof StudentSchema>;

async function getData(gradeId: string): Promise<Student[]> {
  const students = await db.student.findMany({
    where: {
      gradeId,
    },
    include: {
      attendance: true,
    },
  });

  return students.map((student: Student) => StudentSchema.parse(student));
}

export default async function StudentsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const gradeId = (await params).id;
  const data = await getData(gradeId);
  return (
    <StudentsTable columns={StudentsColumns} data={data} gradeId={gradeId} />
  );
}
