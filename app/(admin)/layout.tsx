"use client";

import LoadingSpinner from "@/components/shared/loader-component";
import { useUser } from "@/hooks/use-user";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user?.role === "USER") {
      router.push("/");
    }
  }, [router, user, isLoading]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <main>{children}</main>;
};

export default AdminLayout;
