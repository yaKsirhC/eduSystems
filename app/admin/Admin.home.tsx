import Admin from "./Admin";
import prisma from "@/app/prisma";
import "../styles/adminHome.scss";

export default async function AdminHome() {
  const courses = await prisma.course.findMany();
  const students = await prisma.student.findMany();
  const teachers = await prisma.teacher.findMany();

  return <Admin courses={courses} students={students} teachers={teachers} />;
}
