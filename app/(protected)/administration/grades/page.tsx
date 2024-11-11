import { GradesColumns } from "@/components/administration/grades/grades-columns";
import { GradesTable } from "@/components/administration/grades/grades-table";
import { db } from "@/lib/db";
import { GradeSchema } from "@/lib/zod";
import { z } from "zod";

type Grade = z.infer<typeof GradeSchema>;

async function getData(): Promise<Grade[]> {
  const grades = await db.grade.findMany({
    include: {
      students: true,
      preceptor: {
        select: {
          name: true,
          lastName: true,
          email: true,
        },
      },
    },
  });
  return grades.map((grade: Grade) => GradeSchema.parse(grade));
}

export default async function GradesPage() {
  const data = await getData();
  return <GradesTable columns={GradesColumns} data={data} />;
}
