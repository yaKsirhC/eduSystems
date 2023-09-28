import prisma from "@/app/prisma";
import CourseClient from "./CourseClient";

export default async function page({ searchParams }: { searchParams: any }) {
  const course = await prisma.course.findFirst({ where: { id: searchParams.courseID } });
  const assignments = await prisma.assignment.findMany({ where: { courseID: course?.id } });
  if (!course || !assignments) return <>COURSE NOT FOUND</>;
  const teachers = await prisma.teacher.findMany({ where: { courseIDs: { has: course?.id } } });
  const students = await prisma.student.findMany({ where: { enrollmentIDs: { has: course?.id } } });
  return <CourseClient students={students} teachers={teachers} assignments={assignments} course={course} />;
}
