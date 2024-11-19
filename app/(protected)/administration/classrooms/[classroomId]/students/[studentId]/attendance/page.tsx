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
  params: Promise<{ studentId: string; classroomId: string }>;
}) {
  const resolvedParams = await params;
  console.log('Resolved Params:', resolvedParams);

  

  

  const studentId = (await params).studentId;
  const data = await getData(studentId);

  

  
  const classroomId = (await params).classroomId;

  console.log('Student ID:', studentId);
  console.log('Classroom ID:', classroomId);
  
  const classroom = await db.classroom.findUnique({
    where: {
      id: classroomId,
    },
    select: {
      grade: true,
      division: true,
      shift: true,
    },
  });

  if (!classroom) {
    return <div>Grade not found</div>;
  }

  const student = await db.student.findUnique({
    where: {
      id: studentId,
    },
    select: {
      id: true,
      firstName: true,
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
      classroom={classroom}
    />
  );
}
