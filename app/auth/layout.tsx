import { Toaster } from "@/components/ui/sonner";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      {children}
      <Toaster />
    </main>
  );
};

export default AuthLayout;
