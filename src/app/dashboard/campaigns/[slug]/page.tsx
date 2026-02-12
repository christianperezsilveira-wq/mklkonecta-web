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
    const hasSections = campaign.sections && campaign.sections.length > 0;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.breadcrumb}>
                    <Link href="/dashboard" className={styles.breadcrumbLink}>Dashboard</Link> / <span>Campañas</span> / <span className={styles.currentCrumb}>{campaign.name}</span>
                </div>
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>{campaign.name}</h1>
                    {campaign.description && <p className={styles.description}>{campaign.description}</p>}
                </div>
            </header>

            {hasSections && (
                <div className={styles.sectionsContainer}>
                    {campaign.sections.map((section: any) => (
                        <div key={section.id} className={styles.sectionBlock}>
                            <h2 className={styles.sectionTitle}>{section.title}</h2>
                            <div className={styles.linksGrid}>
                                {section.links.map((link: any) => (
                                    <a
                                        key={link.id}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.linkCard}
                                    >
                                        <div className={styles.linkIcon}>{link.icon || '🔗'}</div>
                                        <span className={styles.linkTitle}>{link.title}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

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
                    <div className={styles.toolsHeader}>
                        <h2 className={styles.sectionTitle}>Herramientas Relacionadas</h2>
                    </div>
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

            {!hasContent && !hasTools && !hasSections && (
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
