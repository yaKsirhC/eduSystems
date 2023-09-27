interface props {
	teacher: any
}

export default function Teacher({teacher}: props ) {
  return (
	<div className="flex gap-2 items-end">
		<h1 className="text-lg">{teacher.name}</h1>
		<h2 className="text-slate-700 ">{teacher.profession}</h2>
	</div>
  )
}
