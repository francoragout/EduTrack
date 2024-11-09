import { AdminsColumns } from "@/components/administration/admins/admins-columns";
import { AdminsTable } from "@/components/administration/admins/admins-table";
import { db } from "@/lib/db";
import { UserSchema, RoleEnum } from "@/lib/zod";
import { z } from "zod";

type User = z.infer<typeof UserSchema>;

async function getData(): Promise<User[]> {
  const admins = await db.user.findMany({
    where: {
      role: {
        has: RoleEnum.Enum.ADMIN,
      },
    },
  });
  return admins.map((admin) => UserSchema.parse(admin));
}

export default async function AdminsPage() {
  const data = await getData();
  return <AdminsTable columns={AdminsColumns} data={data} />;
}