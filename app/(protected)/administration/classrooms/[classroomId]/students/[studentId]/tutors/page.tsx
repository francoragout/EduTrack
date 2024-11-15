import { TutorsColumns } from "@/components/tutors/tutors-columns";
import { TutorsTable } from "@/components/tutors/tutors-table";
import { db } from "@/lib/db";
import { TutorOnStudentSchema, TutorSchema } from "@/lib/zod";
import { z } from "zod";

type Tutor = z.infer<typeof TutorSchema>;

async function getData(studentId: string): Promise<Tutor[]> {
  const tutors = await db.tutorOnStudent.findMany({
    where: {
      studentId,
    },
    select: {
      tutor: true,
    },
  });

  return tutors.map((t) => ({
    ...t.tutor,
    phone: t.tutor.phone ?? undefined,
  }));
}

export default async function TutorsPage({
  params,
}: {
  params: { studentId: string; gradeId: string };
}) {
  const studentId = (await params).studentId;
  const data = await getData(studentId);

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

  if (!grade) {
    return <div>Grade not found</div>;
  }

  const student = await db.student.findUnique({
    where: {
      id: studentId,
    },
    select: {
      id: true,
      name: true,
      lastName: true,
    },
  });

  if (!student) {
    return <div>Student not found</div>;
  }

  return (
    <TutorsTable
      columns={TutorsColumns}
      data={data}
      student={student}
      grade={grade}
    />
  );
}
