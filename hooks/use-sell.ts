"use client";

import { getSellById, getSells } from "@/actions/sell.actions";
import { useAuthStore } from "@/store/use-auth-store";
import { Sell } from "@prisma/client";
import { useEffect, useState } from "react";

interface SellReturn {
  sell: Sell | null;
  isLoading: boolean;
}

export const useSell = (id: string): SellReturn => {
  const [sell, setSell] = useState<Sell | null>(null);
  const { userId } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  const fetchSell = async (id: string) => {
    try {
      setIsLoading(true);
      const sellsData = await getSellById(id);
      setSell(sellsData.sell!);
    } catch (err) {
      console.error("Error fetching sell:", err);
      setSell(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchSell(id!);
    } else {
      setSell(null);
      setIsLoading(false);
    }
  }, [userId]);

  return { sell, isLoading };
};
