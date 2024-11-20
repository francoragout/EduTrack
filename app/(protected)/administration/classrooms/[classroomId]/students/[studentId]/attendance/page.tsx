import { AttendanceColumns } from "@/components/attendance/attendance-columns";
import { AttendanceTable } from "@/components/attendance/attendance-table";
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
  params: Promise<{ studentId: string, classroomId: string }>;
}) {
  const studentId = (await params).studentId;
  const classroomId = (await params).classroomId;
  console.log(classroomId)
  const data = await getData(studentId);
  const student = await db.student.findUnique({
    where: {
      id: studentId,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      classroomId: true,
    },
  });
  
  if (!student) {
    return <div>Student not found</div>;
  }

  const classroom = await db.classroom.findUnique({
    where: {
      id: student.classroomId,
    },
    select: {
      grade: true,
      division: true,
      shift: true,
    },
  });

  if (!classroom) {
    return <div>Classroom not found</div>;
  }

  return (
    <AttendanceTable
      columns={AttendanceColumns}
      data={data}
      student={student}
      classroom={classroom}
    />
  );
}
