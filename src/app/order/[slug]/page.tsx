"use client";

import { Button } from "~/app/_components/ui/button";
import CheckinForm from "~/app/_components/CheckinForm";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { slug: string } }) {
  const router = useRouter();
  return (
    <div className="container flex flex-col items-center space-y-10">
      <Button onClick={() => router.push("/")}>Back To Dashboard</Button>
      <CheckinForm />
    </div>
  );
}
