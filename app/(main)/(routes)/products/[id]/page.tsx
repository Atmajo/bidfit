"use client";

import { useSells } from "@/hooks/use-sells";
import React from "react";

const Page = ({ params }: { params: { id: string } }) => {
  const { sell, isLoading } = useSells(params.id);

  if (isLoading) {
    return (
      <section className="flex justify-center items-center mt-20">
        Loading...
      </section>
    );
  }

  return (
    <section className="py-4 px-10">
      <h1 className="text-3xl font-semibold">{sell?.title}</h1>
    </section>
  );
};

export default Page;
