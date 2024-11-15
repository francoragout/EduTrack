import { AdminsColumns } from "@/components/admins/admins-columns";
import { AdminsTable } from "@/components/admins/admins-table";
import { db } from "@/lib/db";
import { UserSchema } from "@/lib/zod";
import { z } from "zod";

type User = z.infer<typeof UserSchema>;

async function getData(): Promise<User[]> {
  const admins = await db.user.findMany({
    where: {
      role: "ADMIN",
    },
  });
  return admins.map((admin) => UserSchema.parse(admin));
}

export default async function AdminsPage() {
  const data = await getData();
  return <AdminsTable columns={AdminsColumns} data={data} />;
}
