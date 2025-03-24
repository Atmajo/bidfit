import React from "react";
import RegisterForm from "../forms/register-form";

const RegisterComponent = () => {
  return (
    <div className="flex flex-col items-start justify-start gap-5 w-full">
      <h1 className="text-5xl font-bold">Register</h1>
      <RegisterForm />
    </div>
  );
};

export default RegisterComponent;
