import GradeEditForm from "@/components/administration/grades/grade-edit-form";
import { db } from "@/lib/db";

export default async function GradeEditPage({
  params,
}: {
  params: { gradeId: string };
}) {
  const gradeId = params.gradeId;
  const grade = await db.grade.findUnique({
    where: {
      id: gradeId,
    },
    select: {
      id: true,
      grade: true,
      division: true,
      shift: true,
    },
  });
  if (!grade) {
    return <div>Grade not found</div>;
  }
  return <GradeEditForm grade={grade} />;
}