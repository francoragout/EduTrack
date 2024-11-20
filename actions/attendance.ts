"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

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
      message: "Inasistencia creada exitosamente",
    };
  } catch (error) {
    console.error("Error creating absent:", error);
    return {
      success: false,
      message: "Error al crear inasistencia",
    };
  }
};

export const createLate = async (selectedRows: string[], classroomId: string) => {
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
      message: "Llegada tarde creada exitosamente",
    };
  } catch (error) {
    console.error("Error creating attendance:", error);
    return {
      success: false,
      message: "Error al crear llegada tarde",
    };
  }
}

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
