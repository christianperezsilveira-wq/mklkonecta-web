"use client";

import React, { useState } from 'react';
import styles from './AdminDashboard.module.css';
import { ToolManager } from '@/components/admin/ToolManager';
import { CampaignManager } from '@/components/admin/CampaignManager';
import { LinkManager } from '@/components/admin/LinkManager';

interface AdminDashboardProps {
    initialCampaigns: any[];
    initialLinks: any[];
    // We could pass counts here if we had them from server component
}

type ActiveView = 'DASHBOARD' | 'TOOLS' | 'CAMPAIGNS' | 'LINKS';

export const AdminDashboard = ({ initialCampaigns, initialLinks }: AdminDashboardProps) => {
    const [activeView, setActiveView] = useState<ActiveView>('DASHBOARD');

    const renderDashboard = () => (
        <div className={styles.dashboardGrid}>
            {/* Summary Cards */}
            <div className={styles.summaryCard}>
                <div className={styles.cardIcon}>📢</div>
                <div className={styles.cardContent}>
                    <h3>Campañas Activas</h3>
                    <p className={styles.cardNumber}>{initialCampaigns.filter((c: any) => c.status === 'ACTIVE').length}</p>
                </div>
            </div>

            <div className={styles.summaryCard}>
                <div className={styles.cardIcon}>🔗</div>
                <div className={styles.cardContent}>
                    <h3>Links Rápidos</h3>
                    <p className={styles.cardNumber}>{initialLinks.length}</p>
                </div>
            </div>

            {/* Action Cards */}
            <div className={styles.actionCard} onClick={() => setActiveView('TOOLS')}>
                <div className={styles.actionIcon}>🛠️</div>
                <h3>Gestión de Herramientas</h3>
                <p>Administra las herramientas y sus categorías.</p>
                <span className={styles.actionArrow}>→</span>
            </div>

            <div className={styles.actionCard} onClick={() => setActiveView('CAMPAIGNS')}>
                <div className={styles.actionIcon}>📢</div>
                <h3>Gestión de Campañas</h3>
                <p>Crea, edita y organiza el contenido de campañas.</p>
                <span className={styles.actionArrow}>→</span>
            </div>

            <div className={styles.actionCard} onClick={() => setActiveView('LINKS')}>
                <div className={styles.actionIcon}>🔗</div>
                <h3>Links de Interés</h3>
                <p>Configura los enlaces rápidos del dashboard.</p>
                <span className={styles.actionArrow}>→</span>
            </div>
        </div>
    );

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                {activeView !== 'DASHBOARD' && (
                    <button onClick={() => setActiveView('DASHBOARD')} className={styles.backButton}>
                        ← Volver al Panel
                    </button>
                )}
                <div>
                    <h1 className={styles.title}>
                        {activeView === 'DASHBOARD' && 'Panel de Control'}
                        {activeView === 'TOOLS' && 'Gestión de Herramientas'}
                        {activeView === 'CAMPAIGNS' && 'Gestión de Campañas'}
                        {activeView === 'LINKS' && 'Links de Interés'}
                    </h1>
                    {activeView === 'DASHBOARD' && (
                        <p className={styles.subtitle}>Bienvenido al centro de administración.</p>
                    )}
                </div>
            </header>

            <main className={styles.mainContent}>
                {activeView === 'DASHBOARD' && renderDashboard()}
                {activeView === 'TOOLS' && <ToolManager />}
                {activeView === 'CAMPAIGNS' && <CampaignManager initialCampaigns={initialCampaigns} />}
                {activeView === 'LINKS' && <LinkManager initialLinks={initialLinks} />}
            </main>
        </div>
    );
};
