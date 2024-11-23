import { TutorsColumns } from "@/components/tutors/tutors-columns";
import { TutorsTable } from "@/components/tutors/tutors-table";
import { db } from "@/lib/db";
import { UserOnStudentSchema, UserSchema } from "@/lib/zod";
import { z } from "zod";

type User = z.infer<typeof UserSchema>;

async function getData(studentId: string): Promise<User[]> {
  const tutors = await db.userOnStudent.findMany({
    where: {
      studentId,
    },
    include: {
      user: true,
      student: true,
    },
  });
  
  return tutors.map((tutor) => ({
    ...tutor.user,
    studentId, // Añadir studentId a cada tutor
  }));
}

export default async function TutorsPage({
  params,
}: {
  params: Promise<{ studentId: string; classroomId: string }>;
}) {
  const studentId = (await params).studentId;

  const student = await db.student.findUnique({
    where: {
      id: studentId,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });

  if (!student) {
    return null;
  }

  const classroomId = (await params).classroomId;

  const classroom = await db.classroom.findUnique({
    where: {
      id: classroomId,
    },
    select: {
      grade: true,
      division: true,
      shift: true,
      id: true,
    },
  });

  if (!classroom) {
    return null;
  }

  const data = await getData(studentId);

  return (
    <TutorsTable
      data={data}
      columns={TutorsColumns}
      classroom={classroom}
      student={student}
    />
  );
}
