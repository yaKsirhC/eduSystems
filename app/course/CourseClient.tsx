"use client"

import { Assignment, Course, Student, Teacher } from "@prisma/client";
import React, { useContext } from "react";
import { authContext } from "../context/AuthProvider";
import { enrollStudent } from "../utils/serverActions";
import Link from "next/link";

interface props {
  course: Course;
  assignments: Assignment[];
  teachers: Teacher[];
  students: Student[];
}

export default function CourseClient({ course, assignments, students, teachers }: props) {
	// @ts-ignore
	const {user} = useContext(authContext)

	console.log(course.studentID)

  return (
    <div>
      <h1>{course.name}</h1>
      <p>{course.description}</p>
	  {
		user.role == "student" && students.findIndex(sample=>sample.id==user.id) ==-1 && (
			<button  className="bg-cgreen text-white" onClick={()=>enrollStudent(user.id, course.id)}>Enroll</button>

		)
	  }
      <div className="">
        <h2>Teachers:</h2>
        <ul>
          {teachers.map((teacher) => {
            return <p key={teacher.id}>{teacher.name}</p>;
          })}
        </ul>
      </div>
      <div className="">
        <h2>Assignments in the Course:</h2>
        <ul>
          {assignments.map((assignment) => {
            return <Link key={assignment.id} href={"/assignment?assignmentID="+assignment.id}>
				<p>{assignment.name}</p>
				<p>{assignment.description}</p>
				<p>{assignment.points}</p>
			</Link> 
          })}
        </ul>
      </div>
    </div>
  );
}
