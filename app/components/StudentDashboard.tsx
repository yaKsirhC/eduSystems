"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function StudentDashboard() {
  const pathname = usePathname()
  
  console.log(pathname)

  return (
	<div className="sidebar">
      <h1>Student</h1>
      <div className="options mt-8 flex flex-col gap-4 text-lg">
        <Link href="/courses" className={pathname=="/courses"?"underline":""}>Courses</Link>
        <Link href="/submissions" className={pathname=="/submissions"?"underline":""}>Submissions</Link>
        {/* <Link href="/"></Link> */}
      </div>
    </div>
  )
}
