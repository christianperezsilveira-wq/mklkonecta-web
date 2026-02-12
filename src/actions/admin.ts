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

export const createSoftwareTool = async (values: { name: string; url: string; description?: string; icon?: string; image?: string; order?: number; locations?: string[]; categoryId?: string; campaignId?: string }) => {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") return { error: "No autorizado" };

    try {
        const dataToCreate = {
            ...values,
            category: "DEPRECATED", // Maintain for now
            categoryId: values.categoryId && values.categoryId.trim() !== "" ? values.categoryId : null,
            campaignId: values.campaignId && values.campaignId.trim() !== "" ? values.campaignId : null
        };

        const tool = await db.softwareTool.create({
            data: dataToCreate
        });
        revalidatePath("/dashboard");
        revalidatePath("/dashboard/tools");
        if (dataToCreate.campaignId) {
            const campaign = await db.campaign.findUnique({ where: { id: dataToCreate.campaignId } });
            if (campaign) revalidatePath(`/dashboard/campaigns/${campaign.slug}`);
        }
        return { success: true, data: tool };
    } catch (error: any) {
        console.error("Error creating tool:", error);
        return { error: `Error al crear la herramienta: ${error.message}` };
    }
};

export const updateSoftwareTool = async (id: string, values: { name?: string; url?: string; description?: string; icon?: string; image?: string; order?: number; locations?: string[]; categoryId?: string; campaignId?: string }) => {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") return { error: "No autorizado" };

    try {
        const dataToUpdate = {
            ...values,
            categoryId: values.categoryId && values.categoryId.trim() !== "" ? values.categoryId : null,
            campaignId: values.campaignId && values.campaignId.trim() !== "" ? values.campaignId : null
        };

        const tool = await db.softwareTool.update({
            where: { id },
            data: dataToUpdate
        });
        revalidatePath("/dashboard");
        revalidatePath("/dashboard/tools");
        if (dataToUpdate.campaignId) {
            const campaign = await db.campaign.findUnique({ where: { id: dataToUpdate.campaignId } });
            if (campaign) revalidatePath(`/dashboard/campaigns/${campaign.slug}`);
        }
        return { success: true, data: tool };
    } catch (error: any) {
        console.error("Error updating tool:", error);
        return { error: `Error al actualizar la herramienta: ${error.message}` };
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
            orderBy: { order: "asc" },
            include: { campaign: true, toolCategory: true }
        });
    } catch (error) {
        console.error("Error fetching software tools:", error);
        return [];
    }
};

/**
 * TOOL CATEGORIES ACTIONS
 */

export const createToolCategory = async (values: { name: string; slug: string; order?: number }) => {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") return { error: "No autorizado" };

    try {
        const category = await db.toolCategory.create({
            data: values
        });
        revalidatePath("/dashboard/tools");
        return { success: true, data: category };
    } catch (error) {
        return { error: "Error al crear la categoría" };
    }
};

export const updateToolCategory = async (id: string, values: { name?: string; slug?: string; order?: number }) => {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") return { error: "No autorizado" };

    try {
        const category = await db.toolCategory.update({
            where: { id },
            data: values
        });
        revalidatePath("/dashboard/tools");
        return { success: true, data: category };
    } catch (error) {
        return { error: "Error al actualizar la categoría" };
    }
};

export const deleteToolCategory = async (id: string) => {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") return { error: "No autorizado" };

    try {
        await db.toolCategory.delete({ where: { id } });
        revalidatePath("/dashboard/tools");
        return { success: true };
    } catch (error) {
        return { error: "Error al eliminar la categoría" };
    }
};

export const getToolCategories = async () => {
    try {
        return await db.toolCategory.findMany({
            orderBy: { order: "asc" },
            include: { tools: true }
        });
    } catch (error) {
        console.error("Error fetching tool categories:", error);
        return [];
    }
};

/**
 * Fetch a single campaign by slug
 */
export const getCampaignBySlug = async (slug: string) => {
    try {
        return await db.campaign.findUnique({
            where: { slug },
            include: {
                tools: {
                    orderBy: { order: 'asc' }
                }
            }
        });
    } catch (error) {
        console.error("Error fetching campaign by slug:", error);
        return null;
    }
};
