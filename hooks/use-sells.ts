"use client";

import { getSellById, getSells } from "@/actions/sell.actions";
import { useAuthStore } from "@/store/use-auth-store";
import { Sell } from "@prisma/client";
import { useEffect, useState } from "react";

interface SellReturn {
  sell: Sell | null;
  sells: Sell[] | null;
  isLoading: boolean;
}

export const useSells = (id?: string): SellReturn => {
  const [sell, setSell] = useState<Sell | null>(null);
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
      fetchSells();
    } else {
      setSell(null);
      setSells(null);
      setIsLoading(false);
    }
  }, [userId]);

  return { sell, sells, isLoading };
};
