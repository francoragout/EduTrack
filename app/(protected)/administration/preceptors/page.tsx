import { auth } from "@/auth";
import { PreceptorsColumns } from "@/components/preceptors/preceptors-columns";
import { PreceptorsTable } from "@/components/preceptors/preceptors-table";
import { db } from "@/lib/db";
import { UserSchema } from "@/lib/zod";
import { SessionProvider } from "next-auth/react";
import { z } from "zod";

type User = z.infer<typeof UserSchema>;

async function getData(): Promise<User[]> {
  const preceptors = await db.user.findMany({
    where: {
      role: "EDITOR",
    },
    include: {
      classrooms: {
        select: {
          grade: true,
          division: true,
          shift: true,
        },
      },
    },
  });
  return preceptors.map((preceptor) => UserSchema.parse(preceptor));
}

export default async function PreceptorsPage() {
  const data = await getData();
  return (
    <SessionProvider>
      <PreceptorsTable columns={PreceptorsColumns} data={data} />
    </SessionProvider>
  );
}
