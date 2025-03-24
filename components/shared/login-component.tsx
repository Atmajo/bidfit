import React from "react";
import Link from "next/link";
import LoginForm from "../forms/login-form";

const LoginComponent = () => {
  return (
    <div className="flex flex-col items-start justify-start gap-5 w-full">
      <h1 className="text-5xl font-bold">Login</h1>
      <LoginForm />
      <Link href="/forgot-password">
        <span className="text-sm font-light text-secondary">
          Forgot Password?
        </span>
      </Link>
    </div>
  );
};

export default LoginComponent;
