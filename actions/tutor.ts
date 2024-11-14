"use server";

import { db } from "@/lib/db";
import { TutorSchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const CreateTutor = async (
  studentId: string,
  pathname: string,
  values: z.infer<typeof TutorSchema>
) => {
  const validatedFields = TutorSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Tutor.",
    };
  }

  const { name, lastName, email, phone } = validatedFields.data;

  try {
    // Buscar si ya existe un tutor con ese correo
    let tutor = await db.tutor.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });

    if (!tutor) {
      // Crear tutor si no existe
      tutor = await db.tutor.create({
        data: {
          name,
          lastName,
          email,
          phone,
        },
      });
    }

    // Verificar si ya existe la relación tutor-estudiante
    const existingRelationship = await db.tutorOnStudent.findFirst({
      where: {
        studentId,
        tutorId: tutor.id,
      },
    });

    // Si la relación no existe, crearla
    if (!existingRelationship) {
      await db.tutorOnStudent.create({
        data: {
          studentId,
          tutorId: tutor.id,
        },
      });
    } else {
      // Si ya existe, retornar un mensaje adecuado
      return {
        success: false,
        message: "Este tutor ya está asociado con el estudiante.",
      };
    }

    // Revalidar la ruta y retornar éxito
    revalidatePath(pathname);
    return {
      success: true,
      message: "Tutor creado exitosamente",
    };
  } catch (error) {
    console.error("Error creating tutor:", error);
    return {
      success: false,
      message: "Error al crear tutor",
    };
  }
};

export const UpdateTutor = async (
  tutorId: string,
  pathname: string,
  values: z.infer<typeof TutorSchema>
) => {
  const validatedFields = TutorSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Tutor.",
    };
  }

  const { name, lastName, email, phone } = validatedFields.data;

  try {
    await db.tutor.update({
      where: {
        id: tutorId,
      },
      data: {
        name,
        lastName,
        email,
        phone,
      },
    });

    revalidatePath(pathname);
    return {
      success: true,
      message: "Tutor actualizado exitosamente",
    };
  } catch (error) {
    console.error("Error updating tutor:", error);
    return {
      success: false,
      message: "Error al actualizar tutor",
    };
  }
}
