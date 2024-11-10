"use client";

import { useSell } from "@/hooks/use-sell";
import React from "react";
import AuctionDate from "../_components/auction-date";
import Bidder from "../_components/bidder";
import BiddingHistory from "../_components/bidding-history";

const Page = ({ params }: { params: { id: string } }) => {
  const { sell, isLoading } = useSell(params.id);

  if (isLoading) {
    return (
      <section className="flex justify-center items-center mt-20">
        Loading...
      </section>
    );
  }

  if (sell === null) {
    return (
      <section className="flex justify-center items-center mt-20">
        Oops! Product not found
      </section>
    );
  }

  return (
    <section className="flex flex-col lg:flex-row gap-10 py-4 px-10">
      <div className="flex flex-col w-full lg:w-3/5">
        <div className="flex flex-row py-5">
          <div className="flex w-60 h-60">
            {sell?.images.map((image) => (
              <img
                src={image}
                alt={image}
                className="w-full rounded-lg object-cover"
              />
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-semibold">{sell?.title}</h1>
          <p className="text-medium font-extralight mt-2">
            {sell?.description}
          </p>
        </div>
        <BiddingHistory sell={sell} />
      </div>
      <div className="flex flex-col-reverse lg:flex-col gap-3 w-full lg:w-2/5">
        <AuctionDate datetime={sell?.endDate.toISOString()!} />
        <Bidder />
      </div>
    </section>
  );
};

export default Page;
