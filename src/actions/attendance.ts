"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

// Helper to get today's start and end
const getTodayRange = () => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    return { start, end };
};

/**
 * Get the current status of the user for today (or open shift from yesterday)
 */
export const getShiftStatus = async () => {
    const session = await auth();
    if (!session?.user?.id) return { error: "No autorizado" };

    const userId = session.user.id;

    // Get the last entry for the user
    const lastEntry = await db.timeEntry.findFirst({
        where: { userId },
        orderBy: { timestamp: 'desc' }
    });

    if (!lastEntry) return { status: "NULL", lastEntry: null };

    // Determine status based on last entry type
    // If OUT, status is NULL (unless we want to track 'shift ended' state)
    // If IN or RESUME, status is ACTIVE
    // If PAUSE, status is PAUSED

    let status = "NULL";
    if (lastEntry.type === "IN" || lastEntry.type === "RESUME") status = "ACTIVE";
    if (lastEntry.type === "PAUSE") status = "PAUSED";
    if (lastEntry.type === "OUT") status = "NULL";

    return { status, lastEntry };
};

export const clockIn = async (location?: { lat?: number; lng?: number; accuracy?: number }) => {
    const session = await auth();
    if (!session?.user?.id) return { error: "No autorizado" };
    const userId = session.user.id;

    // Validation: Check if already active
    const { status } = await getShiftStatus();
    if (status !== "NULL") {
        return { error: "Ya tienes un turno activo o en pausa." };
    }

    try {
        const entry = await db.timeEntry.create({
            data: {
                userId,
                type: "IN",
                latitude: location?.lat,
                longitude: location?.lng,
                accuracy: location?.accuracy,
                origin: "WEB" // Default to WEB for now
            }
        });
        revalidatePath("/dashboard");
        return { success: true, data: entry };
    } catch (error) {
        console.error("Clock In Error:", error);
        return { error: "Error al registrar entrada" };
    }
};

export const clockOut = async (location?: { lat?: number; lng?: number; accuracy?: number }) => {
    const session = await auth();
    if (!session?.user?.id) return { error: "No autorizado" };
    const userId = session.user.id;

    // Validation: Must be ACTIVE or PAUSED to clock out? 
    // Usually must be ACTIVE. If PAUSED, should we auto-resume then out? 
    // Or allow OUT from PAUSED (shift ended while on break).
    // Let's allow OUT from anywhere except NULL.

    const { status } = await getShiftStatus();
    if (status === "NULL") {
        return { error: "No tienes un turno abierto para cerrar." };
    }

    try {
        const entry = await db.timeEntry.create({
            data: {
                userId,
                type: "OUT",
                latitude: location?.lat,
                longitude: location?.lng,
                accuracy: location?.accuracy,
                origin: "WEB"
            }
        });
        revalidatePath("/dashboard");
        return { success: true, data: entry };
    } catch (error) {
        console.error("Clock Out Error:", error);
        return { error: "Error al registrar salida" };
    }
};

export const togglePause = async (location?: { lat?: number; lng?: number; accuracy?: number }) => {
    const session = await auth();
    if (!session?.user?.id) return { error: "No autorizado" };
    const userId = session.user.id;

    const { status } = await getShiftStatus();

    let type = "";
    if (status === "ACTIVE") type = "PAUSE";
    else if (status === "PAUSED") type = "RESUME";
    else return { error: "Debes iniciar turno primero." };

    try {
        const entry = await db.timeEntry.create({
            data: {
                userId,
                type,
                latitude: location?.lat,
                longitude: location?.lng,
                accuracy: location?.accuracy,
                origin: "WEB"
            }
        });
        revalidatePath("/dashboard");
        return { success: true, data: entry };
    } catch (error) {
        console.error("Toggle Pause Error:", error);
        return { error: "Error al cambiar estado de pausa" };
    }
};

// --- REPORTING ACTIONS ---

export const getAttendanceHistory = async (userId: string, startDate?: Date, endDate?: Date) => {
    const session = await auth();
    if (!session?.user?.id) return { error: "No autorizado" };
    // Users can see their own, Admin/HR can see all (logic to be added if needed)
    if (session.user.role !== "ADMIN" && session.user.id !== userId) return { error: "No autorizado" };

    try {
        const history = await db.timeEntry.findMany({
            where: {
                userId,
                timestamp: {
                    gte: startDate,
                    lte: endDate
                }
            },
            orderBy: { timestamp: 'desc' }
        });
        return { success: true, data: history };
    } catch (error) {
        return { error: "Error al obtener historial" };
    }
};

export const getDailyReport = async (date: Date) => {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") return { error: "No autorizado" };

    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    try {
        // Fetch all users and their entries for the day
        const users = await db.user.findMany({
            where: { role: { not: "ADMIN" } }, // Filter admins? Maybe show all.
            select: { id: true, name: true, email: true, image: true }
        });

        const entries = await db.timeEntry.findMany({
            where: {
                timestamp: { gte: start, lte: end }
            }
        });

        // Process data
        const report = users.map(user => {
            const userEntries = entries.filter(e => e.userId === user.id).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

            const firstIn = userEntries.find(e => e.type === "IN");
            const lastOut = [...userEntries].reverse().find(e => e.type === "OUT");

            return {
                user,
                firstIn: firstIn?.timestamp || null,
                lastOut: lastOut?.timestamp || null,
                status: firstIn ? (lastOut ? "COMPLETED" : "ACTIVE") : "ABSENT",
                entriesCount: userEntries.length
            };
        });

        return { success: true, data: report };
    } catch (error) {
        console.error("Daily Report Error:", error);
        return { error: "Error al generar reporte diario" };
    }
};

export const getMyAttendance = async (startDate?: Date, endDate?: Date) => {
    const session = await auth();
    if (!session?.user?.id) return { error: "No autorizado" };

    // Default to current month if no dates provided
    const now = new Date();
    const start = startDate || new Date(now.getFullYear(), now.getMonth(), 1);
    const end = endDate || new Date();

    return getAttendanceHistory(session.user.id, start, end);
};
