import { auth } from '@/auth';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F5F7F9' }}>
            <Sidebar userRole={session?.user?.role} />
            <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column' }}>
                <Header />
                <main style={{ padding: '2rem', flex: 1 }}>
                    {children}
                </main>
            </div>
        </div>
    );
}
