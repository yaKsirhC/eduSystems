"use client";

import React, { useContext } from "react";
import { authContext } from "../context/AuthProvider";
import { eraseCookie } from "../utils/getCookie";
import { useRouter } from "next/navigation";

export default function Header() {
  // @ts-ignore
  const { user, setUser } = useContext(authContext);
  const router = useRouter()

  function logOut() {
    eraseCookie('auth2')
    setUser({id:"",name:"",email:"",role:""})
    return []
  }

  return (
    <header className="border-b-2 px-4 border-slate-300 py-2 flex justify-end">
      {
        user && (
          <div>
            <h1 className="text-xl">{user.name&& user.name}</h1>
            <button className="exit" onClick={()=>{
              eraseCookie("auth2")
              logOut()
              router.push('/')
            }}>Exit</button>
          </div>
        )
      }
    </header>
  );
}
