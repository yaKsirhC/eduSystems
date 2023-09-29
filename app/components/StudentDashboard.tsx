import Link from 'next/link'
import React from 'react'

export default function StudentDashboard() {
  return (
	<div className="sidebar">
      <h1>Student</h1>
      <div className="options mt-8 flex flex-col gap-4 text-lg">
        <Link href="/courses">Courses</Link>
        <Link href="/submissions">Submissions</Link>
        {/* <Link href="/"></Link> */}
      </div>
    </div>
  )
}
