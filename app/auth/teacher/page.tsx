"use client"

import { toast } from 'react-toastify';
import '../auth.scss'
import { Icon } from '@iconify-icon/react/dist/iconify.js';
import Link from 'next/link';
import { FormEvent } from 'react';
import axios from 'axios';
import http from '@/app/restClient';

export default function page() {

	async function handleSubmit(e: FormEvent){
		e.preventDefault()
		const formData = new FormData(e.target as HTMLFormElement)
		const email = formData.get('email')
		const password = formData.get('password')
		if(!email||!password)return toast.error("Missing field")
		try {
			const res = await http.post("/auth", {
				email, password, role: "teacher"
			})
		} catch (error: any) {
			console.error(error);
			toast.error(error.response.data??error.message)
		}
	}

	return (
		<div className="auth flex flex-col h-full">
		  <div className="flex flex-col items-center mt-8">
			<img src="/logo.svg" alt="Edu Systems" className="h-[36px]" />
			<h1 className="text-3xl font-semibold">Edu Systems</h1>
			<h2 className="text-lg text-gray-900">Teacher Log-in</h2>
		  </div>
		  <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 mt-16 self-center">
			<fieldset>
			  <h2>Email</h2>
			  <input name="email" type="email" required />
			</fieldset>
			<fieldset>
			  <h2>Password</h2>
			  <input name="password" type="password" required />
			</fieldset>
			<div className="btns flex self-stretch gap-2">
			  <button type="button" onClick={() => toast.info("Get these Credentials from your admin")} className="px-2 text-blue-600 flex items-center" title="Get these Credentials from your admin">
				<Icon icon="material-symbols:info" color="inherit" height={24} />
			  </button>
			  <button className="px-2 py-1 bg-cgreen text-white hover:bg-dcgreen w-full text-xl">Log in</button>
			</div>
			<hr className="w-full" />
			<div className="links">
			  <Link href="/auth/student" className="text-gray-600 hover:text-cgreen transition-all">
				Log in as student
			  </Link>
			</div>
		  </form>
		</div>
	  );
}
