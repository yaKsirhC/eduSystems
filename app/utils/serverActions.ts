"use server";
import bcrypt from "bcrypt";
import prisma from "../prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Assignment } from "../types";
import { s3 } from "../aws";
import { generateRandomHex } from "./utils";

export async function uploadToS3(formData: FormData) {
  const file = formData.get("file2upload") as File;
  const cut = file.name.split('.')
  const ext = cut.at(-1)
  const name = cut.slice(0,-1)
  const response = await s3.upload({ Bucket: "edusystems", Key: name + "---" + generateRandomHex(5) + "." + ext , Body: new Uint8Array(await file.arrayBuffer()),ACL: 'public-read',}).promise();
  const fileURL = response.Location;
  return fileURL
}

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
  const tmp = new FormData();
  tmp.append("file2upload", note);
  const noteURL = await uploadToS3(tmp);
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
    redirect("/submissions");
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
