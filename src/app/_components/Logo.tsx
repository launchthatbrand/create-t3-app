"use client"

import { Button } from "./ui/button";
import React from "react";
import { useRouter } from "next/navigation";

function Logo() {
  const router = useRouter();
  return <Button variant={"outline"} onClick={()=> router.push('/')}>Logo</Button>;
}

export default Logo;
