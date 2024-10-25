import { OurFileRouter } from "@/app/api/uploadthing/core";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { generateReactHelpers } from "@uploadthing/react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateTimeDifference(biddedTime: string): string {
  const diffInMs = new Date().getTime() - new Date(biddedTime).getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  } else if (diffInMinutes < 60 * 24) {
    const diffInHours = Math.floor(diffInMinutes / 60);
    return `${diffInHours} hours ago`;
  } else if (diffInMinutes < 60 * 24 * 365) {
    const diffInDays = Math.floor(diffInMinutes / (60 * 24));
    return `${diffInDays} days ago`;
  } else {
    const diffInYears = Math.floor(diffInMinutes / (60 * 24 * 365));
    return `${diffInYears} years ago`;
  }
}
