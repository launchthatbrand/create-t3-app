import { AiFillEnvironment } from "react-icons/ai";
import React from "react";

function AdminSidebarNavigation() {
  return (
    <div className="inline-flex">
      <AiFillEnvironment className="float-left mr-2 block cursor-pointer rounded bg-amber-300 text-4xl" />
      <h1
        className={`origin-left text-2xl font-medium text-white ${
          !open && "scale-0"
        }`}
      >
        Tailwind
      </h1>
    </div>
  );
}

export default AdminSidebarNavigation;
