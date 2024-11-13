import PreceptorEditForm from "@/components/administration/preceptors/preceptor-edit-form";
import { db } from "@/lib/db";
export default async function PreceptorEditPage({
  params,
}: {
  params: Promise<{ preceptorId: string }>;
}) {
  const preceptorId = (await params).preceptorId;
  const preceptor = await db.preceptor.findUnique({
    where: {
      id: preceptorId,
    },
    select: {
      id: true,
      name: true,
      lastName: true,
      email: true,
      grades: true,
    },
  });
  if (!preceptor) {
    return <div>Preceptor not found</div>;
  }

  return <PreceptorEditForm preceptor={preceptor} />;
}
