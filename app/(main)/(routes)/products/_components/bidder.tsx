import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const Bidder = () => {
  return (
    <div className="flex flex-col gap-3 py-5">
      <h1 className="text-xl font-semibold">Place a Bid</h1>
      <Input placeholder="$ 10,000" className="bg-gray-700" />
      <Button className="mt-5 bg-gray-700 hover:bg-gray-600">Place Bid</Button>
    </div>
  );
};

export default Bidder;
