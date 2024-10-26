"use client";

import { useEffect, useState, useTransition, useRef } from "react";
import { Bell, Loader2, Trash2 } from "lucide-react";
import { pusherClient } from "@/lib/pusher";
import {
  getNotifications,
  markNotificationAsRead,
  deleteNotification,
} from "@/actions/notifications.actions";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";

interface Notification {
  id: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
  userId: string;
  link?: string;
}

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isClient, setIsClient] = useState(false);

  const { userId } = useAuth();

  // Initialize audio on client side only
  useEffect(() => {
    setIsClient(true);
    audioRef.current = new Audio("/notification-sound.wav");
  }, []);

  const playNotificationSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((error) => {
        console.log("Audio playback failed:", error);
      });
    }
  };

  const fetchNotifications = async () => {
    if (userId) {
      try {
        const { notifications: fetchedNotifications } = await getNotifications(
          userId!
        );
        setNotifications(
          fetchedNotifications.map((notification) => ({
            ...notification,
            link: "",
            createdAt: notification.createdAt.toISOString(),
          }))
        );
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    }
  };

  const handleMarkAsRead = (id: string) => {
    startTransition(async () => {
      try {
        const { notification } = await markNotificationAsRead(id);
        setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
      } catch (error) {
        console.error("Failed to mark notification as read:", error);
      }
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      try {
        await deleteNotification(id);
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      } catch (error) {
        console.error("Failed to delete notification:", error);
      }
    });
  };

  useEffect(() => {
    if (!isClient) return; // Don't run this effect on server

    fetchNotifications();

    // Subscribe to user-specific notification channels
    const channel = pusherClient.subscribe(`user-${userId}`);

    // Handle new notifications
    channel.bind("new-notification", (notification: Notification) => {
      setNotifications((prev) => [notification, ...prev]);
      playNotificationSound();
      // Show browser notification
      if (
        typeof window !== "undefined" &&
        "Notification" in window &&
        Notification.permission === "granted"
      ) {
        new Notification("New Notification", {
          body: notification.message,
        });
      }
    });

    // Handle read status updates
    channel.bind("notification-read", (updatedNotification: Notification) => {
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === updatedNotification.id
            ? { ...notification, read: true }
            : notification
        )
      );
    });

    // Request notification permission
    if (typeof window !== "undefined" && "Notification" in window) {
      Notification.requestPermission();
    }

    return () => {
      pusherClient.unsubscribe(`user-${userId}`);
    };
  }, [userId, isClient]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="relative" aria-label="Notifications" size="icon">
            <Bell className="h-6 w-6" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="absolute -right-20 mt-6 w-80 bg-[#1A2633] rounded-lg shadow-lg border z-50">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">
                Notifications
              </h3>
              {isPending && (
                <Loader2 className="h-4 w-4 animate-spin text-white" />
              )}
            </div>
            {notifications.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No notifications</p>
            ) : (
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg ${
                      notification.read ? "bg-gray-50" : "bg-blue-50"
                    } relative group`}
                  >
                    <div
                      className="cursor-pointer"
                      onClick={() => handleMarkAsRead(notification.id)}
                    >
                      <p className="text-sm text-black pr-6">
                        {notification.message}
                      </p>
                      <span className="text-xs text-gray-500">
                        {new Date(notification.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDelete(notification.id)}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-200 rounded"
                      aria-label="Delete notification"
                    >
                      <Trash2 className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
