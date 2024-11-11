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
const RoleEnum = z.enum(["ADMIN", "PRECEPTOR", "TUTOR"], {
  message: "Seleccionar un rol",
});

// Attendance schema
const AttendanceSchema = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  status: StatusEnum,
  studentId: z.string().optional(),
});

// Student schema
const StudentSchema = z.object({
  id: z.string().optional(),
  name: z
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
  gradeId: z.string().optional(),
});

// Notifications schema
const NotificationSchema = z.object({
  id: z.string().optional(),
  message: z.string(),
  createdAt: z.date().default(() => new Date()),
  read: z.boolean().default(false),
  userId: z.string(),
});

// User schema
const UserSchema = z.object({
  id: z.string().optional(),
  name: z.string().nullish(),
  email: z.string().email().optional(),
  image: z.string().nullable().optional(),
  role: z.array(RoleEnum).optional(),
  createdAt: z.date().optional(),
});

// Tutor schema
const TutorSchema = z.object({
  id: z.string().optional(),
  name: z
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
  email: z.union([
    z.string().email({
      message: "Ingrese un email válido",
    }),
    z.string().max(0).optional(),
    z.null(),
  ]),
});

// Grade schema
const GradeSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    id: z.string().optional(),
    division: DivisionEnum,
    grade: GradeEnum,
    shift: ShiftEnum,
    students: z.array(StudentSchema).optional(),
    preceptorId: z.string().nullish(),
    preceptor: PreceptorSchema.nullish(),
  })
);

// Preceptor schema
const PreceptorSchema = z.object({
  id: z.string().optional(),
  name: z
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
  email: z.string().email({
    message: "Ingrese un email válido",
  }),
  gradeId: z.string().optional(),
  grades: z.array(GradeSchema).optional(), // Add this line to include grades
});

export {
  StudentSchema,
  AttendanceSchema,
  GradeSchema,
  UserSchema,
  NotificationSchema,
  PreceptorSchema,
  RoleEnum,
};
