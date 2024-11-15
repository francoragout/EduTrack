import StudentCreateForm from "@/components/students/student-create-form";
import { db } from "@/lib/db";

export default async function StudentCreatePage({
  params,
}: {
  params: Promise<{ classroomId: string }>;
}) {
  const classroomId = (await params).classroomId;
  const classroom = await db.classroom.findFirst({
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
  return <StudentCreateForm classroom={classroom} />
}
