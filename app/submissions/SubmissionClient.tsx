import { Assignment, Student, StudentSubmission } from "@prisma/client";
import React from "react";

export default function SubmissionClient({ submission }: { submission: StudentSubmission & { student: Student; assignment: Assignment } }) {
  return (
    <div>
		<h1>{submission.assignment.name}</h1>
      <a href={submission.answer}>Answer</a>
        {submission.grade ? (
          <p>
            {submission.assignment.points}/{submission.grade}
          </p>
        ) : (
          <p title="not graded">--- </p>
        )}
    </div>
  );
}
