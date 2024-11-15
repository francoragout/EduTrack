import { StudentsColumns } from "@/components/students/students-columns";
import { StudentsTable } from "@/components/students/students-table";
import { db } from "@/lib/db";
import { StudentSchema } from "@/lib/zod";
import { z } from "zod";

type Student = z.infer<typeof StudentSchema>;

async function getData(classroomId: string): Promise<Student[]> {
  const students = await db.student.findMany({
    where: {
      classroomId,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      attendance: true,
    },
  });

  return students.map((student) => StudentSchema.parse(student));
}

export default async function StudentsPage({
  params,
}: {
  params: Promise<{ classroomId: string }>;
}) {
  const classroomId = (await params).classroomId;
  const classroom = await db.classroom.findUnique({
    where: {
      id: classroomId,
    },
    select: {
      grade: true,
      division: true,
      shift: true,
    },
  });

  if (!classroom) {
    return <div>Classroom not found</div>;
  }

  const data = await getData(classroomId);

  // await db.student.createMany({
  //   data: [
  //     { firstName: 'Juan', lastName: 'Pérez', classroomId },
  //     { firstName: 'María', lastName: 'González', classroomId },
  //     { firstName: 'Carlos', lastName: 'Ramírez', classroomId },
  //     { firstName: 'Ana', lastName: 'Martínez', classroomId },
  //     { firstName: 'Lucía', lastName: 'Fernández', classroomId },
  //   ],
  // });

  return (
    <StudentsTable
      columns={StudentsColumns}
      data={data}
      classroom={classroom}
      classroomId={classroomId}
    />
  );
}
