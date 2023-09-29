import React from "react";
import prisma from "../prisma";
import { cookies } from "next/headers";
import StudentSubmissions from "./StudentSubmissions";
import { redirect } from "next/navigation";

export default async function page() {
  if (!cookies().get("auth2")?.value) return redirect("/auth/teacher");
  const courses = await prisma.course.findMany({ where: { teacherID: { has: cookies().get("auth2")?.value } }, include: { assignments: { include: { submissions: { include: { student: true } } } } } });
  const submissions = await prisma.studentSubmission.findMany({
    where: { assignment: { course: { teacherID: { has: cookies().get("auth2")?.value } } } },
    include: {
      assignment: { include: { course: true } },
      student: true
    },
  });
  const assignments = courses.map((el) => el.assignments);
  return (
    <div className="flex gap-4 flex-col">
      {submissions.map(submission => {
        return <StudentSubmissions key={submission.id} submission={submission} />
      })}
    </div>
  );
}
