"use client";

import LoadingSpinner from "@/components/shared/loader-component";
import { useLoading } from "@/provider/loading-provider";
import { useEffect, useState } from "react";

const Loader = () => {
  const { isLoading } = useLoading();
  
  if (!isLoading) {
    return null;
  }

  return (
    <div className="relative loader z-50">
      <LoadingSpinner />
    </div>
  );
};

export default Loader;
