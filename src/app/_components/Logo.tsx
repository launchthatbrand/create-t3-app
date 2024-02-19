"use client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

function Logo() {
  const router = useRouter();
  return <Button onClick={() => router.push("/")}>Logo</Button>;
}

export default Logo;
