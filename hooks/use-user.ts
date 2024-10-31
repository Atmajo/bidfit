"use client";

import { User, getUser } from "@/actions/user.actions";
import { useAuthStore } from "@/store/use-auth-store";
import { useUserStore } from "@/store/use-user-store";
import { useEffect, useState } from "react";

interface UseUserReturn {
  user: User | null;
  isLoading: boolean;
}

export const useUser = (): UseUserReturn => {
  const { user, setUser } = useUserStore();
  const { userId } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async (id: string) => {
    try {
      setIsLoading(true);
      const userData = await getUser(id);
      setUser(userData);
    } catch (err) {
      console.error("Error fetching user:", err);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUser(userId);
    } else {
      setUser(null);
      setIsLoading(false);
    }
  }, [userId]);

  return { user, isLoading };
};
