'use server';

import { db } from "@/lib/db";
import { UserSchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const EditPreceptor = async (
  values: z.infer<typeof UserSchema>,
  preceptorId: string
) => {
  const validatedFields = UserSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Preceptor.",
    };
  }

  const { firstName, lastName, role } = validatedFields.data;

  try {
    await db.user.update({
      where: {
        id: preceptorId,
      },
      data: {
        firstName,
        lastName,
        role,
      },
    });

    revalidatePath("/administration/preceptors");
    return {
      success: true,
      message: "Preceptor actualizado",
    };
  } catch (error) {
    console.error("Error updating preceptor:", error);
    return {
      success: false,
      message: "Error al actualizar preceptor",
    };
  }
};

export const DeletePreceptor = async (id: string) => {
  try {
    await db.user.delete({
      where: {
        id,
      },
    });

    revalidatePath("/administration/preceptors");
    return {
      success: true,
      message: "Preceptor eliminado",
    };
  } catch (error) {
    console.error("Error deleting preceptor:", error);
    return {
      success: false,
      message: "Error al eliminar preceptor",
    };
  }
}

export const CreateTutor = async (
  values: z.infer<typeof UserSchema>,
  studentId: string,
  pathname: string,
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
}
