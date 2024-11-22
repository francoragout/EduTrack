"use server";

import { db } from "@/lib/db";
import { AttendanceSchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const CreateAbsent = async (
  selectedRows: string[],
  classroomId: string
) => {
  try {
    await db.attendance.createMany({
      data: selectedRows.map((studentId) => ({
        studentId,
        status: "ABSENT",
      })),
    });

    revalidatePath(`/administration/classrooms/${classroomId}/students`);

    return {
      success: true,
      message: "Asistencia creada",
    };
  } catch (error) {
    console.error("Error creating absent:", error);
    return {
      success: false,
      message: "Error al crear asistencia",
    };
  }
};

export const createLate = async (
  selectedRows: string[],
  classroomId: string
) => {
  try {
    await db.attendance.createMany({
      data: selectedRows.map((studentId) => ({
        studentId,
        status: "LATE",
      })),
    });

    revalidatePath(`/administration/classrooms/${classroomId}/students`);

    return {
      success: true,
      message: "Asistencia creada",
    };
  } catch (error) {
    console.error("Error creating attendance:", error);
    return {
      success: false,
      message: "Error al crear asistencia",
    };
  }
};

export const UpdateAttendance = async (
  values: z.infer<typeof AttendanceSchema>,
  attendanceId: string,
  pathname: string
) => {
  const validatedFields = AttendanceSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Falta completar campos. No se pudo actualizar la asistencia.",
    };
  }

  const { status } = validatedFields.data;

  try {
    await db.attendance.update({
      where: {
        id: attendanceId,
      },
      data: {
        status,
      },
    });

    revalidatePath(pathname);
    return {
      success: true,
      message: "Asistencia actualizada",
    };
  } catch (error) {
    console.error("Error updating attendance:", error);
    return {
      success: false,
      message: "Error al actualizar asistencia",
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
      message: "Asistencia eliminada",
    };
  } catch (error) {
    console.error("Error deleting attendance:", error);
    return {
      success: false,
      message: "Error al eliminar asistencia",
    };
  }
};
