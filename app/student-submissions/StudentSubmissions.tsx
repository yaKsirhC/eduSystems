"use client";

import { Assignment, Course, Student, StudentSubmission } from "@prisma/client";
import React, { FormEvent } from "react";
import { gradeAssignment, uploadNote } from "../utils/serverActions";
import { toast } from "react-toastify";

interface props {
  // assignment: Assignment & { submissions: (StudentSubmission & { student: Student })[] };
  // courseName: string;
  submission: StudentSubmission & { assignment: Assignment & { course: Course }; student: Student };
}

export default function StudentSubmissions({ submission }: props) {
  async function handleUploadNote(e: FormEvent, submissionID: string) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const note = formData.get("note");
    if (!note) return toast.error("Provide a file");
    try {
      await uploadNote(submissionID, note as File);
      toast.success("Uploaded note succesfully");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message);
    }
  }
  async function handleGrade(e: FormEvent, submissionID: string, totalPoints: number) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const grade = formData.get("grade");
    if (!grade) return toast.error("Provide a score");
    try {
      await gradeAssignment(submissionID, parseInt(grade as string));
      toast.success("Graded Submission with a " + grade + " out of " + totalPoints);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message);
    }
  }

  return (
    <div className="flex flex-col bg-slate-200 py-4 w-max rounded-lg px-4">
      <div className="flex gap-4">
        <h3>{submission.assignment.course.name}</h3>
        <h1>{submission.assignment.name}</h1>
      </div>
      <div className="flex gap-4 items-end">
        <h1 className=" font-semibold text-slate-500">{submission.student.name}</h1>
        <a className="text-sm text-blue-700" href={submission.answer}>
          Click to view answer
        </a>
      </div>
      <hr className="text-slate-300 bg-slate-300 h-0.5" />
      <div className=" flex flex-col gap-2">
        <form className="flex flex-col" onSubmit={(e) => handleUploadNote(e, submission.id)}>
          <label htmlFor="">Upload a Note to the Student</label>
          <fieldset>
            <input name="note" type="file" />
            <button>Upload</button>
          </fieldset>
        </form>
        <form className="flex gap-2" onSubmit={(e) => handleGrade(e, submission.id, submission.assignment.points)}>
          <label htmlFor="">Grade Submission</label>
          <input size={6} name="grade" type="number" max={submission.assignment.points} min={0} />
          <button>Grade</button>
        </form>
      </div>
    </div>
  );
}
