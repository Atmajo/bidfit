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
    img: "/images/sneaker.png",
  },
  {
    id: 2,
    title: "Pens",
    img: "/images/pen.png",
  },
  {
    id: 3,
    title: "Fine Jewelry",
    img: "/images/jewellery.png",
  },
  {
    id: 4,
    title: "Art",
    img: "/images/art.png",
  },
  {
    id: 5,
    title: "Collectible Cards",
    img: "/images/card.png",
  },
  {
    id: 6,
    title: "Vintage Fashion",
    img: "/images/vintage-fashion.png",
  },
  {
    id: 7,
    title: "Comic Books",
    img: "/images/comic.png",
  },
  {
    id: 8,
    title: "Handbags",
    img: "/images/handbag.png",
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
    title: "Sneakers",
  },
  {
    id: 3,
    title: "Collectibles",
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
