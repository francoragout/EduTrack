import { auth } from "@/auth";
import PreceptorEditForm from "@/components/preceptors/preceptor-edit-form";
import { db } from "@/lib/db";

export default async function PreceptorsEditPage({
  params,
}: {
  params: Promise<{ preceptorId: string }>;
}) {
  const preceptorId = (await params).preceptorId;
  const preceptor = await db.user.findUnique({
    where: {
      id: preceptorId,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      role: true,
      email: true,
    },
  });

  const session = await auth();
  return <PreceptorEditForm preceptor={preceptor} session={session} />;
}
