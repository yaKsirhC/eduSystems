// "use client";

// import React, { useContext } from "react";
import { cookies } from "next/headers";
import { authContext } from "../context/AuthProvider";
import { getUserInfo } from "../utils/serverActions";
// import Link from "next/link";
import AdminsSidebar from "./Admin.sidebar";
import StudentDashboard from "./StudentDashboard";
import TeacherDashboard from "./TeacherDashboard";

export default async function Dashboard() {
  const auth = cookies().get('auth2')
  if(!auth) return <></>
  const user = await getUserInfo(auth.value) as any&{role: string}
  if(user.role=="admin") return <AdminsSidebar />
  if(user.role=="student") return <StudentDashboard />
  if(user.role=="teacher") return <TeacherDashboard />
  return <></>
}
