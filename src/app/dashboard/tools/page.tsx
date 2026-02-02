import React from 'react';
import { getSoftwareTools } from '@/actions/admin';
import Link from 'next/link';
import styles from './ToolsPage.module.css';

export const dynamic = 'force-dynamic';

export default async function ToolsPage() {
    const tools = await getSoftwareTools();

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.breadcrumb}>
                    <Link href="/dashboard">Dashboard</Link> / <span>Herramientas</span>
                </div>
                <h1 className={styles.title}>Herramientas de Software</h1>
                <p className={styles.description}>Acceso centralizado a todas las plataformas y recursos de MKL Konecta.</p>
            </header>

            <div className={styles.toolsGrid}>
                {tools.map((tool: any) => (
                    <a 
                        key={tool.id} 
                        href={tool.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={styles.toolCard}
                    >
                        <div className={styles.iconWrapper}>
                            {tool.image ? (
                                <img src={tool.image} alt={tool.name} className={styles.toolImage} />
                            ) : (
                                <span className={styles.toolIcon}>{tool.icon || '🛠️'}</span>
                            )}
                        </div>
                        <div className={styles.toolContent}>
                            <h3 className={styles.toolName}>{tool.name}</h3>
                            <p className={styles.toolDesc}>{tool.description}</p>
                        </div>
                        <div className={styles.arrow}>→</div>
                    </a>
                ))}

                {tools.length === 0 && (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>🛠️</div>
                        <h3>No hay herramientas configuradas</h3>
                        <p>Contacta con un administrador para añadir accesos directos.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
