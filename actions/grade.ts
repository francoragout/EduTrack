"use server";

import { db } from "@/lib/db";
import { GradeSchema } from "@/lib/zod";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export const CreateGrade = async (values: z.infer<typeof GradeSchema>) => {
  const validatedFields = GradeSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Grade.",
    };
  }

  const { division, grade, shift } = validatedFields.data;

  try {
    await db.grade.create({
      data: {
        division,
        grade,
        shift,
      },
    });

    revalidatePath("/administration/grades");
    return {
      success: true,
      message: "El grado fue creado exitosamente.",
    };
  } catch (error) {
    console.error("Error creating grade:", error);
    return {
      success: false,
      message: "Error al crear grado.",
    };
  }
};
