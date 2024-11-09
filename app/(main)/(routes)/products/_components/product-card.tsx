"use client";

import React from "react";

interface ProductCardTypes {
  title: string;
  img?: string[];
  link: string;
  price: string;
}

const ProductCard = ({ img, title, link, price }: ProductCardTypes) => {
  return (
    <div
      className="flex flex-col p-2 rounded-lg border w-72 h-80 bg-white/15 cursor-pointer"
      onClick={() => (window.location.href = link)}
    >
      {img && <img src={img[0]} alt={title} className="w-full h-52 rounded-md" />}
      <h1 className="mt-5 text-lg font-semibold">{title}</h1>
      <p>{price}</p>
    </div>
  );
};

export default ProductCard;
