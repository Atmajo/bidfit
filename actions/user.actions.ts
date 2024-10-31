"use server";

import { prisma } from "@/lib/db";

export type User = {
  id: string;
  username: string;
  name: string;
  email: string;
  phone: string | null;
  role: "ADMIN" | "USER";
  emailVerified: boolean;
  profileCompleted: boolean;
  image: string;
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
        username: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        emailVerified: true,
        profileCompleted: true,
        image: true,
      },
    });

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user");
  }
}

export async function updateUser(data: {
  id: string;
  name?: string;
  phone?: string;
  image?: string;
}): Promise<User | null> {
  const { id, ...body } = data;

  if (!id) {
    return null;
  }

  try {
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: body,
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        emailVerified: true,
        profileCompleted: true,
        image: true,
      },
    });

    if (
      user.phone !== null &&
      body.phone !== null &&
      user.profileCompleted === false
    ) {
      const isCompleted = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          profileCompleted: true,
        },
        select: {
          profileCompleted: true,
        },
      });

      if (isCompleted.profileCompleted) {
        // Create notification
        await prisma.notification.create({
          data: {
            userId: id,
            message: "Profile completed!",
          },
        });
      }
    }

    return user;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
}
