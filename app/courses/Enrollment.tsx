import { Course, Teacher } from '@prisma/client'
import React from 'react'

export default function Enrollment({course}: {course: Course&{teachers: Teacher[]}}) {
  return (
	<div>
		{course.name}
		<ul>
			{
				course.teachers.map(teacher=> {
					return <div>
						<p>{teacher.name}</p>
					</div>
				})
			}
		</ul>
	</div>
  )
}
