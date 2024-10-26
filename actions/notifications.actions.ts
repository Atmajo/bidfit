"use server";

import { prisma } from "@/lib/db";
import { pusher } from "@/lib/pusher";
import { revalidatePath } from "next/cache";

export async function getNotifications(userId: string) {
  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return { notifications };
  } catch (error) {
    throw new Error("Failed to fetch notifications");
  }
}

export async function createNotification({
  userId,
  message,
  type,
}: {
  userId: string;
  message: string;
  type: string;
}) {
  try {
    const notification = await prisma.notification.create({
      data: {
        userId,
        message,
        type,
      },
    });

    // Trigger real-time update
    await pusher.trigger(`user-${userId}`, "new-notification", notification);

    revalidatePath("/");
    return { notification };
  } catch (error: any) {
    console.log(error);
    throw new Error("Failed to create notification");
  }
}

export async function markNotificationAsRead(id: string) {
  try {
    const notification = await prisma.notification.update({
      where: { id },
      data: { read: true },
    });

    // Trigger real-time update for read status
    await pusher.trigger(
      `user-${notification.userId}`,
      "notification-read",
      notification
    );

    revalidatePath("/");
    return { notification };
  } catch (error) {
    throw new Error("Failed to mark notification as read");
  }
}

export async function deleteNotification(id: string) {
  try {
    const notification = await prisma.notification.delete({
      where: { id },
    });

    revalidatePath("/");
    return { notification };
  } catch (error) {
    throw new Error("Failed to delete notification");
  }
}
