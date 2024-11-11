import { PreceptorsColumns } from "@/components/administration/preceptors/preceptors-columns";
import { PreceptorsTable } from "@/components/administration/preceptors/preceptors-table";
import { db } from "@/lib/db";
import { PreceptorSchema } from "@/lib/zod";
import { z } from "zod";

type Preceptor = z.infer<typeof PreceptorSchema>;

async function getData(): Promise<Preceptor[]> {
  const preceptors = await db.preceptor.findMany({
    include: {
      grades: {
        select: {
          division: true,
          grade: true,
          shift: true,
        },
      },
    },
  });
  return preceptors.map((preceptor: Preceptor) =>
    PreceptorSchema.parse(preceptor)
  );
}

export default async function PreceptorsPage() {
  const data = await getData();
  return <PreceptorsTable columns={PreceptorsColumns} data={data} />;
}
