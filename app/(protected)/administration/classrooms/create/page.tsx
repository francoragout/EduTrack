import ClassroomCreateForm from "@/components/classrooms/classroom-create-form";
import { db } from "@/lib/db";

export default async function ClassroomCreatePage() {
  const preceptors = await db.user.findMany({
    where: {
      role: "EDITOR",
    },
  });

  return <ClassroomCreateForm preceptors={preceptors}/>;
}
