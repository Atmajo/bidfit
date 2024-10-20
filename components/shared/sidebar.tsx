"use client";

import { sidebardata } from "@/data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const path = usePathname();

  const moredata = ["Settings", "Help Center", "Log Out"];

  return (
    <aside
      className={cn(
        "absolute top-0 left-0 w-96 h-screen px-14 py-10 bg-inherit z-20",
        path === "/profile" ? "block" : "hidden"
      )}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-4">
          {sidebardata.map(({ id, title, icon: Icon, link }) => (
            <Link
              key={id}
              href={link}
              className={cn(
                "flex items-center gap-4 px-4 py-2",
                path === link && "rounded-lg bg-[#243546] shadow-md"
              )}
            >
              <Icon size={20} />
              <h1>{title}</h1>
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-8">
          {moredata.map((item) => (
            <h1>{item}</h1>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
