"use client";

import React, { useState } from "react";

const Page = () => {
  const [activeTab, setActiveTab] = useState("Bids");

  const tabs = ["Bids", "Watchlist", "Won", "Lost"];

  return (
    <section className="ml-96">
      <nav className="flex flex-col border-b-2 border-[#314861] px-14 pt-10">
        <h1 className="text-4xl font-bold">Welcome, {"User"}</h1>
        <div className="mt-10 relative">
          <div className="flex justify-between">
            {tabs.map((tab) => (
              <div
                key={tab}
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
    </section>
  );
};

export default Page;
