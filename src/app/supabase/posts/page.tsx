import React from "react";
import supabaseServer from "~/lib/supabase/server";

async function page() {
  const supabase = await supabaseServer();
  const { data, error } = await supabase.from("post").select("*");
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
