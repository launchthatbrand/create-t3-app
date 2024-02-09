import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import Image from "next/image";
import React from "react";
import { cn } from "~/lib/utils";

function UserAvatar({
  name,
  image,
  className,
}: {
  name?: string | null;
  image?: string | null;
  className?: string;
}) {
  return (
    <Avatar className={cn("bg-white text-black", className)}>
      <Image
        src={image ?? "https://github.com/shadcn.png"}
        alt={name ?? ""}
        width={40}
        height={50}
        className="rounded-full"
      />

      {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
      <AvatarFallback
        delayMs={1000}
        className="text-lg dark:bg-white dark:text-black"
      >
        {name
          ?.split(" ")
          .map((n) => n[0])
          .join("")}
      </AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;
