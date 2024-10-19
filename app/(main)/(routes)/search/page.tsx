"use client";

import Wrapper from "@/components/shared/wrapper";
import { Input } from "@/components/ui/input";
import { typedata } from "@/data";
import { useDebouncer } from "@/hooks/use-debouncer";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  // get the serach params from the url
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const cat = searchParams.get("category") || "all";

  // set the value of the input to the search params
  const [value, setValue] = useState<string>(q!);
  const [category, setCategory] = useState<string>(cat!);
  const [focus, setFocus] = useState<{ title: string; isFocus: boolean }>({
    title: category!,
    isFocus: true,
  });

  // debounce the search value
  const debouncedValue = useDebouncer(value, 500);
  const debouncedCategory = useDebouncer(category, 500);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (debouncedValue) {
      params.set("q", debouncedValue);
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, "", newUrl);
    } else {
      params.set("q", value);
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, "", newUrl);
    }
  }, [debouncedValue]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (debouncedCategory) {
      params.set("category", debouncedCategory);
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, "", newUrl);
    } else {
      params.set("category", "all");
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, "", newUrl);
    }
  }, [debouncedCategory]);

  return (
    <section className="flex flex-col items-center px-40">
      <Wrapper className="w-full">
        <div className="flex items-center bg-[#243647] px-5 py-1 border border-gray-600 rounded-lg w-full shadow-md">
          <Search size={24} className="mr-2 text-gray-500" />
          <Input
            className="relative bg-[#243647] outline-none border-none focus-within:border-none w-full"
            placeholder="Search for anything"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className="flex gap-5 py-5">
          {typedata.map(({ id, title }) => (
            <div
              className={cn(
                "bg-[#243647] px-3 py-2 rounded-lg cursor-pointer border border-gray-500 shadow-md select-none",
                focus?.isFocus &&
                  focus.title === title.toLowerCase() &&
                  "bg-slate-900"
              )}
              onClick={() => {
                setFocus({ title: title.toLowerCase(), isFocus: true });
                setCategory(title.toLowerCase());
              }}
              key={id}
            >
              {title}
            </div>
          ))}
        </div>
        <div className="py-5">
          <h1 className="text-2xl font-semibold">Items</h1>
        </div>
      </Wrapper>
    </section>
  );
};

export default Page;
