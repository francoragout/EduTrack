import { ClassroomsColumns } from "@/components/classrooms/classrooms-columns";
import { ClassroomsTable } from "@/components/classrooms/classrooms-table";
import { db } from "@/lib/db";
import { ClassroomSchema } from "@/lib/zod";
import { SessionProvider } from "next-auth/react";

import { z } from "zod";

type Classroom = z.infer<typeof ClassroomSchema>;

async function getData(): Promise<Classroom[]> {
  const classrooms = await db.classroom.findMany({
    include: {
      students: true,
      user: {
        select: {
          email: true,
          role: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });
  return classrooms.map((classroom) => ClassroomSchema.parse(classroom));
}

export default async function ClassroomsPage() {
  const data = await getData();
  return (
    <SessionProvider>
      <ClassroomsTable columns={ClassroomsColumns} data={data} />;
    </SessionProvider>
  );
}
