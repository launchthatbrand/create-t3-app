import LoginForm from "../_components/LoginForm";
import React from "react";

function page() {
  return (
    <div className="bg-white p-5 rounded-md shadow-md text-black space-y-5">
      <h3 className="text-center font-medium">Login Page</h3>
      <LoginForm />
    </div>
  );
}

export default page;
