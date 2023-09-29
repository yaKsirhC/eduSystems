import { Assignment, Student, StudentSubmission } from "@prisma/client";
import React from "react";

export default function SubmissionClient({ submission }: { submission: StudentSubmission & { student: Student; assignment: Assignment } }) {
  const percentage = parseInt(((100 * (submission.grade ?? 0)) / submission.assignment.points).toPrecision(2)).toFixed(1);
  return (
    <div className="grid grid-cols-4">
      <h1 className="text-xl">{submission.assignment.name}</h1>
      <a href={submission.answer}>Answer</a>
      {submission.grade ? (
        <p>
          <span>
            {submission.grade}/{submission.assignment.points}
          </span>
           <span> ({percentage}%)</span>
        </p>
      ) : (
        <p title="not graded">--- </p>
      )}
      {submission.note ? <a href={submission.note}>Teacher Note!</a>:"---"}
    </div>
  );
}
