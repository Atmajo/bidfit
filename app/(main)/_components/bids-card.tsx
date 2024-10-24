import Image from "next/image";
import React from "react";

interface BidsCardProps {
  image: string;
  title: string;
  time: string;
  price: number;
}

const BidsCard = ({ image, title, time, price }: BidsCardProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <Image src={image} alt="" width={100} height={100} />
        <div className="flex flex-col">
          <h1>{title}</h1>
          <p className="text-sm text-gray-400">{time}</p>
        </div>
      </div>
      <h1>$ {price}</h1>
    </div>
  );
};

export default BidsCard;
