import { Button } from "../_components/ui/button";
import React from "react";
import RegisterForm from "../_components/RegisterForm";

function RegisterPage() {
  return (
    <div className="flex flex-col items-center space-y-5 rounded-md bg-white p-5 text-black shadow-md">
      <h3 className="text-center font-medium">Register Page</h3>
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
