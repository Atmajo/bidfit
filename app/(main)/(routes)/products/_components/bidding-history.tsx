import { Sell } from "@prisma/client";
import React from "react";

interface BiddingHistoryType {
  sell: Sell | null;
}

const BiddingHistory = ({ sell }: BiddingHistoryType) => {
  return (
    <div className="flex flex-col gap-3 pt-8">
      <h1 className="text-xl font-semibold">Bidding History</h1>
      <p className="text-2xl font-semibold">${sell?.price}</p>
    </div>
  );
};

export default BiddingHistory;
