import { cookies } from "next/headers";
import React from "react";
import prisma from "../prisma";
import SubmissionClient from "./SubmissionClient";

export default async function Submissions({ searchParams }: { searchParams: any }) {
  const auth = cookies().get("auth2")?.value;
  const assignmentID = searchParams.assignmentID;

  const submissions = await prisma.studentSubmission.findMany({
	include:{student:true,assignment:true},
    where: {
      studentId: auth 
    },
  });

  if (!(submissions.length>0)) return <p>SUBMISSIONS NOT FOUND</p>;
  return <div>
	{
		submissions.map(submission=>{
			return <SubmissionClient submission={submission} />
		})
	}
  </div>;
}
