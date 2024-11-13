"use server";

import { db } from "@/lib/db";
import { PreceptorSchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const CreatePreceptor = async (
  values: z.infer<typeof PreceptorSchema>
) => {
  const validatedFields = PreceptorSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Preceptor.",
    };
  }
  const { name, lastName, email } = validatedFields.data;
  try {
    await db.preceptor.create({
      data: {
        name,
        lastName,
        email,
      },
    });
    revalidatePath("/administration/preceptors");
    return {
      success: true,
      message: "Preceptor creado exitosamente",
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
  id: string,
  values: z.infer<typeof PreceptorSchema>
) => {
  const validatedFields = PreceptorSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Preceptor.",
    };
  }
  const { name, lastName, email } = validatedFields.data;
  try {
    await db.preceptor.update({
      where: {
        id,
      },
      data: {
        name,
        lastName,
        email,
      },
    });
    revalidatePath("/administration/preceptors");
    return {
      success: true,
      message: "Preceptor actualizado exitosamente",
    };
  } catch (error) {
    console.error("Error updating preceptor:", error);
    return {
      success: false,
      message: "Error al actualizar preceptor",
    };
  }
}
