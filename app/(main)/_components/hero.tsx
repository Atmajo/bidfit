"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Hero = () => {
  const [q, setQ] = useState<string>("");

  return (
    <div className="relative">
      <Image src={"https://utfs.io/f/mI18KTkFryOWZf3yq7X41hQ0cm3fL6Vx9aHOIAXGuZNzyJRt"} alt="hero" width={1000} height={1000} priority />
      <h1 className="absolute z-10 bottom-28 left-10 text-4xl font-bold">
        New and notable
      </h1>
      <div className="absolute z-10 bottom-10 left-10 flex items-center bg-[#1A2633] px-5 py-2 border border-gray-600 rounded-lg">
        <Search size={24} className="mr-2 text-gray-500" />
        <Input
          className="relative w-full bg-[#1A2633] outline-none border-none focus-within:border-none"
          placeholder="Search for anything"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <Link href={`${q && "/search?q=" + q.toLowerCase() + "&category=all"}`}>
          <Button className="ml-2 bg-sky-600 hover:bg-sky-800" size={"sm"}>
            Search
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
