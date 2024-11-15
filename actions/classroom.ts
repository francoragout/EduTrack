"use server";

import { db } from "@/lib/db";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { ClassroomSchema } from "@/lib/zod";

export const CreateClassroom = async (values: z.infer<typeof ClassroomSchema>) => {
  const validatedFields = ClassroomSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Classroom",
    };
  }

  const { division, grade, shift, userId } = validatedFields.data;

  try {
    await db.classroom.create({
      data: {
        division,
        grade,
        shift,
        userId,
      },
    });

    revalidatePath("/administration/classrooms");
    return {
      success: true,
      message: "Aula creada exitosamente",
    };
  } catch (error) {
    console.error("Error creating classroom:", error);
    return {
      success: false,
      message: "Error al crear aula",
    };
  }
};

export const UpdateClassroom = async (
  values: z.infer<typeof ClassroomSchema>,
  id: string,
) => {
  const validatedFields = ClassroomSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Classroom.",
    };
  }

  const { division, grade, shift, userId } = validatedFields.data;

  try {
    await db.classroom.update({
      where: {
        id,
      },
      data: {
        division,
        grade,
        shift,
        userId,
      },
    });

    revalidatePath("/administration/classrooms");
    return {
      success: true,
      message: "Aula actualizada",
    };
  } catch (error) {
    console.error("Error updating classroom:", error);
    return {
      success: false,
      message: "Error al actualizar aula",
    };
  }
};

export const DeleteClassroom = async (id: string) => {
  try {
    await db.classroom.delete({
      where: {
        id,
      },
    });

    revalidatePath("/administration/classrooms");
    return {
      success: true,
      message: "Aula eliminada",
    };
  } catch (error) {
    console.error("Error deleting classroom:", error);
    return {
      success: false,
      message: "Error al eliminar aula",
    };
  }
};
