import { cookies } from "next/headers";
import React from "react";
import prisma from "../prisma";
import SubmissionClient from "./SubmissionClient";

export default async function Submissions({ searchParams }: { searchParams: any }) {
  const auth = cookies().get("auth2")?.value;
  const assignmentID = searchParams.assignmentID;

  const submissions = await prisma.studentSubmission.findMany({
    include: { student: true, assignment: true },
    where: {
      studentId: auth,
    },
  });

  if (!(submissions.length > 0)) return <p>SUBMISSIONS NOT FOUND</p>;
  return (
    <div>
      <div className="grid grid-cols-4">
        <h3>Assignment</h3>
        <h3>Answer File</h3>
        <h3>Grade</h3>
        <h3>Teacher Note</h3>
      </div>
      {submissions.map((submission) => {
        return (
          <>
            <SubmissionClient submission={submission} />
          </>
        );
      })}
    </div>
  );
}
