"use server";

import { db } from "@/lib/db";
import { UserSchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const GetPreceptors = async () => {
  const preceptors = await db.user.findMany({
    where: {
      role: "EDITOR",
    },
  });

  return preceptors.map((preceptor) => UserSchema.parse(preceptor));
};

export const CreatePreceptor = async (values: z.infer<typeof UserSchema>) => {
  const validatedFields = UserSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Faltan campos. No se pudo crear el preceptor.",
    };
  }

  const { firstName, lastName, email, phone } = validatedFields.data;

  try {
    await db.user.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        role: "EDITOR",
      },
    });

    revalidatePath("/administration/preceptors");
    return {
      success: true,
      message: "Preceptor creado",
    };
  } catch (error) {
    console.error("Error creating preceptor:", error);
    return {
      success: false,
      message: "Error al crear preceptor",
    };
  }
};

export const UpdatePreceptor = async (
  values: z.infer<typeof UserSchema>,
  preceptorId: string
) => {
  const validatedFields = UserSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Faltan campos. No se pudo actualizar el preceptor.",
    };
  }

  const { firstName, lastName, email, phone, role } = validatedFields.data;

  try {
    await db.user.update({
      where: {
        id: preceptorId,
      },
      data: {
        firstName,
        lastName,
        email,
        phone,
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
