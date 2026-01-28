"use client";

import React, { useEffect, useState } from 'react';
import styles from './users.module.css';
import { getUsers, toggleUserApproval, deleteUser, toggleUserRole } from '@/actions/users';

type User = {
    id: string;
    name: string | null;
    email: string;
    role: string;
    isApproved: boolean;
    createdAt: Date;
    image: string | null;
};

export default function UsersClient() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const loadUsers = async () => {
        setLoading(true);
        const res = await getUsers();
        if (res.success && res.data) {
            setUsers(res.data);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleApproval = async (id: string, currentStatus: boolean) => {
        await toggleUserApproval(id, currentStatus);
        loadUsers();
    };

    const handleDelete = async (id: string) => {
        if (confirm("¿Estás seguro de que quieres eliminar a este usuario? Esta acción no se puede deshacer.")) {
            await deleteUser(id);
            loadUsers();
        }
    };

    const handleRole = async (id: string, currentRole: string) => {
        await toggleUserRole(id, currentRole);
        loadUsers();
    };

    const filteredUsers = users.filter(u =>
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        (u.name && u.name.toLowerCase().includes(search.toLowerCase()))
    );

    const pendingCount = users.filter(u => !u.isApproved).length;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Gestión de Usuarios</h1>
                    <p className={styles.subtitle}>Administra los accesos y roles del equipo.</p>
                </div>
            </div>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statLabel}>Usuarios Totales</div>
                    <div className={styles.statValue}>{users.length}</div>
                </div>
                <div className={styles.statCard} style={{ borderLeft: '4px solid #F59E0B' }}>
                    <div className={styles.statLabel}>Pendientes</div>
                    <div className={styles.statValue} style={{ color: '#F59E0B' }}>{pendingCount}</div>
                </div>
                <div className={styles.statCard} style={{ borderLeft: '4px solid #10B981' }}>
                    <div className={styles.statLabel}>Activos</div>
                    <div className={styles.statValue} style={{ color: '#10B981' }}>{users.filter(u => u.isApproved).length}</div>
                </div>
            </div>

            <div className={styles.tableContainer}>
                <div className={styles.tableHeader}>
                    <input
                        type="text"
                        placeholder="Buscar por email o nombre..."
                        className={styles.searchInput}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Usuario</th>
                                <th>Rol</th>
                                <th>Estado</th>
                                <th>Registro</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className={styles.emptyState}>
                                        No se encontraron usuarios.
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map(user => (
                                    <tr key={user.id}>
                                        <td>
                                            <div className={styles.userCell}>
                                                <div className={styles.avatar}>
                                                    {user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()}
                                                </div>
                                                <div className={styles.userInfo}>
                                                    <span className={styles.userName}>{user.name || "Sin Nombre"}</span>
                                                    <span className={styles.userEmail}>{user.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span
                                                className={user.role === 'ADMIN' ? styles.badgeAdmin : styles.badgeUser}
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handleRole(user.id, user.role)}
                                                title="Clic para cambiar rol"
                                            >
                                                {user.role}
                                            </span>
                                        </td>
                                        <td>
                                            {user.isApproved ? (
                                                <span className={styles.statusApproved}>
                                                    ● Activo
                                                </span>
                                            ) : (
                                                <span className={styles.statusPending}>
                                                    ⏳ Pendiente
                                                </span>
                                            )}
                                        </td>
                                        <td>
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                        <td>
                                            <div className={styles.actions}>
                                                {!user.isApproved && (
                                                    <button
                                                        className={`${styles.actionBtn} ${styles.btnApprove}`}
                                                        onClick={() => handleApproval(user.id, user.isApproved)}
                                                        title="Aprobar Usuario"
                                                    >
                                                        ✅ Aprobar
                                                    </button>
                                                )}
                                                {user.isApproved && (
                                                    <button
                                                        className={styles.actionBtn}
                                                        onClick={() => handleApproval(user.id, user.isApproved)}
                                                        title="Suspender Usuario"
                                                    >
                                                        ⛔
                                                    </button>
                                                )}
                                                <button
                                                    className={`${styles.actionBtn} ${styles.btnReject}`}
                                                    onClick={() => handleDelete(user.id)}
                                                    title="Eliminar Usuario"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
