import LoginForm from "../_components/LoginForm";
import React from "react";

function LoginPage() {
  return (
    <div className="rounded-md bg-slate-50 p-5 shadow-md">
      <p className="text-center font-medium">Login Page</p>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
