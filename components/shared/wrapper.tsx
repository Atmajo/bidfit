import { cn } from "@/lib/utils";
import React from "react";

interface WrapperProps {
  children: React.ReactNode;
  className?: string;
}

const Wrapper = ({ children, className }: WrapperProps) => {
  return <div className={cn("flex flex-col max-w-4xl py-5", className)}>{children}</div>;
};

export default Wrapper;
