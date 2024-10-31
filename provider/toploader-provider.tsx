"use client";

import { usePathname, useSearchParams } from "next/navigation";
import React, { useState, useEffect, createContext, useContext } from "react";

// Create loading context
const LoadingContext = createContext({
  isLoading: false,
  setIsLoading: (loading: boolean) => {},
});

// Progress bar component
const TopLoader = () => {
  const { isLoading } = useContext(LoadingContext);
  const [progress, setProgress] = useState(0);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    let startTimeout: NodeJS.Timeout;
    let resetTimeout: NodeJS.Timeout;

    if (isLoading) {
      setOpacity(1);
      // Start from 0
      setProgress(0);

      // Wait a bit before starting
      startTimeout = setTimeout(() => {
        // Increment to 90% over 3 seconds
        progressInterval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 90) {
              clearInterval(progressInterval);
              return 90;
            }
            return prev + 5;
          });
        }, 100);
      }, 50);
    } else {
      // Complete the progress
      setProgress(100);

      // Fade out and reset
      resetTimeout = setTimeout(() => {
        setOpacity(0);
        setTimeout(() => setProgress(0), 200);
      }, 200);
    }

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(resetTimeout);
      clearInterval(progressInterval);
    };
  }, [isLoading]);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 z-50 bg-gray-200/20"
      style={{ opacity }}
    >
      <div
        className="h-full bg-sky-500 transition-all duration-200 ease-out"
        style={{
          width: `${progress}%`,
          transition: isLoading ? "width 100ms" : "width 200ms, opacity 200ms",
        }}
      />
    </div>
  );
};

// Provider component
export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      <TopLoader />
      {children}
    </LoadingContext.Provider>
  );
};

// Hook to use the loading state
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }
  return context;
};

export function NavigationLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { setIsLoading } = useLoading();
  
  useEffect(() => {
    setIsLoading(false);
  }, [pathname, searchParams, setIsLoading]);
  
  return null;
}

export default TopLoader;
