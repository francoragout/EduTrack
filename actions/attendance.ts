"use server";

import { db } from "@/lib/db";
import { AttendanceSchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const CreateAttendance = async (
  id: string,
  pathname: string,
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
        studentId: id,
      },
    });

    revalidatePath(pathname);
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

export const DeleteAttendance = async (id: string, pathname: string) => {
  try {
    await db.attendance.delete({
      where: {
        id,
      },
    });

    revalidatePath(pathname);
    return {
      success: true,
      message: "Asistencia eliminada exitosamente",
    };
  } catch (error) {
    console.error("Error deleting attendance:", error);
    return {
      success: false,
      message: "Error al eliminar asistencia",
    };
  }
};
