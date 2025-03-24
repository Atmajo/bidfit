"use client";

import LoginComponent from "@/components/shared/login-component";
import RegisterComponent from "@/components/shared/register-component";
import React from "react";

const AuthPage = () => {
  return (
    <div className="flex flex-col md:flex-row md:gap-10 gap-14 items-center justify-center h-screen max-w-5xl mx-auto p-6">
      <LoginComponent />
      <RegisterComponent />
    </div>
  );
};

export default AuthPage;
