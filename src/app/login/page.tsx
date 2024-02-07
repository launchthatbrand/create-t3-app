import LoginForm from "../_components/LoginForm";
import React from "react";

function page() {
  return (
    <div className="space-y-5 rounded-md bg-white p-5 text-black shadow-md">
      <h3 className="text-center font-medium">Login Page</h3>
      <LoginForm />
    </div>
  );
}

export default page;
