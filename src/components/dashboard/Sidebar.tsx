"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';
import { logout } from '@/actions/auth';

export const Sidebar = ({ userRole, campaigns = [] }: { userRole?: string; campaigns?: any[] }) => {
    const pathname = usePathname();

    return (
        <aside className={styles.sidebar}>
            {/* Logo Section */}
            <div className={styles.logoContainer}>
                <div className={styles.logoMain}>
                    <span className={styles.logoIcon} />
                    <span>MKL Konecta</span>
                </div>
                <div className={styles.logoSubtitle}>INTRANET RED</div>
            </div>

            {/* Navigation */}
            <nav className={styles.nav}>
                <Link
                    href="/dashboard"
                    className={`${styles.navItem} ${pathname === '/dashboard' ? styles.active : ''}`}
                >
                    <span className={styles.navIcon}>📊</span>
                    Dashboard
                </Link>

                {userRole === 'ADMIN' && (
                    <div className={styles.adminGroup}>
                        <div className={styles.categoryTitle}>Administración</div>
                        <Link
                            href="/dashboard/admin"
                            className={`${styles.navItem} ${pathname === '/dashboard/admin' ? styles.active : ''}`}
                        >
                            <span className={styles.navIcon}>⚙️</span>
                            Panel de Control
                        </Link>
                        <Link
                            href="/dashboard/users"
                            className={`${styles.navItem} ${pathname === '/dashboard/users' ? styles.active : ''}`}
                        >
                            <span className={styles.navIcon}>👥</span>
                            Usuarios
                        </Link>
                    </div>
                )}

                <div className={styles.categoryTitle}>Herramientas</div>
                <Link
                    href="/dashboard/tools"
                    className={`${styles.navItem} ${pathname === '/dashboard/tools' ? styles.active : ''}`}
                >
                    <span className={styles.navIcon}>🛠️</span>
                    Herramientas
                </Link>

                <div className={styles.categoryTitle}>Campañas</div>
                {campaigns?.filter(c => c.status === 'ACTIVE').map(campaign => (
                    <Link
                        key={campaign.id}
                        href={`/dashboard/campaigns/${campaign.slug}`}
                        className={`${styles.navItem} ${pathname === `/dashboard/campaigns/${campaign.slug}` ? styles.active : ''}`}
                    >
                        <span className={styles.navIcon}>📢</span>
                        {campaign.name}
                    </Link>
                ))}
                {campaigns?.length === 0 && (
                    <Link href="#" className={styles.navItem}><span className={styles.navIcon}>📢</span> Campañas</Link>
                )}

                <div className={styles.categoryTitle}>Recursos Humanos</div>
                <Link href="/dashboard/hr/reports" className={`${styles.navItem} ${pathname.startsWith('/dashboard/hr') ? styles.active : ''}`}>
                    <span className={styles.navIcon}>📋</span>
                    Reportes y Gestión
                </Link>
                <Link href="#" className={styles.navItem}><span className={styles.navIcon}>🎧</span> Soporte IT</Link>

                <div className={styles.categoryTitle}>PERSONAL</div>
                <Link href="/dashboard/attendance" className={`${styles.navItem} ${pathname === '/dashboard/attendance' ? styles.active : ''}`}>
                    <span className={styles.navIcon}>⏱️</span>
                    Mi Asistencia
                </Link>
                <Link href="#" className={styles.navItem}><span className={styles.navIcon}>💵</span> Mis Nóminas</Link>
                <Link href="#" className={styles.navItem}><span className={styles.navIcon}>📅</span> Mi Horario</Link>
            </nav>



            {/* Footer / Logout */}
            <div className={styles.footer}>
                <form action={logout}>
                    <button type="submit" className={styles.logoutButton}>
                        <span>↩️</span> Cerrar Sesión
                    </button>
                </form>
            </div>
        </aside>
    );
};
