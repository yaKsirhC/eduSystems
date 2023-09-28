import React from "react";
import prisma from "../prisma";
import AssignmentClient from "./AssignmentClient";

export default async function page({ searchParams }: { searchParams: any }) {
  const assignment = await prisma.assignment.findFirst({ where: { id: searchParams.assignmentID } });
  const course = await prisma.course.findFirst({ where: { assignments: { some: { id: searchParams.assignmentID } } } });
  if(!course||!assignment)return<>ASSIGNMENT NOT FOUND</>;
  return <AssignmentClient assignment={assignment} course={course} />;
}
