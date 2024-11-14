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

  // const createPreceptors = await db.preceptor.createMany({
  //   data: [
  //     { name: 'Laura', lastName: 'Castro', email: 'laura.castro@example.com' },
  //     { name: 'Jorge', lastName: 'Méndez', email: 'jorge.mendez@example.com' },
  //     { name: 'Carolina', lastName: 'Sosa', email: 'carolina.sosa@example.com' },
  //     { name: 'Daniel', lastName: 'Iglesias', email: 'daniel.iglesias@example.com' },
  //     { name: 'Lucía', lastName: 'Vega', email: 'lucia.vega@example.com' },
  //   ],
  // });

  return <PreceptorsTable columns={PreceptorsColumns} data={data} />;
}
