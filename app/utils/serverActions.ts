"use server";
import bcrypt from "bcrypt";
import prisma from "../prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Assignment } from "../types";
import { Teacher } from "@prisma/client";

export async function createCourse(description: string, name: string, students: any[], assignments: Assignment[], teachers: any[]) {
  try {
	if(assignments.length==0) return;
    await prisma.course.create({
      data: {
        description,
        name,
        assignments: { createMany: { data: assignments } },
        students: { connect: students },
        teachers: { connect: teachers },
      },
    });
  } catch (error) {
    console.error(error);
    return { error };
  }
}

// export async function createAssignment(points: number, name: string, description: string, attachments: File[]) {
//   try {
//     const assignment = await prisma.assignment.create({
//       data: {
//         description,
//         name,
//         points,
//         attachments: ["https://edusystems.nyc3.cdn.digitaloceanspaces.com/DeepinScreenshot_select-area_20230926221803.png"],
//       },
//     });
//     return { assignment };
//   } catch (error) {
//     console.error(error);
//     return { error };
//   }
// }

export async function registerTeacher(email: string, password: string, name: string, profession: string) {
  console.log("hit");
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  try {
    await prisma.teacher.create({
      data: {
        email,
        name,
        profession,
        password: hash,
      },
    });
    redirect("/");
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}

export async function registerStudent(email: string, password: string, name: string) {
  console.log("hit");
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  try {
    await prisma.student.create({
      data: {
        email,
        name,
        password: hash,
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}
