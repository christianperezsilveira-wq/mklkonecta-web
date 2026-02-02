"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

/**
 * CAMPAIGNS ACTIONS
 */

export const createCampaign = async (values: { name: string; slug: string; description?: string; content?: string }) => {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") return { error: "No autorizado" };

    try {
        const campaign = await db.campaign.create({
            data: values
        });
        revalidatePath("/dashboard");
        return { success: true, data: campaign };
    } catch (error) {
        return { error: "Error al crear la campaña" };
    }
};

export const updateCampaign = async (id: string, values: { name?: string; slug?: string; description?: string; content?: string; status?: string }) => {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") return { error: "No autorizado" };

    try {
        const campaign = await db.campaign.update({
            where: { id },
            data: values
        });
        revalidatePath("/dashboard");
        return { success: true, data: campaign };
    } catch (error) {
        return { error: "Error al actualizar la campaña" };
    }
};

export const deleteCampaign = async (id: string) => {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") return { error: "No autorizado" };

    try {
        await db.campaign.delete({ where: { id } });
        revalidatePath("/dashboard");
        return { success: true };
    } catch (error) {
        return { error: "Error al eliminar la campaña" };
    }
};

export const getCampaigns = async () => {
    try {
        return await db.campaign.findMany({
            orderBy: { createdAt: "desc" }
        });
    } catch (error) {
        console.error("Error fetching campaigns:", error);
        return [];
    }
};

/**
 * QUICKLINKS ACTIONS
 */

export const createQuickLink = async (values: { title: string; url: string; icon?: string; order?: number }) => {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") return { error: "No autorizado" };

    try {
        const link = await db.quickLink.create({
            data: values
        });
        revalidatePath("/dashboard");
        return { success: true, data: link };
    } catch (error) {
        return { error: "Error al crear el link" };
    }
};

export const updateQuickLink = async (id: string, values: { title?: string; url?: string; icon?: string; order?: number }) => {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") return { error: "No autorizado" };

    try {
        const link = await db.quickLink.update({
            where: { id },
            data: values
        });
        revalidatePath("/dashboard");
        return { success: true, data: link };
    } catch (error) {
        return { error: "Error al actualizar el link" };
    }
};

export const deleteQuickLink = async (id: string) => {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") return { error: "No autorizado" };

    try {
        await db.quickLink.delete({ where: { id } });
        revalidatePath("/dashboard");
        return { success: true };
    } catch (error) {
        return { error: "Error al eliminar el link" };
    }
};

export const getQuickLinks = async () => {
    try {
        return await db.quickLink.findMany({
            orderBy: { order: "asc" }
        });
    } catch (error) {
        console.error("Error fetching quick links:", error);
        return [];
    }
};

/**
 * SOFTWARE TOOLS ACTIONS
 */

export const createSoftwareTool = async (values: { name: string; url: string; description?: string; icon?: string; image?: string; order?: number }) => {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") return { error: "No autorizado" };

    try {
        const tool = await db.softwareTool.create({
            data: values
        });
        revalidatePath("/dashboard");
        revalidatePath("/dashboard/tools");
        return { success: true, data: tool };
    } catch (error) {
        console.error("Error creating tool:", error);
        return { error: "Error al crear la herramienta" };
    }
};

export const updateSoftwareTool = async (id: string, values: { name?: string; url?: string; description?: string; icon?: string; image?: string; order?: number }) => {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") return { error: "No autorizado" };

    try {
        const tool = await db.softwareTool.update({
            where: { id },
            data: values
        });
        revalidatePath("/dashboard");
        revalidatePath("/dashboard/tools");
        return { success: true, data: tool };
    } catch (error) {
        console.error("Error updating tool:", error);
        return { error: "Error al actualizar la herramienta" };
    }
};

export const deleteSoftwareTool = async (id: string) => {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") return { error: "No autorizado" };

    try {
        await db.softwareTool.delete({ where: { id } });
        revalidatePath("/dashboard");
        revalidatePath("/dashboard/tools");
        return { success: true };
    } catch (error) {
        console.error("Error deleting tool:", error);
        return { error: "Error al eliminar la herramienta" };
    }
};

export const getSoftwareTools = async () => {
    try {
        return await db.softwareTool.findMany({
            orderBy: { order: "asc" }
        });
    } catch (error) {
        console.error("Error fetching software tools:", error);
        return [];
    }
};

/**
 * Fetch a single campaign by slug
 */
export const getCampaignBySlug = async (slug: string) => {
    try {
        return await db.campaign.findUnique({
            where: { slug }
        });
    } catch (error) {
        console.error("Error fetching campaign by slug:", error);
        return null;
    }
};
