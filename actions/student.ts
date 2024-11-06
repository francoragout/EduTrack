"use server";

import { db } from "@/lib/db";
import { StudentSchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const CreateStudent = async (
  values: z.infer<typeof StudentSchema>,
  gradeId: string
) => {
  const validatedFields = StudentSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create student.",
    };
  }

  const { name, lastName } = validatedFields.data;

  try {
    await db.student.create({
      data: {
        name,
        lastName,
        grade: {
          connect: {
            id: gradeId,
          },
        },
      },
    });

    revalidatePath(`/administration/grades/${gradeId}/students`);
    return {
      success: true,
      message: "Alumno creado exitosamente",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error al crear alumno",
    };
  }
};

export const UpdateStudent = async (
  values: z.infer<typeof StudentSchema>,
  studentId: string,
  gradeId: string
  
) => {
  const validatedFields = StudentSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update student.",
    };
  }

  const { name, lastName } = validatedFields.data;

  try {
    await db.student.update({
      where: {
        id: studentId,
      },
      data: {
        name,
        lastName,
      },
    });

    revalidatePath(`/administration/grades/${gradeId}/students`);
    return {
      success: true,
      message: "Alumno actualizado",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error al actualizar alumno",
    };
  }
}