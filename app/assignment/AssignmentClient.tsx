"use client";

import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { Assignment, Course, StudentSubmission } from "@prisma/client";
import React, { useContext } from "react";
import { authContext } from "../context/AuthProvider";
import { enrollStudent, submitAssignment, uploadToS3 } from "../utils/serverActions";
import Link from "next/link";
import { toast } from "react-toastify";

interface props {
  course: Course;
  assignment: Assignment;
}

export default function AssignmentClient({ course, assignment }: props) {
  // @ts-ignore
  const { user } = useContext(authContext);

  console.log((user.submissions as StudentSubmission[]))

  return (
    <div>
      <Link href={"/course?courseID=" + course.id}>{course.name}</Link>
      <h1>{assignment.name}</h1>
      <h2>{assignment.description}</h2>
      <div className="">
        <p>Attachments</p>
        <ul>
          {assignment.attachments.map((attachment) => {
            return (
              <a href={attachment}>
                <Icon icon="bx:file" />
              </a>
            );
          })}
        </ul>
      </div>
      {user.role == "student" && course.studentID.includes(user.id) ? (
        <>
          {(user.submissions as StudentSubmission[]).findIndex((samp) => samp.assignmentID == assignment.id) == -1 ? (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const file = formData.get('answer') as File|null
                if(!file) return toast.error("Please Provide an Answer")
                // console.log(file)
                const tmp = new FormData();
                tmp.append("file2upload", file)
                const url = await uploadToS3(tmp)
                try {
                  await submitAssignment(url, assignment.id, user.id);
                  toast.success("Submitted Assignment");
                } catch (error: any) {
                  console.error(error);
                  toast.error(error.message ?? "Unexpected error");
                }
              }}
            >
              <label htmlFor="answer">Your answer here:</label>
              <input type="file" name="answer" />
              <button>Submit</button>
            </form>
          ) : (
            <p>Already Submitted</p>
          )}
        </>
      ) : (
        <button className="bg-cgreen text-white" onClick={() => enrollStudent(user.id, course.id)}>
          Enroll
        </button>
      )}
    </div>
  );
}
