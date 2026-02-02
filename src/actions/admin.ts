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
