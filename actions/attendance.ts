"use server";

import { db } from "@/lib/db";
import { AttendanceSchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const CreateAttendance = async (
  studentId: string,
  values: z.infer<typeof AttendanceSchema>
) => {
  const validatedFields = AttendanceSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create attendance.",
    };
  }

  const { status } = validatedFields.data;

  try {
    await db.attendance.create({
      data: {
        status,
        student: { connect: { id: studentId } },
      },
    });

    revalidatePath(`/administration/students/${studentId}/attendance`);
    return {
      success: true,
      message: "Asistencia creada exitosamente",
    };
  } catch (error) {
    console.error("Error creating attendance:", error);
    return {
      success: false,
      message: "Error al crear asistencia",
    };
  }
};
