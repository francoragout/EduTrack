import { PreceptorsColumns } from "@/components/administration/preceptors/preceptors-columns";
import { PreceptorsTable } from "@/components/administration/preceptors/preceptors-table";
import { db } from "@/lib/db";
import { UserSchema, RoleEnum } from "@/lib/zod";
import { z } from "zod";

type User = z.infer<typeof UserSchema>;

async function getData(): Promise<User[]> {
  const preceptors = await db.user.findMany({
    where: {
      role: {
        has: RoleEnum.Enum.PRECEPTOR,
      },
    },
  });
  return preceptors.map((preceptor) => UserSchema.parse(preceptor));
}

export default async function AdminsPage() {
  const data = await getData();
  return <PreceptorsTable columns={PreceptorsColumns} data={data} />;
}