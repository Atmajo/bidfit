import Navbar from "@/components/shared/navbar";
import Sidebar from "@/components/shared/sidebar";
import { cn } from "@/lib/utils";
import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <main>
      <Navbar />
      <Sidebar />
      {children}
    </main>
  );
};

export default MainLayout;
