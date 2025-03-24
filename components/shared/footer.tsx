"use client";

import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { toast } from "sonner";

const Footer = () => {
  const [email, setEmail] = React.useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/newsletter`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        toast.success("Subscribed successfully!");
      } else {
        toast.error("Failed to subscribe. Please try again later.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <footer className="flex flex-col px-8 py-16">
      <div className="grid grid-cols-5 pb-12">
        <div className="grid col-span-1">
          <h1 className="text-2xl font-semibold">Explore</h1>
          <ul className="list-none text-normal font-extralight py-6 space-y-4">
            <li>Fashion Essentials</li>
            <li>Gadgets Galore</li>
            <li>Collectibles</li>
          </ul>
        </div>
        <div className="grid col-span-1">
          <h1 className="text-2xl font-semibold">About BidFit</h1>
          <ul className="list-none text-normal font-extralight py-6 space-y-4">
            <li>Our Story</li>
            <li>Careers</li>
            <li>Press</li>
          </ul>
        </div>
        <div className="grid col-span-1">
          <h1 className="text-2xl font-semibold">Customer Service</h1>
          <ul className="list-none text-normal font-extralight py-6 space-y-4">
            <li>Faq</li>
            <li>Contact Us</li>
            <li>Shipping & returns</li>
          </ul>
        </div>
        <div className="grid col-span-1"></div>
        <div className="grid col-span-1">
          <h1 className="text-2xl font-semibold">Stay Updated</h1>
          <p className="text-normal font-extralight">
            Subscribe to our newsletter for the latest auction news and
            exclusive deals.
          </p>
          <form
            className="flex flex-row w-full"
            method="post"
            onSubmit={handleSubscribe}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-black px-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="bg-black text-white px-3 cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <hr className="border border-black" />
      <div className="flex flex-row justify-between items-center pt-12">
        <p className="text-normal font-extralight">
          © 2021 BidFit. All rights reserved.
        </p>
        <div className="flex flex-row space-x-10">
          <a href="/" className="text-normal font-extralight">
            Terms of Service
          </a>
          <a href="/" className="text-normal font-extralight">
            Privacy Policy
          </a>
        </div>
        <div className="flex flex-row space-x-8">
          <Facebook className="w-5 h-5" />
          <Instagram className="w-5 h-5" />
          <Twitter className="w-5 h-5" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
