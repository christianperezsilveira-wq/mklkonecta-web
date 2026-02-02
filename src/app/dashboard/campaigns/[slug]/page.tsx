import React from 'react';
import { notFound } from 'next/navigation';
import { getCampaignBySlug } from '@/actions/admin';
import Link from 'next/link';
import styles from './CampaignPage.module.css';

interface CampaignParams {
    params: Promise<{ slug: string }>;
}

export default async function CampaignPage({ params }: CampaignParams) {
    const { slug } = await params;
    const campaign = await getCampaignBySlug(slug);

    if (!campaign || campaign.status !== 'ACTIVE') {
        notFound();
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.breadcrumb}>
                    <Link href="/dashboard">Dashboard</Link> / <span>Campañas</span>
                </div>
                <h1 className={styles.title}>{campaign.name}</h1>
                <p className={styles.description}>{campaign.description}</p>
            </header>

            <div className={styles.contentWrapper}>
                {campaign.content ? (
                    <div
                        className={styles.dynamicContent}
                        dangerouslySetInnerHTML={{ __html: campaign.content }}
                    />
                ) : (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>📢</div>
                        <h3>Contenido en Preparación</h3>
                        <p>Esta campaña está activa pero el contenido detallado aún no se ha publicado.</p>
                    </div>
                )}
            </div>

            <footer className={styles.footer}>
                <Link href="/dashboard" className={styles.backButton}>
                    ← Volver al Dashboard
                </Link>
            </footer>
        </div>
    );
}
