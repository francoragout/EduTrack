"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
  BarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { z } from "zod";
import { StudentSchema } from "@/lib/zod";
import { useDispatch } from "react-redux";
import React from "react";
import { setPathname } from "@/lib/features/pathname/pathnameSlice";
import { divisions, shortGrades, shortShifts } from "@/constants/data";

const chartConfig = {
  student: {
    label: "Estudiante",
    color: "hsl(var(--background))",
  },
  attendance: {
    label: "Asistencia",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

type Student = z.infer<typeof StudentSchema>;
type Attendance = z.infer<typeof StudentSchema>;

export function StudentsBarChart({ students }: { students: Student[] }) {
  const data = students
    .map((student) => {
      const absentCount =
        student.attendance?.filter((a: Attendance) => a.status === "ABSENT")
          .length || 0;
      const lateCount =
        (student.attendance?.filter((a: Attendance) => a.status === "LATE")
          .length || 0) * 0.5;

      return {
        student: `${student.firstName} ${student.lastName} ${
          shortGrades.find((g) => g.value === student.classroom.grade)?.label
        }${
          divisions.find((d) => d.value === student.classroom.division)?.label
        }${
          shortShifts.find((s) => s.value === student.classroom.shift)?.label
        }`,
        attendance: absentCount + lateCount,
      };
    })
    .sort((a, b) => b.attendance - a.attendance); // Ordenar por número de faltas de mayor a menor

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(setPathname(`/Administración/Vista en general`));
  }, [dispatch]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vista General de Faltas</CardTitle>
        <CardDescription>Enero - Diciembre 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="student"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
              
            />
            <XAxis
              dataKey="attendance"
              type="number"
              domain={[0, 15]}
              ticks={[0, 5, 10, 15]}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="attendance"
              layout="vertical"
              fill="var(--color-attendance)"
              radius={4}
            >
              <LabelList
                dataKey="student"
                position="insideLeft"
                offset={8}
                className="fill-[--color-student]"
                fontSize={12}
              />
              <LabelList
                dataKey="attendance"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
