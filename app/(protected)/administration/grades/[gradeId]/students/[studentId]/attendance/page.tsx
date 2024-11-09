import { AttendanceColumns } from "@/components/administration/attendance/attendance-columns";
import { AttendanceTable } from "@/components/administration/attendance/attendance-table";
import { db } from "@/lib/db";
import { AttendanceSchema } from "@/lib/zod";
import { z } from "zod";

type Attendance = z.infer<typeof AttendanceSchema>;

async function getData(studentId: string): Promise<Attendance[]> {
  const attendance = await db.attendance.findMany({
    where: {
      studentId,
    },
  });

  return attendance.map((attendance: Attendance) =>
    AttendanceSchema.parse(attendance)
  );
}

export default async function AttendancePage({
  params,
}: {
  params: Promise<{ studentId: string; gradeId: string }>;
}) {
  const studentId = (await params).studentId;
  const data = await getData(studentId);

  const gradeId = (await params).gradeId;
  const grade = await db.grade.findUnique({
    where: {
      id: gradeId,
    },
    select: {
      grade: true,
      division: true,
      shift: true,
    },
  });

  if (!grade) {
    return <div>Grade not found</div>;
  }

  const student = await db.student.findUnique({
    where: {
      id: studentId,
    },
    select: {
      id: true,
      name: true,
      lastName: true,
    },
  });
  
  if (!student) {
    return <div>Student not found</div>;
  }

  return (
    <AttendanceTable
      columns={AttendanceColumns}
      data={data}
      student={student}
      grade={grade}
    />
  );
}
