import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "../prisma";
import Enrollment from "./Enrollment";
import { getUserInfo } from "../utils/serverActions";

export default async function page() {
  if (!cookies().get("auth2")?.value) return redirect("/auth/student");
  
  const user = await prisma.student.findFirst({
    where: { id: cookies().get("auth2")?.value },
    include: {
      enrollments: {
        include: {
          teachers: true,
        },
      },
    },
  });
  
  if(user) return (
	  <div>
      {user?.enrollments.map((enrollment,i) => {
		  return <Enrollment course={enrollment} key={i} />;
		})}
    </div>
  );

  const teacher = await prisma.teacher.findFirst({
	  where: { id: cookies().get("auth2")?.value },
	  include: {
		  courses: {
			  include: {
				  teachers: true,
				},
			},
		},
	});
	return <div>
	{teacher?.courses.map((course,i) => {
		return <Enrollment course={course} key={i} />;
	  })}
  </div>

}
