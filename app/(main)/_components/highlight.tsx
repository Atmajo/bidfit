import { highlightdata } from "@/data";
import React from "react";

const HighlightSection = () => {
  return (
    <div className="py-5">
      <h1 className="text-xl">Today's Highlights</h1>
      <div className="flex flex-wrap gap-8 py-5">
        {highlightdata.map(({ id, title, img }) => (
          <div key={id} className="flex flex-col w-1/6">
            <img src={img} alt={title} className="w-full" />
            <p className="mt-2">{title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HighlightSection;
