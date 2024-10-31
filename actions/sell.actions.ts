"use server";

import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

interface Sell {
  title: string;
  category: string;
  description: string;
  price: string;
  condition: string;
  images: string[];
  userId: string;
}

export const addSell = async (data: Sell) => {
  try {
    const sell = await prisma.sell.create({
      data: data,
    });

    return { sell: sell, status: 200, success: true };
  } catch (err) {
    console.log(err);
    return {
      error: "Error adding sell",
      status: 500,
      success: false,
    };
  }
};
