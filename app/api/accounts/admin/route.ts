import { NextResponse } from "next/server";
import prisma from "../../../prisma";
import bcrypt from 'bcrypt'

export async function POST(req: Request) {
	const {email, password,name} = await req.json();
	// const role = req.body.role as undefined|"admin"|"teacher"|"student"
	if(!email||!password)return new Response("Missing Field", {status:400})
	const salt = await bcrypt.genSalt(10)
	const hash = await bcrypt.hash(password, salt)
	try {
		const user = await prisma.admin.create({data:{email,name,password:hash,school:{create:{name:"test school"}}}})
		console.log('tseet')
	return NextResponse.json(user)
	} catch (error) {
		console.error(error);
		new Response(error as any, {status:500})
		return NextResponse.json({error}, {status:500})
	}
}