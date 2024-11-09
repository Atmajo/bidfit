"use server";

import { prisma } from "@/lib/db";
import { NotificationType } from "@prisma/client";

export async function createDefaultNotifications(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId! },
      select: {
        email: true,
        emailVerified: true,
        profileCompleted: true,
        notification: {
          where: {
            OR: [
              { type: NotificationType.EMAIL_VERIFICATION },
              { type: NotificationType.PROFILE_COMPLETION },
            ],
          },
        },
      },
    });

    if (!user) return;

    const notifications = [];

    // Check for email verification notification
    if (
      !user.emailVerified &&
      !user.notification.some(
        (n) => n.type === NotificationType.EMAIL_VERIFICATION
      )
    ) {
      notifications.push({
        userId: userId!,
        type: NotificationType.EMAIL_VERIFICATION,
        message:
          "Please verify your email address to fully activate your account",
        read: false,
        link: "/settings",
      });
    }

    // Check for profile completion notification
    if (
      !user.profileCompleted &&
      !user.notification.some(
        (n) => n.type === NotificationType.PROFILE_COMPLETION
      )
    ) {
      notifications.push({
        userId: userId!,
        type: NotificationType.PROFILE_COMPLETION,
        message: "Complete your profile to unlock all features",
        read: false,
        link: "/settings",
      });
    }

    // Bulk create notifications if any are needed
    if (notifications.length > 0) {
      await prisma.notification.createMany({
        data: notifications,
      });
    }

    return notifications;
  } catch (error) {
    console.error("Error creating default notifications:", error);
    throw error;
  }
}
