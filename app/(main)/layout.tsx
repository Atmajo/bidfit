import React, { useEffect } from "react";
import Navbar from "@/components/shared/navbar";
import Sidebar from "@/components/shared/sidebar";
import { Toaster } from "@/components/ui/toaster";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <main>
      <Navbar />
      <Sidebar />
      {children}
      <Toaster />
    </main>
  );
};

export default MainLayout;
