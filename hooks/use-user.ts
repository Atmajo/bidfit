"use client";

import { User, getUser } from "@/actions/user.actions";
import { useAuthStore } from "@/store/use-auth-store";
import { useUserStore } from "@/store/use-user-store";
import { useEffect } from "react";

interface UseUserReturn {
  user: User | null;
}

export const useUser = (): UseUserReturn => {
  const { user, setUser } = useUserStore();
  const { userId } = useAuthStore();

  const fetchUser = async (id: string) => {
    try {
      const userData = await getUser(id);
      setUser(userData);
    } catch (err) {
      console.error("Error fetching user:", err);
      setUser(null);
    }
  };
  
  useEffect(() => {
    if (userId) {
      fetchUser(userId);
    } else {
      setUser(null);
    }
  }, [userId]);

  return { user };
};
