import { z } from "zod";

// Enum definitions
const Status = z.enum(["ABSENT", "LATE"], {
  message: "Seleccionar un estado",
});
const Division = z.enum(["A", "B", "C", "D"], {
  message: "Seleccionar una división",
});
const Grade = z.enum(["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH", "SIXTH"], {
  message: "Seleccionar un grado",
});
const Shift = z.enum(["MORNING", "AFTERNOON"], {
  message: "Seleccionar un turno",
});

// User schema
const UserSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    id: z.string().optional(),
    firstName: z
      .string()
      .min(1, {
        message: "El nombre es requerido",
      })
      .max(30, {
        message: "El nombre debe tener menos de 30 caracteres",
      })
      .nullish(),
    lastName: z
      .string()
      .min(1, {
        message: "El apellido es requerido",
      })
      .max(30, {
        message: "El apellido debe tener menos de 30 caracteres",
      })
      .nullish(),
    email: z.string().email().optional(),
    role: z.enum(["ADMIN", "EDITOR", "USER"], {
      message: "Seleccionar un rol",
    }),
    image: z.string().optional(),
    createdAt: z.date().optional(),
    classrooms: z.array(ClassroomSchema).optional(),
  })
);

// Attendance schema
const AttendanceSchema = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  status: Status,
  studentId: z.string().optional(),
});

// Student schema
const StudentSchema = z.object({
  id: z.string().optional(),
  firstName: z
    .string()
    .min(1, {
      message: "El nombre es requerido",
    })
    .max(30, {
      message: "El nombre debe tener menos de 30 caracteres",
    }),
  lastName: z
    .string()
    .min(1, {
      message: "El apellido es requerido",
    })
    .max(30, {
      message: "El apellido debe tener menos de 30 caracteres",
    }),
  attendance: z.array(AttendanceSchema).optional(),
  classroomId: z.string().optional(),
});

// UserOnStudent schema
const UserOnStudentSchema = z.object({
  userId: z.string().optional(),
  studentId: z.string().optional(),
  students: z.array(StudentSchema).optional(),
  users: z.array(UserSchema).optional(),
});

// Classroom schema
const ClassroomSchema = z.object({
  id: z.string().optional(),
  grade: Grade,
  division: Division,
  shift: Shift,
  students: z.array(StudentSchema).optional(),
  user: UserSchema.nullish(),
  userId: z.string().nullish(),
});

// Notifications schema
const NotificationSchema = z.object({
  id: z.string().optional(),
  message: z.string(),
  createdAt: z.date().default(() => new Date()),
  read: z.boolean().default(false),
  userId: z.string(),
});

export {
  StudentSchema,
  UserOnStudentSchema,
  AttendanceSchema,
  ClassroomSchema,
  UserSchema,
  NotificationSchema,
};
