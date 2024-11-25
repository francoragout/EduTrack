"use server";

import { db } from "@/lib/db";
import { UserSchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const CreateAdmin = async (values: z.infer<typeof UserSchema>) => {
  const validatedFields = UserSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Faltan campos. No se pudo crear el administrador.",
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
        role: "ADMIN",
      },
    });

    revalidatePath("/administration/admins");
    return {
      success: true,
      message: "Administrador creado",
    };
  } catch (error) {
    console.error("Error creating admin:", error);
    return {
      success: false,
      message: "Error al crear administrador",
    };
  }
};

export const UpdateAdmin = async (
  values: z.infer<typeof UserSchema>,
  adminId: string
) => {
  const validatedFields = UserSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Faltan campos. No se pudo actualizar el administrador.",
    };
  }

  const { firstName, lastName, email, phone, role } = validatedFields.data;

  try {
    await db.user.update({
      where: {
        id: adminId,
      },
      data: {
        firstName,
        lastName,
        email,
        phone,
        role,
      },
    });

    revalidatePath("/administration/admins");
    return {
      success: true,
      message: "Administrador actualizado",
    };
  } catch (error) {
    console.error("Error updating admin:", error);
    return {
      success: false,
      message: "Error al actualizar administrador",
    };
  }
};

export const DeleteAdmin = async (id: string) => {
  try {
    const countAdmins = await db.user.count({
      where: {
        role: "ADMIN",
      },
    });

    if (countAdmins === 1) {
      return {
        success: false,
        message: "No se puede eliminar el único administrador",
      };
    }

    await db.user.delete({
      where: {
        id,
      },
    });

    revalidatePath("/administration/preceptors");
    return {
      success: true,
      message: "Administrador eliminado",
    };
  } catch (error) {
    console.error("Error deleting admin:", error);
    return {
      success: false,
      message: "Error al eliminar administrador",
    };
  }
};
