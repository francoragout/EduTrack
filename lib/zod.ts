import { z } from 'zod';

// Enum definitions
const StatusEnum = z.enum(['ABSENT', 'LATE']);
const DivisionEnum = z.enum(['A', 'B', 'C', 'D']);
const GradeEnum = z.enum(['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH', 'SIXTH']);
const ShiftEnum = z.enum(['MORNING', 'AFTERNOON']);

// TutorOnStudent schema
const TutorOnStudentSchema = z.object({
  tutorId: z.string().cuid(),
  studentId: z.string().cuid(),
});

// Attendance schema
const AttendanceSchema = z.object({
  id: z.string().cuid(),
  date: z.date(),
  status: StatusEnum,
  studentId: z.string().cuid(),
});

// Grade schema
const GradeSchema = z.object({
  id: z.string().cuid(),
  grade: GradeEnum,
  division: DivisionEnum,
  shift: ShiftEnum,
  preceptorId: z.string().cuid(),
  students: z.array(z.string().cuid()), // Store references to student IDs to avoid circular dependencies.
});

// Student schema
const StudentSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  lastName: z.string(),
  age: z.number().int(),
  gradeId: z.string().cuid(),
  grade: GradeSchema.optional(), // Optional to avoid recursive definition errors.
  tutor: z.array(TutorOnStudentSchema),
  attendance: z.array(AttendanceSchema).optional(),
});

// Tutor schema
const TutorSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  students: z.array(TutorOnStudentSchema), // Reference the relation to students.
});

// Preceptor schema
const PreceptorSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  permissions: z.boolean().default(false),
  grades: z.array(GradeSchema), // Reference the related grades.
});

export {
  StatusEnum,
  DivisionEnum,
  GradeEnum,
  ShiftEnum,
  TutorSchema,
  StudentSchema,
  TutorOnStudentSchema,
  AttendanceSchema,
  GradeSchema,
  PreceptorSchema,
};
