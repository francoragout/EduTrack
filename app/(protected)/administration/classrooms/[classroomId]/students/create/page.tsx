import StudentCreateForm from "@/components/students/student-create-form";
import { db } from "@/lib/db";

export default async function StudentCreatePage({
  params,
}: {
  params: Promise<{ classroomId: string }>;
}) {
  const classroomId = (await params).classroomId;
  const classroom = await db.classroom.findFirst({
    where: {
      id: classroomId,
    },
    select: {
      id: true,
      grade: true,
      division: true,
      shift: true,
    },
  });

  if (!classroom) {
    return <div>Classroom not found</div>;
  }

  // await db.student.createMany({
  //   data: [
  //     { firstName: 'Juan', lastName: 'Pérez', classroomId },
  //     { firstName: 'María', lastName: 'González', classroomId },
  //     { firstName: 'Carlos', lastName: 'Ramírez', classroomId },
  //     { firstName: 'Ana', lastName: 'Martínez', classroomId },
  //     { firstName: 'Lucía', lastName: 'Fernández', classroomId },
  //     { firstName: 'Pedro', lastName: 'López', classroomId },
  //     { firstName: 'Sofía', lastName: 'Morales', classroomId },
  //     { firstName: 'Javier', lastName: 'Herrera', classroomId },
  //     { firstName: 'Camila', lastName: 'Ortiz', classroomId },
  //     { firstName: 'Miguel', lastName: 'Navarro', classroomId },
  //     { firstName: 'Valentina', lastName: 'Rojas', classroomId },
  //     { firstName: 'Diego', lastName: 'Castro', classroomId },
  //     { firstName: 'Paula', lastName: 'Ruiz', classroomId },
  //     { firstName: 'Andrés', lastName: 'Romero', classroomId },
  //     { firstName: 'Isabella', lastName: 'Torres', classroomId },
  //     { firstName: 'Francisco', lastName: 'Vargas', classroomId },
  //     { firstName: 'Gabriela', lastName: 'Soto', classroomId },
  //     { firstName: 'Matías', lastName: 'Peña', classroomId },
  //     { firstName: 'Elena', lastName: 'Cabrera', classroomId },
  //     { firstName: 'Sebastián', lastName: 'Gutiérrez', classroomId },
  //   ],
  // });

  return <StudentCreateForm classroom={classroom} />
}
