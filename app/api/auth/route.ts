import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma";
import bcrypt from 'bcrypt'
import { cookies } from "next/headers";
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	const {email, role, password} = await req.json()
	// const role = req.body.role as undefined|"admin"|"teacher"|"student"
	if(!email||!password||!role)return new Response("Missing Field", {status:400})
	const found = await (prisma[role] as any).findFirst({where:{email}})
	if(!found) return new Response("Email not found", {status: 404});
	const authorized = bcrypt.compare(password, found?.password as string)
	if(!authorized) return new Response("Incorrect password", {status:403})
	return new Response("Logged In", {status:200, headers: { 'Set-Cookie': `auth=${found?.id}` },})
}