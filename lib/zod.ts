import { z } from 'zod';

// Enum definitions
const StatusEnum = z.enum(['ABSENT', 'LATE']);

// Attendance schema
const AttendanceSchema = z.object({
  id: z.string().optional(),
  date: z.date(),
  status: StatusEnum,
  studentId: z.string().cuid(),
});

// Student schema
const StudentSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  lastName: z.string(),
  dateOfBirth: z.date(),
  attendance: z.array(AttendanceSchema).optional(),
});

export {
  StudentSchema,
  AttendanceSchema,
};
