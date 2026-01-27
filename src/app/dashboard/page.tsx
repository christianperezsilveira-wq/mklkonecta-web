import React from 'react';
import styles from './dashboard.module.css';
import Link from 'next/link';

const tools = [
    { name: 'CRM Interno', desc: 'Gestión de Clientes', icon: '⚡' },
    { name: 'Telefonía Cloud', desc: 'Sistemas Avaya', icon: '📞' },
    { name: 'Gestión Turnos', desc: 'Horarios & WFM', icon: '📅' },
    { name: 'Konecta Academy', desc: 'E-learning Portal', icon: '🎓' },
    { name: 'Outlook Web', desc: 'Correo Corp.', icon: '✉️' },
    { name: 'CyberSafe', desc: 'Seguridad IT', icon: '🛡️' },
    { name: 'OneDrive', desc: 'Almacenamiento', icon: '☁️' },
];

const importantLinks = [
    { name: 'Portal de Nómina', icon: '📄' },
    { name: 'Seguro Médico Prepago', icon: '🏥' },
    { name: 'Evaluación de Desempeño', icon: '📈' },
    { name: 'Canal Ético MKL', icon: '📢' },
];

export default function DashboardPage() {
    return (
        <div>
            {/* Welcome Section */}
            <div className={styles.welcomeSection}>
                <div className={styles.welcomeTitle}>
                    <h1>Bienvenido, Carlos</h1>
                    <p>Panel central de gestión. Tu entorno de trabajo optimizado con la identidad de MKL Konecta.</p>
                </div>

                {/* Timer Widget */}
                <div className={styles.turnWidget}>
                    <div className={styles.turnIcon}>⏱️</div>
                    <div className={styles.turnInfo}>
                        <span className={styles.turnLabel}>ESTADO DE TURNO</span>
                        <span className={styles.turnStatus}>Activo: 04h 32m</span>
                    </div>
                </div>
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
                            <a href="#" className={styles.sectionAction}>Gestionar accesos</a>
                        </div>

                        <div className={styles.toolsGrid}>
                            {tools.map((tool) => (
                                <div key={tool.name} className={styles.toolCard}>
                                    <div className={styles.toolIcon}>{tool.icon}</div>
                                    <div className={styles.toolContent}>
                                        <div className={styles.toolName}>{tool.name}</div>
                                        <div className={styles.toolDesc}>{tool.desc}</div>
                                    </div>
                                </div>
                            ))}

                            {/* Add Tool Button */}
                            <button className={`${styles.toolCard} ${styles.addToolCard}`}>
                                <span>+</span> AÑADIR TOOL
                            </button>
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
                            {importantLinks.map(link => (
                                <Link href="#" key={link.name} className={styles.linkItem}>
                                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                        <span style={{ fontSize: '1.2rem', color: '#6B7280' }}>{link.icon}</span>
                                        {link.name}
                                    </div>
                                    <span style={{ color: '#9CA3AF' }}>›</span>
                                </Link>
                            ))}
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
