"use client";

import { useState } from "react";
import { login, register } from "@/actions/auth.actions";
import { useAuthStore } from "@/store/use-auth-store";
import { RegisterData } from "@/actions/auth.actions";
import { useRouter } from "next/navigation";
import cookies from "js-cookie";
import { createDefaultNotifications } from "@/lib/notifications/default-notification";

interface UseAuthReturn {
  isLoading: boolean;
  error: string | null;
  success: boolean;
  userId: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    name: string;
  }) => Promise<void>;
  logout: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { userId, setUserId, clearAuth } = useAuthStore();
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);

      const response = await login(email, password);

      if (response.success && response.userId) {
        setUserId(response.userId);
        cookies.set("auth-token", response.token!, { expires: 7 });
        try {
          await createDefaultNotifications(response.userId);
        } catch (error) {
          console.error("Error creating default notifications:", error);
        }
        setSuccess(true);
        router.push("/");
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async ({ email, password, name }: RegisterData) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);

      const response = await register({ email, password, name });

      if (response.success && response.userId) {
        setUserId(response.userId);
        setSuccess(true);
        router.push("/login");
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    clearAuth();
    setSuccess(false);
    setError(null);
    cookies.remove("auth-token");
    router.push("/login");
  };

  return {
    isLoading,
    error,
    success,
    userId,
    isAuthenticated: !!userId,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };
};
