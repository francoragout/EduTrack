import GradeCreateForm from "@/components/administration/grades/grade-create-form";
import { db } from "@/lib/db";

export default async function GradeCreatePage() {
  const preceptors = await db.preceptor.findMany({
    select: {
      id: true,
      name: true,
      lastName: true,
      email: true,
    },
  });
  return <GradeCreateForm preceptors={preceptors}/>;
}
