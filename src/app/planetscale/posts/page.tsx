import React from "react";
import { api } from "~/trpc/server";

async function page() {
  const posts = await api.post.getAll.query();
  return (
    <div>
      Planetscale Posts
      {posts.map((post) => (
        <div
          key={post.id}
          className="rounded-md bg-white bg-opacity-10 p-3 shadow-md"
        >
          <p>Name: {post.name}</p>
          <p>ID: {post.id}</p>
        </div>
      ))}
    </div>
  );
}

export default page;
