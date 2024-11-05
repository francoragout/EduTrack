import StudentCreateForm from "@/components/administration/students/student-create-form";
import { db } from "@/lib/db";

export default async function CreateStudentPage({
  params,
}: {
  params: Promise<{ gradeId: string }>;
}) {
  const gradeId = (await params).gradeId;
  const grade = await db.grade.findFirst({
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
  return <StudentCreateForm gradeId={gradeId} grade={grade} />;
}
