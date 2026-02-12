import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getCampaigns, getQuickLinks } from "@/actions/admin";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export default async function AdminPage() {
    const session = await auth();

    if (session?.user?.role !== "ADMIN") {
        redirect("/dashboard");
    }

    const campaigns = await getCampaigns();
    const quickLinks = await getQuickLinks();

    return (
        <AdminDashboard initialCampaigns={campaigns} initialLinks={quickLinks} />
    );
}
