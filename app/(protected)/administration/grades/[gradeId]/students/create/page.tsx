import StudentCreateForm from "@/components/administration/students/student-create-form";

export default async function CreateStudentPage({
  params,
}: {
  params: Promise<{ gradeId: string }>;
}) {
  const gradeId = (await params).gradeId;
  return <StudentCreateForm gradeId={gradeId}/>;
}
