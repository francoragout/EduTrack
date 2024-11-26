import { StudentsBarChart } from "@/components/overview/students-bar-chart";
import { db } from "@/lib/db";
import { StudentSchema } from "@/lib/zod";
import { z } from "zod";

type Student = z.infer<typeof StudentSchema>;

async function getData(): Promise<Student[]> {
  const students = await db.student.findMany({
    where: {
      attendance: {
        some: {},
      },
    },
    select: {
      firstName: true,
      lastName: true,
      attendance: {
        select: {
          status: true,
        },
      },
      classroom: {
        select: {
          id: true,
          grade: true,
          division: true,
          shift: true,
        },
      },
    },
  });

  return students.map((student) => StudentSchema.parse(student));
}

export default async function OverviewPage() {
  const data = await getData();

  return <StudentsBarChart students={data} />;
}
