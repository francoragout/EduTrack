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

  const { division, grade, shift, preceptorEmail } = validatedFields.data;

  try {
    const gradeId = await db.grade.create({
      data: {
        division,
        grade,
        shift,
        preceptorEmail,
      },
    });

    if (preceptorEmail) {
      const userId = await db.user.findUnique({
        where: {
          email: preceptorEmail,
        },
        select: {
          id: true,
        },
      });

      if (userId) {
        await db.grade.update({
          where: {
            id: gradeId.id,
          },
          data: {
            userId: userId.id,
          },
        });
      }
    }

    revalidatePath("/administration/grades");
    return {
      success: true,
      message: "Grado creado exitosamente",
    };
  } catch (error) {
    console.error("Error creating grade:", error);
    return {
      success: false,
      message: "Error al crear grado",
    };
  }
};

export const UpdateGrade = async (
  id: string,
  values: z.infer<typeof GradeSchema>
) => {
  const validatedFields = GradeSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Grade.",
    };
  }

  const { division, grade, shift, preceptorEmail } = validatedFields.data;

  try {
    const gradeId = await db.grade.update({
      where: {
        id,
      },
      data: {
        division,
        grade,
        shift,
        preceptorEmail,
      },
    });

    if (preceptorEmail) {
      const userId = await db.user.findUnique({
        where: {
          email: preceptorEmail,
        },
        select: {
          id: true,
        },
      });

      if (userId) {
        await db.grade.update({
          where: {
            id: gradeId.id,
          },
          data: {
            userId: userId.id,
          },
        });
      }
    }

    revalidatePath("/administration/grades");
    return {
      success: true,
      message: "Grado actualizado",
    };
  } catch (error) {
    console.error("Error updating grade:", error);
    return {
      success: false,
      message: "Error al actualizar grado",
    };
  }
};

export const DeleteGrade = async (id: string) => {
  try {
    await db.grade.delete({
      where: {
        id,
      },
    });

    revalidatePath("/administration/grades");
    return {
      success: true,
      message: "Grado eliminado",
    };
  } catch (error) {
    console.error("Error deleting grade:", error);
    return {
      success: false,
      message: "Error al eliminar grado",
    };
  }
};
