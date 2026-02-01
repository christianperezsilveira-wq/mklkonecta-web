"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { sendApprovalEmail } from "@/lib/mail";

// 🔒 Verificar que el usuario sea ADMIN
const checkAdmin = async () => {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
        throw new Error("No autorizado. Se requieren permisos de Administrador.");
    }
    return session;
};

export const getUsers = async () => {
    try {
        await checkAdmin();
        const users = await db.user.findMany({
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                isApproved: true,
                createdAt: true,
                image: true
            }
        });
        return { success: true, data: users };
    } catch (error) {
        return { error: "Error al obtener usuarios" };
    }
};

export const toggleUserApproval = async (userId: string, currentStatus: boolean) => {
    try {
        await checkAdmin();
        const newStatus = !currentStatus;

        // Si se está aprobando al usuario, también verificamos su email automáticamente
        // para evitar que el usuario quede bloqueado si el correo no llegó.
        const data: any = { isApproved: newStatus };
        if (newStatus) {
            data.emailVerified = new Date();
        }

        const updatedUser = await db.user.update({
            where: { id: userId },
            data
        });

        if (newStatus && updatedUser.email) {
            await sendApprovalEmail(updatedUser.email, updatedUser.name || "Usuario");
        }
        revalidatePath("/dashboard/users");
        return { success: "Estado actualizado correctamente" };
    } catch (error) {
        return { error: "Error al actualizar estado" };
    }
};

export const deleteUser = async (userId: string) => {
    try {
        await checkAdmin();
        await db.user.delete({
            where: { id: userId }
        });
        revalidatePath("/dashboard/users");
        return { success: "Usuario eliminado correctamente" };
    } catch (error) {
        return { error: "Error al eliminar usuario" };
    }
};

export const toggleUserRole = async (userId: string, currentRole: string) => {
    try {
        await checkAdmin();
        const newRole = currentRole === "ADMIN" ? "USER" : "ADMIN";
        await db.user.update({
            where: { id: userId },
            data: { role: newRole }
        });
        revalidatePath("/dashboard/users");
        return { success: `Rol cambiado a ${newRole}` };
    } catch (error) {
        return { error: "Error al cambiar rol" };
    }
};
