import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export function NFTCard() {
  return (
    <div className="grid grid-cols-5 items-center gap-4">
      <div className="col-span-3 space-y-10">
        <Image
          src="https://nft.wsatraining.com/wp-content/uploads/2021/09/wsa_nft_5dc_klueart-scaled.jpeg"
          alt=""
          height={600}
          width={600}
          className="h-auto w-[200px] rounded-full"
        />
        <h1 className="text-6xl font-extrabold tracking-tight">
          Wall Street Academy
          <span className="text-[hsl(280,100%,70%)]"> 5 Day Class</span> NFT
          Edition
        </h1>
        <div className="space-x-5">
          <Button>Learn More</Button>
          <Button>Learn More</Button>
          <Button>Learn More</Button>
        </div>
      </div>
      <div className="col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>
              Deploy your new project in one-click.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md">
              <span className="absolute bg-yellow-300 px-5 py-3">
                EXCLUSIVE
              </span>
              <Image
                src="https://nft.wsatraining.com/wp-content/uploads/2021/09/wsa_nft_5dc_klueart-scaled.jpeg"
                alt=""
                height={600}
                width={600}
                className="h-auto w-full"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
