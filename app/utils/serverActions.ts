"use server";
import bcrypt from "bcrypt";
import prisma from "../prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Assignment } from "../types";

export async function gradeAssignment(submissionID: string, grade: number) {
  try {
    await prisma.studentSubmission.update({
      where: { id: submissionID },
      data: {
        grade,
      },
    });
  } catch (err) {
    console.error(err);
    return { error: err };
  }
}

export async function uploadNote(submissionID: string, note: File) {
  const noteURL = "https://edusystems.nyc3.cdn.digitaloceanspaces.com/DeepinScreenshot_select-area_20230926221803.png";
  try {
    await prisma.studentSubmission.update({
      where: { id: submissionID },
      data: {
        note: noteURL,
      },
    });
  } catch (err) {
    console.error(err);
    return { error: err };
  }
}

export async function submitAssignment(answer: string, assignmentID: string, studentId: string) {
  try {
    const submission = await prisma.studentSubmission.create({
      data: {
        answer,
        assignmentID,
        studentId,
      },
    });
    const newUser = await prisma.student.update({
      where: { id: studentId },
      data: {
        submissions: {
          connect: { id: submission.id },
        },
      },
    });
    await prisma.assignment.update({
      where: { id: assignmentID },
      data: {
        submissions: {
          connect: { id: submission.id },
        },
      },
    });
    revalidatePath("/assignment?assignmentID=" + assignmentID);
  } catch (error: any) {
    console.error(error);
    return { error: error.message };
  }
}

export async function enrollStudent(studentID: string, courseID: string) {
  try {
    const newUser = await prisma.student.update({ where: { id: studentID }, data: { enrollmentIDs: { push: courseID } } });
    const newCourse = await prisma.course.update({ where: { id: courseID }, data: { studentID: { push: studentID } } });
    revalidatePath("/course?courseID=" + courseID);
  } catch (error: any) {
    console.error(error);
    return { error: error.message };
  }
}

export async function getUserInfo(auth: string) {
  const stud = await prisma.student.findFirst({ where: { id: auth }, include: { enrollments: true, school: true, submissions: true } });
  if (stud) {
    return { user: stud, role: "student" };
  }
  const teacher = await prisma.teacher.findFirst({ where: { id: auth } });
  if (teacher) return { user: teacher, role: "teacher" };
  const admin = await prisma.admin.findFirst({ where: { id: auth } });
  if (admin) return { user: admin, role: "admin" };
  return new Response("not found", { status: 404 });
}

export async function createCourse(description: string, name: string, students: any[], assignments: Assignment[], teachers: any[]) {
  try {
    if (assignments.length == 0) return;
    await prisma.course.create({
      data: {
        description,
        name,
        assignments: { createMany: { data: assignments } },
        students: { connect: students },
        teachers: { connect: teachers },
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.error(error);
    return { error };
  }
}

export async function registerTeacher(email: string, password: string, name: string, profession: string) {
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
    revalidatePath("/");
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}

export async function registerStudent(email: string, password: string, name: string) {
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
