"use client";

import React, { useContext } from "react";
import { authContext } from "../context/AuthProvider";
import Link from "next/link";
import AdminsSidebar from "./Admin.sidebar";
import StudentDashboard from "./StudentDashboard";
import TeacherDashboard from "./TeacherDashboard";

export default function Dashboard() {
	// @ts-ignore
  const { user } = useContext(authContext);
  if(!user) return <></>
  if(user.role=="admin") return <AdminsSidebar />
  if(user.role=="student") return <StudentDashboard />
  if(user.role=="teacher") return <TeacherDashboard />
  return <></>
}
