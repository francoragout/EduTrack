import { TutorsColumns } from "@/components/administration/tutors/tutors-columns";
import { TutorsTable } from "@/components/administration/tutors/tutors-table";
import { db } from "@/lib/db";
import { UserSchema, RoleEnum } from "@/lib/zod";
import { z } from "zod";

type User = z.infer<typeof UserSchema>;

async function getData(): Promise<User[]> {
  const tutors = await db.user.findMany({
    where: {
      role: {
        has: RoleEnum.Enum.TUTOR,
      },
    },
  });
  return tutors.map((tutor) => UserSchema.parse(tutor));
}

export default async function AdminsPage() {
  const data = await getData();
  return <TutorsTable columns={TutorsColumns} data={data} />;
}