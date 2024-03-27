import { CreatePost } from "~/app/_components/create-post";
import Link from "next/link";
import { Session } from "@supabase/supabase-js";
import { api } from "~/trpc/server";
import { getServerAuthSession } from "~/server/auth";
import { unstable_noStore as noStore } from "next/cache";
import { readUserSession } from "./(auth)/actions";
import { NFTCard } from "./_components/NFTCard";

export default async function Home() {
  noStore();
  const hello = await api.post.hello.query({ text: "from tRPC" });
  // const session = await getServerAuthSession();
  const {
    data: { session },
  } = await readUserSession();

  return (
    <div className="flex-1">
      <NFTCard />
    </div>
  );
}
