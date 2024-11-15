import ClassroomEditForm from "@/components/classrooms/classroom-edit-form";
import GradeEditForm from "@/components/classrooms/classroom-edit-form";
import { db } from "@/lib/db";

export default async function ClassroomEditPage({
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
      id: true,
      division: true,
      grade: true,
      shift: true,
      userId: true,
    },
  });

  if (!classroom) {
    return <div>Classroom not found</div>;
  }

  const preceptors = await db.user.findMany({
    where: {
      role: "EDITOR",
    },
    select: {
      email: true,
      id: true,
    },
  });
  

  return <ClassroomEditForm classroom={classroom} preceptors={preceptors} />;
}
