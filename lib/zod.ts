import { z } from "zod";

// Enum definitions
const StatusEnum = z.enum(["ABSENT", "LATE"], {
  message: "Seleccionar un estado",
});
const DivisionEnum = z.enum(["A", "B", "C", "D"], {
  message: "Seleccionar una división",
});
const GradeEnum = z.enum(
  ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH", "SIXTH"],
  {
    message: "Seleccionar un grado",
  }
);
const ShiftEnum = z.enum(["MORNING", "AFTERNOON"], {
  message: "Seleccionar un turno",
});

// Attendance schema
const AttendanceSchema = z.object({
  id: z.string().optional(),
  date: z.date().optional(),
  status: StatusEnum,
  studentId: z.string().optional(),
});

// Student schema
const StudentSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  lastName: z.string(),
  attendance: z.array(AttendanceSchema).optional(),
  gradeId: z.string().optional(),
});

const GradeSchema = z.object({
  id: z.string().optional(),
  division: DivisionEnum,
  grade: GradeEnum,
  shift: ShiftEnum,
  students: z.array(StudentSchema).optional(),
});

export { StudentSchema, AttendanceSchema, GradeSchema };
