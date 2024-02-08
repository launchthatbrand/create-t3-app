import React from "react";
import supabaseServer from "~/lib/supabase/server";

interface Post {
  name: string;
}

async function page() {
  const supabase = await supabaseServer();
  const result = await supabase.from("post").select("*");

  const data = result.data as Post[];

  console.log("result", data);
  return (
    <div className="w-">
      Supabase Posts
      {data?.map((item, index) => (
        <div
          className="rounded-md bg-white bg-opacity-10 p-3 shadow-md"
          key={index}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
}

export default page;
