"use client";

import React from "react";
import ProductCard from "./_components/product-card";
import { useSells } from "@/hooks/use-sells";

const Page = () => {
  const { sells, isLoading } = useSells();

  if (isLoading) {
    return (
      <section className="flex justify-center items-center mt-20">
        Loading...
      </section>
    );
  }

  return (
    <section className="py-4 px-10">
      <h1 className="text-3xl font-semibold">Products</h1>
      <div className="py-10">
        <div className="grid grid-cols-4 gap-4">
          {sells?.map((sell) => (
            <ProductCard
              key={sell.id}
              title={sell.title}
              img={sell.images}
              link={`/products/${sell.id}`}
              price={`$${sell.price}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Page;
