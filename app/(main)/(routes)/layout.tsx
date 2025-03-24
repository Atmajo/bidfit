import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <main className="w-full min-h-screen">{children}</main>;
};

export default RootLayout;
