"use client";

import { getNotifications } from "@/actions/notifications.actions";
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";

interface Notification {
  id: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
  userId: string;
}

export default async function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { userId } = useAuth();

  const fetchNotifications = async () => {
    if (userId) {
      try {
        const { notifications: fetchedNotifications } = await getNotifications(
          userId!
        );
        setNotifications(
          fetchedNotifications.map((notification) => ({
            ...notification,
            createdAt: notification.createdAt.toISOString(),
          }))
        );
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div>
      {notifications.map((notification) => (
        <div key={notification.id}>{notification.message}</div>
      ))}
    </div>
  );
}
