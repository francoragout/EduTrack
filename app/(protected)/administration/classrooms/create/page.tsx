import ClassroomCreateForm from "@/components/classrooms/classroom-create-form";
import { db } from "@/lib/db";

export default async function ClassroomCreatePage() {
  const preceptors = await db.user.findMany({
    where: {
      role: "EDITOR",
    },
  });

  // await db.classroom.createMany({
  //   data: [
  //     { grade: "FIRST", division: "A", shift: "MORNING" },
  //     { grade: "FIRST", division: "B", shift: "MORNING" },
  //     { grade: "FIRST", division: "C", shift: "MORNING" },
  //     { grade: "FIRST", division: "D", shift: "MORNING" },
  //     { grade: "FIRST", division: "A", shift: "AFTERNOON" },
  //     { grade: "FIRST", division: "B", shift: "AFTERNOON" },
  //     { grade: "FIRST", division: "C", shift: "AFTERNOON" },
  //     { grade: "FIRST", division: "D", shift: "AFTERNOON" },
  //     { grade: "SECOND", division: "A", shift: "MORNING" },
  //     { grade: "SECOND", division: "B", shift: "MORNING" },
  //     { grade: "SECOND", division: "C", shift: "MORNING" },
  //     { grade: "SECOND", division: "D", shift: "MORNING" },
  //     { grade: "SECOND", division: "A", shift: "AFTERNOON" },
  //     { grade: "SECOND", division: "B", shift: "AFTERNOON" },
  //     { grade: "SECOND", division: "C", shift: "AFTERNOON" },
  //     { grade: "SECOND", division: "D", shift: "AFTERNOON" },
  //     { grade: "THIRD", division: "A", shift: "MORNING" },
  //     { grade: "THIRD", division: "B", shift: "MORNING" },
  //     { grade: "THIRD", division: "C", shift: "MORNING" },
  //     { grade: "THIRD", division: "D", shift: "MORNING" },
  //     { grade: "THIRD", division: "A", shift: "AFTERNOON" },
  //     { grade: "THIRD", division: "B", shift: "AFTERNOON" },
  //     { grade: "THIRD", division: "C", shift: "AFTERNOON" },
  //     { grade: "THIRD", division: "D", shift: "AFTERNOON" },
  //     { grade: "FOURTH", division: "A", shift: "MORNING" },
  //     { grade: "FOURTH", division: "B", shift: "MORNING" },
  //     { grade: "FOURTH", division: "C", shift: "MORNING" },
  //     { grade: "FOURTH", division: "D", shift: "MORNING" },
  //     { grade: "FOURTH", division: "A", shift: "AFTERNOON" },
  //     { grade: "FOURTH", division: "B", shift: "AFTERNOON" },
  //     { grade: "FOURTH", division: "C", shift: "AFTERNOON" },
  //     { grade: "FOURTH", division: "D", shift: "AFTERNOON" },
  //     { grade: "FIFTH", division: "A", shift: "MORNING" },
  //     { grade: "FIFTH", division: "B", shift: "MORNING" },
  //     { grade: "FIFTH", division: "C", shift: "MORNING" },
  //     { grade: "FIFTH", division: "D", shift: "MORNING" },
  //     { grade: "FIFTH", division: "A", shift: "AFTERNOON" },
  //     { grade: "FIFTH", division: "B", shift: "AFTERNOON" },
  //     { grade: "FIFTH", division: "C", shift: "AFTERNOON" },
  //     { grade: "FIFTH", division: "D", shift: "AFTERNOON" },
  //     { grade: "SIXTH", division: "A", shift: "MORNING" },
  //     { grade: "SIXTH", division: "B", shift: "MORNING" },
  //     { grade: "SIXTH", division: "C", shift: "MORNING" },
  //     { grade: "SIXTH", division: "D", shift: "MORNING" },
  //     { grade: "SIXTH", division: "A", shift: "AFTERNOON" },
  //     { grade: "SIXTH", division: "B", shift: "AFTERNOON" },
  //     { grade: "SIXTH", division: "C", shift: "AFTERNOON" },
  //     { grade: "SIXTH", division: "D", shift: "AFTERNOON" },
  //   ],
  // });

  return <ClassroomCreateForm preceptors={preceptors}/>;
}
