"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import BidsCard from "../../_components/bids-card";
import { bidsdata } from "@/data";
import { useUser } from "@/hooks/use-user";
import { useLoading } from "@/provider/loading-provider";

const Page = () => {
  const [activeTab, setActiveTab] = useState("Bids");

  const tabs = ["Bids", "Watchlist", "Won", "Lost"];

  const { user } = useUser();
  const { setLoading } = useLoading();
  
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    params.set("tab", activeTab.toLowerCase());
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }, [activeTab]);

  return (
    <section className="ml-96">
      <nav className="flex flex-col border-b-2 border-[#314861] px-14 pt-10">
        <h1 className="text-4xl font-bold">
          Welcome, {user?.username}
        </h1>
        <div className="mt-10 relative">
          <div className="flex justify-between">
            {tabs.map((tab, index) => (
              <div
                key={index}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 text-center cursor-pointer`}
              >
                <h1 className="text-lg pb-5">{tab}</h1>
              </div>
            ))}
          </div>
          <div
            className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-300"
            style={{
              width: `${100 / tabs.length}%`,
              transform: `translateX(${tabs.indexOf(activeTab) * 100}%)`,
            }}
          />
        </div>
      </nav>
      <div className="py-5 px-14">
        {activeTab === "Bids" &&
          bidsdata.map(({ id, image, title, time, price }) => (
            <BidsCard
              key={id}
              image={image}
              title={title}
              time={time}
              price={price}
            />
          ))}
        {activeTab === "Watchlist" && <div>Watchlist content</div>}
        {activeTab === "Won" && <div>Won content</div>}
        {activeTab === "Lost" && <div>Lost content</div>}
      </div>
    </section>
  );
};

export default Page;
