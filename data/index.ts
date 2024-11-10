import { calculateTimeDifference } from "@/lib/utils";
import {
  Clock,
  Heart,
  Home,
  LucideCompass,
  Search,
  UserCircle2,
} from "lucide-react";

export const highlightdata = [
  {
    id: 1,
    title: "Sneakers",
    img: "https://utfs.io/f/mI18KTkFryOWMbTicWppBCNZFExLOXAVGaKs2YWh9PceDkvm",
    link: "products?category=sneakers",
  },
  {
    id: 2,
    title: "Pens",
    img: "https://utfs.io/f/mI18KTkFryOWfQgbIDVl0DJ3CIdjKFWZLauzRT4Gy2iY8bM7",
    link: "products?category=pens",
  },
  {
    id: 3,
    title: "Fine Jewelry",
    img: "https://utfs.io/f/mI18KTkFryOWdHnyn7Ble8ZjcXNiQU9bFBMqaDPvpwVg2osW",
    link: "products?category=jewelry",
  },
  {
    id: 4,
    title: "Art",
    img: "https://utfs.io/f/mI18KTkFryOWWqx7IdO1ht8migB9oYDybUv7GfN3CkS6dZLw",
    link: "products?category=art",
  },
  {
    id: 5,
    title: "Collectible Cards",
    img: "https://utfs.io/f/mI18KTkFryOWfQgbIDVl0DJ3CIdjKFWZLauzRT4Gy2iY8bM7",
    link: "products?category=cards",
  },
  {
    id: 6,
    title: "Vintage Fashion",
    img: "https://utfs.io/f/mI18KTkFryOWTcncjY2I7dBRQyvehYtCp5WUxgIEr0812fql",
    link: "products?category=fashion",
  },
  {
    id: 7,
    title: "Comic Books",
    img: "https://utfs.io/f/mI18KTkFryOWfQgbIDVl0DJ3CIdjKFWZLauzRT4Gy2iY8bM7",
    link: "products?category=comic",
  },
  {
    id: 8,
    title: "Handbags",
    img: "https://utfs.io/f/mI18KTkFryOWOR8lGy2QbhA4XozcpHFsrnZt5BENLJuv3VYx",
    link: "products?category=handbag",
  },
];

export const typedata = [
  {
    id: 1,
    title: "All",
  },
  {
    id: 2,
    title: "Art",
  },
  {
    id: 4,
    title: "Fashion",
  },
  {
    id: 5,
    title: "Jewelry",
  },
  {
    id: 6,
    title: "Clothing",
  },
  {
    id: 3,
    title: "Collectibles",
  },
  {
    id: 7,
    title: "Others",
  },
];

export const sidebardata = [
  {
    id: 1,
    title: "Home",
    icon: Home,
    link: "/",
  },
  {
    id: 2,
    title: "Auctions",
    icon: Clock,
    link: "/auctions",
  },
  {
    id: 3,
    title: "Marketplace",
    icon: Search,
    link: "/search",
  },
  {
    id: 4,
    title: "Explore",
    icon: LucideCompass,
    link: "/explore",
  },
  {
    id: 5,
    title: "Activity",
    icon: Heart,
    link: "/#",
  },
  {
    id: 6,
    title: "Profile",
    icon: UserCircle2,
    link: "/profile?tab=bids",
  },
];

export const bidsdata = [
  {
    id: 1,
    image: "/images/nft.png",
    title: "Mona Lisa NFT",
    time: calculateTimeDifference(new Date().toISOString()),
    price: 1000,
  },
];
