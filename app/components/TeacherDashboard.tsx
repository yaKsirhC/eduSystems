import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function TeacherDashboard() {
  const pathname = usePathname()

  return (
    <div className="sidebar">
      <h1>Teacher</h1>
      <div className="options mt-8 flex flex-col gap-4 text-lg">
        <Link href="/courses" className={pathname=="/courses"?"underline":""}>Courses</Link>
        <Link href="/student-submissions" className={pathname=="/student-submissions"?"underline":""}>Student Submissions</Link>
        {/* <Link href="/"></Link> */}
      </div>
    </div>
  );
}
