"use server";

import { db } from "@/lib/db";
import { UserSchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const CreateTutor = async (
  values: z.infer<typeof UserSchema>,
  studentId: string,
  pathname: string
) => {
  const validatedFields = UserSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Tutor.",
    };
  }

  const { firstName, lastName, email, phone } = validatedFields.data;

  try {
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      await db.userOnStudent.create({
        data: {
          user: {
            connect: {
              id: existingUser.id,
            },
          },
          student: {
            connect: {
              id: studentId,
            },
          },
        },
      });
    } else {
      await db.userOnStudent.create({
        data: {
          user: {
            create: {
              firstName,
              lastName,
              email,
              phone,
            },
          },
          student: {
            connect: {
              id: studentId,
            },
          },
        },
      });
    }

    revalidatePath(pathname);
    return {
      success: true,
      message: "Tutor creado",
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
  values: z.infer<typeof UserSchema>,
  tutorId: string,
  pathname: string
) => {
  const validatedFields = UserSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Tutor.",
    };
  }

  const { firstName, lastName, email, phone } = validatedFields.data;

  try {
    await db.user.update({
      where: {
        id: tutorId,
      },
      data: {
        firstName,
        lastName,
        email,
        phone,
      },
    });

    revalidatePath(pathname);
    return {
      success: true,
      message: "Tutor actualizado",
    };
  } catch (error) {
    console.error("Error updating tutor:", error);
    return {
      success: false,
      message: "Error al actualizar tutor",
    };
  }
};

export const DeleteTutor = async (
  tutorId: string,
  studentId: string,
  pathname: string
) => {
  try {
    const tutorRelations = await db.userOnStudent.findMany({
      where: {
        userId: tutorId,
      },
    });

    if (tutorRelations.length > 1) {
      await db.userOnStudent.delete({
        where: {
          userId_studentId: {
            userId: tutorId,
            studentId,
          },
        },
      });
      revalidatePath(pathname);
      return {
        success: true,
        message: "Relacion eliminada",
      };
    } else {
      await db.user.delete({
        where: {
          id: tutorId,
        },
      });
      revalidatePath(pathname);
      return {
        success: true,
        message: "Tutor eliminado",
      };
    }
  } catch (error) {
    console.error("Error deleting tutor:", error);
    return {
      success: false,
      message: "Error al eliminar tutor",
    };
  }
};
