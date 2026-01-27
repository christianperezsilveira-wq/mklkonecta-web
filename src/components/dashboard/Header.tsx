"use client";

import React from 'react';
import styles from './Header.module.css';
import Image from 'next/image';

export const Header = () => {
    return (
        <header className={styles.header}>
            {/* Search Bar */}
            <div className={styles.searchContainer}>
                <span className={styles.searchIcon}>🔍</span>
                <input
                    type="text"
                    placeholder="Buscar herramientas..."
                    className={styles.searchInput}
                />
            </div>

            {/* Actions & Profile */}
            <div className={styles.actions}>
                <button className={styles.iconButton} title="Notificaciones">
                    🔔
                </button>
                <button className={styles.iconButton} title="Mensajes">
                    ✉️
                </button>

                <div className={styles.userProfile}>
                    <div className={styles.userInfo}>
                        <span className={styles.userName}>Carlos Mendoza</span>
                        <span className={styles.userRole}>AGENTE SENIOR</span>
                    </div>
                    <div className={styles.avatar}>
                        {/* Placeholder avatar, can be replaced with real image */}
                        <Image
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
                            alt="Carlos Mendoza"
                            width={40}
                            height={40}
                            className={styles.avatarImage}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};
