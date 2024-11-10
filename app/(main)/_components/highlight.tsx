import { highlightdata } from "@/data";
import Link from "next/link";
import React from "react";

const HighlightSection = () => {
  return (
    <div className="py-5">
      <h1 className="text-xl">Today's Highlights</h1>
      <div className="flex flex-wrap gap-8 py-5">
        {highlightdata.map(({ id, title, img, link }) => (
          <div
            key={id}
            className="flex flex-col w-1/6 cursor-pointer"
            onClick={() => (window.location.href = link)}
          >
            <img src={img} alt={title} className="w-full" />
            <p className="mt-2">{title}</p>
          </div>
        ))}
        <div className="flex flex-col justify-center items-center w-1/6">
          <Link href={"/products"}>
            <p className="mt-2">View All</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HighlightSection;
