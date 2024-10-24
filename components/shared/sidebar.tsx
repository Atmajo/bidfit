"use client";

import { sidebardata } from "@/data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/use-auth";

const Sidebar = () => {
  const path = usePathname();

  const { logout } = useAuth();

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
                path === link ||
                  (link.startsWith(path) && "rounded-lg bg-[#243546] shadow-md")
              )}
            >
              <Icon size={20} />
              <h1>{title}</h1>
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-8">
          <h1>Settings</h1>
          <Link href={"/help"}>Help Center</Link>
          <button className="text-left" onClick={logout}>
            Log Out
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
