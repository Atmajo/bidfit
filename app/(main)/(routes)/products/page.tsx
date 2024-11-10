"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./_components/product-card";
import { useSells } from "@/hooks/use-sells";
import CategoryFilter from "./_components/category-filter";
import Filter from "./_components/filter";
import { Loader2 } from "lucide-react";
import { useDebouncer } from "@/hooks/use-debouncer";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const { sells, isLoading } = useSells();
  const paramCategory = useSearchParams();
  const [category, setCategory] = useState<string>(
    paramCategory.get("category")!
  );

  useEffect(() => {
    setCategory(paramCategory.get("category")!);
  }, [paramCategory.get("category")]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (category) {
      window.history.pushState({}, "", `?category=${category}`);
    } else {
      params.set("category", "all");
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, "", newUrl);
    }
  }, [category]);

  if (isLoading) {
    return (
      <section className="flex justify-center items-center mt-20">
        <Loader2 className="animate-spin mr-2" />
        Loading
      </section>
    );
  }

  return (
    <section className="py-4 px-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Products</h1>
        <div className="flex gap-4">
          {/* <Filter /> */}
          <CategoryFilter category={category || ""} setCategory={setCategory} />
        </div>
      </div>
      <div className="py-10">
        <div className="grid grid-cols-4 gap-4" key={1}>
          {sells?.map((sell) =>
            category === "all" || sell.category === category ? (
              <ProductCard
                key={sell.id}
                title={sell.title}
                img={sell.images}
                link={`/products/${sell.id}`}
                price={`$${sell.price}`}
                imgStyle={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            ) : (
              <div key={`no-product-${sell.id}`}>
                <h1>No products found</h1>
              </div>
            )
          )}
        </div>
        {sells?.length === 0 && (
          <div className="w-full">
            <h1 className="text-center">No products found</h1>
          </div>
        )}
      </div>
    </section>
  );
};

export default Page;
