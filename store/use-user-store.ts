import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserType {
  id: string;
  username: string;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  emailVerified: boolean;
  profileCompleted: boolean;
  image: string | null;
}

interface UserState {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage",
    }
  )
);
