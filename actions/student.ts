"use server";

import { db } from "@/lib/db";
import { StudentSchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const CreateStudent = async (
  values: z.infer<typeof StudentSchema>,
  gradeId: string
) => {
  const validatedFields = StudentSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create student.",
    };
  }

  const { name, lastName, tutorEmail1, tutorEmail2 } = validatedFields.data;

  try {
    const student = await db.student.create({
      data: {
        name,
        lastName,
        tutorEmail1,
        tutorEmail2,
        grade: {
          connect: {
            id: gradeId,
          },
        },
      },
    });

    const connectTutor = async (tutorEmail: string | undefined) => {
      if (tutorEmail) {
        const user = await db.user.findFirst({
          where: {
            email: tutorEmail,
          },
          select: {
            id: true,
          },
        });
  
        if (user) {
          await db.userStudent.create({
            data: {
              studentId: student.id,
              userId: user.id,
            },
          });
        }
      }
    };
  
    await connectTutor(tutorEmail1 as string);
    await connectTutor(tutorEmail2 as string);

    revalidatePath(`/administration/grades/${gradeId}/students`);
    return {
      success: true,
      message: "Alumno creado exitosamente",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error al crear alumno",
    };
  }
};

export const UpdateStudent = async (
  values: z.infer<typeof StudentSchema>,
  studentId: string,
  gradeId: string
) => {
  const validatedFields = StudentSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update student.",
    };
  }

  const { name, lastName, tutorEmail1, tutorEmail2 } = validatedFields.data;

  try {
    await db.student.update({
      where: {
        id: studentId,
      },
      data: {
        name,
        lastName,
        tutorEmail1,
        tutorEmail2,
      },
    });

    revalidatePath(`/administration/grades/${gradeId}/students`);
    return {
      success: true,
      message: "Alumno actualizado",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error al actualizar alumno",
    };
  }
};

export const DeleteStudent = async (id: string, gradeId: string) => {
  try {
    await db.student.delete({
      where: {
        id,
      },
    });

    revalidatePath(`/administration/grades/${gradeId}/students`);
    return {
      success: true,
      message: "Alumno eliminado exitosamente",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error al eliminar alumno",
    };
  }
};
