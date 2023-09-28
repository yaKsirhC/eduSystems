"use client"

import { toast } from 'react-toastify';
import {Icon} from '@iconify-icon/react'

import '../auth.scss'
import Link from 'next/link';
import { FormEvent, useContext, useEffect } from 'react';
import http from '@/app/restClient';
import { Student } from '@/app/types';
import { useRouter } from 'next/navigation';
import { getCookie } from '@/app/utils/getCookie';
import { authContext } from '@/app/context/AuthProvider';


export default function page() {
	// @ts-ignore
	const {setUser} = useContext(authContext)
	const router = useRouter()

	useEffect(() => {
		if(getCookie("auth2")){
			router.push('/')
		}
	},[])

	async function handleSubmit(e: FormEvent){
		e.preventDefault()
		const formData = new FormData(e.target as HTMLFormElement)
		const email = formData.get('email')
		const password = formData.get('password')
		if(!email||!password)return toast.error("Missing field")
		try {
			const res = await http.post<Student>("/auth", {
				email, password, role: "student"
			})
			console.log(res.data)
			setUser({email: res.data.email, name: res.data.name, role: "student" })
			router.push('/')
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
			<h2 className="text-lg text-gray-900">Student Log-in</h2>
		  </div>
		  <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 mt-16 self-center">
			<fieldset>
			  <h2>Email</h2>
			  <input type="email" name='email' required />
			</fieldset>
			<fieldset>
			  <h2>Password</h2>
			  <input type="password" name='password' required />
			</fieldset>
			<div className="btns flex self-stretch gap-2">
			  <button type="button" onClick={() => toast.info("Get these Credentials from your teacher") } className="px-2 text-blue-600 flex items-center" title="Get these Credentials from your teacher">
				<Icon icon="material-symbols:info" color="inherit" height={24} />
			  </button>
			  <button className="px-2 py-1 bg-cgreen text-white hover:bg-dcgreen w-full text-xl">Log in</button>
			</div>
			<hr className="w-full" />
			<div className="links">
				<Link href='/auth/teacher' className="text-gray-600 hover:text-cgreen transition-all">Log in as teacher</Link>
			</div>
		  </form>
		</div>
	  );
}
