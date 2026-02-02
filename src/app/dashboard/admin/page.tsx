import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getCampaigns, getQuickLinks } from "@/actions/admin";
import { CampaignManager } from "@/components/admin/CampaignManager";
import { LinkManager } from "@/components/admin/LinkManager";
import styles from "./admin.module.css";

export default async function AdminPage() {
    const session = await auth();

    if (session?.user?.role !== "ADMIN") {
        redirect("/dashboard");
    }

    const campaigns = await getCampaigns();
    const quickLinks = await getQuickLinks();

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Panel de Administración</h1>
                <p className={styles.subtitle}>Gestiona las campañas y los links de interés del dashboard.</p>
            </header>

            <div className={styles.grid}>
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Gestión de Campañas</h2>
                    <CampaignManager initialCampaigns={campaigns} />
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Links de Interés</h2>
                    <LinkManager initialLinks={quickLinks} />
                </section>
            </div>
        </div>
    );
}
