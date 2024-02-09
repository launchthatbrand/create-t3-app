import React from "react";
import supabaseServer from "~/lib/supabase/server";

async function page() {
  const supabase = await supabaseServer();
  const { data } = await supabase.from("post").select();
  console.log("result", data);
  return (
    <div>
      Supabase Posts
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

export default page;
