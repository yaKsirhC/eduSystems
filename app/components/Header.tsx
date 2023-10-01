import React from "react";
import { cookies } from "next/headers";
import HeaderClient from "./HeaderClient";

export default async function Header() {
  const auth = cookies().get("auth2");
  if (!auth) return <></>;

  return <HeaderClient />;
}
