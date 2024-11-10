// components/AuctionDate.tsx

import React, { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface AuctionDateType {
  datetime: string;
}

const AuctionDate: React.FC<AuctionDateType> = ({ datetime }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = new Date(datetime).getTime() - new Date().getTime();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const formattedDate = new Date(datetime).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col py-4 text-white rounded-lg">
      <h1 className="font-semibold pb-4">Auction Ends In</h1>
      <div className="flex space-x-4">
        <div className="text-center">
          <div className="flex items-center justify-center bg-gray-700 p-2 rounded-lg w-14 h-14">
            <h1 className="text-4xl font-semibold">{timeLeft.days}</h1>
          </div>
          <div className="text-sm pt-2">Days</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center bg-gray-700 p-2 rounded-lg w-14 h-14">
            <h1 className="text-4xl font-semibold">{timeLeft.hours}</h1>
          </div>
          <div className="text-sm pt-2">Hours</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center bg-gray-700 p-2 rounded-lg w-14 h-14">
            <h1 className="text-4xl font-semibold">{timeLeft.minutes}</h1>
          </div>
          <div className="text-sm pt-2">Minutes</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center bg-gray-700 p-2 rounded-lg w-14 h-14">
            <h1 className="text-4xl font-semibold">{timeLeft.seconds}</h1>
          </div>
          <div className="text-sm pt-2">Seconds</div>
        </div>
      </div>
      <div className="mt-10 text-sm text-gray-400">Ends on {formattedDate}</div>
    </div>
  );
};

export default AuctionDate;
