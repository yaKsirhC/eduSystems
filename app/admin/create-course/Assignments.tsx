import { Assignment } from '@prisma/client'
import React from 'react'

export default function Assignments({assignment}: {assignment: Assignment}) {
  return (
	<div>
		{assignment.name}
	</div>
  )
}
