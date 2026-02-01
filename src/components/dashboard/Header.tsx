"use client";

import React, { useState } from 'react';
import styles from './Header.module.css';
import Image from 'next/image';
import { ProfileModal } from '@/components/profile/ProfileModal';

interface HeaderProps {
    user?: {
        name?: string | null;
        image?: string | null;
        role?: string;
    };
}

export const Header = ({ user }: HeaderProps) => {
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    const userName = user?.name || "Usuario";
    const userRole = user?.role === "ADMIN" ? "ADMINISTRADOR" : "AGENTE";
    const userImage = user?.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80";

    return (
        <>
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

                    <div
                        className={styles.userProfile}
                        onClick={() => setIsProfileModalOpen(true)}
                        style={{ cursor: "pointer" }}
                        title="Editar Perfil"
                    >
                        <div className={styles.userInfo}>
                            <span className={styles.userName}>{userName}</span>
                            <span className={styles.userRole}>{userRole}</span>
                        </div>
                        <div className={styles.avatar}>
                            <Image
                                src={userImage}
                                alt={userName}
                                width={40}
                                height={40}
                                className={styles.avatarImage}
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                    </div>
                </div>
            </header>

            {isProfileModalOpen && user && (
                <ProfileModal
                    user={user}
                    onClose={() => setIsProfileModalOpen(false)}
                />
            )}
        </>
    );
};
