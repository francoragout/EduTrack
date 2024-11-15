import StudentEditForm from "@/components/students/student-edit-form";
import { db } from "@/lib/db";

export default async function StudentEditPage({
  params,
}: {
  params: Promise<{ gradeId: string; studentId: string }>;
}) {
  const { gradeId, studentId } = await params;
  const student = await db.student.findUnique({
    where: {
      id: studentId,
    },
    select: {
      id: true,
      name: true,
      lastName: true,
      grade: true,
    },
  });
  if (!student) {
    return <div>Student not found</div>;
  }
  return (
    <StudentEditForm
      student={student}
      grade={student.grade}
      gradeId={gradeId}
    />
  );
}
