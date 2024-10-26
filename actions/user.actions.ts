"use server";

import { prisma } from "@/lib/db";

export type User = {
  id: string;
  email: string;
  name: string;
  role: string;
};

export async function getUser(userId: string): Promise<User | null> {
  if (!userId) {
    return null;
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user");
  }
}
