import { useUser } from "@/hooks/use-user";
import React from "react";
import { Card } from "@/components/ui/card";
import { DollarSign, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const SellsCard = () => {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="w-full max-w-6xl mx-auto p-4">
        <Card className="p-8 text-center">
          <p className="text-gray-600">Please log in to view your listings</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full">
      {!user.sell || user.sell.length === 0 ? (
        <div className="p-8 text-center w-full">
          <p className="text-gray-600">You haven't created any listings yet</p>
        </div>
      ) : (
        <div className="flex">
          {user.sell.map((sell) => (
            <div
              key={sell.id}
              className="flex flex-row justify-between overflow-hidden transition-shadow bg-[#F5F5F5]/15 w-full rounded-lg p-5"
            >
              <div className="flex gap-14">
                {/* Image */}
                <div className="relative overflow-hidden">
                  {sell.images && sell.images.length > 0 ? (
                    <Image
                      src={"/images/nft.png"}
                      alt={sell.title}
                      width={100}
                      height={100}
                      className="object-cover rounded-md"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-100">
                      <p className="text-gray-400">No image available</p>
                    </div>
                  )}
                </div>

                <div>
                  <h1 className="text-xl font-bold text-white line-clamp-1">
                    {sell.title}
                  </h1>
                  <div className="mt-2">
                    <p className="line-clamp-2 text-gray-400">
                      {sell.description}
                    </p>
                  </div>
                  <p className="flex items-center text-white gap-2">
                    <Tag className="h-4 w-4" />
                    {sell.category}
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-between">
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-lg font-semibold text-white">
                    <DollarSign className="h-5 w-5" />
                    <h1>{sell.price}</h1>
                  </div>
                </div>
                <Link href={`/products/${sell.id}`}>
                  <Button className="w-full">View</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellsCard;
