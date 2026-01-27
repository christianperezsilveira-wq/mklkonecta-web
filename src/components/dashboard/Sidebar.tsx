"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

const menuGroups = [
    {
        title: null, // Top level items
        items: [
            { label: 'Dashboard', href: '/dashboard', icon: 'HH' }, // HH will be replaced by custom icon logic or SVG
        ]
    },
    {
        title: 'Herramientas',
        items: [
            { label: 'Herramientas', href: '/dashboard/tools', icon: '🛠️' },
        ]
    },
    {
        title: 'Comunidad',
        items: [
            { label: 'Comunidad', href: '/dashboard/community', icon: '👥' },
        ]
    },
    {
        title: 'Recursos Humanos',
        items: [
            { label: 'Recursos Humanos', href: '/dashboard/hr', icon: '📄' },
        ]
    },
    {
        title: 'Soporte IT',
        items: [
            { label: 'Soporte IT', href: '/dashboard/support', icon: '🎧' },
        ]
    },
    {
        title: 'PERSONAL',
        items: [
            { label: 'Mis Nóminas', href: '/dashboard/payroll', icon: '💰' },
            { label: 'Mi Horario', href: '/dashboard/schedule', icon: '📅' },
        ]
    }
];

export const Sidebar = () => {
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

                <div className={styles.categoryTitle}>Herramientas</div>
                <Link href="#" className={styles.navItem}><span className={styles.navIcon}>🛠️</span> Herramientas</Link>

                <div className={styles.categoryTitle}>Comunidad</div>
                <Link href="#" className={styles.navItem}><span className={styles.navIcon}>👥</span> Comunidad</Link>

                <div className={styles.categoryTitle}>Recursos Humanos</div>
                <Link href="#" className={styles.navItem}><span className={styles.navIcon}>📋</span> Recursos Humanos</Link>
                <Link href="#" className={styles.navItem}><span className={styles.navIcon}>🎧</span> Soporte IT</Link>

                <div className={styles.categoryTitle}>PERSONAL</div>
                <Link href="#" className={styles.navItem}><span className={styles.navIcon}>💵</span> Mis Nóminas</Link>
                <Link href="#" className={styles.navItem}><span className={styles.navIcon}>📅</span> Mi Horario</Link>
            </nav>

            {/* Footer / Logout */}
            <div className={styles.footer}>
                <button className={styles.logoutButton}>
                    <span>↩️</span> Cerrar Sesión
                </button>
            </div>
        </aside>
    );
};
