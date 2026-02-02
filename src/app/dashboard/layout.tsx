import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { getCampaigns } from "@/actions/admin";
import styles from "./dashboard.module.css";
import { LanguageProvider } from "@/context/LanguageContext";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    const campaigns = await getCampaigns();

    return (
        <LanguageProvider>
            <div className={styles.layout}>
                <Sidebar userRole={session.user.role} campaigns={campaigns} />
                <div className={styles.mainContent}>
                    <Header user={session.user} />
                    <main className={styles.pageContent}>
                        {children}
                    </main>
                </div>
            </div>
        </LanguageProvider>
    );
}
