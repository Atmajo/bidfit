"use client";

import { getSellById, getSells } from "@/actions/sell.actions";
import { useAuthStore } from "@/store/use-auth-store";
import { Sell } from "@prisma/client";
import { useEffect, useState } from "react";

interface SellReturn {
  sells: Sell[] | null;
  isLoading: boolean;
}

export const useSells = (id?: string): SellReturn => {
  const [sells, setSells] = useState<Sell[] | null>(null);
  const { userId } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  const fetchSells = async () => {
    try {
      setIsLoading(true);
      const sellsData = await getSells();
      setSells(sellsData.sells!);
    } catch (err) {
      console.error("Error fetching sells:", err);
      setSells(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchSells();
    } else {
      setSells(null);
      setIsLoading(false);
    }
  }, [userId]);

  return { sells, isLoading };
};
