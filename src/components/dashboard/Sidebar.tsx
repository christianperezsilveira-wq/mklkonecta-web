"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';
import { logout } from '@/actions/auth';

export const Sidebar = ({ userRole }: { userRole?: string }) => {
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
                    <Link
                        href="/dashboard/users"
                        className={`${styles.navItem} ${pathname === '/dashboard/users' ? styles.active : ''}`}
                    >
                        <span className={styles.navIcon}>👥</span>
                        Usuarios
                    </Link>
                )}

                <div className={styles.categoryTitle}>Herramientas</div>
                <Link href="#" className={styles.navItem}><span className={styles.navIcon}>🛠️</span> Herramientas</Link>

                <div className={styles.categoryTitle}>Campañas</div>
                <Link href="#" className={styles.navItem}><span className={styles.navIcon}>📢</span> Campañas</Link>

                <div className={styles.categoryTitle}>Recursos Humanos</div>
                <Link href="#" className={styles.navItem}><span className={styles.navIcon}>📋</span> Recursos Humanos</Link>
                <Link href="#" className={styles.navItem}><span className={styles.navIcon}>🎧</span> Soporte IT</Link>

                <div className={styles.categoryTitle}>PERSONAL</div>
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
