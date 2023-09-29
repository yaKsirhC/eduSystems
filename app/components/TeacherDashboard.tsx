import Link from "next/link";
import React from "react";

export default function TeacherDashboard() {
  return (
    <div className="sidebar">
      <h1>Teacher</h1>
      <div className="options mt-8 flex flex-col gap-4 text-lg">
        <Link href="/courses">Courses</Link>
        <Link href="/student-submissions">Student Submissions</Link>
        {/* <Link href="/"></Link> */}
      </div>
    </div>
  );
}
