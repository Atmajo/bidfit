import { ShoppingCart, User, User2Icon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";

const Navbar = () => {
  return (
    <header className="py-4 px-8 bg-black text-white">
      <nav className="flex justify-between items-center">
        <Link href={"/"}>
          <h1 className="text-4xl">BidFit</h1>
        </Link>
        <ul className="flex items-center gap-6 list-none text-lg font-normal">
          <li>
            <a href="/#">Home</a>
          </li>
          <li>
            <a href="/#">About</a>
          </li>
          <li>
            <a href="/#">Contact</a>
          </li>
        </ul>
        <div className="flex gap-6">
          <Link href={"/account"}>
            <User className="fill-white" />
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <ShoppingCart className="fill-white" />
            </SheetTrigger>
            <SheetContent className="flex flex-col px-5 py-6">
              <SheetTitle className="text-xl">Shopping Cart</SheetTitle>
              <div className="flex flex-col items-center justify-center w-full h-full">
                <h1 className="text-3xl font-bold">No items in cart !</h1>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
