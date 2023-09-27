interface props {
	student: any
}

export default function Student({student}: props ) {
  return (
	<div className="flex gap-2 items-end">
		<h1 className="text-lg">{student.name}</h1>
	</div>
  )
}
