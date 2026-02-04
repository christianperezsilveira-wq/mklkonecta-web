"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";

export interface NotificationState {
    hasNotifications: boolean;
    count: number;
    items: NotificationItem[];
}

export interface NotificationItem {
    id: string;
    message: string;
    link?: string;
    type: "INFO" | "WARNING" | "URGENT";
}

export const checkNotifications = async (): Promise<NotificationState> => {
    const session = await auth();
    if (!session?.user) return { hasNotifications: false, count: 0, items: [] };

    const notifications: NotificationItem[] = [];

    // 1. CHECK FOR PENDING USERS (ADMIN ONLY)
    if (session.user.role === "ADMIN") {
        try {
            const pendingCount = await db.user.count({
                where: { isApproved: false }
            });

            if (pendingCount > 0) {
                notifications.push({
                    id: "pending-users",
                    message: `Hay ${pendingCount} usuario(s) pendiente(s) de aprobación.`,
                    link: "/dashboard/users",
                    type: "URGENT"
                });
            }
        } catch (error) {
            console.error("Error checking pending users notification:", error);
        }
    }

    // 2. FUTURE CHECKS (e.g., Attendance anomalies for HR)
    // ...

    return {
        hasNotifications: notifications.length > 0,
        count: notifications.length,
        items: notifications
    };
};
