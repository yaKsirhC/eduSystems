import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function AdminsSidebar() {
  const pathname = usePathname()

  return (
    <section className="sidebar ">
      <h1 className="text-xl">Admin</h1>
      <div className="options mt-8 flex flex-col gap-4 text-lg">
        {/* <Link href="/">Students</Link> */}
        {/* <Link href="/">Teachers</Link> */}
        <Link href="/courses" className={pathname=="/courses"?"underline":""}>Courses</Link>
      </div>
    </section>
  );
}
