import React from 'react'
import PageContent from './PageContent'
import prisma from '@/app/prisma'

export default async function page() {

  const teachers = await prisma.teacher.findMany()
  const students = await prisma.student.findMany()

  return (
    <PageContent teachers={teachers as any} students={students as any}  />
  )
}
