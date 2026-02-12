import { auth } from '@/auth';
import { getSoftwareTools, getToolCategories } from '@/actions/admin';
import Link from 'next/link';
import styles from './tools.module.css';

export const dynamic = 'force-dynamic';

export default async function ToolsPage() {
    const session = await auth();
    const userRole = session?.user?.role;

    // Fetch data in parallel
    const [allTools, categories] = await Promise.all([
        getSoftwareTools(),
        getToolCategories()
    ]);

    // Filter tools for this page
    const toolsForPage = allTools.filter(tool => tool.locations?.includes('TOOLS_PAGE'));

    // Group tools by category ID
    const toolsByCategoryId: Record<string, any[]> = {};
    const toolsWithoutCategory: any[] = [];

    toolsForPage.forEach(tool => {
        if (tool.categoryId) {
            if (!toolsByCategoryId[tool.categoryId]) {
                toolsByCategoryId[tool.categoryId] = [];
            }
            toolsByCategoryId[tool.categoryId].push(tool);
        } else {
            toolsWithoutCategory.push(tool);
        }
    });

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Herramientas de Software</h1>
                    <p className={styles.subtitle}>Acceso directo a todas las aplicaciones y recursos.</p>
                </div>
                {userRole === 'ADMIN' && (
                    <Link href="/dashboard/admin" className={styles.adminLink}>
                        Gestionar Herramientas
                    </Link>
                )}
            </div>

            <div className={styles.content}>
                {/* Dynamically Created Categories */}
                {categories.map(category => {
                    const categoryTools = toolsByCategoryId[category.id] || [];
                    if (categoryTools.length === 0) return null;

                    return (
                        <section key={category.id} className={styles.categorySection}>
                            <h2 className={styles.categoryTitle}>
                                <span className={styles.bullet}>❖</span> {category.name}
                            </h2>
                            <div className={styles.grid}>
                                {categoryTools.map(tool => (
                                    <ToolCard key={tool.id} tool={tool} />
                                ))}
                            </div>
                        </section>
                    );
                })}

                {/* Uncategorized Tools (or legacy category string support if needed, but primarily new relation) */}
                {toolsWithoutCategory.length > 0 && (
                    <section className={styles.categorySection}>
                        <h2 className={styles.categoryTitle}>
                            <span className={styles.bullet}>❖</span> General / Sin Categoría
                        </h2>
                        <div className={styles.grid}>
                            {toolsWithoutCategory.map(tool => (
                                <ToolCard key={tool.id} tool={tool} />
                            ))}
                        </div>
                    </section>
                )}

                {toolsForPage.length === 0 && (
                    <div className={styles.emptyState}>
                        <p>No hay herramientas configuradas para esta página.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function ToolCard({ tool }: { tool: any }) {
    return (
        <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
        >
            <div className={styles.iconWrapper}>
                {tool.image ? (
                    <img src={tool.image} alt={tool.name} className={styles.iconImage} />
                ) : (
                    <span className={styles.iconEmoji}>{tool.icon || '🛠️'}</span>
                )}
            </div>
            <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{tool.name}</h3>
                {tool.description && <p className={styles.cardDesc}>{tool.description}</p>}
            </div>
        </a>
    );
}
