"use server";

import { db } from "@/lib/db";
import { StudentSchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const CreateStudent = async (values: z.infer<typeof StudentSchema>) => {
  const validatedFields = StudentSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create student.",
    };
  }

  const { name, lastName, dateOfBirth } = validatedFields.data;

  try {
    await db.student.create({
      data: {
        name,
        lastName,
        dateOfBirth,
      },
    });

    revalidatePath("/administration/students");
    return {
      success: true,
      message: "Alumno creado exitosamente.",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error al crear alumno.",
    };
  }
};
