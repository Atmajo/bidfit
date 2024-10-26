"use client";

import { Bell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import Profile from "../profile";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import NotificationBell from "../notification-bell";

interface NavbarProps {
  className?: string;
}

const Navbar = ({ className }: NavbarProps) => {
  const path = usePathname();

  return (
    <header
      className={cn(
        "px-10 py-5 border-b",
        className,
        path === "/profile" && "hidden"
      )}
    >
      <nav className="flex justify-between items-center">
        <Link href={"/"} className="flex gap-2 justify-center items-center">
          <Image
            src={
              "https://utfs.io/f/mI18KTkFryOWVMY4JwGgv6oOV9d5axzTNcbPUsQYlLFtyC4K"
            }
            alt="logo"
            width={24}
            height={24}
          />
          <h1 className="text-2xl">BidFit</h1>
        </Link>
        <div className="flex justify-center items-center gap-2">
          <Link href="/sell">
            <Button className="bg-sky-600 hover:bg-sky-800 px-4 py-2 font-bold">
              Sell
            </Button>
          </Link>
          <NotificationBell />
          <Link href="/profile">
            <Profile />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
