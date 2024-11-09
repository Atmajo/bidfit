"use server";

import { prisma } from "@/lib/db";

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

export const getSells = async () => {
  try {
    const sells = await prisma.sell.findMany();

    return { sells: sells, status: 200, success: true };
  } catch (err) {
    console.log(err);
    return {
      error: "Error getting sells",
      status: 500,
      success: false,
    };
  }
};

export const getSellById = async (id: string) => {
  try {
    const sell = await prisma.sell.findUnique({
      where: {
        id: id,
      },
    });

    return { sell: sell, status: 200, success: true };
  } catch (err) {
    console.log(err);
    return {
      error: "Error getting sell",
      status: 500,
      success: false,
    };
  }
};
