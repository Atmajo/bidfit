import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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

export const generateUsername = () => {
  const colors = [
    "Red",
    "Blue",
    "Green",
    "Purple",
    "Golden",
    "Silver",
    "Crimson",
    "Azure",
    "Emerald",
    "Ruby",
    "Sapphire",
    "Amber",
    "Coral",
    "Indigo",
    "Jade",
    "Lavender",
    "Maroon",
    "Navy",
    "Olive",
    "Pink",
    "Teal",
    "Violet",
    "Turquoise",
    "Cobalt",
  ];

  const animals = [
    "Panda",
    "Tiger",
    "Lion",
    "Eagle",
    "Dolphin",
    "Wolf",
    "Fox",
    "Owl",
    "Falcon",
    "Dragon",
    "Phoenix",
    "Penguin",
    "Koala",
    "Lynx",
    "Hawk",
    "Jaguar",
    "Leopard",
    "Raven",
    "Beaver",
    "Badger",
    "Raccoon",
    "Otter",
    "Hedgehog",
    "Seal",
  ];

  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
  const randomNumber = Math.floor(Math.random() * 100);

  return `${randomColor}${randomAnimal}${randomNumber}`;
};
