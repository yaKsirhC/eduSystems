"use client";

import React, { createContext, useEffect, useState } from "react";
import { getUserInfo } from "../utils/serverActions";
import { getCookie } from "../utils/getCookie";
import { toast } from "react-toastify";
export const authContext = createContext({});

export default function AuthProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
  });
  useEffect(() => {
    const auth = getCookie("auth2");
    if (!auth) return;
    (async () => {
      try {
        const res = (await getUserInfo(auth)) as any;
        setUser({ ...res.user, role:res.role });
      } catch (error) {
        toast.error("Could not sync, please re log in");
      }
    })();
  }, []);

  return <authContext.Provider value={{ user, setUser }}>{children}</authContext.Provider>;
}
