import Admin from "../Admin";
import prisma from "@/app/prisma";
import "../../styles/adminHome.scss";
import { s3 } from "@/app/aws";

export default async function AdminHome() {
  const courses = await prisma.course.findMany();
  const students = await prisma.student.findMany();
  const teachers = await prisma.teacher.findMany();
    s3.upload({
      Bucket: "edusystems", Key:"example.kkk",Body: new Uint8Array(await(new File([new Blob([new Uint8Array([0, 0, 0, 0, 0])])], "guugu.lolo" )).arrayBuffer())
    }, (err, data) => {
		if (err) {
			console.error('Error:', err);
		  } else {
			console.log('File uploaded successfully:', data.Location);
		  }
		
	})

  return <Admin courses={courses} students={students} teachers={teachers} />;
}
