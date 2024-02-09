import React from "react";
import supabaseServer from "~/lib/supabase/server";

type Post = {
  name: string;
  id: string;
};

async function SupabasePostsPage() {
  const supabase = await supabaseServer();
  const result = await supabase.from("post").select("*");
  const data = result.data as Post[];
  return (
    <div className="space-y-3">
      <p> Supabase Posts:</p>
      {data?.map((item) => (
        <div
          key={item.id}
          className="rounded-md bg-white bg-opacity-10 p-3 shadow-md"
        >
          <p>{item.name}</p>
          <p>{item.id}</p>
        </div>
      ))}
    </div>
  );
}

export default SupabasePostsPage;
