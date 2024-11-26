import { StudentsColumns } from "@/components/students/students-columns";
import { StudentsTable } from "@/components/students/students-table";
import { db } from "@/lib/db";
import { StudentSchema } from "@/lib/zod";
import { SessionProvider } from "next-auth/react";
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
      classroomId: true,
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
  const data = await getData(classroomId);
  const classroom = await db.classroom.findUnique({
    where: {
      id: classroomId,
    },
    select: {
      id: true,
      grade: true,
      division: true,
      shift: true,
    },
  });

  if (!classroom) {
    return <div>Classroom not found</div>;
  }

  // await db.student.createMany({
  //   data: [
  //     { firstName: "Juan", lastName: "Pérez", classroomId },
  //     { firstName: "María", lastName: "López", classroomId },
  //     { firstName: "Carlos", lastName: "Gómez", classroomId },
  //     { firstName: "Ana", lastName: "Martínez", classroomId },
  //     { firstName: "Luis", lastName: "Rodríguez", classroomId },
  //     { firstName: "Laura", lastName: "Hernández", classroomId },
  //     { firstName: "Pablo", lastName: "Fernández", classroomId },
  //     { firstName: "Sofía", lastName: "García", classroomId },
  //     { firstName: "Andrés", lastName: "Vargas", classroomId },
  //     { firstName: "Valeria", lastName: "Ramírez", classroomId },
  //     { firstName: "Mateo", lastName: "Silva", classroomId },
  //     { firstName: "Camila", lastName: "Cruz", classroomId },
  //     { firstName: "Santiago", lastName: "Morales", classroomId },
  //     { firstName: "Isabella", lastName: "Ortiz", classroomId },
  //     { firstName: "Tomás", lastName: "Ríos", classroomId },
  //     { firstName: "Martina", lastName: "Torres", classroomId },
  //     { firstName: "Emilio", lastName: "Mendoza", classroomId },
  //     { firstName: "Lucía", lastName: "Santos", classroomId },
  //     { firstName: "Diego", lastName: "Navarro", classroomId },
  //     { firstName: "Emma", lastName: "Alvarez", classroomId },
  //   ],
  // });

  return (
    <SessionProvider>
      <StudentsTable
        columns={StudentsColumns}
        data={data}
        classroom={classroom}
      />
    </SessionProvider>
  );
}
