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

    const hasContent = !!campaign.content;
    const hasTools = campaign.tools && campaign.tools.length > 0;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.breadcrumb}>
                    <Link href="/dashboard">Dashboard</Link> / <span>Campañas</span> / <span className={styles.currentCrumb}>{campaign.name}</span>
                </div>
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>{campaign.name}</h1>
                    <p className={styles.description}>{campaign.description}</p>
                </div>
            </header>

            {hasContent && (
                <div className={styles.contentWrapper}>
                    <div
                        className={styles.dynamicContent}
                        dangerouslySetInnerHTML={{ __html: campaign.content as string }}
                    />
                </div>
            )}

            {hasTools && (
                <div className={styles.toolsSection}>
                    {!hasContent && <div className={styles.toolsHeader}>
                        <h2 className={styles.sectionTitle}>Herramientas Disponibles</h2>
                        <p className={styles.sectionSubtitle}>Accesos directos recomendados para esta campaña</p>
                    </div>}
                    <div className={styles.toolsGrid}>
                        {campaign.tools.map((tool: any) => (
                            <a
                                key={tool.id}
                                href={tool.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.toolCard}
                            >
                                <div className={styles.toolIcon}>
                                    {tool.image ? (
                                        <img src={tool.image} alt={tool.name} className={styles.toolImage} />
                                    ) : (
                                        tool.icon || '🛠️'
                                    )}
                                </div>
                                <div className={styles.toolContent}>
                                    <div className={styles.toolName}>{tool.name}</div>
                                    <div className={styles.toolDesc}>{tool.description}</div>
                                </div>
                                <div className={styles.toolAction}>➜</div>
                            </a>
                        ))}
                    </div>
                </div>
            )}

            {!hasContent && !hasTools && (
                <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>📢</div>
                    <h3>Contenido en Preparación</h3>
                    <p>Esta campaña está activa pero el contenido detallado aún no se ha publicado.</p>
                </div>
            )}

            <footer className={styles.footer}>
                <Link href="/dashboard" className={styles.backButton}>
                    ← Volver al Dashboard
                </Link>
            </footer>
        </div>
    );
}
