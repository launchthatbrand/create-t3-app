import React from "react";
import RegisterForm from "../_components/RegisterForm";

function RegisterPage() {
  return (
    <div className="bg-white p-5 rounded-md shadow-md text-black space-y-5">
      <h3 className="text-center font-medium">Register Page</h3>
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
