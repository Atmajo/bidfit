"use client";

import React from "react";

interface ProductCardTypes {
  title: string;
  img?: string[];
  link: string;
  price: string;
  imgStyle?: React.CSSProperties;
}

const ProductCard = ({ img, title, link, price, imgStyle }: ProductCardTypes) => {
  return (
    <div
      className="flex flex-col p-2 rounded-lg border w-72 h-96 bg-white/15 cursor-pointer"
      onClick={() => (window.location.href = link)}
    >
      {img && (
        <div className="image-container" style={{ position: 'relative', width: '100%', paddingBottom: '100%' }}>
          <img src={img[0]} alt={title} style={{ ...imgStyle, position: 'absolute', top: 0, left: 0 }} />
        </div>
      )}
      <h1 className="mt-5 text-lg font-semibold">{title}</h1>
      <p>{price}</p>
    </div>
  );
};

export default ProductCard;
