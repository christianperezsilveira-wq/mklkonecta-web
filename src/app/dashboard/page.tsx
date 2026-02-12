import { auth } from '@/auth';
import { getQuickLinks, getSoftwareTools } from '@/actions/admin';
import styles from './dashboard.module.css';
import Link from 'next/link';
import { TimerWidget } from '@/components/dashboard/TimerWidget';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export default async function DashboardPage() {
    const session = await auth();
    const userName = session?.user?.name?.split(' ')[0] || "Usuario";
    const userRole = session?.user?.role;
    const quickLinks = await getQuickLinks();
    const allTools = await getSoftwareTools();
    const softwareTools = allTools.filter(tool => tool.locations?.includes('DASHBOARD'));

    return (
        <div>
            {/* Welcome Section */}
            <div className={styles.welcomeSection}>
                <div className={styles.welcomeTitle}>
                    <h1>Bienvenido, {userName}</h1>
                    <p>Panel central de gestión. Tu entorno de trabajo optimizado con la identidad de MKL Konecta.</p>
                </div>

                {/* Timer Widget */}
                {/* Timer Widget */}
                <TimerWidget />
            </div>

            <div className={styles.dashboardGrid}>
                {/* Main Column */}
                <div className={styles.mainColumn}>
                    {/* Tools Grid */}
                    <section>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>
                                <span style={{ color: '#E60000' }}>❖</span> Herramientas de Software
                            </h2>
                            <a href="/dashboard/tools" className={styles.sectionAction}>Ver todas</a>
                        </div>

                        <div className={styles.toolsGrid}>
                            {softwareTools.slice(0, 8).map((tool: any) => (
                                <a
                                    key={tool.id}
                                    href={tool.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.toolCard}
                                >
                                    <div className={styles.toolIcon}>
                                        {tool.image ? (
                                            <img src={tool.image} alt={tool.name} style={{ width: '100%', height: '100%', borderRadius: '8px' }} />
                                        ) : (
                                            tool.icon || '🛠️'
                                        )}
                                    </div>
                                    <div className={styles.toolContent}>
                                        <div className={styles.toolName}>{tool.name}</div>
                                        <div className={styles.toolDesc}>{tool.description}</div>
                                    </div>
                                </a>
                            ))}

                            {userRole === 'ADMIN' && (
                                <Link href="/dashboard/admin" className={`${styles.toolCard} ${styles.addToolCard}`}>
                                    <span>+</span> AÑADIR TOOL
                                </Link>
                            )}

                            {softwareTools.length === 0 && userRole !== 'ADMIN' && (
                                <p style={{ color: '#9CA3AF', fontSize: '0.9rem', gridColumn: '1/-1', textAlign: 'center', padding: '2rem' }}>
                                    No hay herramientas configuradas.
                                </p>
                            )}
                        </div>
                    </section>

                    {/* Culture Section */}
                    <section>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>
                                <span style={{ color: '#E60000' }}>👥</span> Nuestra Cultura
                            </h2>
                            <a href="#" className={styles.sectionAction}>Ver todo el muro</a>
                        </div>
                        <div className={styles.cultureGrid}>
                            <div className={styles.cultureCard} style={{ background: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80) center/cover' }}>
                                <div className={styles.cultureOverlay} />
                                <div className={styles.cultureContent}>
                                    <div className={styles.tag}>NOVEDAD</div>
                                    <h3 className={styles.cultureTitle}>Inauguración Nueva Sede Norte</h3>
                                    <p className={styles.cultureText}>Espacios diseñados para la colaboración.</p>
                                </div>
                            </div>
                            <div className={styles.cultureCard} style={{ background: 'url(https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80) center/cover' }}>
                                <div className={styles.cultureOverlay} />
                                <div className={styles.cultureContent}>
                                    <div className={styles.tag}>BENEFICIOS</div>
                                    <h3 className={styles.cultureTitle}>Nuevos Beneficios 2024</h3>
                                    <p className={styles.cultureText}>Conoce el nuevo plan de salud ampliado.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Side Column (Right) */}
                <div className={styles.sideColumn}>
                    {/* Links Card */}
                    <div className={styles.sidePanel}>
                        <h3 className={styles.sideTitle}>🔗 Links de Interés</h3>
                        <div className={styles.linkList}>
                            {quickLinks.map((link: any) => (
                                <Link
                                    href={link.url}
                                    key={link.id}
                                    className={styles.linkItem}
                                    target={link.url.startsWith('http') ? "_blank" : "_self"}
                                    rel={link.url.startsWith('http') ? "noopener noreferrer" : ""}
                                >
                                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                        <span style={{ fontSize: '1.2rem', color: '#6B7280' }}>{link.icon || '🔗'}</span>
                                        {link.title}
                                    </div>
                                    <span style={{ color: '#9CA3AF' }}>›</span>
                                </Link>
                            ))}
                            {quickLinks.length === 0 && (
                                <p style={{ color: '#9CA3AF', fontSize: '0.875rem', textAlign: 'center', padding: '1rem' }}>
                                    No hay links configurados.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Alerts Card */}
                    <div className={styles.sidePanel}>
                        <h3 className={styles.sideTitle}>⚠️ Avisos Importantes</h3>
                        <div className={styles.alertCard} style={{ background: '#FEF2F2', borderLeft: '4px solid #DC2626' }}>
                            <div className={styles.alertTitle} style={{ color: '#DC2626' }}>MANTENIMIENTO</div>
                            <p className={styles.alertText}>CRM fuera de línea mañana 02:00 AM.</p>
                        </div>
                        <div className={styles.alertCard} style={{ background: '#F9FAFB', borderLeft: '4px solid #6B7280' }}>
                            <div className={styles.alertTitle} style={{ color: '#4B5563' }}>INFORMATIVO</div>
                            <p className={styles.alertText}>Actualización de Windows disponible.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
