import { Toaster } from "@/components/ui/sonner";
import { config } from "@/lib/config";
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <GoogleOAuthProvider clientId={config.goole_client_id}>
      <div>
        {children}
        <Toaster />
      </div>
    </GoogleOAuthProvider>
  );
};

export default AuthLayout;
