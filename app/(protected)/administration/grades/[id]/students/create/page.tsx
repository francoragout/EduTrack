import StudentCreateForm from "@/components/administration/students/student-create-form";

export default async function CreateStudentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const gradeId = (await params).id;
  console.log(gradeId);
  return <StudentCreateForm gradeId={gradeId}/>;
}
