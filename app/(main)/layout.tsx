import React from "react";
import Navbar from "@/components/shared/navbar";
import Sidebar from "@/components/shared/sidebar";
import Loader from "./_components/loading";
import { LoadingProvider } from "@/provider/loading-provider";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <LoadingProvider>
      <main>
        <Loader />
        <Navbar />
        <Sidebar />
        {children}
      </main>
    </LoadingProvider>
  );
};

export default MainLayout;
