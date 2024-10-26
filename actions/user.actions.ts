"use server";

import { prisma } from "@/lib/db";

export type User = {
  id: string;
  username: string;
  email: string;
  name: string;
  role: string;
  emailVerified: boolean;
  profileCompleted: boolean;
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
        username: true,
        emailVerified: true,
        profileCompleted: true,
      },
    });

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user");
  }
}
