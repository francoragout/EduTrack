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
      tutors: true,
    },
  });

  return students.map((student: Student) => StudentSchema.parse(student));
}

export default async function StudentsPage({
  params,
}: {
  params: Promise<{ gradeId: string }>;
}) {
  const gradeId = (await params).gradeId;
  const grade = await db.grade.findUnique({
    where: {
      id: gradeId,
    },
    select: {
      grade: true,
      division: true,
      shift: true,
    },
  });
  const data = await getData(gradeId);
  if (!grade) {
    return <div>Grade not found</div>;
  }

  // await db.student.createMany({
  //   data: [
  //     { name: "Juan", lastName: "Pérez", gradeId },
  //     { name: "María", lastName: "Gómez", gradeId },
  //     { name: "Carlos", lastName: "Rodríguez", gradeId },
  //     { name: "Ana", lastName: "López", gradeId },
  //     { name: "José", lastName: "Fernández", gradeId },
  //     { name: "Lucía", lastName: "Martínez", gradeId },
  //     { name: "Miguel", lastName: "García", gradeId },
  //     { name: "Sofía", lastName: "Hernández", gradeId },
  //     { name: "Pedro", lastName: "Ruiz", gradeId },
  //     { name: "Camila", lastName: "Torres", gradeId },
  //   ],
  // });

  return (
    <StudentsTable
      columns={StudentsColumns}
      data={data}
      gradeId={gradeId}
      grade={grade}
    />
  );
}
